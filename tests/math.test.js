'use strict';

const assert = require('node:assert/strict');
const M = require('../js/math.js');

const close = (actual, expected, tolerance, label) => {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${label}: expected ${expected}, received ${actual}`);
};

close(M.gamma(0), 1, 1e-12, 'gamma at rest');
close(M.gamma(0.6), 1.25, 1e-12, 'gamma at beta 0.6');
close(M.gamma(0.8), 5 / 3, 1e-12, 'gamma at beta 0.8');
assert.equal(M.gamma(1), Infinity, 'gamma diverges at light speed');
close(M.timeDilation(2, 0.6), 2.5, 1e-12, 'time dilation');

const clock = M.lightClockGeometry(0.6, 3);
close(clock.properRoundTrip, 6, 1e-12, 'proper light-clock path');
close(clock.movingRoundTrip, 7.5, 1e-12, 'moving light-clock path');
close(clock.horizontalHalfDisplacement, 2.25, 1e-12, 'half-tick horizontal displacement');

assert.equal(M.choose(8, 0), 1);
assert.equal(M.choose(8, 4), 70);
assert.equal(M.choose(20, 10), 184756);
assert.equal(M.choose(8, 9), 0);
close(M.boltzmannEntropy(8, 4, 1), Math.log(70), 1e-12, 'dimensionless Boltzmann entropy');

const distribution = M.macrostateDistribution(12);
assert.equal(distribution.length, 13);
assert.equal(distribution[6].multiplicity, 924);
assert.ok(distribution[6].multiplicity > distribution[0].multiplicity, 'balanced macrostate has greater multiplicity');
assert.equal(distribution[5].multiplicity, distribution[7].multiplicity, 'binomial distribution is symmetric');

const rngA = M.createRng('replay');
const rngB = M.createRng('replay');
const sequenceA = Array.from({ length: 8 }, () => rngA());
const sequenceB = Array.from({ length: 8 }, () => rngB());
assert.deepEqual(sequenceA, sequenceB, 'seeded random generator replays exactly');
assert.ok(sequenceA.every((value) => value >= 0 && value < 1), 'random output stays in [0,1)');

close(M.meanSquaredDisplacement([{ x: 0, y: 0 }, { x: 3, y: 4 }]), 12.5, 1e-12, 'mean squared displacement');
close(M.diffractionIntensity(0, 550e-9, 6e-6, 1.4e-6, 1), 1, 1e-12, 'central diffraction maximum');
assert.ok(M.diffractionIntensity(0.05, 550e-9, 6e-6, 1.4e-6, 1) >= 0, 'diffraction intensity is non-negative');
assert.ok(M.diffractionIntensity(0.05, 550e-9, 6e-6, 1.4e-6, 1) <= 1, 'diffraction intensity is normalized');

close(M.idealPressureRatio(100, 2, 0.5), 400, 1e-12, 'ideal pressure direction');
close(M.thermalSpeedScale(2.25), 1.5, 1e-12, 'thermal speed square-root scaling');

console.log('Physics X 95 math and physics checks: PASS');
