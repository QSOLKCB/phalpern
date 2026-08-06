/*
 * Physics X 95 mathematical helpers
 * Copyright (c) 2026 QSOL-IMC
 * SPDX-License-Identifier: MPL-2.0
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.PhysicsXMath = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const TAU = Math.PI * 2;
  const EPSILON = 1e-12;

  function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
  }

  function lerp(start, end, amount) {
    return start + (end - start) * amount;
  }

  function mapRange(value, inMinimum, inMaximum, outMinimum, outMaximum) {
    if (inMaximum === inMinimum) return outMinimum;
    const amount = (value - inMinimum) / (inMaximum - inMinimum);
    return lerp(outMinimum, outMaximum, amount);
  }

  function seedFrom(value) {
    if (Number.isInteger(value)) return value >>> 0;
    const input = String(value == null ? 'physics-x-95' : value);
    let hash = 2166136261;
    for (let index = 0; index < input.length; index += 1) {
      hash ^= input.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function createRng(seed) {
    let state = seedFrom(seed);
    return function random() {
      state = (state + 0x6D2B79F5) >>> 0;
      let mixed = state;
      mixed = Math.imul(mixed ^ (mixed >>> 15), mixed | 1);
      mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);
      return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
    };
  }

  function randomBetween(random, minimum, maximum) {
    return minimum + random() * (maximum - minimum);
  }

  function gamma(beta) {
    const speed = Math.abs(Number(beta));
    if (!Number.isFinite(speed) || speed >= 1) return Infinity;
    return 1 / Math.sqrt(1 - speed * speed);
  }

  function timeDilation(properTime, beta) {
    return Number(properTime) * gamma(beta);
  }

  function lightClockGeometry(beta, mirrorSeparation) {
    const separation = Number(mirrorSeparation == null ? 1 : mirrorSeparation);
    const factor = gamma(beta);
    return Object.freeze({
      beta: Math.abs(Number(beta)),
      gamma: factor,
      properHalfPath: separation,
      movingHalfPath: separation * factor,
      properRoundTrip: 2 * separation,
      movingRoundTrip: 2 * separation * factor,
      horizontalHalfDisplacement: separation * factor * Math.abs(Number(beta))
    });
  }

  function choose(n, k) {
    const total = Math.trunc(n);
    let selected = Math.trunc(k);
    if (total < 0 || selected < 0 || selected > total) return 0;
    selected = Math.min(selected, total - selected);
    let result = 1;
    for (let index = 1; index <= selected; index += 1) {
      result = (result * (total - selected + index)) / index;
    }
    return Math.round(result);
  }

  function logFactorial(n) {
    let result = 0;
    for (let value = 2; value <= Math.trunc(n); value += 1) result += Math.log(value);
    return result;
  }

  function logChoose(n, k) {
    const total = Math.trunc(n);
    const selected = Math.trunc(k);
    if (total < 0 || selected < 0 || selected > total) return -Infinity;
    return logFactorial(total) - logFactorial(selected) - logFactorial(total - selected);
  }

  function boltzmannEntropy(n, k, boltzmannConstant) {
    const kB = boltzmannConstant == null ? 1 : Number(boltzmannConstant);
    return kB * logChoose(n, k);
  }

  function macrostateDistribution(n) {
    const total = clamp(Math.trunc(n), 0, 60);
    return Array.from({ length: total + 1 }, (_, k) => ({
      k,
      multiplicity: choose(total, k),
      logMultiplicity: logChoose(total, k)
    }));
  }

  function meanSquaredDisplacement(points, origin) {
    if (!Array.isArray(points) || points.length === 0) return 0;
    const start = origin || points[0];
    const sum = points.reduce((total, point) => {
      const dx = Number(point.x) - Number(start.x);
      const dy = Number(point.y) - Number(start.y);
      return total + dx * dx + dy * dy;
    }, 0);
    return sum / points.length;
  }

  function sinc(value) {
    return Math.abs(value) < EPSILON ? 1 : Math.sin(value) / value;
  }

  function diffractionIntensity(screenPosition, wavelength, slitSeparation, slitWidth, screenDistance) {
    const y = Number(screenPosition);
    const lambda = Math.max(EPSILON, Number(wavelength));
    const separation = Math.max(0, Number(slitSeparation));
    const width = Math.max(0, Number(slitWidth));
    const distance = Math.max(EPSILON, Number(screenDistance));
    const sineTheta = y / Math.sqrt(y * y + distance * distance);
    const envelopeArgument = Math.PI * width * sineTheta / lambda;
    const interferenceArgument = Math.PI * separation * sineTheta / lambda;
    const envelope = sinc(envelopeArgument) ** 2;
    const interference = Math.cos(interferenceArgument) ** 2;
    return clamp(envelope * interference, 0, 1);
  }

  function idealPressureRatio(particleCount, temperature, volume) {
    const count = Math.max(0, Number(particleCount));
    const temp = Math.max(0, Number(temperature));
    const size = Math.max(EPSILON, Number(volume));
    return count * temp / size;
  }

  function thermalSpeedScale(temperature) {
    return Math.sqrt(Math.max(0, Number(temperature)));
  }

  function vectorLength(x, y) {
    return Math.hypot(Number(x), Number(y));
  }

  function normalizeVector(x, y) {
    const length = vectorLength(x, y);
    if (length < EPSILON) return { x: 0, y: 0 };
    return { x: x / length, y: y / length };
  }

  function formatNumber(value, digits) {
    if (!Number.isFinite(value)) return '∞';
    return Number(value).toLocaleString('en', {
      maximumFractionDigits: digits == null ? 2 : digits,
      minimumFractionDigits: 0
    });
  }

  return Object.freeze({
    TAU,
    EPSILON,
    clamp,
    lerp,
    mapRange,
    seedFrom,
    createRng,
    randomBetween,
    gamma,
    timeDilation,
    lightClockGeometry,
    choose,
    logChoose,
    boltzmannEntropy,
    macrostateDistribution,
    meanSquaredDisplacement,
    sinc,
    diffractionIntensity,
    idealPressureRatio,
    thermalSpeedScale,
    vectorLength,
    normalizeVector,
    formatNumber
  });
});
