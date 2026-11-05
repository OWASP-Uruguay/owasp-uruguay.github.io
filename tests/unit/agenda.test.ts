import { test } from 'node:test';
import assert from 'node:assert/strict';
import { joinNames, resolveSession, type Talk } from '../../src/lib/agenda.ts';

const generic = { title: 'Charla 3', by: 'TBD', talk: '3' };
const talk: Talk = {
  title: 'Título real',
  language: 'en',
  abstract: 'Resumen',
  speakers: [{ name: 'Ana', lastName: 'Pérez' }, { name: 'Luis' }],
};

test('sin publicar solo se ve el texto genérico, aunque exista la charla', () => {
  const shown = resolveSession(generic, talk, false);
  assert.deepEqual(shown, { title: 'Charla 3', by: 'TBD' });
});

test('publicada toma título, oradores y la charla completa', () => {
  const shown = resolveSession(generic, talk, true);
  assert.equal(shown.title, 'Título real');
  assert.equal(shown.by, 'Ana Pérez y Luis');
  assert.equal(shown.talk, talk);
});

test('publicada pero sin charla en talks.yaml, queda el texto genérico', () => {
  assert.deepEqual(resolveSession(generic, undefined, true), { title: 'Charla 3', by: 'TBD' });
});

test('una charla publicada sin oradores (panel a definir) conserva el "by" genérico', () => {
  const panel = resolveSession({ title: 'Panel', by: 'Panelistas: TBD', talk: 'panel' }, { title: 'Panel', speakers: [] }, true);
  assert.equal(panel.by, 'Panelistas: TBD');
});

test('joinNames', () => {
  assert.equal(joinNames([]), '');
  assert.equal(joinNames(['A']), 'A');
  assert.equal(joinNames(['A', 'B']), 'A y B');
  assert.equal(joinNames(['A', 'B', 'C']), 'A, B y C');
});
