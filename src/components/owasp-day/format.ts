// Formato mínimo para los textos editables de src/content/owasp-day/*.yaml:
// *resaltado*, **negrita**, [texto](url) y párrafos separados por una línea en blanco.
// Todo lo demás se escapa: el YAML nunca inyecta HTML.
import { url } from '~/lib/events';

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

// Solo enlaces seguros: https, mailto, anclas y rutas internas.
function linkHref(raw: string) {
  const href = raw.replace(/&amp;/g, '&');
  if (!/^(https?:\/\/|mailto:|#|\/)/.test(href)) return null;
  return escapeHtml(url(href));
}

/** Una línea con formato. `hl` es la clase del *resaltado* (por defecto hl-blue; '' = <span> sin clase). */
export function inline(text: string, { hl = 'hl-blue' as string | false } = {}) {
  return escapeHtml(text.trim())
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label, href) => {
      const h = linkHref(href);
      if (!h) return label;
      const external = /^https?:/.test(h);
      return `<a href="${h}"${external ? ' rel="noopener"' : ''}>${label}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, (_m, t) => (hl === false ? `<em>${t}</em>` : hl ? `<span class="${hl}">${t}</span>` : `<span>${t}</span>`));
}

/** "2026-11-30" → "lunes 30 de noviembre de 2026". */
export function longDate(day: string) {
  return new Intl.DateTimeFormat('es-UY', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${day}T12:00:00Z`));
}

/** Varios párrafos (separados por una línea en blanco), cada uno con formato de línea. */
export function paragraphs(text: string) {
  return text.split(/\n\s*\n/).map((p) => inline(p, { hl: false })).filter(Boolean);
}
