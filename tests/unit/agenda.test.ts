import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isPublished, joinNames, resolveSession, visibleSpeakers, type Talk } from '../../src/lib/agenda.ts';

const generic = { title: 'Charla 3', by: 'TBD', talk: '3' };
const ana = { name: 'Ana', lastName: 'Pérez' };
const luis = { name: 'Luis' };
const talk = (extra: Partial<Talk> = {}): Talk => ({ title: 'Título real', language: 'en', abstract: 'Resumen', speakers: [ana, luis], ...extra });

test('sin publicar solo se ve el texto genérico, aunque exista la charla', () => {
  assert.deepEqual(resolveSession(generic, talk(), false), { title: 'Charla 3', by: 'TBD' });
  assert.deepEqual(resolveSession(generic, talk({ published: false }), false), { title: 'Charla 3', by: 'TBD' });
});

test('publicada toma título, oradores y la charla completa', () => {
  const t = talk({ published: true });
  const shown = resolveSession(generic, t);
  assert.equal(shown.title, 'Título real');
  assert.equal(shown.by, 'Ana Pérez y Luis');
  assert.equal(shown.talk, t);
});

test('`all` publica todo aunque la charla no lo esté', () => {
  assert.equal(resolveSession(generic, talk(), true).title, 'Título real');
  assert.equal(isPublished(talk(), true), true);
});

test('sin charla en talks.yaml queda el texto genérico', () => {
  assert.deepEqual(resolveSession(generic, undefined, true), { title: 'Charla 3', by: 'TBD' });
});

test('los oradores heredan el estado de la charla, y `published` propio lo pisa', () => {
  assert.deepEqual(visibleSpeakers(talk({ published: true })).map((s) => s.name), ['Ana', 'Luis']);
  assert.deepEqual(visibleSpeakers(talk()).map((s) => s.name), []);
  assert.deepEqual(visibleSpeakers(talk({ published: true, speakers: [ana, { ...luis, published: false }] })).map((s) => s.name), ['Ana']);
  assert.deepEqual(visibleSpeakers(talk({ speakers: [ana, { ...luis, published: true }] })).map((s) => s.name), ['Luis']);
  assert.deepEqual(visibleSpeakers(talk(), true).map((s) => s.name), ['Ana', 'Luis']);
});

test('panel: charla sin publicar con panelistas anunciados de a uno', () => {
  const panel = talk({ title: 'Panel', abstract: undefined, speakers: [{ ...ana, published: true }, luis] });
  const session = { title: 'Panel de ciberdelito', by: 'Panelistas: TBD', talk: 'panel' };
  assert.deepEqual(resolveSession(session, panel), { title: 'Panel de ciberdelito', by: 'Ana Pérez' });
  const sinNadie = talk({ speakers: [luis] });
  assert.deepEqual(resolveSession(session, sinNadie), { title: 'Panel de ciberdelito', by: 'Panelistas: TBD' });
});

test('joinNames', () => {
  assert.equal(joinNames([]), '');
  assert.equal(joinNames(['A']), 'A');
  assert.equal(joinNames(['A', 'B']), 'A y B');
  assert.equal(joinNames(['A', 'B', 'C']), 'A, B y C');
});
