// Colecciones de contenido del sitio. Ver README.md para editar.
import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';
import yaml from 'js-yaml';

const person = z.object({
  name: z.string(),
  url: z.url().optional(),        // LinkedIn, GitHub, web personal
  org: z.string().optional(),
});

const link = z.object({
  label: z.string(),
  url: z.url(),
});

const isoDay = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Usá el formato AAAA-MM-DD entre comillas');

// Un evento = una carpeta src/content/events/<AAAA-MM-DD-slug>/ con index.mdx.
// Fotos (jpg/png/webp) y adjuntos (pdf, pptx, zip...) de esa carpeta se detectan solos: ver src/lib/events.ts.
const events = defineCollection({
  loader: glob({
    pattern: '*/index.{md,mdx}',
    base: './src/content/events',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      endDate: z.coerce.date().optional(),
      dateTbd: z.boolean().default(false),       // true = se muestra "Fecha a confirmar"
      kind: z.enum(['meetup', 'conferencia', 'taller', 'colaboracion', 'participacion']),
      summary: z.string(),
      venue: z
        .object({ name: z.string(), url: z.url().optional(), address: z.string().optional() })
        .optional(),
      online: z.boolean().default(false),
      links: z.array(link).default([]),
      talks: z
        .array(
          z.object({
            title: z.string(),
            speakers: z.array(person).default([]),
            slides: z.url().optional(),
            video: z.url().optional(),
            links: z.array(link).default([]),
            note: z.string().optional(),
          }),
        )
        .default([]),
      attachments: z
        .array(z.object({ label: z.string(), file: z.string().optional(), url: z.url().optional() }))
        .default([]),
      people: z.array(z.string()).default([]),
      cover: image().optional(),                 // si falta, se usa la primera foto
      page: z.string().optional(),               // página propia (ej. /owasp-day-2026/)
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

// ---------- OWASP Day 2026 ----------
// Datos en src/content/owasp-day-2026/*.yaml. Las listas son listas YAML simples:
// el orden del archivo es el orden en la página.
const dir = './src/content/owasp-day-2026';
const yamlList = (name: string) =>
  file(`${dir}/${name}`, {
    parser: (text) => {
      const items = (yaml.load(text) ?? []) as Record<string, unknown>[];
      return items.map((item, i) => ({ ...item, id: String(i + 1).padStart(3, '0') }));
    },
  });

const owaspDaySpeakers = defineCollection({
  loader: yamlList('speakers.yaml'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      lastName: z.string().default(''),
      role: z.string(),
      talk: z.string().optional(),
      photo: image().optional(),
      color: z.enum(['yellow', 'blue']).default('yellow'),
    }),
});

const owaspDayAgenda = defineCollection({
  loader: yamlList('agenda.yaml'),
  schema: z.object({
    time: z.string(),
    kind: z.enum(['session', 'break', 'mate']).default('session'),
    sessions: z
      .array(z.object({ track: z.enum(['main', 'lab', 'keynote', 'panel']).optional(), title: z.string(), by: z.string().optional() }))
      .min(1),
  }),
});

const owaspDaySponsors = defineCollection({
  loader: yamlList('sponsors.yaml'),
  schema: ({ image }) =>
    z.object({
      tier: z.enum(['platino', 'oro', 'plata', 'comunidad']),
      name: z.string(),
      logo: image().optional(),
      url: z.url().optional(),
    }),
});

const owaspDayFaq = defineCollection({
  loader: yamlList('faq.yaml'),
  schema: z.object({ q: z.string(), a: z.string() }),
});

// Ajustes generales del evento: un solo objeto (id "event").
const owaspDay = defineCollection({
  loader: file(`${dir}/event.yaml`, {
    parser: (text) => [{ ...(yaml.load(text) as object), id: 'event' }],
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: isoDay,
    time: z.string().default(''),                      // vacío = "Horario a confirmar"
    cfp: z.object({ url: z.url(), deadline: isoDay }),
    registration: z.object({ url: z.union([z.url(), z.literal('')]).default(''), provider: z.string().default('Eventbrite') }),
    sections: z.object({
      speakers: z.boolean().default(false),
      agenda: z.boolean().default(false),
      sponsors: z.boolean().default(false),
      faq: z.boolean().default(false),
    }),
    hero: z.object({ city: z.string(), tagline: z.string(), photoAlt: z.string() }),
    about: z.object({
      title: z.string(),
      lead: z.string(),
      text: z.string(),
      chapterTitle: z.string(),
      chapterText: z.string(),
    }),
    callForSpeakers: z.object({
      title: z.string(),
      text: z.string(),
      topics: z.array(z.string()),
      format: z.string(),
      closedText: z.string(),
    }),
    speakers: z.object({
      title: z.string(),
      note: z.string().optional(),
      moreTile: z.boolean().default(true),
      moreTitle: z.string(),
      moreText: z.string(),
      moreLink: z.object({ label: z.string(), url: z.string() }),
    }),
    agenda: z.object({ title: z.string(), note: z.string().optional() }),
    venue: z.object({
      title: z.string(),
      name: z.string(),
      address: z.string(),
      accessibility: z.string().optional(),
      mapQuery: z.string(),
    }),
    sponsors: z.object({ title: z.string(), button: z.string(), url: z.string() }),
    faq: z.object({ intro: z.string().optional() }),
  }),
});

export const collections = { events, owaspDay, owaspDaySpeakers, owaspDayAgenda, owaspDaySponsors, owaspDayFaq };
