// Revisa el sitio ya compilado (dist/). Correr después de `npm run build`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import yaml from 'js-yaml';
import { heroCtas, isOver, parseNow } from '../../src/lib/when.ts';
import { fullName, isPublished, resolveSession, visibleSpeakers, type Talk } from '../../src/lib/agenda.ts';

const dist = 'dist';
const read = (p: string) => readFileSync(join(dist, p), 'utf8');
const pages = (readdirSync(dist, { recursive: true }) as string[]).filter((p) => p.endsWith('.html'));
const event = yaml.load(readFileSync('src/content/owasp-day-2026/event.yaml', 'utf8')) as any;
const now = parseNow(process.env.NOW);
const esc = (x: string) => x.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
type TalkData = Talk & { id: string; speakers: (Talk['speakers'][number] & { linkedin?: string; photo?: string })[] };
const loadTalks = () => (yaml.load(readFileSync('src/content/owasp-day-2026/talks.yaml', 'utf8')) as TalkData[]).map((t) => ({ ...t, id: String(t.id) }));
const OFFICIAL = 'https://owasp.org/chapters/uruguay';

test('hay páginas compiladas', () => {
  assert.ok(pages.length > 50, `solo ${pages.length} páginas`);
});

test('todas las páginas tienen el aviso de sitio no oficial con link al capítulo', () => {
  for (const p of pages) {
    const html = read(p);
    if (html.includes('http-equiv="refresh"')) continue; // redirecciones: no se ven
    assert.match(html, /class="disclaimer"/, p);
    assert.ok(html.includes(`href="${OFFICIAL}"`), `${p} sin link a ${OFFICIAL}`);
  }
});

test('la portada muestra el OWASP Meetup+ mientras no terminó', () => {
  const home = read('index.html');
  const live = !isOver(event.date, now);
  assert.equal(home.includes('id="cfs"'), live);
  if (live) assert.match(home, /rel="canonical" href="[^"]*\/owasp-meetup-plus-2026\/"/);
});

test('el aviso del evento aparece fuera de su página y solo mientras no terminó', () => {
  const live = !isOver(event.date, now);
  assert.equal(read('eventos/index.html').includes('class="event-pill" href="/owasp-meetup-plus-2026/"'), live);
  assert.ok(!read('owasp-meetup-plus-2026/index.html').includes('class="event-pill"'));
});

test('la imagen para redes por defecto lleva la versión de su contenido', () => {
  const v = createHash('sha256').update(readFileSync('public/og-image.jpg')).digest('hex').slice(0, 8);
  assert.match(read('index.html'), new RegExp(`<meta property="og:image" content="[^"]*/og-image\\.jpg\\?v=${v}">`));
});

test('la ruta anterior del evento redirige a la nueva', () => {
  const html = read('owasp-day-2026/index.html');
  assert.match(html, /http-equiv="refresh" content="0;url=\/owasp-meetup-plus-2026\/"/);
  assert.match(html, /rel="canonical" href="[^"]*\/owasp-meetup-plus-2026\/"/);
});

test('los botones del evento coinciden con la fecha y event.yaml', () => {
  const html = read('owasp-meetup-plus-2026/index.html');
  const ctas = heroCtas({ cfpUrl: event.cfp.url, cfpDeadline: event.cfp.deadline, registrationUrl: event.registration.url, now });
  const cfpOpen = ctas.some((c) => c.id === 'cfp');
  assert.equal(html.includes(`href="${event.cfp.url.replaceAll('&', '&amp;')}"`), cfpOpen, 'link al form del CFS');
  assert.equal(html.includes('Convocatoria cerrada'), !cfpOpen);
  const reg = [...html.matchAll(/<(a|span)\b[^>]*data-cta="registration"[^>]*>/g)].map((m) => m[0]);
  assert.ok(reg.length > 0, 'falta el botón de registro');
  for (const tag of reg) {
    if (event.registration.url) assert.ok(tag.includes(`href="${event.registration.url}"`), tag);
    else { assert.ok(!tag.includes('href='), tag); assert.ok(tag.includes('aria-disabled="true"'), tag); }
  }
  if (!event.time) assert.ok(html.includes('Horario a confirmar'));
});

