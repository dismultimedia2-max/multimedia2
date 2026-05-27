import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Droplets, Wind, Scissors } from 'lucide-react';
import type { HairRoutine } from '../utils/hairAnalysis';
import bgImage from '../../imports/ephyra_bg.jpg';

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
  const routineSteps = [routine.shampoo, routine.treatment, routine.styling];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="size-full relative overflow-hidden"
    >
      {/* Background */}
      <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75 pointer-events-none" />

      {/* Scrollable content */}
      <div className="relative size-full flex flex-col overflow-y-auto">

      {/* Header */}
      <div className="px-8 pt-10 pb-5">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 mb-3"
        >
          <Sparkles className="w-4 h-4 text-white/70" />
          <p className="text-xs tracking-[0.28em] uppercase" style={{ fontFamily: "'Poppins', sans-serif", color: 'rgba(255,255,255,0.65)' }}>
            Tu diagnóstico
          </p>
        </motion.div>

        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.18 }}
          className="mb-4 text-white"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '2.4rem', lineHeight: 1.1 }}
        >
          {hairType}
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-2">
          {needs.map((need, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs"
              style={{ fontFamily: "'Poppins', sans-serif", background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.35)', color: 'white', backdropFilter: 'blur(8px)' }}
            >
              {need}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="px-8 mb-5"><div className="h-px" style={{ background: 'rgba(255,255,255,0.15)' }} /></div>

      {/* === SHOT FEATURED === */}
      <div className="px-6 mb-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.32 }}
          className="text-xs tracking-[0.22em] uppercase mb-3"
          style={{ fontFamily: "'Poppins', sans-serif", color: 'rgba(255,255,255,0.55)' }}
        >
          Tu muestra de regalo
        </motion.p>

        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.13)', border: '1px solid rgba(255,255,255,0.35)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
        >
          <div className="px-6 pt-6 pb-5">
            <p className="text-xs tracking-widest uppercase mb-1" style={{ fontFamily: "'Poppins', sans-serif", color: 'rgba(255,255,255,0.5)' }}>
              Perla Pli · Shot
            </p>
            <h2 className="text-white" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '2.8rem', lineHeight: 1.05 }}>
              {routine.shot.name}
            </h2>
            <p className="mt-1 text-sm text-white" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}>
              {routine.shot.tagline}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif", color: 'rgba(255,255,255,0.7)' }}>
              {routine.shot.benefit}
            </p>
          </div>
          <div className="h-px mx-6" style={{ background: 'rgba(255,255,255,0.2)' }} />
          <div className="px-6 py-3">
            <p className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: 'rgba(255,255,255,0.45)' }}>
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
          style={{ fontFamily: "'Poppins', sans-serif", color: 'rgba(255,255,255,0.55)' }}
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
              className="flex items-center gap-4 rounded-2xl px-4 py-4"
              style={{ background: 'rgba(255,255,255,0.11)', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white/80"
                style={{ background: 'rgba(255,255,255,0.15)' }}
              >
                {STEP_ICONS[index]}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs mb-0.5 uppercase tracking-wider" style={{ fontFamily: "'Poppins', sans-serif", color: 'rgba(255,255,255,0.5)' }}>
                  {STEP_LABELS[index]}
                </p>
                <p className="text-white" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: '1.3rem' }}>
                  {item.name}
                </p>
                <p className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: 'rgba(255,255,255,0.65)' }}>
                  {item.benefit}
                </p>
              </div>

              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm text-white/70"
                style={{ background: 'rgba(255,255,255,0.15)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
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
          className="w-full py-4 rounded-full flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, background: 'rgba(255,255,255,0.9)', color: B.primary }}
        >
          Continuar
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
      </div>
    </motion.div>
  );
}
