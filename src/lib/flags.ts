// Secciones que se prenden y apagan en build. Sin imports: se prueba con `node --test`.
// Lo apagado no se renderiza: no queda en el HTML publicado.

export type Sections = Record<string, boolean>;

/**
 * Combina `sections` de event.yaml con SHOW_HIDDEN ("all" o "speakers,agenda").
 * Devuelve qué se muestra y qué se está mostrando solo por SHOW_HIDDEN (para marcarlo en local).
 */
export function resolveSections(sections: Sections, showHidden = '') {
  const wanted = showHidden.split(',').map((s) => s.trim()).filter(Boolean);
  const all = wanted.includes('all');
  const on: Record<string, boolean> = {};
  const forced = new Set<string>();
  for (const [name, published] of Object.entries(sections)) {
    const force = !published && (all || wanted.includes(name));
    on[name] = published || force;
    if (force) forced.add(name);
  }
  return { on, forced };
}
