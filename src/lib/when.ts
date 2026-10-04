// Fechas y estados que dependen del día. Sin imports: se prueba con `node --test`.
// Uruguay no tiene horario de verano desde 2015, así que Montevideo es siempre UTC-3.

const OFFSET = '-03:00';

/** Instante en que termina un día de Montevideo ("2026-11-30" → 30/11 23:59:59.999 UTC-3). */
export function endOfDay(day: string): Date {
  return new Date(`${day}T23:59:59.999${OFFSET}`);
}

/** Instante de inicio de un evento: la hora de `time` ("09:00 a 17:30") o las 00:00 si no hay. */
export function startOf(day: string, time = ''): Date {
  const hm = /(\d{1,2}):(\d{2})/.exec(time);
  const hh = hm ? hm[1].padStart(2, '0') : '00';
  const mm = hm ? hm[2] : '00';
  return new Date(`${day}T${hh}:${mm}:00${OFFSET}`);
}

/** "Hoy" del build. `raw` sale de la variable NOW (solo para probar): "2026-12-01" o ISO con hora. */
export function parseNow(raw?: string): Date {
  if (!raw) return new Date();
  const d = /^\d{4}-\d{2}-\d{2}$/.test(raw) ? new Date(`${raw}T12:00:00${OFFSET}`) : new Date(raw);
  if (Number.isNaN(d.valueOf())) throw new Error(`NOW inválido: ${raw}`);
  return d;
}

/** El día ya terminó en Montevideo. */
export const isOver = (day: string, now: Date) => endOfDay(day) < now;

/** Día del calendario de una fecha del frontmatter (Astro las lee como UTC 00:00). */
export const dayOf = (d: Date) => d.toISOString().slice(0, 10);

export interface Cta { id: 'cfp' | 'registration'; label: string; href?: string; disabled: boolean }

/**
 * Botones del hero, en orden de importancia.
 * Con el CFS abierto va primero "Postulá tu charla"; después, el registro.
 * Sin URL de registro, el botón queda deshabilitado con "próximamente".
 */
export function heroCtas(o: { cfpUrl: string; cfpDeadline: string; registrationUrl: string; now: Date }): Cta[] {
  const registration: Cta = o.registrationUrl
    ? { id: 'registration', label: 'Registro gratuito', href: o.registrationUrl, disabled: false }
    : { id: 'registration', label: 'Registro gratuito · próximamente', disabled: true };
  if (isOver(o.cfpDeadline, o.now)) return [registration];
  return [{ id: 'cfp', label: 'Postulá tu charla', href: o.cfpUrl, disabled: false }, registration];
}

/** Texto de la hora del evento. */
export const timeLabel = (time: string) => time.trim() || 'Horario a confirmar';
