import { useState, useRef } from 'react';
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
import q1Bg from '../imports/mascarillas.png';
import q2Bg from '../imports/producto_con_flores.png';
import q3Bg from '../imports/naranjas_vertical.png';
import q4Bg from '../imports/pantalon_a_rayas_vertical.png';
import q5Bg from '../imports/productos_ducha_vertical.png';
import q6Bg from '../imports/serum_vertical.png';
import summaryBg from '../imports/aurora_bg.jpg';

export type Answer = {
  question: string;
  answer: string;
  index: number;
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hairType, setHairType] = useState('');
  const [hairNeeds, setHairNeeds] = useState<string[]>([]);
  const [primaryProduct, setPrimaryProduct] = useState('');
  const [hairRoutine, setHairRoutine] = useState<HairRoutine | null>(null);
  const [providedEmail, setProvidedEmail] = useState(false);
  const submittingRef = useRef(false);
  const [showDrops, setShowDrops] = useState(false);
  const [dropsVisible, setDropsVisible] = useState(true);

  const handleSplashStart = () => {
    setDropsVisible(true);
    setShowDrops(true);
    setTimeout(() => setCurrentScreen(1), 550);   // swap cuando los drops ya cubren la pantalla
    setTimeout(() => setDropsVisible(false), 700); // empezar a revelar LogoTransition
    setTimeout(() => { setShowDrops(false); setDropsVisible(true); }, 1300); // limpieza
  };

  const DROPS = [
    { id: 0,  x: 18,  y: 6,  delay: 0 },
    { id: 1,  x: 74,  y: 3,  delay: 0.07 },
    { id: 2,  x: 48,  y: 20, delay: 0.14 },
    { id: 3,  x: 8,   y: 40, delay: 0.04 },
    { id: 4,  x: 85,  y: 35, delay: 0.11 },
    { id: 5,  x: 55,  y: 50, delay: 0.18 },
    { id: 6,  x: 25,  y: 60, delay: 0.08 },
    { id: 7,  x: 70,  y: 68, delay: 0.16 },
    { id: 8,  x: 10,  y: 80, delay: 0.05 },
    { id: 9,  x: 88,  y: 78, delay: 0.21 },
    { id: 10, x: 42,  y: 88, delay: 0.13 },
  ];

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

      if (questionIndex < questions.length - 1) {
        setCurrentScreen(currentScreen + 1);
      } else {
        setCurrentScreen(8); // summary
      }
    }, 2800);
  };

  const handleBack = () => {
    if (currentScreen > 2 && currentScreen < 8) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleEditAnswer = (questionIndex: number) => {
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

      {showDrops && (
        <motion.div
          animate={{ opacity: dropsVisible ? 1 : 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ position: 'fixed', inset: 0, zIndex: 100 }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: '#0a0a0a',
              filter: 'blur(14px) contrast(22)',
              willChange: 'filter',
            }}
          >
            {DROPS.map(drop => (
              <motion.div
                key={drop.id}
                initial={{ scale: 0, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{
                  delay: drop.delay * 0.5,
                  duration: 0.42,
                  ease: [0.22, 1.1, 0.36, 1],
                }}
                style={{
                  position: 'absolute',
                  left: `${drop.x}%`,
                  top: `${drop.y}%`,
                  width: 1800,
                  height: 1800,
                  marginLeft: -900,
                  marginTop: -900,
                  borderRadius: '50%',
                  background: '#ffffff',
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
