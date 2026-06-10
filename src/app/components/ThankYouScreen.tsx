import { motion } from 'motion/react';
import { Instagram, RefreshCw, Package, Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

const B = {
  primary:      '#3D2B1F',
  primaryLight: '#F5ECE4',
  primaryBorder:'#D4BBA0',
  muted:        '#9b8e85',
};

const IG_URL = 'https://www.instagram.com/perlapli/';

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
      className="size-full flex flex-col bg-white relative overflow-hidden"
    >
      {onHome && !showDispensing && (
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={onHome}
          className="absolute top-10 right-8 z-10 w-10 h-10 flex items-center justify-center rounded-full"
          style={{ background: B.primaryLight }}
        >
          <Home className="w-5 h-5" style={{ color: B.primary }} />
        </motion.button>
      )}

      {/* Dispensing overlay */}
      {showDispensing && providedEmail && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white"
        >
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-24 h-24 rounded-full flex items-center justify-center mb-8"
            style={{ background: B.primaryLight }}
          >
            <Package className="w-12 h-12" style={{ color: B.primary }} />
          </motion.div>
          <p
            className="text-center mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '2rem', color: '#1c1917' }}
          >
            Dispensando tu muestra...
          </p>
          {productName && (
            <p
              className="text-center tracking-widest uppercase text-sm"
              style={{ fontFamily: "'Poppins', sans-serif", color: B.muted }}
            >
              {productName}
            </p>
          )}
          <motion.div
            className="flex gap-2 mt-8"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ background: B.primaryBorder }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* Main content */}
      {!showDispensing && (
        <div className="flex-1 flex flex-col items-center justify-center gap-8 py-12 px-8">
          {/* Top */}
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xs tracking-[0.28em] uppercase mb-4"
              style={{ fontFamily: "'Poppins', sans-serif", color: B.primary }}
            >
              Perla Pli
            </motion.p>

            <motion.h1
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.18 }}
              className="mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '3rem', lineHeight: 1.1, color: '#1c1917' }}
            >
              {providedEmail ? '¡Gracias por participar!' : '¡Gracias!'}
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.38 }}
              className="h-px w-28 mx-auto mb-4"
              style={{ background: B.primaryBorder }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.46 }}
              className="text-sm leading-relaxed"
              style={{ fontFamily: "'Poppins', sans-serif", color: B.muted }}
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
            className="w-full max-w-sm rounded-3xl p-7 text-center bg-white"
            style={{ border: `1px solid ${B.primaryBorder}` }}
          >
            <Instagram className="w-10 h-10 mx-auto mb-3" style={{ color: B.primary }} />
            <p
              className="mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '1.4rem', color: '#1c1917' }}
            >
              Seguinos en Instagram
            </p>
            <p
              className="text-xs mb-5 tracking-widest"
              style={{ fontFamily: "'Poppins', sans-serif", color: B.muted }}
            >
              @perlapli
            </p>

            {/* Real QR code */}
            <div
              className="w-44 h-44 mx-auto rounded-2xl flex items-center justify-center mb-4 p-3"
              style={{ background: '#ffffff', border: `1px solid ${B.primaryBorder}` }}
            >
              <QRCode
                value={IG_URL}
                size={152}
                fgColor={B.primary}
                bgColor="#ffffff"
              />
            </div>

            <p
              className="text-xs tracking-wider"
              style={{ fontFamily: "'Poppins', sans-serif", color: '#d1c8c0' }}
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
            style={{ fontFamily: "'Poppins', sans-serif", color: '#d1c8c0' }}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Volver al inicio
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
