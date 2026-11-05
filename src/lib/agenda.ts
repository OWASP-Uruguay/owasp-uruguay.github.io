// Qué se muestra de cada sesión de la agenda. Sin imports de Astro: se prueba con `node --test`.
// Mientras `published` sea false se usa solo el texto genérico de agenda.yaml; el detalle de
// talks.yaml (título, oradores, resumen) no pasa de acá, así que no llega al HTML.

export interface Person { name: string; lastName?: string }
export interface Talk { title: string; language?: string; abstract?: string; speakers: Person[] }
export interface Session { title: string; by?: string; talk?: string }
export interface ShownSession { title: string; by?: string; talk?: Talk }

export const fullName = (p: Person) => `${p.name} ${p.lastName ?? ''}`.trim();

/** ["A"] → "A"; ["A", "B"] → "A y B"; ["A", "B", "C"] → "A, B y C". */
export function joinNames(names: string[]) {
  if (names.length < 2) return names.join('');
  return `${names.slice(0, -1).join(', ')} y ${names[names.length - 1]}`;
}

export function resolveSession(session: Session, talk: Talk | undefined, published: boolean): ShownSession {
  if (!published || !talk) return { title: session.title, by: session.by };
  const names = talk.speakers.map(fullName);
  return { title: talk.title, by: names.length ? joinNames(names) : session.by, talk };
}
