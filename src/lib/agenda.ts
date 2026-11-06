// Qué se publica de cada charla de la agenda y de los oradores. Sin imports de Astro: se prueba con `node --test`.
//
// Cada charla de talks.yaml se publica con `published: true`. Una charla sin publicar muestra en la agenda
// solo el texto genérico de agenda.yaml (ej. "Charla 2 / TBD") y nada de ella llega al HTML.
// Cada orador hereda el estado de su charla, salvo que tenga su propio `published` (sirve para el panel,
// donde se anuncian de a uno). `all` publica todo (sections.talks en event.yaml, o SHOW_HIDDEN en local).

export interface Person { name: string; lastName?: string; published?: boolean }
export interface Talk { title: string; language?: string; abstract?: string; published?: boolean; speakers: Person[] }
export interface Session { title: string; by?: string; talk?: string }
export interface ShownSession { title: string; by?: string; talk?: Talk }

export const fullName = (p: Person) => `${p.name} ${p.lastName ?? ''}`.trim();

/** ["A"] → "A"; ["A", "B"] → "A y B"; ["A", "B", "C"] → "A, B y C". */
export function joinNames(names: string[]) {
  if (names.length < 2) return names.join('');
  return `${names.slice(0, -1).join(', ')} y ${names[names.length - 1]}`;
}

/** Título, resumen e idioma de la charla se muestran. */
export const isPublished = (talk: Talk, all = false) => all || talk.published === true;

/** Oradores que se muestran: los que tienen `published`, o todos los de la charla si ella está publicada. */
export const visibleSpeakers = <T extends Person>(talk: { published?: boolean; speakers: T[] }, all = false) =>
  talk.speakers.filter((s) => all || (s.published ?? talk.published === true));

export function resolveSession(session: Session, talk: Talk | undefined, all = false): ShownSession {
  if (!talk) return { title: session.title, by: session.by };
  const names = visibleSpeakers(talk, all).map(fullName);
  const by = names.length ? joinNames(names) : session.by;
  if (!isPublished(talk, all)) return { title: session.title, by };
  return { title: talk.title, by, talk };
}
