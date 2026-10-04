import { test } from 'node:test';
import assert from 'node:assert/strict';
import { endOfDay, heroCtas, isOver, parseNow, startOf, timeLabel } from '../../src/lib/when.ts';

const base = { cfpUrl: 'https://forms.example/cfp', cfpDeadline: '2026-10-19', registrationUrl: '' };

test('el día termina a las 23:59:59.999 de Montevideo (02:59 UTC del día siguiente)', () => {
  assert.equal(endOfDay('2026-11-30').toISOString(), '2026-12-01T02:59:59.999Z');
});

test('un evento sigue vigente hasta la medianoche de Montevideo, no la de UTC', () => {
  assert.equal(isOver('2026-11-30', new Date('2026-12-01T02:00:00Z')), false); // 23:00 en Montevideo
  assert.equal(isOver('2026-11-30', new Date('2026-12-01T03:00:00Z')), true);  // 00:00 del 1/12
});

test('NOW con solo fecha se toma al mediodía de Montevideo', () => {
  assert.equal(parseNow('2026-12-01').toISOString(), '2026-12-01T15:00:00.000Z');
  assert.throws(() => parseNow('mañana'));
});

test('el inicio usa la primera hora de `time` o las 00:00', () => {
  assert.equal(startOf('2026-11-30', '09:00 a 17:30').toISOString(), '2026-11-30T12:00:00.000Z');
  assert.equal(startOf('2026-11-30').toISOString(), '2026-11-30T03:00:00.000Z');
});

test('con el CFS abierto: primero postular, después registro deshabilitado', () => {
  const ctas = heroCtas({ ...base, now: new Date('2026-10-19T20:00:00-03:00') });
  assert.deepEqual(ctas.map((c) => c.id), ['cfp', 'registration']);
  assert.equal(ctas[0].href, base.cfpUrl);
  assert.equal(ctas[1].disabled, true);
  assert.equal(ctas[1].href, undefined);
});

test('después del cierre del CFS queda solo el registro', () => {
  const ctas = heroCtas({ ...base, now: new Date('2026-10-20T00:00:01-03:00') });
  assert.deepEqual(ctas.map((c) => c.id), ['registration']);
});

test('con URL de registro el botón se habilita', () => {
  const [, reg] = heroCtas({ ...base, registrationUrl: 'https://www.eventbrite.com/e/x', now: new Date('2026-10-01T12:00:00-03:00') });
  assert.equal(reg.disabled, false);
  assert.equal(reg.href, 'https://www.eventbrite.com/e/x');
});

test('sin horario se muestra "Horario a confirmar"', () => {
  assert.equal(timeLabel(''), 'Horario a confirmar');
  assert.equal(timeLabel('09:00 a 17:30'), '09:00 a 17:30');
});
