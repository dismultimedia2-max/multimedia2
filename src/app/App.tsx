import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SplashScreen from './components/SplashScreen';
import LogoTransition from './components/LogoTransition';
import QuestionScreen from './components/QuestionScreen';
import SummaryScreen from './components/SummaryScreen';
import ResultsScreen from './components/ResultsScreen';
import EmailCaptureScreen from './components/EmailCaptureScreen';
import ThankYouScreen from './components/ThankYouScreen';
import HowItWorksScreen from './components/HowItWorksScreen';
import { saveToGoogleSheets } from './utils/googleSheets';
import { triggerDispenser } from './utils/dispenser';
import { sendDiagnosticEmail } from './utils/email';
import { db } from './utils/firebase';
import { onValue, ref as dbRef, set as dbSet, update as dbUpdate } from 'firebase/database';
import { calculateHairType, getPrimaryProduct, getHairRoutine } from './utils/hairAnalysis';
import type { HairRoutine } from './utils/hairAnalysis';
import q1Bg from '../imports/mascarillas.jpg';
import q2Bg from '../imports/producto_con_flores.jpg';
import q3Bg from '../imports/naranjas_vertical.jpg';
import q4Bg from '../imports/pantalon_a_rayas_vertical.jpg';
import q5Bg from '../imports/productos_ducha_vertical.jpg';
import q6Bg from '../imports/serum_vertical.jpg';
import summaryBg from '../imports/aurora_bg.jpg';

export type Answer = {
  question: string;
  answer: string;
  index: number;
};

