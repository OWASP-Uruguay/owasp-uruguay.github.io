// Variables de entorno de prueba. Producción no define ninguna.
import { parseNow } from './when';

export const NOW = parseNow(import.meta.env.NOW ?? process.env.NOW);
export const SHOW_HIDDEN: string = import.meta.env.SHOW_HIDDEN ?? process.env.SHOW_HIDDEN ?? '';
