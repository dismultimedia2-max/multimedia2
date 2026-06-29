import { motion } from 'motion/react';
import splashVideo from '../../imports/ChatGPT_haceme_un_prompt_para__Kling_26_Pro_75729.mp4';

interface SplashScreenProps {
  onStart: () => void;
  onHowItWorks: () => void;
}

export default function SplashScreen({ onStart, onHowItWorks }: SplashScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.6, ease: [0.22, 0.03, 0.26, 1] }}
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
          style={{ fontSize: '5rem', lineHeight: 1, whiteSpace: 'nowrap' }}
        >
          <span style={{ fontFamily: "'Andale Mono MT', monospace", fontWeight: 400, letterSpacing: '0.4em' }}>PERLA</span>
          <span style={{ fontFamily: "'Futura Cyrillic', sans-serif", fontWeight: 300, fontStyle: 'oblique', letterSpacing: '0.1em' }}>PLI.</span>
        </h1>
        <p
          className="text-white/80 tracking-[0.28em] uppercase"
          style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.2rem' }}
        >
          Diagnóstico Capilar Personalizado
        </p>
      </motion.div>

      {/* Buttons — bottom */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-5">
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="w-96 py-7 border border-white/60 text-white rounded-full backdrop-blur-sm bg-white/10 tracking-widest text-xl uppercase transition-colors hover:bg-white/20"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Comenzar
        </motion.button>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          whileTap={{ scale: 0.97 }}
          onClick={onHowItWorks}
          className="text-white tracking-widest text-sm uppercase pb-0.5"
          style={{
            fontFamily: "'Poppins', sans-serif",
            borderBottom: '1px solid white',
            background: 'none',
          }}
        >
          Cómo funciona
        </motion.button>
      </div>
    </motion.div>
  );
}