test('las secciones apagadas no están en el HTML publicado', () => {
  const html = pages.map(read).join('\n');
  assert.ok(!html.includes('class="dev-hidden"'), 'hay secciones marcadas como ocultas: ¿SHOW_HIDDEN definida?');
  const ids = { speakers: 'oradores', agenda: 'agenda', sponsors: 'sponsors', faq: 'faq' } as const;
  for (const [name, id] of Object.entries(ids)) {
    if (event.sections[name]) continue;
    assert.ok(!html.includes(`id="${id}"`), `la sección ${name} está apagada pero aparece`);
  }
  // Charlas y oradores de talks.yaml: solo lo publicado está en el HTML.
  const eventHtml = [read('index.html'), read('owasp-meetup-plus-2026/index.html')].join('\n');
  const slots = yaml.load(readFileSync('src/content/owasp-day-2026/agenda.yaml', 'utf8')) as { sessions: { title: string }[] }[];
  const genericTitles = new Set(slots.flatMap((s) => s.sessions.map((x) => x.title)));
  const talks = loadTalks();
  const shownNames = new Set(talks.flatMap((t) => visibleSpeakers(t, event.sections.talks)).map(fullName));
  for (const talk of talks) {
    if (!isPublished(talk, event.sections.talks)) {
      if (!genericTitles.has(talk.title)) assert.ok(!eventHtml.includes(esc(talk.title)), `título visible: ${talk.title}`);
      if (talk.abstract) assert.ok(!eventHtml.includes(esc(talk.abstract.slice(0, 60))), `resumen visible: ${talk.title}`);
    }
    const visible = visibleSpeakers(talk, event.sections.talks);
    for (const sp of talk.speakers) {
      const full = fullName(sp);
      if (visible.includes(sp)) assert.ok(eventHtml.includes(`Foto de ${esc(full)}`), `orador publicado sin tarjeta: ${full}`);
      else if (!shownNames.has(full)) {
        assert.ok(!eventHtml.includes(esc(full)), `orador visible sin publicar: ${full}`);
        if (sp.linkedin) assert.ok(!eventHtml.includes(esc(sp.linkedin)), `LinkedIn visible sin publicar: ${full}`);
      }
    }
  }
});

test('la agenda muestra cada charla publicada y el texto genérico del resto', () => {
  if (!event.sections.agenda) return;
  const html = read('owasp-meetup-plus-2026/index.html');
  const talks = new Map(loadTalks().map((t) => [t.id, t]));
  const slots = yaml.load(readFileSync('src/content/owasp-day-2026/agenda.yaml', 'utf8')) as { sessions: { title: string; by?: string; talk?: string }[] }[];
  let abstracts = 0;
  for (const slot of slots) for (const s of slot.sessions) {
    const shown = resolveSession(s, s.talk ? talks.get(s.talk) : undefined, event.sections.talks);
    assert.ok(html.includes(esc(shown.title)), `falta "${shown.title}" en la agenda`);
    if (shown.by) assert.ok(html.includes(esc(shown.by)), `falta "${shown.by}" en la agenda`);
    if (shown.talk?.abstract) abstracts++;
  }
  assert.equal(html.split('Ver resumen').length - 1, abstracts, 'cantidad de resúmenes publicados');
});

test('en dist/ solo están las fotos de los oradores publicados', () => {
  const photoDir = 'src/content/owasp-day-2026/speakers';
  const stem = (photo: string) => photo.replace(/^.*\/|\.[^.]+$/g, '');
  const expected = loadTalks()
    .flatMap((t) => visibleSpeakers(t, event.sections.talks))
    .flatMap((sp) => (sp.photo ? [`${stem(sp.photo)}.webp`] : []));
  const out = join(dist, 'owasp-meetup-plus-2026/oradores');
  const found = existsSync(out) ? readdirSync(out) : [];
  assert.deepEqual([...found].sort(), [...new Set(expected)].sort());
  // Ningún original (con el nombre del orador) se copia tal cual a dist/.
  const hash = (f: string) => createHash('sha256').update(readFileSync(f)).digest('hex');
  const originals = new Set(readdirSync(photoDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).map((f) => hash(join(photoDir, f))));
  for (const f of readdirSync(dist, { recursive: true }) as string[]) {
    if (/\.(jpe?g|png|webp)$/i.test(f)) assert.ok(!originals.has(hash(join(dist, f))), `foto de orador copiada a dist/: ${f}`);
  }
});

test('los enlaces internos apuntan a archivos que existen', () => {
  const missing = new Set<string>();
  for (const p of pages) {
    for (const [, ref] of read(p).matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
      if (ref.startsWith('//')) continue;
      const file = join(dist, decodeURI(ref));
      if (!existsSync(file) && !existsSync(join(file, 'index.html'))) missing.add(`${p} → ${ref}`);
    }
  }
  assert.deepEqual([...missing], []);
});

test('AppSec Days 2025 está con su fecha corregida', () => {
  assert.ok(existsSync(join(dist, 'eventos/2025-11-19-appsec-days-uruguay/index.html')));
  assert.ok(!existsSync(join(dist, 'eventos/2025-12-19-appsec-days-uruguay')));
});

test('ni tests ni configuración terminan publicados', () => {
  const all = readdirSync(dist, { recursive: true }) as string[];
  assert.deepEqual(all.filter((p) => /(^|\/)(tests?|scripts)(\/|$)|\.test\.|\.env|event\.yaml/.test(p)), []);
});
