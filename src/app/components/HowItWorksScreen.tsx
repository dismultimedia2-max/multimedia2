import { motion } from 'motion/react';
import { Home, ArrowRight } from 'lucide-react';
import bgImage from '../../imports/ChatGPT_Image_May_23__2026__05_13_09_PM.jpg';

const B = {
  primary: '#3D2B1F',
};

const steps = [
  {
    n: 1,
    text: 'Presioná "Comenzar".',
  },
  {
    n: 2,
    text: 'Leé la pregunta y las opciones de respuesta.',
  },
  {
    n: 3,
    text: 'Elegí tu respuesta colocando la pelota de madera en el agujero correspondiente.',
  },
  {
    n: 4,
    text: 'Repetí el proceso hasta responder todas las preguntas.',
  },
  {
    n: 5,
    text: 'Al finalizar, vas a poder revisar y modificar tus respuestas antes de confirmar el diagnóstico.',
  },
  {
    n: 6,
    text: 'Recibirás tu recomendación personalizada de productos Perla Pli según tu tipo de pelo.',
  },
  {
    n: 7,
    text: 'Ingresá tu correo electrónico para recibir tu diagnóstico por mail y obtener una muestra gratis.',
  },
];

interface HowItWorksScreenProps {
  onStart: () => void;
  onHome: () => void;
}

export default function HowItWorksScreen({ onStart, onHome }: HowItWorksScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.5 }}
      className="relative size-full overflow-hidden"
    >
      {/* Background image */}
      <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/75 pointer-events-none" />

      {/* Home button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={onHome}
        className="absolute top-10 right-8 z-10 w-10 h-10 flex items-center justify-center rounded-full"
        style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.35)', backdropFilter: 'blur(8px)' }}
      >
        <Home className="w-5 h-5 text-white" />
      </motion.button>

      {/* Scrollable content */}
      <div className="relative size-full flex flex-col">
        <div className="flex-1 flex flex-col items-center px-8 pt-16 pb-6 overflow-y-auto">

          {/* Header */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1
              className="text-white mb-3"
              style={{ fontFamily: "'Coolvetica', sans-serif", fontWeight: 400, fontSize: '3.2rem', lineHeight: 1.1 }}
            >
              ¿Cómo funciona?
            </h1>
            <p
              className="leading-relaxed mx-auto"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: '1.25rem',
                color: 'rgba(255,255,255,0.8)',
                maxWidth: '44ch',
              }}
            >
              Descubrí cuál es el producto ideal para tu tipo de pelo realizando este breve diagnóstico.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="w-full space-y-5 mb-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.07 }}
                className="flex items-center gap-4 rounded-2xl px-5 py-4"
                style={{
                  background: 'rgba(255,255,255,0.13)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                }}
              >
                {/* Step number badge */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.9)' }}
                >
                  <span
                    style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '1rem', color: B.primary }}
                  >
                    {step.n}
                  </span>
                </div>

                {/* Step text */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-white leading-snug"
                    style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '1.15rem' }}
                  >
                    {step.text}
                  </p>
                  {step.sub && (
                    <p
                      className="mt-1 leading-relaxed"
                      style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)' }}
                    >
                      {step.sub}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Thanks message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center mb-8"
            style={{ fontFamily: "'Coolvetica', sans-serif", fontWeight: 400, fontSize: '2rem', color: 'rgba(255,255,255,0.85)' }}
          >
            ¡Muchas gracias!
          </motion.p>

        </div>

        {/* CTA — pinned to bottom like all other screens */}
        <div className="relative px-8 pb-10 pt-4 flex justify-center flex-shrink-0">
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
            className="w-full max-w-md py-4 rounded-full flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              background: 'rgba(255,255,255,0.9)',
              color: B.primary,
            }}
          >
            Comenzar
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
