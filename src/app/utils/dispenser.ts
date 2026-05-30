import { db } from './firebase';
import { ref, set, serverTimestamp } from 'firebase/database';

/**
 * Dispenser via Firebase Realtime Database
 *
 * Escribe un comando en /dispense → el ESP32 lo lee y acciona el dispensador.
 *
 * Estructura en Firebase:
 * {
 *   "dispense": {
 *     "product":   "Freya",
 *     "status":    "pending",   // el ESP32 lo cambia a "done" al dispensar
 *     "timestamp": 1234567890
 *   }
 * }
 *
 * El ESP32 hace polling a:
 *   GET https://<project>.firebaseio.com/dispense.json
 * y cuando ve status "pending", dispensa y hace PUT status → "done"
 */
export async function triggerDispenser(productName: string): Promise<void> {
  if (!productName) return;

  try {
    const dispenserRef = ref(db, 'dispense');
    await set(dispenserRef, {
      product:   productName,
      status:    'pending',
      timestamp: serverTimestamp(),
    });
    console.log('[Dispenser] Comando enviado a Firebase:', productName);
  } catch (error) {
    console.error('[Dispenser] Error escribiendo en Firebase:', error);
  }
}
