const ESP32_URL = import.meta.env.VITE_ESP32_URL as string | undefined;

export async function triggerDispenser(product: string): Promise<boolean> {
  if (!ESP32_URL) {
    console.warn('[Dispenser] VITE_ESP32_URL no configurado — dispensado omitido');
    return false;
  }
  try {
    await fetch(ESP32_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product }),
      signal: AbortSignal.timeout(5000),
    });
    console.log(`[Dispenser] OK — producto: ${product}`);
    return true;
  } catch (err) {
    console.error('[Dispenser] Error al comunicar con ESP32:', err);
    return false;
  }
}
