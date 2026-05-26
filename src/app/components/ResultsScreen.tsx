import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Droplets, Wind, Scissors } from 'lucide-react';
import type { HairRoutine } from '../utils/hairAnalysis';

const B = {
  primary:      '#3D2B1F',
  primaryLight: '#F5ECE4',
  primaryBorder:'#D4BBA0',
  muted:        '#9b8e85',
};

interface ResultsScreenProps {
  hairType: string;
  needs: string[];
  routine: HairRoutine;
  onContinue: () => void;
}

const STEP_ICONS = [
  <Droplets className="w-4 h-4" />,
  <Sparkles className="w-4 h-4" />,
  <Wind className="w-4 h-4" />,
];
const STEP_LABELS = ['Limpieza', 'Nutrición', 'Peinado'];

export default function ResultsScreen({ hairType, needs, routine, onContinue }: ResultsScreenProps) {
  const routineSteps = [
    routine.shampoo,
    routine.treatment,
    routine.styling,
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="size-full flex flex-col bg-white overflow-y-auto"
    >
      {/* Header */}
      <div className="px-8 pt-10 pb-5">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 mb-3"
        >
          <Sparkles className="w-4 h-4" style={{ color: B.primary }} />
          <p className="text-xs tracking-[0.28em] uppercase" style={{ fontFamily: "'Poppins', sans-serif", color: B.primary }}>
            Tu diagnóstico
          </p>
        </motion.div>

        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.18 }}
          className="mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '2.4rem', lineHeight: 1.1, color: '#1c1917' }}
        >
          {hairType}
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-2">
          {needs.map((need, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs"
              style={{ fontFamily: "'Poppins', sans-serif", background: B.primaryLight, border: `1px solid ${B.primaryBorder}`, color: B.primary }}
            >
              {need}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="px-8 mb-5"><div className="h-px" style={{ background: '#ede8e4' }} /></div>

      {/* === SHOT FEATURED === */}
      <div className="px-6 mb-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.32 }}
          className="text-xs tracking-[0.22em] uppercase mb-3"
          style={{ fontFamily: "'Poppins', sans-serif", color: B.muted }}
        >
          Tu muestra de regalo
        </motion.p>

        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl overflow-hidden"
          style={{ background: B.primaryLight, border: `1.5px solid ${B.primaryBorder}` }}
        >
          <div className="px-6 pt-6 pb-5">
            <p
              className="text-xs tracking-widest uppercase mb-1"
              style={{ fontFamily: "'Poppins', sans-serif", color: B.muted }}
            >
              Perla Pli · Shot
            </p>
            <h2
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '2.8rem', lineHeight: 1.05, color: B.primary }}
            >
              {routine.shot.name}
            </h2>
            <p
              className="mt-1 text-sm"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, color: B.primary }}
            >
              {routine.shot.tagline}
            </p>
            <p
              className="mt-1.5 text-sm leading-relaxed"
              style={{ fontFamily: "'Poppins', sans-serif", color: B.muted }}
            >
              {routine.shot.benefit}
            </p>
          </div>
          <div className="h-px mx-6" style={{ background: B.primaryBorder + '55' }} />
          <div className="px-6 py-3">
            <p className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: B.muted }}>
              Retirá tu muestra en el stand · Dispensado automáticamente
            </p>
          </div>
        </motion.div>
      </div>

      {/* === RUTINA COMPLETA === */}
      <div className="px-6 mb-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs tracking-[0.22em] uppercase mb-3"
          style={{ fontFamily: "'Poppins', sans-serif", color: B.muted }}
        >
          Tu rutina completa Perla Pli
        </motion.p>

        <div className="space-y-3">
          {routineSteps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.58 + index * 0.1 }}
              className="flex items-center gap-4 rounded-2xl px-4 py-4 bg-white"
              style={{ border: '1px solid rgba(0,0,0,0.07)' }}
            >
              {/* Step icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: B.primaryLight, color: B.primary }}
              >
                {STEP_ICONS[index]}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs mb-0.5 uppercase tracking-wider" style={{ fontFamily: "'Poppins', sans-serif", color: B.muted }}>
                  {STEP_LABELS[index]}
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: '1.3rem', color: '#1c1917' }}>
                  {item.name}
                </p>
                <p className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: B.muted }}>
                  {item.benefit}
                </p>
              </div>

              {/* Step number */}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm"
                style={{ background: B.primaryLight, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: B.primary }}
              >
                {index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-12 mt-auto">
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onContinue}
          className="w-full py-4 rounded-full flex items-center justify-center gap-2 text-sm uppercase tracking-widest text-white"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, background: B.primary }}
        >
          Continuar
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}
