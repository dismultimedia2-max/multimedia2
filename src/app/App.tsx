import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SplashScreen from './components/SplashScreen';
import LogoTransition from './components/LogoTransition';
import QuestionScreen from './components/QuestionScreen';
import SummaryScreen from './components/SummaryScreen';
import ResultsScreen from './components/ResultsScreen';
import EmailCaptureScreen from './components/EmailCaptureScreen';
import ThankYouScreen from './components/ThankYouScreen';
import { saveToGoogleSheets } from './utils/googleSheets';
import { triggerDispenser } from './utils/dispenser';
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
  const [showRipple, setShowRipple] = useState(false);

  const handleSplashStart = () => {
    setShowRipple(true);
    setTimeout(() => setCurrentScreen(1), 420); // swap cuando el círculo cubre la pantalla
    setTimeout(() => setShowRipple(false), 900); // limpieza después del fade out
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
      const newAnswers = [...answers];
      newAnswers[questionIndex] = {
        question: questions[questionIndex].question,
        answer,
        index: questionIndex
      };
      setAnswers(newAnswers);
      setShowFeedback(false);
      setSelectedOption(null);

      if (isEditingRef.current) {
        isEditingRef.current = false;
        setCurrentScreen(8); // volver al summary
      } else if (questionIndex < questions.length - 1) {
        setCurrentScreen(currentScreen + 1);
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
  };

  const handleEmailSubmit = async (email: string) => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    const result = calculateHairType(answers);
    const data = {
      email,
      hairType: result.type,
      needs: result.needs.join(', '),
      answers: answers.map(a => `${a.question}: ${a.answer}`).join(' | '),
      timestamp: new Date().toISOString(),
      submissionId: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
    };
    await saveToGoogleSheets(data);
    await triggerDispenser(primaryProduct);
    setProvidedEmail(true);
    setCurrentScreen(11); // thank you
  };

  const handleSkipEmail = () => {
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

  const qBgs = [q1Bg, q2Bg, q3Bg, q4Bg, q5Bg, q6Bg];

  const screens = [
    <SplashScreen key="splash" onStart={handleSplashStart} />,
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
      />
    )),
    <SummaryScreen
      key="summary"
      answers={answers}
      questions={questions}
      onEdit={handleEditAnswer}
      onFinish={handleFinishDiagnostic}
      bgImage={summaryBg}
    />,
    <ResultsScreen
      key="results"
      hairType={hairType}
      needs={hairNeeds}
      routine={hairRoutine ?? getHairRoutine(answers)}
      onContinue={() => setCurrentScreen(10)}
    />,
    <EmailCaptureScreen
      key="email"
      onSubmit={handleEmailSubmit}
      onSkip={handleSkipEmail}
    />,
    <ThankYouScreen
      key="thanks"
      providedEmail={providedEmail}
      productName={primaryProduct}
      onRestart={handleRestart}
    />
  ];

  return (
    <div className="size-full overflow-hidden relative bg-black">
      <AnimatePresence mode="wait">
        {screens[currentScreen]}
      </AnimatePresence>

      {showRipple && (
        <motion.div
          initial={{ clipPath: 'circle(0% at 50% 50%)', opacity: 1 }}
          animate={{ clipPath: 'circle(150% at 50% 50%)', opacity: [1, 1, 0] }}
          transition={{ duration: 0.85, times: [0, 0.55, 1], ease: [0.22, 0.6, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
        />
      )}
    </div>
  );
}
