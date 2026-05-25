import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { getRecommendedProducts } from '../utils/hairAnalysis';

// Importá las fotos reales de cada producto acá cuando las tengas.
// Por ahora usamos las imágenes de lifestyle como placeholder.
import imgAquaella  from '../../imports/serum_vertical.png';
import imgSelene    from '../../imports/mascarillas.png';
import imgLumina    from '../../imports/producto_con_flores.png';
import imgFortana   from '../../imports/bandeja_de_productos.png';

const B = {
  primary:      '#3D2B1F',
  primaryLight: '#F5ECE4',
  primaryBorder:'#D4BBA0',
  muted:        '#9b8e85',
};

const PRODUCTS: Record<string, { tagline: string; benefit: string; img: string }> = {
  Aquaella: { tagline: 'Shot de Nutrición e Hidratación', benefit: 'Hidratación profunda duradera',      img: imgAquaella },
  Selene:   { tagline: 'Shot de Control de Frizz',       benefit: 'Rizos definidos sin frizz',          img: imgSelene   },
  Lumina:   { tagline: 'Shot de Brillo',                  benefit: 'Luminosidad y suavidad extrema',     img: imgLumina   },
  Fortana:  { tagline: 'Shot de Fuerza y Resistencia',   benefit: 'Fibras más fuertes y resistentes',   img: imgFortana  },
};

interface ResultsScreenProps {
  hairType: string;
  needs: string[];
  onContinue: () => void;
}

export default function ResultsScreen({ hairType, needs, onContinue }: ResultsScreenProps) {
  const products = getRecommendedProducts(needs);

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
          <p
            className="text-xs tracking-[0.28em] uppercase"
            style={{ fontFamily: "'Poppins', sans-serif", color: B.primary }}
          >
            Tu diagnóstico
          </p>
        </motion.div>

        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.18 }}
          className="mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '2.6rem', lineHeight: 1.1, color: '#1c1917' }}
        >
          {hairType}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2"
        >
          {needs.map((need, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs"
              style={{
                fontFamily: "'Poppins', sans-serif",
                background: B.primaryLight,
                border: `1px solid ${B.primaryBorder}`,
                color: B.primary,
              }}
            >
              {need}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="px-8 mb-4">
        <div className="h-px" style={{ background: '#ede8e4' }} />
      </div>

      {/* Products */}
      <div className="px-6 mb-5">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-xs tracking-[0.22em] uppercase mb-4"
          style={{ fontFamily: "'Poppins', sans-serif", color: B.muted }}
        >
          Tu rutina ideal Perla Pli
        </motion.p>

        <div className="space-y-3">
          {products.map((name, index) => {
            const info = PRODUCTS[name] ?? { tagline: '', benefit: '', img: imgAquaella };
            return (
              <motion.div
                key={name}
                initial={{ x: -24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.44 + index * 0.1 }}
                className="flex items-center gap-4 rounded-2xl overflow-hidden bg-white"
                style={{ border: '1px solid rgba(0,0,0,0.07)' }}
              >
                {/* Product image */}
                <div className="w-20 h-20 flex-shrink-0 overflow-hidden" style={{ background: B.primaryLight }}>
                  <img
                    src={info.img}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 py-3 pr-4">
                  <p
                    className="mb-0.5"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: '1.3rem', color: '#1c1917' }}
                  >
                    {name}
                  </p>
                  <p className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: B.primary }}>
                    {info.tagline}
                  </p>
                  <p className="text-xs mt-0.5" style={{ fontFamily: "'Poppins', sans-serif", color: B.muted }}>
                    {info.benefit}
                  </p>
                </div>

                {/* Number badge */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4"
                  style={{ background: B.primaryLight, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: '1rem', color: B.primary }}
                >
                  {index + 1}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="mt-4 px-5 py-3 rounded-2xl text-center"
          style={{ background: '#faf7f5', border: '1px solid rgba(0,0,0,0.05)' }}
        >
          <p className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: B.muted }}>
            + Shampoo y Acondicionador Perla Pli según tu tipo de cabello
          </p>
        </motion.div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-12">
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
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
