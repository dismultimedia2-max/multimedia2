import emailjs from '@emailjs/browser';

const SERVICE_ID  = 'service_ey6vda8';
const TEMPLATE_ID = 'template_y9rkvrn';
const PUBLIC_KEY  = '2YO0PNNoZT1AbgL1k';

const BASE_URL = 'https://multimedia2-xo95.onrender.com';

const SHOT_COLORS: Record<string, string> = {
  Selene:   '#AE6283',
  Lumina:   '#A99833',
  Aquaella: '#132E70',
  Fortana:  '#AA2713',
};

// Shot colors at 35% opacity over #1a1a1a background
const SHOT_GLASS_COLORS: Record<string, string> = {
  Selene:   '#4E333F',
  Lumina:   '#4C4623',
  Aquaella: '#182138',
  Fortana:  '#4C1F18',
};

export async function sendDiagnosticEmail(params: {
  email: string;
  hairType: string;
  needs: string;
  shot: string;
  shotTagline: string;
  shotBenefit: string;
  shampoo: string;
  shampooBenefit: string;
  treatment: string;
  treatmentBenefit: string;
  styling: string;
  stylingBenefit: string;
}): Promise<boolean> {
  if (!params.email || params.email === 'Sin email') return false;

  const data = {
    to_email:         params.email,
    hairType:         params.hairType,
    needs:            params.needs,
    shot:             params.shot,
    shotColor:        SHOT_COLORS[params.shot] || '#3D2B1F',
    shotGlassColor:   SHOT_GLASS_COLORS[params.shot] || '#2a2220',
    shotImg:          `${BASE_URL}/shots/${params.shot.toLowerCase()}.png`,
    logoImg:          `${BASE_URL}/logo-perlapli.png`,
    shotTagline:      params.shotTagline,
    shotBenefit:      params.shotBenefit,
    shampoo:          params.shampoo,
    shampooBenefit:   params.shampooBenefit,
    treatment:        params.treatment,
    treatmentBenefit: params.treatmentBenefit,
    styling:          params.styling,
    stylingBenefit:   params.stylingBenefit,
  };

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, data as unknown as Record<string, unknown>, PUBLIC_KEY);
    console.log('[Email] Diagnóstico enviado a:', params.email);
    return true;
  } catch (error) {
    console.error('[Email] Error enviando email:', error);
    return false;
  }
}
