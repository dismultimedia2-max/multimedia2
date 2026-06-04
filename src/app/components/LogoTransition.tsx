import { motion } from 'motion/react';
import { useEffect } from 'react';
import logoBg from '../../imports/ChatGPT_Image_May_23__2026__05_13_09_PM.png';

interface LogoTransitionProps {
  onComplete: () => void;
}

export default function LogoTransition({ onComplete }: LogoTransitionProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="size-full flex items-center justify-center overflow-hidden relative"
    >
      {/* Background image */}
      <img src={logoBg} alt="" className="absolute inset-0 w-full h-full object-cover" />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />

      {/* Horizontal lines */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.35, ease: 'easeOut' }}
        className="absolute top-1/2 left-0 right-0 h-px origin-center"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.25), transparent)', transform: 'translateY(-3.5rem)' }}
      />
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.45, ease: 'easeOut' }}
        className="absolute top-1/2 left-0 right-0 h-px origin-center"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.25), transparent)', transform: 'translateY(3.5rem)' }}
      />

      {/* Logo */}
      <div className="relative z-10 text-center px-8">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.2em' }}
          animate={{ opacity: 1, letterSpacing: '0.45em' }}
          transition={{ duration: 1.1, delay: 0.25 }}
          className="uppercase mb-6"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)' }}
        >
          Diagnóstico Capilar
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: 'easeOut' }}
          className="mb-4"
          style={{ fontSize: '5rem', lineHeight: 1, color: 'white', whiteSpace: 'nowrap' }}
        >
          <span style={{ fontFamily: "'Andale Mono MT', monospace", fontWeight: 400, letterSpacing: '0.4em' }}>PERLA</span>
          <span style={{ fontFamily: "'Futura Cyrillic', sans-serif", fontWeight: 300, fontStyle: 'oblique', letterSpacing: '0.1em' }}>PLI.</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.95, ease: 'easeOut' }}
          className="h-px w-40 mx-auto"
          style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)' }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="mt-6 tracking-[0.28em] uppercase"
          style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.3rem', fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}
        >
          Tu rutina comienza...
        </motion.p>
      </div>
    </motion.div>
  );
}
