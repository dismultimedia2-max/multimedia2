import emailjs from '@emailjs/browser';

const SERVICE_ID  = 'service_5difpgr';
const TEMPLATE_ID = 'template_atkzhnp';
const PUBLIC_KEY  = 't8UUso1Neo04nh8D6';

const SHOT_COLORS: Record<string, string> = {
  Selene:   '#AE6283',
  Lumina:   '#A99833',
  Aquaella: '#132E70',
  Fortana:  '#AA2713',
};

interface EmailData {
  to_email: string;
  hairType: string;
  needs: string;
  shot: string;
  shotColor: string;
  shotTagline: string;
  shotBenefit: string;
  shampoo: string;
  shampooBenefit: string;
  treatment: string;
  treatmentBenefit: string;
  styling: string;
  stylingBenefit: string;
}

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

  const data: EmailData = {
    to_email:         params.email,
    hairType:         params.hairType,
    needs:            params.needs,
    shot:             params.shot,
    shotColor:        SHOT_COLORS[params.shot] || '#3D2B1F',
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
