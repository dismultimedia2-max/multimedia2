import { motion } from 'motion/react';
import { Edit2, Check } from 'lucide-react';
import type { Answer } from '../App';

const B = {
  primary:      '#3D2B1F',
  primaryLight: '#F5ECE4',
  primaryBorder:'#D4BBA0',
  muted:        '#9b8e85',
};

interface SummaryScreenProps {
  answers: Answer[];
  questions: { question: string; options: string[] }[];
  onEdit: (questionIndex: number) => void;
  onFinish: () => void;
  bgImage?: string;
}

export default function SummaryScreen({ answers, questions, onEdit, onFinish, bgImage }: SummaryScreenProps) {
  const allAnswered = answers.length >= questions.length && answers.every(Boolean);
  const glass = !!bgImage;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="size-full flex flex-col overflow-hidden relative"
      style={{ background: glass ? 'transparent' : 'white' }}
    >
      {/* Background image + overlay */}
      {glass && (
        <>
          <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/70 pointer-events-none" />
        </>
      )}

      {/* Header */}
      <div className="relative px-10 pt-8 pb-3 flex-shrink-0">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xs tracking-[0.28em] uppercase mb-2"
          style={{ fontFamily: "'Poppins', sans-serif", color: glass ? 'rgba(255,255,255,0.65)' : B.primary }}
        >
          Perla Pli
        </motion.p>
        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.18 }}
          className="mb-1"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '2.4rem', lineHeight: 1.1, color: glass ? 'white' : '#1c1917' }}
        >
          Revisá tus respuestas
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.26 }}
          className="text-sm"
          style={{ fontFamily: "'Poppins', sans-serif", color: glass ? 'rgba(255,255,255,0.6)' : B.muted }}
        >
          Podés modificar cualquier respuesta antes de continuar
        </motion.p>
      </div>

      <div className="relative px-10 mb-2 flex-shrink-0">
        <div className="h-px" style={{ background: glass ? 'rgba(255,255,255,0.2)' : '#ede8e4' }} />
      </div>

      {/* Scrollable answer cards */}
      <div className="relative flex-1 px-10 overflow-y-auto py-2">
        <div className="space-y-3 pb-2">
          {questions.map((q, index) => {
            const answer = answers[index];
            return (
              <motion.div
                key={index}
                initial={{ x: -24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.22 + index * 0.05 }}
                className="rounded-2xl p-5"
                style={glass
                  ? { background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.28)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }
                  : { background: 'white', border: '1px solid rgba(0,0,0,0.07)' }
                }
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs mb-1.5 tracking-wider uppercase"
                      style={{ fontFamily: "'Poppins', sans-serif", color: glass ? 'rgba(255,255,255,0.5)' : B.muted }}
                    >
                      Pregunta {index + 1}
                    </p>
                    <p
                      className="mb-2.5 leading-snug"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '1.5rem', color: glass ? 'white' : '#1c1917' }}
                    >
                      {q.question}
                    </p>
                    {answer ? (
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: glass ? 'rgba(255,255,255,0.9)' : B.primary }}
                        >
                          <Check className="w-3 h-3" style={{ color: glass ? B.primary : 'white' }} />
                        </div>
                        <p
                          className="leading-snug"
                          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '1rem', color: glass ? 'rgba(255,255,255,0.9)' : B.primary }}
                        >
                          {answer.answer}
                        </p>
                      </div>
                    ) : (
                      <p className="text-base italic" style={{ fontFamily: "'Poppins', sans-serif", color: glass ? 'rgba(255,255,255,0.35)' : '#d1c8c0' }}>
                        Sin respuesta
                      </p>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onEdit(index)}
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={glass
                      ? { background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.35)' }
                      : { background: B.primaryLight }
                    }
                  >
                    <Edit2 className="w-4 h-4" style={{ color: glass ? 'white' : B.primary }} />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA — pinned to bottom */}
      <div
        className="relative px-10 pb-8 pt-4 flex-shrink-0 flex flex-col items-center gap-2"
        style={{ borderTop: `1px solid ${glass ? 'rgba(255,255,255,0.15)' : '#ede8e4'}` }}
      >
        {!allAnswered && (
          <p className="text-xs text-center" style={{ fontFamily: "'Poppins', sans-serif", color: glass ? 'rgba(255,255,255,0.55)' : B.muted }}>
            Por favor, respondé todas las preguntas para continuar
          </p>
        )}
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={allAnswered ? { scale: 1.02 } : {}}
          whileTap={allAnswered ? { scale: 0.98 } : {}}
          onClick={onFinish}
          disabled={!allAnswered}
          className="w-full max-w-md py-4 rounded-full text-sm uppercase tracking-widest transition-all"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            background: allAnswered ? (glass ? 'rgba(255,255,255,0.9)' : B.primary) : (glass ? 'rgba(255,255,255,0.15)' : '#e5e0db'),
            color: allAnswered ? (glass ? B.primary : 'white') : (glass ? 'rgba(255,255,255,0.4)' : B.muted),
            cursor: allAnswered ? 'pointer' : 'not-allowed',
          }}
        >
          Ver mi diagnóstico
        </motion.button>
      </div>
    </motion.div>
  );
}
