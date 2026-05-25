import type { Answer } from '../App';

export interface HairAnalysis {
  type: string;
  needs: string[];
}

export function calculateHairType(answers: Answer[]): HairAnalysis {
  const sebum        = answers[0]?.answer || '';
  const waterReact   = answers[1]?.answer || '';
  const shape        = answers[2]?.answer || '';
  const treatment    = answers[3]?.answer || '';
  const thickness    = answers[4]?.answer || '';
  const scalp        = answers[5]?.answer || '';

  let type = '';
  const needs: string[] = [];

  if (sebum.includes('Seco') || waterReact.includes('Absorbe rápido')) {
    needs.push('hidratación profunda');
    type = 'Pelo seco';
  } else if (sebum.includes('Graso')) {
    needs.push('control de grasa');
    type = 'Pelo graso';
  } else if (sebum.includes('Mixto')) {
    type = 'Pelo mixto';
    needs.push('equilibrio');
  } else {
    type = 'Pelo normal';
  }

  if (shape.includes('Ruloso') || shape.includes('rizado')) {
    type += ' con rizos';
    needs.push('definición de rizos');
    needs.push('anti-frizz');
  } else if (shape.includes('Ondulado')) {
    type += ' ondulado';
    needs.push('control de frizz');
  }

  if (treatment.includes('Decoloración total') || treatment.includes('Parcial')) {
    needs.push('reparación intensiva');
    type += ' tratado químicamente';
  }

  if (thickness.includes('Fino') || thickness.includes('Muy fino')) {
    needs.push('volumen');
  } else if (thickness.includes('Grueso') || thickness.includes('Muy grueso')) {
    needs.push('suavidad');
    needs.push('nutrición');
  }

  if (scalp.includes('Sensible')) {
    needs.push('cuidado suave');
  }

  return { type, needs: needs.slice(0, 3) };
}

export function getRecommendedProducts(needs: string[]): string[] {
  const out: string[] = [];
  if (needs.some(n =>
    n.includes('hidratación') || n.includes('nutrición') ||
    n.includes('equilibrio') || n.includes('grasa') || n.includes('suave')
  )) out.push('Aquaella');
  if (needs.some(n =>
    n.includes('frizz') || n.includes('rizos') || n.includes('definición')
  )) out.push('Selene');
  if (needs.some(n =>
    n.includes('brillo') || n.includes('suavidad')
  )) out.push('Lumina');
  if (needs.some(n =>
    n.includes('fuerza') || n.includes('reparación') ||
    n.includes('resistencia') || n.includes('volumen')
  )) out.push('Fortana');
  if (out.length === 0) out.push('Aquaella');
  return out;
}

export function getPrimaryProduct(answers: Answer[]): string {
  const { needs } = calculateHairType(answers);
  return getRecommendedProducts(needs)[0] ?? 'Aquaella';
}
