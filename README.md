# Eventos de OWASP Uruguay

Sitio comunitario de eventos del capítulo OWASP Uruguay: el OWASP Meetup+ 2026 y el archivo de meetups, conferencias y talleres desde 2010, con charlas, materiales y fotos. No es el sitio oficial del capítulo, que está en https://owasp.org/chapters/uruguay.

Hecho con [Astro](https://astro.build/), publicado en GitHub Pages en https://owasp-uruguay.github.io/.

## Trabajar en tu computadora

Requisitos: Node.js 22.12 o más nuevo (recomendado 24, ver `.nvmrc`) y Git.

```sh
npm install
npm run dev          # http://localhost:4321/, se actualiza al guardar
npm run dev:all      # igual, mostrando también las secciones ocultas
npm run verify       # tests, chequeo de tipos, build y tests sobre dist/ (lo mismo que CI)
npm run preview      # sirve dist/ como en producción
```

`npm run verify` deja la salida completa en `.logs/verify.log`.

Para ver cómo se verá el sitio otro día: `NOW=2026-12-01 npm run dev`. Sirve para revisar el cierre del call for speakers o la portada después del evento.

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Datos del OWASP Meetup+ 2026 (fecha, horario, CFS, registro, textos) | `src/content/owasp-day-2026/event.yaml` |
| Oradores, agenda, sponsors y FAQ del evento | `src/content/owasp-day-2026/*.yaml` |
| Eventos pasados y futuros | `src/content/events/<AAAA-MM-DD-slug>/index.mdx`, con `fotos/` y `adjuntos/` |
| Enlaces, redes, aviso de sitio no oficial, favicon | `src/data/site.ts` |
| Logos | `src/assets/brand/` y `public/favicons/` |
| Imagen para redes (`public/og-image.jpg`) | se genera con `npm run og-image` desde `event.yaml` (título, fecha, sala y `ogImage`) |

## El OWASP Meetup+ 2026

La portada muestra la página del evento hasta el final del 30 de noviembre (hora de Montevideo). Desde el día siguiente pasa a mostrar el archivo de eventos. La página sigue en `/owasp-meetup-plus-2026/`; la ruta anterior, `/owasp-day-2026/`, redirige ahí.

Lo que cambia solo, según la fecha: el botón "Postulá tu charla" desaparece después del 19 de octubre y la tarjeta del CFS pasa a "Convocatoria cerrada". El sitio se vuelve a publicar todos los días a las 06:00 para que esos cambios entren.

Lo que se cambia en `event.yaml`:

- `registration.url`: el link de Eventbrite. Vacío, el botón de registro se ve deshabilitado con "próximamente".
- `time`: el horario, por ejemplo `"09:00 a 17:30"`. Vacío, se lee "Horario a confirmar".
- `sections`: oradores, agenda, sponsors y FAQ. En `false` no se publican: no quedan ni en el HTML. Para verlas en local sin tocar el archivo, `npm run dev:all` (aparecen con un borde rojo punteado).

## Agregar un evento

1. Creá `src/content/events/AAAA-MM-DD-slug/index.mdx`, por ejemplo `2026-03-12-meetup-marzo`. Minúsculas, números y guiones. El nombre de la carpeta es la dirección: `/eventos/2026-03-12-meetup-marzo/`.
2. Fotos en `fotos/` (`01.jpg`, `02.jpg`...), adjuntos en `adjuntos/`. Se detectan solos.
3. Usá `index.mdx`, no `index.md`.

```mdx
---
title: Meetup de marzo 2026
date: 2026-03-12
kind: meetup            # meetup, conferencia, taller, colaboracion o participacion
summary: Dos charlas sobre seguridad en APIs y cadena de suministro.
venue:
  name: Universidad Ejemplo
  address: Av. 18 de Julio 1234, Montevideo
links:
  - label: Página en Meetup
    url: https://www.meetup.com/owasp-uruguay-chapter/events/123/
talks:
  - title: "API Security Top 10 en la práctica"
    speakers:
      - name: Ana Pérez
        url: https://www.linkedin.com/in/anaperez
    slides: https://docs.google.com/presentation/d/xxxx
---

Texto libre del evento, en Markdown.
```

Otros campos: `endDate`, `dateTbd`, `online`, `attachments`, `people`, `cover`, `page`, `featured`, `draft`. Están descriptos en `src/content.config.ts`.

## Fotos

JPG horizontal, 1600 px de ancho como máximo, menos de 400 KB, sin metadatos (EXIF puede traer la ubicación). Publicá solo fotos donde la gente aceptó salir.

```sh
magick mogrify -resize '1600x1600>' -quality 75 -strip *.jpg
```

## Publicación

`.github/workflows/site.yml` corre tests y build en cada pull request, y en cada push a `main` (más una vez por día) también publica. La primera vez hay que poner **Settings → Pages → Source** en "GitHub Actions".

## Licencias

El código del sitio es MIT (ver `LICENSE`) y los textos de `src/content/` son CC BY-SA 4.0. Las fotos, presentaciones y logos no entran en esas licencias. Las fuentes Montserrat y Oswald son SIL OFL 1.1 (`src/assets/brand/fonts/OFL.txt`). OWASP y el logo de OWASP son marcas registradas de la OWASP Foundation, Inc.

Las dependencias de npm se usan para compilar y no se suben al repo ni al sitio publicado, así que sus licencias (MIT, Apache 2.0, MPL 2.0 y LGPL de libvips en `sharp`) no condicionan las de arriba.
