import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Check } from 'lucide-react';

// Brand palette
const B = {
  primary:      '#3D2B1F',
  primaryLight: '#F5ECE4',
  primaryBorder:'#D4BBA0',
  primaryDark:  '#2C1A0E',
  muted:        '#9b8e85',
};

interface QuestionScreenProps {
  question: string;
  options: string[];
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: string) => void;
  onBack?: () => void;
  showFeedback: boolean;
  selectedOption: string | null;
  currentAnswer?: string;
  bgImage?: string;
}

function OptionIllustration({ questionNumber, option, color }: { questionNumber: number; option: string; color: string }) {
  const first = option.split(' ')[0].toLowerCase();
  const key = `q${questionNumber}_${first}`;
  const s = color;

  const illustrations: Record<string, JSX.Element> = {
    q1_graso: (
      <svg viewBox="0 0 48 48" fill="none"><path d="M14 8 C14 20 18 28 16 40" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><path d="M24 6 C24 18 28 26 26 40" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><path d="M34 8 C34 20 38 28 36 40" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><circle cx="16" cy="22" r="2.5" fill={s} opacity="0.6"/><circle cx="26" cy="20" r="2" fill={s} opacity="0.6"/><circle cx="36" cy="24" r="2.5" fill={s} opacity="0.6"/></svg>
    ),
    q1_normal: (
      <svg viewBox="0 0 48 48" fill="none"><path d="M14 8 L14 40" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><path d="M24 6 L24 40" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><path d="M34 8 L34 40" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><path d="M10 14 L38 14" stroke={s} strokeWidth="1.2" strokeLinecap="round" opacity="0.3"/></svg>
    ),
    q1_seco: (
      <svg viewBox="0 0 48 48" fill="none"><path d="M14 8 L12 24 L16 28 L14 40" stroke={s} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M24 6 L26 22 L22 26 L24 40" stroke={s} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M34 8 L32 24 L36 28 L34 40" stroke={s} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 40 L16 44" stroke={s} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/><path d="M22 40 L26 44" stroke={s} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/><path d="M32 40 L36 44" stroke={s} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/></svg>
    ),
    q1_mixto: (
      <svg viewBox="0 0 48 48" fill="none"><path d="M14 8 L14 40" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><circle cx="14" cy="22" r="2.5" fill={s} opacity="0.5"/><path d="M24 6 L24 40" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><path d="M34 8 L32 22 L36 26 L34 40" stroke={s} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M32 40 L36 44" stroke={s} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/></svg>
    ),
    q2_repele: (
      <svg viewBox="0 0 48 48" fill="none"><path d="M24 8 L20 16 Q16 22 20 26 Q24 30 20 38" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><path d="M34 18 Q38 22 34 24" stroke={s} strokeWidth="2" strokeLinecap="round"/><path d="M38 16 L42 13" stroke={s} strokeWidth="2" strokeLinecap="round"/><path d="M38 27 L42 30" stroke={s} strokeWidth="2" strokeLinecap="round"/><ellipse cx="38" cy="21" rx="5" ry="7" stroke={s} strokeWidth="2" opacity="0.5"/></svg>
    ),
    q2_normal: (
      <svg viewBox="0 0 48 48" fill="none"><path d="M20 8 L20 40" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><path d="M28 8 L28 40" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><ellipse cx="36" cy="22" rx="4" ry="6" fill={s} opacity="0.25"/><ellipse cx="36" cy="22" rx="4" ry="6" stroke={s} strokeWidth="1.5"/><path d="M36 28 L34 36" stroke={s} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/><path d="M30 22 L36 22" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 1" opacity="0.4"/></svg>
    ),
    q2_absorbe: (
      <svg viewBox="0 0 48 48" fill="none"><path d="M20 8 L20 40" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><ellipse cx="36" cy="16" rx="4" ry="6" stroke={s} strokeWidth="1.5" opacity="0.5"/><path d="M32 20 L20 24" stroke={s} strokeWidth="2" strokeLinecap="round"/><path d="M25 20 L20 24 L25 28" stroke={s} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    q2_retiene: (
      <svg viewBox="0 0 48 48" fill="none"><path d="M20 6 C20 14 22 20 20 30 C19 36 18 38 18 42" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><path d="M28 6 C28 14 30 20 28 30 C27 36 26 38 26 42" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><ellipse cx="14" cy="30" rx="3" ry="4.5" fill={s} opacity="0.3"/><ellipse cx="14" cy="30" rx="3" ry="4.5" stroke={s} strokeWidth="1.5"/><ellipse cx="34" cy="28" rx="3" ry="4.5" fill={s} opacity="0.3"/><ellipse cx="34" cy="28" rx="3" ry="4.5" stroke={s} strokeWidth="1.5"/></svg>
    ),
    q3_lacio: (
      <svg viewBox="0 0 48 48" fill="none"><line x1="14" y1="8" x2="14" y2="42" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><line x1="24" y1="6" x2="24" y2="42" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><line x1="34" y1="8" x2="34" y2="42" stroke={s} strokeWidth="2.5" strokeLinecap="round"/></svg>
    ),
    q3_ondulado: (
      <svg viewBox="0 0 48 48" fill="none"><path d="M14 8 Q11 16 14 22 Q17 28 14 36 Q12 40 14 44" stroke={s} strokeWidth="2.5" strokeLinecap="round" fill="none"/><path d="M24 6 Q21 14 24 20 Q27 26 24 34 Q22 38 24 44" stroke={s} strokeWidth="2.5" strokeLinecap="round" fill="none"/><path d="M34 8 Q31 16 34 22 Q37 28 34 36 Q32 40 34 44" stroke={s} strokeWidth="2.5" strokeLinecap="round" fill="none"/></svg>
    ),
    q3_ruloso: (
      <svg viewBox="0 0 48 48" fill="none"><path d="M14 8 C18 8 20 12 18 16 C16 20 12 20 12 16 C12 12 16 10 18 14 C20 18 18 24 14 28 C10 32 12 38 14 42" stroke={s} strokeWidth="2.5" strokeLinecap="round" fill="none"/><path d="M30 8 C34 8 36 12 34 16 C32 20 28 20 28 16 C28 12 32 10 34 14 C36 18 34 24 30 28 C26 32 28 38 30 42" stroke={s} strokeWidth="2.5" strokeLinecap="round" fill="none"/></svg>
    ),
    q3_muy: (
      <svg viewBox="0 0 48 48" fill="none"><path d="M12 8 L16 14 L12 20 L16 26 L12 32 L16 38 L12 44" stroke={s} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M24 6 L28 12 L24 18 L28 24 L24 30 L28 36 L24 44" stroke={s} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M36 8 L32 14 L36 20 L32 26 L36 32 L32 38 L36 44" stroke={s} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    q4_ninguno: (
      <svg viewBox="0 0 48 48" fill="none"><path d="M24 8 C24 8 14 18 14 28 C14 34 18 40 24 40 C30 40 34 34 34 28 C34 18 24 8 24 8Z" stroke={s} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M24 22 L24 34" stroke={s} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/><path d="M20 26 L24 22 L28 26" stroke={s} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/></svg>
    ),
    q4_parcial: (
      <svg viewBox="0 0 48 48" fill="none"><path d="M14 8 L14 42" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><path d="M22 8 L22 42" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><path d="M30 8 L30 42" stroke={s} strokeWidth="4.5" strokeLinecap="round" opacity="0.35"/><path d="M38 8 L38 42" stroke={s} strokeWidth="2.5" strokeLinecap="round"/></svg>
    ),
    q4_decoloración: (
      <svg viewBox="0 0 48 48" fill="none"><path d="M24 6 L26 18 L36 14 L28 22 L38 26 L26 26 L28 38 L24 28 L20 38 L22 26 L10 26 L20 22 L12 14 L22 18 Z" stroke={s} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={s} fillOpacity="0.15"/></svg>
    ),
    q4_teñida: (
      <svg viewBox="0 0 48 48" fill="none"><path d="M14 8 L14 42" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><path d="M24 8 L24 42" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><path d="M34 8 L34 42" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><rect x="10" y="8" width="28" height="12" rx="3" fill={s} fillOpacity="0.2" stroke={s} strokeWidth="1.5"/></svg>
    ),
    q5_fino: (
      <svg viewBox="0 0 48 48" fill="none"><line x1="24" y1="8" x2="24" y2="42" stroke={s} strokeWidth="1.5" strokeLinecap="round"/><line x1="20" y1="10" x2="20" y2="40" stroke={s} strokeWidth="1" strokeLinecap="round" opacity="0.4"/><line x1="28" y1="10" x2="28" y2="40" stroke={s} strokeWidth="1" strokeLinecap="round" opacity="0.4"/></svg>
    ),
    q5_medio: (
      <svg viewBox="0 0 48 48" fill="none"><line x1="18" y1="8" x2="18" y2="42" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><line x1="30" y1="8" x2="30" y2="42" stroke={s} strokeWidth="2.5" strokeLinecap="round"/></svg>
    ),
    q5_grueso: (
      <svg viewBox="0 0 48 48" fill="none"><line x1="17" y1="8" x2="17" y2="42" stroke={s} strokeWidth="4" strokeLinecap="round"/><line x1="31" y1="8" x2="31" y2="42" stroke={s} strokeWidth="4" strokeLinecap="round"/></svg>
    ),
    q5_muy: (
      <svg viewBox="0 0 48 48" fill="none"><line x1="14" y1="8" x2="14" y2="42" stroke={s} strokeWidth="5" strokeLinecap="round"/><line x1="24" y1="8" x2="24" y2="42" stroke={s} strokeWidth="5" strokeLinecap="round"/><line x1="34" y1="8" x2="34" y2="42" stroke={s} strokeWidth="5" strokeLinecap="round"/></svg>
    ),
    q6_graso: (
      <svg viewBox="0 0 48 48" fill="none"><path d="M8 32 Q24 20 40 32" stroke={s} strokeWidth="2" strokeLinecap="round" fill="none"/><ellipse cx="18" cy="22" rx="3" ry="4.5" fill={s} opacity="0.3"/><ellipse cx="18" cy="22" rx="3" ry="4.5" stroke={s} strokeWidth="1.5"/><path d="M18 26.5 L18 34" stroke={s} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/><ellipse cx="30" cy="20" rx="3" ry="4.5" fill={s} opacity="0.3"/><ellipse cx="30" cy="20" rx="3" ry="4.5" stroke={s} strokeWidth="1.5"/><path d="M30 24.5 L30 34" stroke={s} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/></svg>
    ),
    q6_normal: (
      <svg viewBox="0 0 48 48" fill="none"><path d="M8 30 Q24 18 40 30" stroke={s} strokeWidth="2" strokeLinecap="round" fill="none"/><line x1="17" y1="30" x2="17" y2="44" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><line x1="24" y1="28" x2="24" y2="44" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><line x1="31" y1="30" x2="31" y2="44" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><path d="M16 10 L20 14 L28 6" stroke={s} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/></svg>
    ),
    q6_seco: (
      <svg viewBox="0 0 48 48" fill="none"><path d="M8 30 Q24 18 40 30" stroke={s} strokeWidth="2" strokeLinecap="round" fill="none"/><line x1="17" y1="30" x2="17" y2="44" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><line x1="24" y1="28" x2="24" y2="44" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><line x1="31" y1="30" x2="31" y2="44" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><circle cx="16" cy="14" r="1.5" fill={s} opacity="0.5"/><circle cx="24" cy="11" r="1.5" fill={s} opacity="0.5"/><circle cx="32" cy="14" r="1.5" fill={s} opacity="0.5"/></svg>
    ),
    q6_sensible: (
      <svg viewBox="0 0 48 48" fill="none"><path d="M8 30 Q24 18 40 30" stroke={s} strokeWidth="2" strokeLinecap="round" fill="none"/><line x1="17" y1="30" x2="17" y2="44" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><line x1="24" y1="28" x2="24" y2="44" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><line x1="31" y1="30" x2="31" y2="44" stroke={s} strokeWidth="2.5" strokeLinecap="round"/><path d="M24 8 C24 8 18 12 18 17 C18 20 20.7 22 24 20 C27.3 22 30 20 30 17 C30 12 24 8 24 8Z" fill={s} fillOpacity="0.2" stroke={s} strokeWidth="1.5"/></svg>
    ),
  };

  return illustrations[key] ?? (
    <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="14" stroke={s} strokeWidth="2.5"/></svg>
  );
}

export default function QuestionScreen({
  question,
  options,
  questionNumber,
  totalQuestions,
  onAnswer,
  onBack,
  showFeedback,
  selectedOption,
  currentAnswer,
  bgImage,
}: QuestionScreenProps) {
  const glass = !!bgImage;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="size-full flex flex-col relative overflow-hidden"
      style={{ background: glass ? 'transparent' : 'white' }}
    >
      {/* Background image + overlays */}
      {glass && (
        <>
          <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/60 pointer-events-none" />
        </>
      )}

      {/* Header */}
      <div className="relative flex items-center justify-between px-10 pt-10 pb-4">
        {onBack ? (
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full"
            style={glass
              ? { background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.35)', backdropFilter: 'blur(8px)' }
              : { background: B.primaryLight }
            }
          >
            <ChevronLeft className="w-5 h-5" style={{ color: glass ? 'white' : B.primary }} />
          </motion.button>
        ) : <div className="w-10" />}

        <p
          className="text-sm tracking-[0.22em] uppercase"
          style={{ fontFamily: "'Poppins', sans-serif", color: glass ? 'rgba(255,255,255,0.7)' : B.muted }}
        >
          {questionNumber} / {totalQuestions}
        </p>

        <div className="w-10" />
      </div>

      {/* Progress bar */}
      <div className="relative px-10 mb-5">
        <div
          className="w-full h-0.5 rounded-full overflow-hidden"
          style={{ background: glass ? 'rgba(255,255,255,0.2)' : '#ede8e4' }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((questionNumber - 1) / totalQuestions) * 100}%` }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ background: glass ? 'rgba(255,255,255,0.85)' : B.primary }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="relative px-10 mb-5">
        <motion.h2
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: '2.4rem',
            lineHeight: 1.25,
            color: glass ? 'white' : '#1c1917',
          }}
        >
          {question}
        </motion.h2>
      </div>

      {/* Options */}
      <div className="relative flex-1 px-10 pb-8 flex flex-col">
        <AnimatePresence mode="wait">
          {!showFeedback ? (
            <div key="options" className="w-full flex flex-col overflow-y-auto" style={{ gap: '200px' }}>
              {options.map((option, index) => {
                const isSelected = currentAnswer === option;
                const iconColor = glass
                  ? (isSelected ? 'white' : 'rgba(255,255,255,0.65)')
                  : (isSelected ? B.primary : B.muted);

                const cardStyle = glass
                  ? {
                      background: isSelected ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.12)',
                      border: `1px solid ${isSelected ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.28)'}`,
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                    }
                  : {
                      background: isSelected ? B.primaryLight : '#faf7f5',
                      border: `1.5px solid ${isSelected ? B.primaryBorder : 'rgba(0,0,0,0.07)'}`,
                    };

                const iconBg = glass
                  ? (isSelected ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.12)')
                  : (isSelected ? B.primaryBorder + '55' : '#ede8e4');

                return (
                  <motion.button
                    key={option}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: 0.08 + index * 0.05 }}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => onAnswer(option)}
                    className="w-full flex items-center gap-4 px-5 text-left transition-all"
                    style={{ ...cardStyle, height: '300px', borderRadius: '32px' }}
                  >
                    {/* Illustration box */}
                    <div
                      className="w-20 h-20 flex-shrink-0 rounded-xl flex items-center justify-center"
                      style={{ background: iconBg }}
                    >
                      <div className="w-14 h-14">
                        <OptionIllustration questionNumber={questionNumber} option={option} color={iconColor} />
                      </div>
                    </div>

                    {/* Text */}
                    <p
                      className="flex-1 leading-snug"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: isSelected ? 500 : 400,
                        fontSize: '1.45rem',
                        color: glass
                          ? (isSelected ? 'white' : 'rgba(255,255,255,0.8)')
                          : (isSelected ? B.primaryDark : '#6b7280'),
                      }}
                    >
                      {option}
                    </p>

                    {/* Check */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: glass ? 'rgba(255,255,255,0.9)' : B.primary }}
                      >
                        <Check className="w-3.5 h-3.5" style={{ color: glass ? B.primary : 'white' }} />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          ) : (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex-1 flex flex-col items-center justify-center rounded-2xl"
              style={glass
                ? { background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }
                : { background: B.primaryLight, border: `1.5px solid ${B.primaryBorder}` }
              }
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 220 }}
                className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                style={{ background: glass ? 'rgba(255,255,255,0.9)' : B.primary }}
              >
                <Check className="w-7 h-7" style={{ color: glass ? B.primary : 'white' }} />
              </motion.div>
              <p
                className="text-center px-6"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  fontSize: '2rem',
                  color: glass ? 'white' : '#1c1917',
                }}
              >
                {selectedOption}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
