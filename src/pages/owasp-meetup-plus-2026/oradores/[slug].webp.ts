// Fotos de oradores: /owasp-meetup-plus-2026/oradores/<nombre>.webp.
// Se generan acá, desde src/content/owasp-day-2026/speakers/, y solo si la sección de oradores está
// publicada. No pasan por import ni por astro:assets a propósito: así los originales (con el nombre de
// cada orador) no se copian a dist/ mientras sections.speakers sea false.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, getEntry } from 'astro:content';
import { existsSync } from 'node:fs';
import sharp from 'sharp';
import { SHOW_HIDDEN } from '~/lib/env';
import { resolveSections } from '~/lib/flags';

const dir = 'src/content/owasp-day-2026';
export const SIZE = 640;

export const getStaticPaths = (async () => {
  const event = (await getEntry('owaspDay', 'event'))?.data;
  if (!event || !resolveSections(event.sections, SHOW_HIDDEN).on.speakers) return [];
  const paths = new Map<string, string>();
  for (const { data } of await getCollection('owaspDayTalks')) {
    for (const sp of data.speakers) {
      if (!sp.photo) continue;
      const file = `${dir}/${sp.photo.slice(2)}`;
      if (!existsSync(file)) throw new Error(`No existe la foto ${sp.photo} (talks.yaml)`);
      paths.set(sp.photo.replace(/^.*\/|\.[^.]+$/g, ''), file);
    }
  }
  return [...paths].map(([slug, file]) => ({ params: { slug }, props: { file } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const body = await sharp(props.file as string).resize(SIZE, SIZE, { fit: 'cover' }).webp({ quality: 80 }).toBuffer();
  return new Response(new Uint8Array(body), { headers: { 'Content-Type': 'image/webp' } });
};
