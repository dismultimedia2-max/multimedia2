import { motion } from 'motion/react';
import splashVideo from '../../imports/ChatGPT_haceme_un_prompt_para__Kling_26_Pro_75729.mp4';

interface SplashScreenProps {
  onStart: () => void;
}

export default function SplashScreen({ onStart }: SplashScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative size-full overflow-hidden"
    >
      {/* Full-screen background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={splashVideo}
      />

      {/* Dark gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

      {/* Brand Text — absolutely centered */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
      >
        <h1
          className="mb-5 text-white"
          style={{ fontSize: '7rem', lineHeight: 1 }}
        >
          <span style={{ fontFamily: "'Andale Mono MT', monospace", fontWeight: 400, letterSpacing: '0.05em' }}>PERLA </span>
          <span style={{ fontFamily: "'Futura Cyrillic', sans-serif", fontWeight: 300, fontStyle: 'oblique', letterSpacing: '0.1em' }}>PLI</span>
        </h1>
        <p
          className="text-white/80 tracking-[0.28em] uppercase"
          style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.2rem' }}
        >
          Diagnóstico Capilar Personalizado
        </p>
      </motion.div>

      {/* Start Button — bottom, above bottle label */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 w-96 py-7 border border-white/60 text-white rounded-full backdrop-blur-sm bg-white/10 tracking-widest text-xl uppercase transition-colors hover:bg-white/20"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        Comenzar
      </motion.button>
    </motion.div>
  );
}