export default function App() {
  // Preload all background images on mount so they're cached before each screen appears
  useEffect(() => {
    [q1Bg, q2Bg, q3Bg, q4Bg, q5Bg, q6Bg, summaryBg].forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const [currentScreen, setCurrentScreen] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hairType, setHairType] = useState('');
  const [hairNeeds, setHairNeeds] = useState<string[]>([]);
  const [primaryProduct, setPrimaryProduct] = useState('');
  const [hairRoutine, setHairRoutine] = useState<HairRoutine | null>(null);
  const [providedEmail, setProvidedEmail] = useState(false);
  const isEditingRef = useRef(false);
  const submittingRef = useRef(false);
  const showFeedbackRef = useRef(showFeedback);
  const handleSplashStart = () => {
    setCurrentScreen(1);
  };

  const questions = [
    {
      question: '¿Cómo se ve tu cabello el día después de lavarlo?',
      options: ['Graso', 'Normal', 'Seco', 'Mixto']
    },
    {
      question: '¿Cómo reacciona tu cabello al agua?',
      options: [
        'Repele (tarda en mojarse completamente)',
        'Normal (absorbe humedad de forma equilibrada)',
        'Absorbe rápido (se empapa al instante, pero se seca rápido)',
        'Retiene mucha agua (queda pesado y tarda en secar)'
      ]
    },
    {
      question: '¿Cuál es la forma natural de tu cabello?',
      options: ['Lacio', 'Ondulado', 'Ruloso', 'Muy rizado / afro']
    },
    {
      question: '¿Tenés decoloración o reflejos?',
      options: ['Ninguno', 'Parcial', 'Decoloración total', 'Teñida (te tapás canas)']
    },
    {
      question: '¿Cuál es el grosor de tu pelo?',
      options: ['Fino', 'Medio', 'Grueso', 'Muy grueso']
    },
    {
      question: '¿Cómo está tu cuero cabelludo?',
      options: ['Graso', 'Normal', 'Seco', 'Sensible']
    }
  ];

  const handleAnswer = (answer: string, questionIndex: number) => {
    setSelectedOption(answer);
    setShowFeedback(true);

    // 🧪 TEST TEMPORAL FIREBASE — borrar después
    if (questionIndex === 0) {
      console.log('🧪 [TEST] Escribiendo en Firebase...');
      triggerDispenser('TEST_' + answer).then(() => {
        console.log('✅ [TEST] Firebase OK — chequeá Realtime Database en la consola de Firebase');
      }).catch((err) => {
        console.error('❌ [TEST] Firebase ERROR:', err);
      });
    }
    // 🧪 FIN TEST

    setTimeout(() => {
      setAnswers(prev => {
        const newAnswers = [...prev];
        newAnswers[questionIndex] = {
          question: questions[questionIndex].question,
          answer,
          index: questionIndex
        };
        return newAnswers;
      });
      setShowFeedback(false);
      setSelectedOption(null);

      if (isEditingRef.current) {
        isEditingRef.current = false;
        setCurrentScreen(8); // volver al summary
      } else if (questionIndex < questions.length - 1) {
        setCurrentScreen(2 + questionIndex + 1); // siguiente pregunta
      } else {
        setCurrentScreen(8); // summary
      }
    }, 2000);
  };

  const handleBack = () => {
    if (currentScreen > 2 && currentScreen < 8) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleEditAnswer = (questionIndex: number) => {
    isEditingRef.current = true;
    setCurrentScreen(2 + questionIndex);
  };

  const handleFinishDiagnostic = () => {
    const result = calculateHairType(answers);
    setHairType(result.type);
    setHairNeeds(result.needs);
    setPrimaryProduct(getPrimaryProduct(answers));
    setHairRoutine(getHairRoutine(answers));
    setCurrentScreen(9); // results

    // Resetea los fines de carrera y guarda el diagnóstico final en Firebase.
    const updates: Record<string, unknown> = {};
    questions.forEach((_, i) => { updates[`pregunta${i + 1}`] = null; });
    updates.resultado = {
      tipo: result.type,
      necesidades: result.needs,
      respuestas: answers.map(a => a?.answer ?? null),
      timestamp: new Date().toISOString(),
    };
    dbUpdate(dbRef(db, 'diagnostico'), updates);
  };

  const handleEmailSubmit = async (email: string) => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    const result = calculateHairType(answers);
    const routine = hairRoutine ?? getHairRoutine(answers);
    const data = {
      email,
      hairType: result.type,
      needs: result.needs.join(', '),
      answers: answers.map(a => `${a.question}: ${a.answer}`).join(' | '),
      shot: routine.shot.name,
      shotTagline: routine.shot.tagline,
      shotBenefit: routine.shot.benefit,
      shampoo: routine.shampoo.name,
      shampooBenefit: routine.shampoo.benefit,
      treatment: routine.treatment.name,
      treatmentBenefit: routine.treatment.benefit,
      styling: routine.styling.name,
      stylingBenefit: routine.styling.benefit,
      timestamp: new Date().toISOString(),
      submissionId: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
    };
    await saveToGoogleSheets(data);
    sendDiagnosticEmail(data);
    await triggerDispenser(primaryProduct);
    setProvidedEmail(true);
    setCurrentScreen(11); // thank you
  };

  const handleSkipEmail = () => {
    const result = calculateHairType(answers);
    const routine = hairRoutine ?? getHairRoutine(answers);
    const data = {
      email: 'Sin email',
      hairType: result.type,
      needs: result.needs.join(', '),
      answers: answers.map(a => `${a.question}: ${a.answer}`).join(' | '),
      shot: routine.shot.name,
      shotTagline: routine.shot.tagline,
      shotBenefit: routine.shot.benefit,
      shampoo: routine.shampoo.name,
      shampooBenefit: routine.shampoo.benefit,
      treatment: routine.treatment.name,
      treatmentBenefit: routine.treatment.benefit,
      styling: routine.styling.name,
      stylingBenefit: routine.styling.benefit,
      timestamp: new Date().toISOString(),
      submissionId: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
    };
    saveToGoogleSheets(data);
    setProvidedEmail(false);
    setCurrentScreen(11);
  };

  const handleRestart = () => {
    setCurrentScreen(0);
    setAnswers([]);
    setHairType('');
    setHairNeeds([]);
    setPrimaryProduct('');
    setHairRoutine(null);
    setProvidedEmail(false);
  };

  useEffect(() => { showFeedbackRef.current = showFeedback; }, [showFeedback]);

  // Coordina con la ESP32 qué pregunta está activa vía estado/preguntaActiva.
  // Si no estamos en una pantalla de pregunta, señaliza null para que la ESP32 ignore pulsaciones.
  useEffect(() => {
    const questionIndex = currentScreen - 2;
    const estadoRef = dbRef(db, 'estado/preguntaActiva');

    if (questionIndex < 0 || questionIndex >= questions.length) {
      dbSet(estadoRef, null);
      return;
    }

    const preguntaNum = questionIndex + 1;
    const answerRef = dbRef(db, `diagnostico/pregunta${preguntaNum}`);

    // Señaliza a la ESP32 qué pregunta está activa ahora.
    dbSet(estadoRef, preguntaNum);

    // El primer snapshot refleja el valor que ya estaba en Firebase (posiblemente
    // de una pulsación anterior o de un reinicio). Lo ignoramos y limpiamos si había algo.
    let settled = false;
    const unsubscribe = onValue(answerRef, (snapshot) => {
      const value = snapshot.val();

      if (!settled) {
        settled = true;
        if (value !== null) dbSet(answerRef, null); // limpiar valor residual
        return;
      }

      if (typeof value !== 'number' || value < 1 || value > 4) return;
      if (showFeedbackRef.current) return;

      dbSet(answerRef, null); // limpiar para que el mismo botón vuelva a funcionar
      const option = questions[questionIndex].options[value - 1];
      if (option) handleAnswer(option, questionIndex);
    });

    return () => {
      unsubscribe();
      dbSet(estadoRef, null); // al salir de la pregunta, desactivar la ESP32
    };
  }, [currentScreen]);

  // Reset to splash after 2 minutes of inactivity
  useEffect(() => {
    if (currentScreen === 0) return;

    const INACTIVITY_LIMIT = 2 * 60 * 1000;
    let timer = setTimeout(handleRestart, INACTIVITY_LIMIT);

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(handleRestart, INACTIVITY_LIMIT);
    };

    const events = ['mousedown', 'mousemove', 'keydown', 'touchstart', 'scroll'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    return () => {
      clearTimeout(timer);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [currentScreen]);

  const qBgs = [q1Bg, q2Bg, q3Bg, q4Bg, q5Bg, q6Bg];

  const screens = [
    <SplashScreen key="splash" onStart={handleSplashStart} onHowItWorks={() => setCurrentScreen(12)} />,
    <LogoTransition key="logo" onComplete={() => setCurrentScreen(2)} />,
    ...questions.map((q, index) => (
      <QuestionScreen
        key={`question-${index}`}
        question={q.question}
        options={q.options}
        questionNumber={index + 1}
        totalQuestions={questions.length}
        onAnswer={(answer) => handleAnswer(answer, index)}
        onBack={index > 0 ? handleBack : undefined}
        showFeedback={showFeedback}
        selectedOption={selectedOption}
        currentAnswer={answers[index]?.answer}
        bgImage={qBgs[index]}
        onHome={handleRestart}
      />
    )),
    <SummaryScreen
      key="summary"
      answers={answers}
      questions={questions}
      onEdit={handleEditAnswer}
      onFinish={handleFinishDiagnostic}
      bgImage={summaryBg}
      onHome={handleRestart}
    />,
    <ResultsScreen
      key="results"
      hairType={hairType}
      needs={hairNeeds}
      routine={hairRoutine ?? getHairRoutine(answers)}
      onContinue={() => setCurrentScreen(10)}
      onHome={handleRestart}
    />,
    <EmailCaptureScreen
      key="email"
      onSubmit={handleEmailSubmit}
      onSkip={handleSkipEmail}
      onHome={handleRestart}
    />,
    <ThankYouScreen
      key="thanks"
      providedEmail={providedEmail}
      productName={primaryProduct}
      onRestart={handleRestart}
      onHome={handleRestart}
    />,
    <HowItWorksScreen
      key="how-it-works"
      onStart={handleSplashStart}
      onHome={handleRestart}
    />,
  ];

  return (
    <div className="size-full overflow-hidden relative bg-black">
      <AnimatePresence mode="wait">
        {screens[currentScreen]}
      </AnimatePresence>

    </div>
  );
}
