// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';

// owasp-uruguay.github.io es la página de la organización: se sirve desde "/".
// BASE_PATH solo hace falta para probar el sitio bajo una subruta.
const base = process.env.BASE_PATH || '/';
const prefix = base.replace(/\/$/, '');

// Enlaces internos en Markdown/MDX ("/eventos/...") reciben el base.
const markdownProcessor = satteri({ hastPlugins: [{
  name: 'base-links',
  element: {
    filter: ['a', 'img'],
    visit(node, ctx) {
      const attr = node.tagName === 'a' ? 'href' : 'src';
      const v = node.properties?.[attr];
      if (prefix && typeof v === 'string' && v.startsWith('/') && !v.startsWith('//') && !v.startsWith(prefix + '/')) {
        ctx.setProperty(node, attr, prefix + v);
      }
    },
  },
}] });

export default defineConfig({
  site: process.env.SITE_URL || 'https://owasp-uruguay.github.io',
  base,
  trailingSlash: 'always',
  markdown: { processor: markdownProcessor },
  integrations: [mdx()],
});
