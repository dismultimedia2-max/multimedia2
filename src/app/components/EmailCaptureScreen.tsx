import { motion } from 'motion/react';
import { Mail, ArrowRight, Home } from 'lucide-react';
import { useState } from 'react';
import bgImage from '../../imports/productos_ducha_vertical-1.jpg';

const B = {
  primary:      '#3D2B1F',
  primaryLight: '#F5ECE4',
  primaryBorder:'#D4BBA0',
  muted:        '#9b8e85',
};

interface EmailCaptureScreenProps {
  onSubmit: (email: string) => void;
  onSkip: () => void;
  onHome?: () => void;
}

export default function EmailCaptureScreen({ onSubmit, onSkip, onHome }: EmailCaptureScreenProps) {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [focused, setFocused] = useState(false);

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(validateEmail(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onSubmit(email);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="size-full flex flex-col relative overflow-hidden"
    >
      {/* Background image */}
      <img
        src={bgImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 pointer-events-none" />

      {onHome && (
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

      <div className="relative flex-1 flex flex-col items-center justify-center px-12">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 180 }}
          className="w-24 h-24 rounded-full flex items-center justify-center mb-8"
          style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(12px)' }}
        >
          <Mail className="w-11 h-11 text-white" />
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.18 }}
          className="text-center mb-12"
        >
          <h1
            className="text-white mb-4"
            style={{ fontFamily: "'Coolvetica', sans-serif", fontWeight: 400, fontSize: '4.2rem', lineHeight: 1.15 }}
          >
            Llevate una<br />muestra de regalo
          </h1>
          <p
            className="text-xl leading-relaxed"
            style={{ fontFamily: "'Poppins', sans-serif", color: 'rgba(255,255,255,0.85)' }}
          >
            Dejanos tu email y recibís una muestra<br />del producto ideal para tu tipo de pelo
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="w-full max-w-xl"
        >
          <div
            className="relative rounded-full overflow-hidden mb-5 transition-all"
            style={{
              border: `1px solid ${focused || isValid ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)'}`,
              background: focused ? 'white' : 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: focused ? B.primary : (isValid ? 'white' : 'rgba(255,255,255,0.5)') }} />
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="tu@email.com"
              className={`w-full pl-14 pr-6 py-5 bg-transparent outline-none text-base ${focused ? 'placeholder:text-black/30' : 'placeholder:text-white/40'}`}
              style={{ fontFamily: "'Poppins', sans-serif", color: focused ? '#1c1917' : 'white' }}
            />
          </div>

          <motion.button
            type="submit"
            disabled={!isValid}
            whileHover={isValid ? { scale: 1.02 } : {}}
            whileTap={isValid ? { scale: 0.98 } : {}}
            className={`w-full max-w-md mx-auto py-4 rounded-full flex items-center justify-center gap-2 text-sm uppercase tracking-widest transition-all mb-5 ${isValid ? '' : 'opacity-50'}`}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              background: 'rgba(255,255,255,0.9)',
              color: B.primary,
              cursor: isValid ? 'pointer' : 'not-allowed',
            }}
          >
            Recibir mi muestra
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.form>
      </div>

      {/* Skip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="relative pb-12 flex justify-center"
      >
        <button
          onClick={onSkip}
          className="px-6 py-3 rounded-full text-sm tracking-widest uppercase transition-all"
          style={{
            fontFamily: "'Poppins', sans-serif",
            color: 'rgba(255,255,255,0.7)',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          Continuar sin dejar mi email
        </button>
      </motion.div>
    </motion.div>
  );
}