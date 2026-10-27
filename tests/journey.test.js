import test from 'node:test';
import assert from 'node:assert/strict';
import { getJourneyState, getCameraFrame, getSmokeFrame } from '../src/features/journey.js';

test('story follows actual sticky geometry through all four stages', () => {
  // Section starts below an 88px header; 1,600px of natural scroll is available.
  assert.equal(getJourneyState(88, 2400, 800, 88).stage, 0);
  assert.equal(getJourneyState(-312, 2400, 800, 88).stage, 1);
  assert.equal(getJourneyState(-712, 2400, 800, 88).stage, 2);
  assert.equal(getJourneyState(-1112, 2400, 800, 88).stage, 3);
  assert.deepEqual(getJourneyState(-1512, 2400, 800, 88), { progress: 1, stage: 3, localProgress: 1 });
});
test('story clamps scrolling before and after its range and avoids zero division', () => {
  assert.deepEqual(getJourneyState(600, 2400, 800, 88), { progress: 0, stage: 0, localProgress: 0 });
  assert.deepEqual(getJourneyState(-5000, 2400, 800, 88), { progress: 1, stage: 3, localProgress: 1 });
  const state = getJourneyState(0, 500, 500, 0);
  assert.ok(Number.isFinite(state.progress));
  assert.equal(state.stage, 0);
});

test('cinematic camera remains finite and travels forward across the complete timeline', () => {
  let lastX = -Infinity;
  for (let step = 0; step <= 100; step++) {
    const frame = getCameraFrame(step / 100);
    assert.ok(Number.isFinite(frame.x) && Number.isFinite(frame.y) && Number.isFinite(frame.zoom));
    assert.ok(frame.zoom > 0 && frame.zoom < 3);
    assert.ok(frame.x >= lastX);
    lastX = frame.x;
  }
  assert.deepEqual(getCameraFrame(-1), getCameraFrame(0));
  assert.deepEqual(getCameraFrame(2), getCameraFrame(1));
});

test('emissions smoke is confined to the final transition and dissolves at its end', () => {
  for (let index = 0; index < 7; index++) {
    for (const progress of [-1, 0, .5, .68, .95, 1, 2]) assert.equal(getSmokeFrame(progress, index).opacity, 0);
    const puff = getSmokeFrame(.81, index);
    assert.ok(puff.opacity > 0 && puff.opacity <= .55);
    assert.ok(puff.x >= 1632 && puff.x <= 2248);
    assert.ok(Number.isFinite(puff.y) && puff.scale > 0);
  }
});

test('smoke billows travel toward emissions in sequence without moving the earlier camera stages', () => {
  const leading = getSmokeFrame(.81, 0);
  const trailing = getSmokeFrame(.81, 6);
  assert.ok(leading.x > trailing.x);
  assert.ok(getSmokeFrame(.86, 0).x > leading.x);
  assert.ok(leading.scale > trailing.scale);
});
