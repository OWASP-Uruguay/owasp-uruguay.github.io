// Datos generales del sitio: enlaces, redes, menú y favicon.
export const chapter = {
  name: 'OWASP Uruguay',
  founded: 2010,
  tagline: 'Eventos, charlas y fotos del capítulo uruguayo de OWASP.',
  owaspPage: 'https://owasp.org/chapters/uruguay',
};

// Texto del aviso de sitio no oficial (barra superior y pie).
export const disclaimer = {
  short: 'Sitio comunitario de eventos de OWASP Uruguay, no oficial.',
  text: 'Sitio comunitario de eventos del capítulo OWASP Uruguay. No es el sitio oficial de la OWASP Foundation ni del capítulo.',
  linkLabel: 'Ir al sitio oficial',
};

// Favicon: 'avispa' (avispa con mate) u 'owasp-uy' (logo circular). Archivos en public/favicons/.
export const favicon: 'avispa' | 'owasp-uy' = 'avispa';

// Redes del capítulo. `icon` elige el SVG en components/SocialIcon.astro.
export const social = [
  { label: 'Meetup', url: 'https://www.meetup.com/OWASP-Uruguay-Chapter', icon: 'meetup' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/groups/3673287/', icon: 'linkedin' },
  { label: 'YouTube', url: 'https://www.youtube.com/@owasp_uy', icon: 'youtube' },
  { label: 'GitHub', url: 'https://github.com/OWASP-Uruguay', icon: 'github' },
  { label: 'X (Twitter)', url: 'https://twitter.com/owasp_uy', icon: 'x' },
  { label: 'Slack', url: 'https://owasp.slack.com/messages/owasp-uruguay/', icon: 'slack' },
] as const;

export const joinLinks = {
  slackInvite: 'https://owasp.org/slack/invite',
  googleGroup: 'https://groups.google.com/a/owasp.org/forum/#!forum/uruguay-chapter',
  membership: 'https://owasp.org/membership/',
  codeOfConduct: 'https://owasp.org/www-policy/operational/code-of-conduct',
};

// Ítem del menú. `mobileOnly` lo oculta en escritorio.
export interface NavItem { label: string; href: string; mobileOnly?: boolean }

export const nav: NavItem[] = [
  { label: 'OWASP Day 2026', href: '/owasp-day-2026/' },
  { label: 'Eventos', href: '/eventos/' },
];
