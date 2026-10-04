import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveSections } from '../../src/lib/flags.ts';

const sections = { speakers: false, agenda: false, sponsors: true, faq: false };

test('sin SHOW_HIDDEN se respeta event.yaml', () => {
  const { on, forced } = resolveSections(sections);
  assert.deepEqual(on, sections);
  assert.equal(forced.size, 0);
});

test('SHOW_HIDDEN=all prende todo y marca solo lo que estaba apagado', () => {
  const { on, forced } = resolveSections(sections, 'all');
  assert.ok(Object.values(on).every(Boolean));
  assert.deepEqual([...forced].sort(), ['agenda', 'faq', 'speakers']);
});

test('SHOW_HIDDEN con lista prende solo esas', () => {
  const { on, forced } = resolveSections(sections, 'speakers, agenda');
  assert.equal(on.speakers, true);
  assert.equal(on.agenda, true);
  assert.equal(on.faq, false);
  assert.deepEqual([...forced].sort(), ['agenda', 'speakers']);
});
