// Genera public/og-image.jpg (1200x630), la imagen que muestran las redes al compartir el sitio.
// Los textos salen de src/content/owasp-day-2026/event.yaml; fuentes, colores y avispa, de src/assets/brand.
//
//   npm run og-image
//
// Usa Chromium vía Playwright. Si no está instalado: npx playwright install chromium
// (o CHROMIUM_PATH=/ruta/a/chromium npm run og-image).
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright';
import yaml from 'js-yaml';

const root = new URL('../', import.meta.url);
const read = (p, enc) => readFileSync(new URL(p, root), enc);
const dataUrl = (p, type) => `data:${type};base64,${read(p).toString('base64')}`;

const event = yaml.load(read('src/content/owasp-day-2026/event.yaml', 'utf8'));
const tokens = Object.fromEntries([...read('src/assets/brand/tokens.css', 'utf8').matchAll(/--c-([\w-]+):\s*(#[0-9a-f]{3,8})/gi)].map((m) => [m[1], m[2]]));

const date = new Intl.DateTimeFormat('es-UY', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' })
  .format(new Date(`${event.date}T12:00:00Z`)).replace(',', '');
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

const html = `<!doctype html><meta charset="utf-8">
<style>
@font-face { font-family: Montserrat; font-weight: 100 900; src: url(${dataUrl('src/assets/brand/fonts/montserrat-latin.woff2', 'font/woff2')}) format('woff2'); }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; overflow: hidden; position: relative; background: ${tokens.black}; color: ${tokens.white}; font-family: Montserrat, sans-serif; }
.text { position: absolute; left: 72px; top: 132px; width: 570px; }
.eyebrow { font-size: 17px; font-weight: 600; letter-spacing: .22em; text-transform: uppercase; color: ${tokens.grey}; }
h1 { margin-top: 14px; font-size: 72px; font-weight: 700; line-height: 1.04; letter-spacing: -0.02em; }
.bar { width: 64px; height: 10px; margin-top: 26px; background: ${tokens.yellow}; }
.date { margin-top: 31px; font-size: 32px; font-weight: 800; color: ${tokens.yellow}; }
.venue { margin-top: 18px; font-size: 24px; font-weight: 500; line-height: 1.4; }
.venue span { display: block; color: ${tokens.grey}; }
.note { margin-top: 43px; font-size: 18px; font-weight: 600; }
.art { position: absolute; left: 600px; top: 0; right: 0; bottom: 0; overflow: hidden; }
.blue { position: absolute; left: -200px; top: 440px; width: 400px; height: 400px; border-radius: 50%; background: ${tokens.blue}; }
.circle { position: absolute; left: 50px; top: 60px; width: 510px; height: 510px; border-radius: 50%; background: ${tokens.white}; display: grid; place-items: center; }
.circle img { width: 372px; height: 372px; translate: 3px 0; }
.dots { position: absolute; right: 35px; top: 49px; display: grid; grid-template-columns: repeat(5, 6px); gap: 22px; }
.dots i { width: 6px; height: 6px; border-radius: 50%; background: ${tokens.white}; }
</style>
<div class="text">
  <p class="eyebrow">Capítulo OWASP Uruguay</p>
  <h1 id="title">${esc(event.title)}</h1>
  <div class="bar"></div>
  <p class="date">${esc(date[0].toUpperCase() + date.slice(1))}</p>
  <p class="venue">${esc(event.venue.name)}${event.ogImage?.place ? `<span>${esc(event.ogImage.place)}</span>` : ''}</p>
  ${event.ogImage?.note ? `<p class="note">${esc(event.ogImage.note)}</p>` : ''}
</div>
<div class="art">
  <div class="blue"></div>
  <div class="circle"><img alt="" src="${dataUrl('src/assets/brand/avispa-negra.svg', 'image/svg+xml')}"></div>
  <div class="dots">${'<i></i>'.repeat(20)}</div>
</div>`;

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  // Títulos largos: achica la letra hasta que entre en dos líneas sin cortar palabras.
  const size = await page.evaluate(() => {
    const h = document.getElementById('title');
    for (let s = 72; s >= 48; s -= 2) {
      h.style.fontSize = `${s}px`;
      if (h.scrollWidth <= h.clientWidth && h.getBoundingClientRect().height <= parseFloat(getComputedStyle(h).lineHeight) * 2 + 1) return s;
    }
    throw new Error(`El título no entra en dos líneas: "${h.textContent}"`);
  });
  await page.screenshot({ path: new URL('public/og-image.jpg', root).pathname, type: 'jpeg', quality: 88 });
  console.log(`public/og-image.jpg: "${event.title}" (título a ${size}px)`);
} finally {
  await browser.close();
}
