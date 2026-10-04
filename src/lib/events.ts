import type { ImageMetadata } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { NOW } from './env';
import { dayOf, isOver } from './when';

export type EventEntry = CollectionEntry<'events'>;

// Fotos y adjuntos se detectan por carpeta: src/content/events/<id>/...
// (cualquier subcarpeta; se ordenan por nombre de archivo).
const photoModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/events/*/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);
const fileModules = import.meta.glob<string>(
  '/src/content/events/*/**/*.{pdf,pptx,ppt,key,odp,docx,zip,txt}',
  { eager: true, query: '?url', import: 'default' },
);

const idOf = (path: string) => path.split('/')[4];
const nameOf = (path: string) => path.slice(path.indexOf('/', '/src/content/events/'.length) + 1);
const byName = (a: string, b: string) => a.localeCompare(b, 'es', { numeric: true });

export function eventPhotos(id: string): ImageMetadata[] {
  return Object.keys(photoModules)
    .filter((p) => idOf(p) === id)
    .sort(byName)
    .map((p) => photoModules[p].default);
}

export interface Attachment { label: string; href: string; ext: string; external: boolean }

export function eventAttachments(entry: EventEntry): Attachment[] {
  const local = Object.keys(fileModules).filter((p) => idOf(p) === entry.id).sort(byName);
  const out: Attachment[] = [];
  const used = new Set<string>();
  for (const a of entry.data.attachments) {
    if (a.url) {
      out.push({ label: a.label, href: a.url, ext: extOf(a.url), external: true });
    } else if (a.file) {
      const match = local.find((p) => nameOf(p) === a.file!.replace(/^\.\//, ''));
      if (!match) throw new Error(`Adjunto no encontrado en ${entry.id}: ${a.file}`);
      used.add(match);
      out.push({ label: a.label, href: fileModules[match], ext: extOf(match), external: false });
    }
  }
  // Archivos sin etiqueta en el frontmatter: se listan con su nombre.
  for (const p of local) {
    if (used.has(p)) continue;
    const name = nameOf(p).split('/').pop()!;
    out.push({ label: name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '), href: fileModules[p], ext: extOf(p), external: false });
  }
  return out;
}

// Extensión para el ícono del adjunto; los enlaces externos sin extensión conocida son 'link'.
function extOf(path: string) {
  const m = /\.(pdf|pptx?|key|odp|docx|zip|txt)(?:[?#].*)?$/i.exec(path);
  return m ? m[1].toLowerCase() : 'link';
}

export function eventCover(entry: EventEntry): ImageMetadata | undefined {
  return entry.data.cover ?? eventPhotos(entry.id)[0];
}

export async function getEvents() {
  const all = await getCollection('events', ({ data }) => import.meta.env.DEV || !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// "Próximo" = no terminó a la fecha del build, en hora de Montevideo.
// El workflow reconstruye el sitio cada día; NOW permite simular otra fecha en local.
export function isUpcoming(entry: EventEntry, now = NOW) {
  return !isOver(dayOf(entry.data.endDate ?? entry.data.date), now);
}

export const kindLabel: Record<EventEntry['data']['kind'], string> = {
  meetup: 'Meetup',
  conferencia: 'Conferencia',
  taller: 'Taller',
  colaboracion: 'Colaboración',
  participacion: 'Participación',
};

export function formatDate(entry: EventEntry, style: 'long' | 'short' = 'long') {
  const { date, endDate, dateTbd } = entry.data;
  if (dateTbd) return 'Fecha a confirmar';
  // Las fechas del frontmatter son días (UTC 00:00): se formatean en UTC.
  const opts: Intl.DateTimeFormatOptions =
    style === 'long'
      ? { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }
      : { day: 'numeric', month: 'short', timeZone: 'UTC' };
  const fmt = new Intl.DateTimeFormat('es-UY', opts);
  if (endDate && endDate.valueOf() !== date.valueOf()) return fmt.formatRange(date, endDate);
  return fmt.format(date);
}

export function eventHref(entry: EventEntry) {
  return url(entry.data.page ?? `/eventos/${entry.id}/`);
}

// Todas las rutas internas pasan por url() para respetar el base de GitHub Pages.
export function url(path: string) {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
