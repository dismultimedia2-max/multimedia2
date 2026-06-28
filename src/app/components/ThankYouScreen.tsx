import { motion } from 'motion/react';
import { Instagram, RefreshCw, Package, Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import qrCodeImage from '../../imports/adobe-express-qr-code.png';
import bgImage from '../../imports/bandeja_de_productos.jpg';
import serumVideo from '../../imports/ChatGPT_haceme_un_prompt_para__Kling_26_Pro_75729.mp4';

const B = {
  primary:      '#3D2B1F',
  primaryLight: '#F5ECE4',
  primaryBorder:'#D4BBA0',
  muted:        '#9b8e85',
};

interface ThankYouScreenProps {
  providedEmail: boolean;
  productName: string;
  onRestart: () => void;
  onHome?: () => void;
}

export default function ThankYouScreen({ providedEmail, productName, onRestart, onHome }: ThankYouScreenProps) {
  const [showDispensing, setShowDispensing] = useState(providedEmail);

  useEffect(() => {
    if (providedEmail) {
      const timer = setTimeout(() => setShowDispensing(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [providedEmail]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="size-full flex flex-col relative overflow-hidden"
    >
      {/* Background */}
      <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65 pointer-events-none" />

      {onHome && !showDispensing && (
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={onHome}
          className="absolute top-10 right-8 z-10 w-10 h-10 flex items-center justify-center rounded-full"
          style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.35)', backdropFilter: 'blur(8px)' }}
        >
          <Home className="w-5 h-5 text-white" />
        </motion.button>
      )}

      {/* Dispensing overlay — fullscreen with video background */}
      {showDispensing && providedEmail && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src={serumVideo}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 pointer-events-none" />

          <div className="relative flex flex-col items-center justify-center px-8">
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-28 h-28 rounded-full flex items-center justify-center mb-10"
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(12px)' }}
            >
              <Package className="w-14 h-14 text-white" />
            </motion.div>

            <h1
              className="text-center mb-4 text-white"
              style={{ fontFamily: "'Coolvetica', sans-serif", fontWeight: 400, fontSize: '3.8rem', lineHeight: 1.1 }}
            >
              Dispensando tu muestra...
            </h1>

            {productName && (
              <p
                className="text-center tracking-[0.3em] uppercase mb-8"
                style={{ fontFamily: "'Coolvetica', sans-serif", fontWeight: 400, fontSize: '2.2rem', color: 'rgba(255,255,255,0.8)' }}
              >
                {productName}
              </p>
            )}

            <motion.div
              className="flex gap-3 mt-4"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.6)' }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Main content */}
      {!showDispensing && (
        <div className="relative flex-1 flex flex-col items-center justify-center px-8 py-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-[70%] rounded-3xl p-8 flex flex-col items-center gap-6 text-center"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.35)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
          >
            {/* Top */}
            <div className="text-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-xs tracking-[0.28em] uppercase mb-4"
                style={{ color: 'rgba(255,255,255,0.75)' }}
              >
                <span style={{ fontFamily: "'Andale Mono MT', monospace", fontWeight: 400, letterSpacing: '0.4em' }}>PERLA</span>
                <span style={{ fontFamily: "'Futura Cyrillic', sans-serif", fontWeight: 300, fontStyle: 'oblique', letterSpacing: '0.1em' }}>PLI.</span>
              </motion.p>

              <motion.h1
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.18 }}
                className="mb-4 text-white"
                style={{ fontFamily: "'Coolvetica', sans-serif", fontWeight: 400, fontSize: '3rem', lineHeight: 1.1 }}
              >
                {providedEmail ? '¡Gracias por participar!' : '¡Gracias!'}
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.38 }}
                className="h-px w-28 mx-auto mb-4"
                style={{ background: 'rgba(255,255,255,0.35)' }}
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.46 }}
                className="text-sm leading-relaxed"
                style={{ fontFamily: "'Poppins', sans-serif", color: 'rgba(255,255,255,0.75)' }}
              >
                {providedEmail
                  ? 'Retirá tu muestra de regalo en el stand.\nTe enviamos más info a tu email.'
                  : 'Esperamos que hayas disfrutado tu diagnóstico capilar.'}
              </motion.p>
            </div>

            {/* Instagram + QR */}
            <motion.div
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.48 }}
              className="w-full rounded-2xl p-6 text-center"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)' }}
            >
              <Instagram className="w-10 h-10 mx-auto mb-3 text-white" />
              <p
                className="mb-1 text-white"
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '1.4rem' }}
              >
                Seguinos en Instagram
              </p>
              <p
                className="text-xs mb-5 tracking-widest"
                style={{ fontFamily: "'Poppins', sans-serif", color: 'rgba(255,255,255,0.6)' }}
              >
                @perlapli
              </p>

              <div
                className="w-44 h-44 mx-auto rounded-2xl flex items-center justify-center mb-4 p-3"
                style={{ background: 'white' }}
              >
                <img src={qrCodeImage} alt="QR Instagram" className="w-full h-full object-contain" />
              </div>

              <p
                className="text-xs tracking-wider"
                style={{ fontFamily: "'Poppins', sans-serif", color: 'rgba(255,255,255,0.45)' }}
              >
                Escaneá el código QR
              </p>
            </motion.div>

            {/* Restart */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onRestart}
              className="flex items-center gap-2 text-xs tracking-widest uppercase transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif", color: 'rgba(255,255,255,0.55)' }}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Volver al inicio
            </motion.button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
