import type { Answer } from '../App';

export interface HairAnalysis {
  type: string;
  needs: string[];
}

export interface RoutineItem {
  name: string;
  tagline: string;
  benefit: string;
}

export interface HairRoutine {
  shot: RoutineItem;
  shampoo: RoutineItem;
  treatment: RoutineItem;
  styling: RoutineItem;
}

export function calculateHairType(answers: Answer[]): HairAnalysis {
  const sebum      = answers[0]?.answer || '';
  const waterReact = answers[1]?.answer || '';
  const shape      = answers[2]?.answer || '';
  const treatment  = answers[3]?.answer || '';
  const thickness  = answers[4]?.answer || '';
  const scalp      = answers[5]?.answer || '';

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

export function getHairRoutine(answers: Answer[]): HairRoutine {
  const sebum     = answers[0]?.answer || '';
  const shape     = answers[2]?.answer || '';
  const treatment = answers[3]?.answer || '';
  const thickness = answers[4]?.answer || '';
  const scalp     = answers[5]?.answer || '';

  const isOily      = sebum.includes('Graso') || scalp.includes('Graso');
  const isDry       = sebum.includes('Seco')  || scalp.includes('Seco');
  const isCurly     = shape.includes('Ruloso') || shape.includes('rizado');
  const isWavy      = shape.includes('Ondulado');
  const isTreated   = treatment.includes('Decoloración') || treatment.includes('Parcial');
  const isFine      = thickness.includes('Fino');

  // ONE shot — cada uno resuelve una necesidad específica
  let shot: RoutineItem;
  if (isTreated) {
    // Tratamiento químico → reparación es la prioridad
    shot = { name: 'Fortana', tagline: 'Shot de Fuerza y Resistencia', benefit: 'Reconstruye las fibras dañadas y devuelve resistencia al cabello tratado' };
  } else if (isCurly || isWavy) {
    // Rizado u ondulado → control de frizz y definición
    shot = { name: 'Selene', tagline: 'Shot de Control y Definición', benefit: 'Define la forma natural del cabello y elimina el frizz todo el día' };
  } else if (isDry) {
    // Seco → hidratación profunda
    shot = { name: 'Aquaella', tagline: 'Shot de Nutrición e Hidratación', benefit: 'Restaura la hidratación perdida y sella la cutícula para un pelo suave y nutrido' };
  } else {
    // Normal, graso, liso, fino → brillo y salud general
    shot = { name: 'Lumina', tagline: 'Shot de Brillo y Vitalidad', benefit: 'Aporta luminosidad intensa y suavidad desde la primera aplicación' };
  }

  // Shampoo EROS
  let shampoo: RoutineItem;
  if (isOily) {
    shampoo = { name: 'EROS Detox', tagline: 'Shampoo Detox', benefit: 'Elimina el exceso de sebo sin resecar' };
  } else if (!isDry && !isTreated) {
    shampoo = { name: 'EROS H6', tagline: 'Shampoo Equilibrante', benefit: 'Equilibra raíz y puntas de forma duradera' };
  } else {
    shampoo = { name: 'EROS H2', tagline: 'Shampoo Hidratante', benefit: 'Limpieza suave con hidratación activa' };
  }

  // Acondicionador o Máscara
  let proc: RoutineItem;
  if (isOily && !isTreated && !isCurly) {
    proc = { name: 'ALBA', tagline: 'Acondicionador Equilibrante', benefit: 'Acondicionamiento sin apelmazar el cabello' };
  } else {
    proc = { name: 'AURORA', tagline: 'Máscara Capilar Reparadora', benefit: 'Reparación profunda con coco y naranja dulce' };
  }

  // Producto de peinado
  let styling: RoutineItem;
  if (isCurly) {
    styling = { name: 'SOPHIA', tagline: 'Mousse de Definición', benefit: 'Define rizos con fijación flexible y sin crujido' };
  } else if (isFine) {
    styling = { name: 'SOPHIA', tagline: 'Mousse de Definición', benefit: 'Volumen natural sin aplastarse durante el día' };
  } else if (isTreated || isDry) {
    styling = { name: 'GODIVA', tagline: 'Sérum Nutritivo', benefit: 'Sella las puntas y nutre en profundidad' };
  } else if (isWavy) {
    styling = { name: 'UMA Crema', tagline: 'Crema de Peinar', benefit: 'Define el movimiento natural sin rigidez' };
  } else {
    styling = { name: 'UMA Protector', tagline: 'Protector Antifrizz', benefit: 'Protege y controla el frizz todo el día' };
  }

  return { shot, shampoo, treatment: proc, styling };
}

export function getPrimaryProduct(answers: Answer[]): string {
  return getHairRoutine(answers).shot.name;
}
