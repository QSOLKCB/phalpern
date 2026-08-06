/*
 * Physics X 95 interactive atlas
 * Copyright (c) 2026 QSOL-IMC
 * SPDX-License-Identifier: MPL-2.0
 */
(function (root, factory) {
  const api = factory(root.PhysicsXMath, root.PhysicsXContent);
  root.PhysicsXAtlas = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (M, C) {
  'use strict';

  if (!M || !C) throw new Error('Physics X 95 atlas dependencies did not load.');

  const WIDTH = 960;
  const HEIGHT = 560;
  const reducedMotion = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = { canvas: null, controls: null, readout: null, detail: null };
  let context = null;
  let current = null;
  let frameId = 0;

  const escapeHTML = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  function palette() {
    const styles = getComputedStyle(document.documentElement);
    const variable = (name, fallback) => styles.getPropertyValue(name).trim() || fallback;
    return {
      background: variable('--canvas', '#111a19'),
      grid: variable('--canvas-grid', '#314641'),
      ink: variable('--canvas-ink', '#ede2c5'),
      accent: variable('--canvas-accent', '#d88a55'),
      signal: variable('--canvas-signal', '#e0bd62'),
      cool: variable('--canvas-cool', '#78aaa0'),
      paper: variable('--paper', '#fffaf0'),
      inkSoft: variable('--ink-soft', '#58625d')
    };
  }

  function mount(options) {
    elements.canvas = options.canvas;
    elements.controls = options.controls;
    elements.readout = options.readout;
    elements.detail = options.detail;
    if (!elements.canvas) throw new Error('Atlas canvas is required.');
    elements.canvas.width = WIDTH;
    elements.canvas.height = HEIGHT;
    context = elements.canvas.getContext('2d', { alpha: false });
  }

  function addCleanup(handler) {
    if (current) current.cleanups.push(handler);
  }

  function listen(target, name, handler, options) {
    target.addEventListener(name, handler, options);
    addCleanup(() => target.removeEventListener(name, handler, options));
  }

  function control(selector) {
    return elements.controls.querySelector(selector);
  }

  function setControls(markup) {
    elements.controls.innerHTML = markup;
  }

  function setReadout(items) {
    elements.readout.innerHTML = items.map((item) => `
      <div class="readout-item">
        <strong>${escapeHTML(item.label)}</strong>
        <span>${escapeHTML(item.value)}</span>
      </div>`).join('');
  }

  function setDetail(markup) {
    elements.detail.innerHTML = markup || '';
    elements.detail.hidden = !markup;
  }

  function clearCanvas() {
    const p = palette();
    context.fillStyle = p.background;
    context.fillRect(0, 0, WIDTH, HEIGHT);
    context.strokeStyle = p.grid;
    context.lineWidth = 1;
    context.globalAlpha = 0.45;
    for (let x = 0; x <= WIDTH; x += 40) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, HEIGHT);
      context.stroke();
    }
    for (let y = 0; y <= HEIGHT; y += 40) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(WIDTH, y);
      context.stroke();
    }
    context.globalAlpha = 1;
  }

  function roundedRect(x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    context.beginPath();
    context.moveTo(x + r, y);
    context.arcTo(x + width, y, x + width, y + height, r);
    context.arcTo(x + width, y + height, x, y + height, r);
    context.arcTo(x, y + height, x, y, r);
    context.arcTo(x, y, x + width, y, r);
    context.closePath();
  }

  function wrapText(text, x, y, maximumWidth, lineHeight, maximumLines) {
    const words = String(text).split(/\s+/);
    const lines = [];
    let line = '';
    words.forEach((word) => {
      const candidate = line ? `${line} ${word}` : word;
      if (context.measureText(candidate).width > maximumWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = candidate;
      }
    });
    if (line) lines.push(line);
    const limit = maximumLines == null ? lines.length : Math.min(maximumLines, lines.length);
    for (let index = 0; index < limit; index += 1) {
      let output = lines[index];
      if (index === limit - 1 && lines.length > limit) output = `${output.replace(/[.,;:]?$/, '')}…`;
      context.fillText(output, x, y + index * lineHeight);
    }
    return limit * lineHeight;
  }

  function heading(title, subtitle) {
    const p = palette();
    context.fillStyle = p.ink;
    context.font = '700 20px Georgia, serif';
    context.fillText(title, 28, 34);
    context.fillStyle = p.cool;
    context.font = '12px Tahoma, sans-serif';
    context.fillText(subtitle, 28, 54);
  }

  function schedule() {
    cancelAnimationFrame(frameId);
    if (!current || !current.animated || current.paused) return;
    frameId = requestAnimationFrame(tick);
  }

  function tick(timestamp) {
    if (!current) return;
    const elapsed = current.lastTime ? Math.min(0.04, (timestamp - current.lastTime) / 1000) : 0;
    current.lastTime = timestamp;
    if (!current.paused && current.update) current.update(elapsed);
    current.draw();
    schedule();
  }

  function render() {
    if (current && current.draw) current.draw();
  }

  function togglePaused(button) {
    current.paused = !current.paused;
    current.lastTime = 0;
    button.textContent = current.paused ? 'Resume' : 'Pause';
    render();
    schedule();
  }

  function stop() {
    cancelAnimationFrame(frameId);
    frameId = 0;
    if (current) current.cleanups.forEach((cleanup) => cleanup());
    current = null;
    if (elements.controls) elements.controls.innerHTML = '';
    if (elements.readout) elements.readout.innerHTML = '';
    if (elements.detail) {
      elements.detail.innerHTML = '';
      elements.detail.hidden = true;
    }
    if (context) clearCanvas();
  }

  function start(id) {
    stop();
    current = { id, cleanups: [], animated: false, paused: reducedMotion, update: null, draw: null, lastTime: 0 };
    const starters = {
      'kinetic-gas': startKineticGas,
      'entropy-board': startEntropyBoard,
      'brownian-microscope': startBrownianMicroscope,
      'annus-map': startAnnusMap,
      'light-clock': startLightClock,
      'solvay-map': startSolvayMap,
      'double-slit': startDoubleSlit
    };
    if (!starters[id]) throw new Error(`Unknown atlas exhibit: ${id}`);
    starters[id]();
    render();
    schedule();
  }

  function startKineticGas() {
    const state = current;
    state.animated = true;
    state.temperature = 1;
    state.count = 72;
    state.volume = 0.82;
    state.particles = [];
    state.pressureProxy = 0;
    state.impulse = 0;
    state.sampleTime = 0;
    state.readoutCounter = 0;

    setControls(`
      <label>Temperature <output id="temperatureOutput">1.00×</output><input id="temperatureControl" type="range" min="0.35" max="2.5" step="0.05" value="1"></label>
      <label>Particles <output id="particleOutput">72</output><input id="particleControl" type="range" min="24" max="144" step="4" value="72"></label>
      <label>Chamber volume <output id="volumeOutput">0.82</output><input id="volumeControl" type="range" min="0.5" max="1" step="0.02" value="0.82"></label>
      <button id="pauseControl" type="button">${state.paused ? 'Resume' : 'Pause'}</button>
      <button id="resetControl" type="button">Reset seed</button>`);

    function bounds() {
      const chamberWidth = 800 * state.volume;
      return { left: 480 - chamberWidth / 2, right: 480 + chamberWidth / 2, top: 76, bottom: 394 };
    }

    function resetParticles() {
      const random = M.createRng(1905 + state.count);
      const box = bounds();
      state.particles = Array.from({ length: state.count }, () => {
        const angle = random() * M.TAU;
        const speed = M.randomBetween(random, 30, 76);
        return {
          x: M.randomBetween(random, box.left + 7, box.right - 7),
          y: M.randomBetween(random, box.top + 7, box.bottom - 7),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 3
        };
      });
      state.pressureProxy = 0;
      state.impulse = 0;
      state.sampleTime = 0;
      state.lastTime = 0;
    }

    resetParticles();

    const temperatureInput = control('#temperatureControl');
    const particleInput = control('#particleControl');
    const volumeInput = control('#volumeControl');
    listen(temperatureInput, 'input', () => {
      state.temperature = Number(temperatureInput.value);
      control('#temperatureOutput').value = `${state.temperature.toFixed(2)}×`;
      render();
    });
    listen(particleInput, 'input', () => {
      state.count = Number(particleInput.value);
      control('#particleOutput').value = String(state.count);
      resetParticles();
      render();
    });
    listen(volumeInput, 'input', () => {
      state.volume = Number(volumeInput.value);
      control('#volumeOutput').value = state.volume.toFixed(2);
      const box = bounds();
      state.particles.forEach((particle) => {
        particle.x = M.clamp(particle.x, box.left + particle.radius, box.right - particle.radius);
      });
      render();
    });
    listen(control('#pauseControl'), 'click', (event) => togglePaused(event.currentTarget));
    listen(control('#resetControl'), 'click', () => {
      resetParticles();
      render();
      schedule();
    });

    state.update = (elapsed) => {
      const box = bounds();
      const scale = M.thermalSpeedScale(state.temperature);
      state.particles.forEach((particle) => {
        particle.x += particle.vx * scale * elapsed;
        particle.y += particle.vy * scale * elapsed;
        if (particle.x <= box.left + particle.radius && particle.vx < 0) {
          particle.x = box.left + particle.radius;
          state.impulse += 2 * Math.abs(particle.vx) * scale;
          particle.vx *= -1;
        } else if (particle.x >= box.right - particle.radius && particle.vx > 0) {
          particle.x = box.right - particle.radius;
          state.impulse += 2 * Math.abs(particle.vx) * scale;
          particle.vx *= -1;
        }
        if (particle.y <= box.top + particle.radius && particle.vy < 0) {
          particle.y = box.top + particle.radius;
          state.impulse += 2 * Math.abs(particle.vy) * scale;
          particle.vy *= -1;
        } else if (particle.y >= box.bottom - particle.radius && particle.vy > 0) {
          particle.y = box.bottom - particle.radius;
          state.impulse += 2 * Math.abs(particle.vy) * scale;
          particle.vy *= -1;
        }
      });
      state.sampleTime += elapsed;
      if (state.sampleTime >= 0.7) {
        const perimeter = 2 * ((box.right - box.left) + (box.bottom - box.top));
        state.pressureProxy = state.impulse / (perimeter * state.sampleTime);
        state.impulse = 0;
        state.sampleTime = 0;
      }
    };

    state.draw = () => {
      clearCanvas();
      const p = palette();
      const box = bounds();
      heading('Mach–Boltzmann Gas Chamber', 'Ideal point particles · elastic walls · no inter-particle forces');

      context.fillStyle = 'rgba(255,255,255,0.025)';
      context.fillRect(box.left, box.top, box.right - box.left, box.bottom - box.top);
      context.strokeStyle = p.signal;
      context.lineWidth = 4;
      context.strokeRect(box.left, box.top, box.right - box.left, box.bottom - box.top);

      context.fillStyle = p.cool;
      state.particles.forEach((particle) => {
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, M.TAU);
        context.fill();
      });

      const speeds = state.particles.map((particle) => M.vectorLength(particle.vx, particle.vy) * M.thermalSpeedScale(state.temperature));
      const maximumSpeed = Math.max(...speeds, 1);
      const bins = Array(12).fill(0);
      speeds.forEach((speed) => { bins[Math.min(11, Math.floor(speed / maximumSpeed * 12))] += 1; });
      const histogramLeft = 95;
      const histogramTop = 438;
      const histogramWidth = 770;
      const histogramHeight = 82;
      const maximumBin = Math.max(...bins, 1);
      context.strokeStyle = p.grid;
      context.lineWidth = 1;
      context.strokeRect(histogramLeft, histogramTop, histogramWidth, histogramHeight);
      bins.forEach((count, index) => {
        const width = histogramWidth / bins.length - 3;
        const height = count / maximumBin * (histogramHeight - 18);
        context.fillStyle = index < 6 ? p.cool : p.accent;
        context.fillRect(histogramLeft + index * histogramWidth / bins.length + 2, histogramTop + histogramHeight - height - 1, width, height);
      });
      context.fillStyle = p.ink;
      context.font = '11px Tahoma, sans-serif';
      context.fillText('Instantaneous speed histogram', histogramLeft, histogramTop - 8);

      state.readoutCounter += 1;
      if (state.readoutCounter % 5 === 0 || state.paused) {
        const idealRatio = M.idealPressureRatio(state.count, state.temperature, state.volume);
        setReadout([
          { label: 'Particles', value: String(state.count) },
          { label: 'Temperature control', value: `${state.temperature.toFixed(2)}×` },
          { label: 'N·T / V direction', value: M.formatNumber(idealRatio, 1) },
          { label: 'Wall-impulse proxy', value: M.formatNumber(state.pressureProxy, 3) }
        ]);
      }
    };
  }

  function startEntropyBoard() {
    const state = current;
    state.tokens = 20;
    state.split = 10;
    setControls(`
      <label>Number of two-state tokens <output id="tokensOutput">20</output><input id="tokensControl" type="range" min="4" max="30" step="1" value="20"></label>
      <label>Tokens in state A <output id="splitOutput">10</output><input id="splitControl" type="range" min="0" max="20" step="1" value="10"></label>`);

    const tokensInput = control('#tokensControl');
    const splitInput = control('#splitControl');
    listen(tokensInput, 'input', () => {
      state.tokens = Number(tokensInput.value);
      state.split = Math.min(state.tokens, state.split);
      splitInput.max = String(state.tokens);
      splitInput.value = String(state.split);
      control('#tokensOutput').value = String(state.tokens);
      control('#splitOutput').value = String(state.split);
      render();
    });
    listen(splitInput, 'input', () => {
      state.split = Number(splitInput.value);
      control('#splitOutput').value = String(state.split);
      render();
    });

    state.draw = () => {
      clearCanvas();
      const p = palette();
      const distribution = M.macrostateDistribution(state.tokens);
      const maximum = Math.max(...distribution.map((entry) => entry.logMultiplicity), 1);
      heading('Boltzmann Entropy Board', 'Exact binomial multiplicities · kB set to 1 for the plotted entropy');

      const plot = { left: 70, top: 110, right: 900, bottom: 440 };
      context.strokeStyle = p.ink;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(plot.left, plot.top);
      context.lineTo(plot.left, plot.bottom);
      context.lineTo(plot.right, plot.bottom);
      context.stroke();

      const barWidth = (plot.right - plot.left) / distribution.length;
      distribution.forEach((entry) => {
        const height = maximum === 0 ? 0 : entry.logMultiplicity / maximum * (plot.bottom - plot.top - 25);
        context.fillStyle = entry.k === state.split ? p.signal : p.cool;
        context.globalAlpha = entry.k === state.split ? 1 : 0.62;
        context.fillRect(plot.left + entry.k * barWidth + 1, plot.bottom - height, Math.max(2, barWidth - 2), height);
      });
      context.globalAlpha = 1;

      const selectedX = plot.left + (state.split + 0.5) * barWidth;
      context.strokeStyle = p.accent;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(selectedX, 84);
      context.lineTo(selectedX, plot.bottom + 8);
      context.stroke();

      context.fillStyle = p.ink;
      context.font = '12px Tahoma, sans-serif';
      context.fillText('ln multiplicity', 16, 100);
      context.fillText('tokens in state A', 420, 475);
      context.fillStyle = p.signal;
      context.font = '700 18px Georgia, serif';
      context.textAlign = 'center';
      context.fillText(`A: ${state.split}    B: ${state.tokens - state.split}`, selectedX, 94);
      context.textAlign = 'left';

      const multiplicity = M.choose(state.tokens, state.split);
      const entropy = M.boltzmannEntropy(state.tokens, state.split, 1);
      const fraction = multiplicity / (2 ** state.tokens);
      setReadout([
        { label: 'Macrostate', value: `${state.split} : ${state.tokens - state.split}` },
        { label: 'Multiplicity W', value: M.formatNumber(multiplicity, 0) },
        { label: 'S / kB = ln W', value: M.formatNumber(entropy, 3) },
        { label: 'Fraction of all microstates', value: `${(fraction * 100).toFixed(3)}%` }
      ]);
    };
  }

  function startBrownianMicroscope() {
    const state = current;
    state.animated = true;
    state.temperature = 1;
    state.trace = true;
    state.elapsed = 0;
    state.walkers = [];
    state.path = [];
    state.random = M.createRng('brownian-1905');

    setControls(`
      <label>Thermal forcing <output id="brownianTempOutput">1.00×</output><input id="brownianTempControl" type="range" min="0.3" max="2.4" step="0.05" value="1"></label>
      <label>Trace visible path <select id="traceControl"><option value="on">On</option><option value="off">Off</option></select></label>
      <button id="pauseControl" type="button">${state.paused ? 'Resume' : 'Pause'}</button>
      <button id="resetControl" type="button">Reset seed</button>`);

    function resetWalkers() {
      state.random = M.createRng('brownian-1905');
      state.elapsed = 0;
      state.walkers = Array.from({ length: 40 }, () => ({ x: 480, y: 288 }));
      state.path = [{ x: 480, y: 288 }];
      state.lastTime = 0;
    }
    resetWalkers();

    const temperatureInput = control('#brownianTempControl');
    listen(temperatureInput, 'input', () => {
      state.temperature = Number(temperatureInput.value);
      control('#brownianTempOutput').value = `${state.temperature.toFixed(2)}×`;
      render();
    });
    listen(control('#traceControl'), 'change', (event) => {
      state.trace = event.currentTarget.value === 'on';
      render();
    });
    listen(control('#pauseControl'), 'click', (event) => togglePaused(event.currentTarget));
    listen(control('#resetControl'), 'click', () => {
      resetWalkers();
      render();
      schedule();
    });

    state.update = (elapsed) => {
      const stepScale = 44 * Math.sqrt(state.temperature) * Math.sqrt(Math.max(elapsed, 0.0001));
      state.walkers.forEach((walker) => {
        const angle = state.random() * M.TAU;
        walker.x += Math.cos(angle) * stepScale;
        walker.y += Math.sin(angle) * stepScale;
        const dx = walker.x - 480;
        const dy = walker.y - 288;
        const radius = Math.hypot(dx, dy);
        if (radius > 215) {
          const unit = M.normalizeVector(dx, dy);
          walker.x = 480 + unit.x * 215;
          walker.y = 288 + unit.y * 215;
        }
      });
      state.elapsed += elapsed;
      state.path.push({ x: state.walkers[0].x, y: state.walkers[0].y });
      if (state.path.length > 700) state.path.shift();
    };

    state.draw = () => {
      clearCanvas();
      const p = palette();
      heading('Brownian Microscope', 'Forty seeded random walkers · visible path is one member of the ensemble');

      context.fillStyle = 'rgba(255,255,255,0.025)';
      context.beginPath();
      context.arc(480, 288, 224, 0, M.TAU);
      context.fill();
      context.strokeStyle = p.signal;
      context.lineWidth = 4;
      context.stroke();

      if (state.trace && state.path.length > 1) {
        context.strokeStyle = p.accent;
        context.lineWidth = 1.5;
        context.globalAlpha = 0.72;
        context.beginPath();
        state.path.forEach((point, index) => {
          if (index === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        });
        context.stroke();
        context.globalAlpha = 1;
      }

      context.fillStyle = p.grid;
      context.globalAlpha = 0.5;
      state.walkers.slice(1).forEach((walker) => {
        context.beginPath();
        context.arc(walker.x, walker.y, 2, 0, M.TAU);
        context.fill();
      });
      context.globalAlpha = 1;

      const visible = state.walkers[0];
      context.fillStyle = p.signal;
      context.beginPath();
      context.arc(visible.x, visible.y, 11, 0, M.TAU);
      context.fill();
      context.strokeStyle = p.ink;
      context.lineWidth = 2;
      context.stroke();

      const msd = state.walkers.reduce((total, walker) => total + (walker.x - 480) ** 2 + (walker.y - 288) ** 2, 0) / state.walkers.length;
      const diffusionProxy = state.elapsed > 0 ? msd / (4 * state.elapsed) : 0;
      setReadout([
        { label: 'Ensemble walkers', value: String(state.walkers.length) },
        { label: 'Model time', value: `${state.elapsed.toFixed(1)} s` },
        { label: 'Ensemble ⟨r²⟩', value: `${M.formatNumber(msd, 1)} px²` },
        { label: 'D proxy = ⟨r²⟩ / 4t', value: `${M.formatNumber(diffusionProxy, 1)} px²/s` }
      ]);
    };
  }

  function startAnnusMap() {
    const state = current;
    state.selected = C.annusPapers[0].id;
    setControls(`
      <label>Selected 1905 paper <select id="paperControl">${C.annusPapers.map((paper) => `<option value="${paper.id}">${escapeHTML(paper.short)}</option>`).join('')}</select></label>`);
    listen(control('#paperControl'), 'change', (event) => {
      state.selected = event.currentTarget.value;
      render();
    });

    const positions = [
      { x: 220, y: 160 },
      { x: 740, y: 160 },
      { x: 220, y: 400 },
      { x: 740, y: 400 }
    ];

    state.draw = () => {
      clearCanvas();
      const p = palette();
      const selected = C.annusPapers.find((paper) => paper.id === state.selected);
      heading('Einstein’s 1905 Constellation', 'Four papers · four problems · several later experimental routes');

      context.strokeStyle = p.grid;
      context.lineWidth = 2;
      positions.forEach((position) => {
        context.beginPath();
        context.moveTo(480, 280);
        context.lineTo(position.x, position.y);
        context.stroke();
      });

      context.fillStyle = p.signal;
      context.beginPath();
      context.arc(480, 280, 61, 0, M.TAU);
      context.fill();
      context.fillStyle = p.background;
      context.textAlign = 'center';
      context.font = '700 28px Georgia, serif';
      context.fillText('1905', 480, 278);
      context.font = '11px Tahoma, sans-serif';
      context.fillText('ANNUS MIRABILIS', 480, 299);

      C.annusPapers.forEach((paper, index) => {
        const position = positions[index];
        const isSelected = paper.id === state.selected;
        context.fillStyle = isSelected ? p.accent : p.cool;
        context.globalAlpha = isSelected ? 1 : 0.65;
        roundedRect(position.x - 135, position.y - 63, 270, 126, 9);
        context.fill();
        context.globalAlpha = 1;
        context.strokeStyle = isSelected ? p.signal : p.grid;
        context.lineWidth = isSelected ? 4 : 2;
        context.stroke();
        context.fillStyle = p.background;
        context.textAlign = 'center';
        context.font = '700 18px Georgia, serif';
        context.fillText(paper.short, position.x, position.y - 21);
        context.font = '11px Tahoma, sans-serif';
        context.fillText(paper.received, position.x, position.y + 2);
        context.font = '700 16px Georgia, serif';
        context.fillText(paper.expression, position.x, position.y + 33);
      });
      context.textAlign = 'left';

      setReadout([
        { label: 'Paper', value: selected.short },
        { label: 'Received', value: selected.received },
        { label: 'Expression', value: selected.expression },
        { label: 'Later route', value: selected.legacy }
      ]);
      setDetail(`<div class="solvay-person-card"><strong>${escapeHTML(selected.short)}</strong><b>Question:</b> ${escapeHTML(selected.question)}<br><b>Conceptual move:</b> ${escapeHTML(selected.move)}</div>`);
    };
  }

  function startLightClock() {
    const state = current;
    state.animated = true;
    state.beta = 0.6;
    state.phase = 0;
    setControls(`
      <label>Relative speed β = v/c <output id="betaOutput">0.60</output><input id="betaControl" type="range" min="0" max="0.92" step="0.01" value="0.6"></label>
      <button id="pauseControl" type="button">${state.paused ? 'Resume' : 'Pause'}</button>`);
    const betaInput = control('#betaControl');
    listen(betaInput, 'input', () => {
      state.beta = Number(betaInput.value);
      control('#betaOutput').value = state.beta.toFixed(2);
      render();
    });
    listen(control('#pauseControl'), 'click', (event) => togglePaused(event.currentTarget));

    state.update = (elapsed) => {
      state.phase = (state.phase + elapsed * 0.65 / M.gamma(state.beta)) % 1;
    };

    state.draw = () => {
      clearCanvas();
      const p = palette();
      const geometry = M.lightClockGeometry(state.beta, 1);
      heading('Einstein Light Clock', 'Rest-frame tick at left · moving-frame description at right');

      const top = 130;
      const bottom = 420;
      const triangle = state.phase < 0.5 ? state.phase * 2 : (1 - state.phase) * 2;

      context.fillStyle = p.grid;
      context.globalAlpha = 0.35;
      context.fillRect(70, 82, 360, 400);
      context.fillRect(530, 82, 360, 400);
      context.globalAlpha = 1;
      context.fillStyle = p.ink;
      context.font = '700 14px Tahoma, sans-serif';
      context.fillText('Clock rest frame', 90, 108);
      context.fillText(`Frame seeing clock at β = ${state.beta.toFixed(2)}`, 550, 108);

      function mirror(x, y) {
        context.fillStyle = p.cool;
        context.fillRect(x - 48, y - 6, 96, 12);
        context.strokeStyle = p.ink;
        context.lineWidth = 1;
        context.strokeRect(x - 48, y - 6, 96, 12);
      }

      mirror(250, top);
      mirror(250, bottom);
      context.strokeStyle = p.signal;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(250, top);
      context.lineTo(250, bottom);
      context.stroke();
      context.fillStyle = p.signal;
      context.beginPath();
      context.arc(250, M.lerp(top, bottom, triangle), 9, 0, M.TAU);
      context.fill();

      const diagonal = 120 * state.beta;
      context.strokeStyle = p.signal;
      context.beginPath();
      context.moveTo(620 - diagonal, top);
      context.lineTo(620, bottom);
      context.lineTo(620 + diagonal, top);
      context.stroke();
      const movingX = state.phase < 0.5
        ? M.lerp(620 - diagonal, 620, triangle)
        : M.lerp(620 + diagonal, 620, triangle);
      const apparatusX = M.lerp(620 - diagonal, 620 + diagonal, state.phase);
      mirror(apparatusX, top);
      mirror(apparatusX, bottom);
      context.fillStyle = p.signal;
      context.beginPath();
      context.arc(movingX, M.lerp(top, bottom, triangle), 9, 0, M.TAU);
      context.fill();

      context.fillStyle = p.ink;
      context.font = '13px Georgia, serif';
      context.fillText('vertical path: 2h', 180, 455);
      context.fillText(`diagonal path: 2γh = ${geometry.movingRoundTrip.toFixed(3)}h`, 586, 455);

      setReadout([
        { label: 'β = v/c', value: state.beta.toFixed(2) },
        { label: 'Lorentz factor γ', value: geometry.gamma.toFixed(4) },
        { label: '1.00 s proper time', value: `${M.timeDilation(1, state.beta).toFixed(4)} s coordinate time` },
        { label: 'Path ratio', value: `${geometry.gamma.toFixed(4)}×` }
      ]);
    };
  }

  function startSolvayMap() {
    const state = current;
    state.selected = 'Albert Einstein';
    state.filter = 'all';
    state.hitRegions = [];

    setControls(`
      <label>Participant <select id="participantControl">${C.solvayParticipants.map((person) => `<option value="${escapeHTML(person.name)}"${person.name === state.selected ? ' selected' : ''}>${escapeHTML(person.name)}</option>`).join('')}</select></label>
      <label>Display <select id="solvayFilter"><option value="all">All 29 participants</option><option value="laureates">17 Nobel laureates</option></select></label>`);

    listen(control('#participantControl'), 'change', (event) => {
      state.selected = event.currentTarget.value;
      render();
    });
    listen(control('#solvayFilter'), 'change', (event) => {
      state.filter = event.currentTarget.value;
      render();
    });
    listen(elements.canvas, 'click', (event) => {
      const rect = elements.canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width * WIDTH;
      const y = (event.clientY - rect.top) / rect.height * HEIGHT;
      const hit = state.hitRegions.find((region) => Math.hypot(x - region.x, y - region.y) <= region.radius);
      if (!hit) return;
      state.selected = hit.name;
      control('#participantControl').value = hit.name;
      render();
    });

    function position(person) {
      const counts = { 1: 9, 2: 9, 3: 11 };
      const left = person.row === 3 ? 72 : 105;
      const right = person.row === 3 ? 888 : 855;
      return {
        x: counts[person.row] === 1 ? 480 : M.lerp(left, right, (person.seat - 1) / (counts[person.row] - 1)),
        y: { 1: 170, 2: 305, 3: 440 }[person.row]
      };
    }

    state.draw = () => {
      clearCanvas();
      const p = palette();
      heading('Solvay 1927 Seating Map', 'Institutional group-photo order · select a node or use the participant menu');
      state.hitRegions = [];

      [1, 2, 3].forEach((row) => {
        const y = { 1: 170, 2: 305, 3: 440 }[row];
        context.strokeStyle = p.grid;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(45, y);
        context.lineTo(915, y);
        context.stroke();
        context.fillStyle = p.ink;
        context.font = '10px Tahoma, sans-serif';
        context.fillText(`ROW ${row}`, 16, y + 4);
      });

      C.solvayParticipants.forEach((person) => {
        const point = position(person);
        const selected = person.name === state.selected;
        const visible = state.filter === 'all' || person.laureate;
        state.hitRegions.push({ ...point, radius: 27, name: person.name });
        context.globalAlpha = visible ? 1 : 0.16;
        context.fillStyle = selected ? p.signal : person.laureate ? p.accent : p.cool;
        context.beginPath();
        context.arc(point.x, point.y, selected ? 25 : 20, 0, M.TAU);
        context.fill();
        context.strokeStyle = selected ? p.ink : p.grid;
        context.lineWidth = selected ? 3 : 1;
        context.stroke();
        context.fillStyle = p.ink;
        context.font = selected ? '700 11px Tahoma, sans-serif' : '10px Tahoma, sans-serif';
        context.textAlign = 'center';
        const surname = person.name.split(' ').at(-1);
        context.fillText(surname, point.x, point.y + 38);
        if (person.laureate) {
          context.fillStyle = p.signal;
          context.font = '700 10px Georgia, serif';
          context.fillText('N', point.x, point.y + 4);
        }
        context.globalAlpha = 1;
      });
      context.textAlign = 'left';

      const selected = C.solvayParticipants.find((person) => person.name === state.selected);
      const shown = state.filter === 'all' ? C.solvayParticipants.length : C.solvayParticipants.filter((person) => person.laureate).length;
      setReadout([
        { label: 'Conference', value: 'Fifth Solvay' },
        { label: 'Dates', value: '24–29 October 1927' },
        { label: 'Topic', value: 'Electrons and Photons' },
        { label: 'Nodes emphasised', value: `${shown} of 29` }
      ]);
      setDetail(`<div class="solvay-person-card"><strong>${escapeHTML(selected.name)}</strong><b>${escapeHTML(selected.field)}</b>${selected.laureate ? ' · Nobel laureate' : ''}<br>${escapeHTML(selected.note)}</div>`);
    };
  }

  function startDoubleSlit() {
    const state = current;
    state.wavelength = 550;
    state.separation = 6;
    state.width = 1.4;
    const distance = 1;
    setControls(`
      <label>Wavelength <output id="wavelengthOutput">550 nm</output><input id="wavelengthControl" type="range" min="380" max="700" step="5" value="550"></label>
      <label>Slit separation <output id="separationOutput">6.0 μm</output><input id="separationControl" type="range" min="2" max="12" step="0.2" value="6"></label>
      <label>Slit width <output id="widthOutput">1.4 μm</output><input id="widthControl" type="range" min="0.5" max="4" step="0.1" value="1.4"></label>`);

    const wavelengthInput = control('#wavelengthControl');
    const separationInput = control('#separationControl');
    const widthInput = control('#widthControl');
    listen(wavelengthInput, 'input', () => {
      state.wavelength = Number(wavelengthInput.value);
      control('#wavelengthOutput').value = `${state.wavelength} nm`;
      render();
    });
    listen(separationInput, 'input', () => {
      state.separation = Number(separationInput.value);
      control('#separationOutput').value = `${state.separation.toFixed(1)} μm`;
      render();
    });
    listen(widthInput, 'input', () => {
      state.width = Number(widthInput.value);
      control('#widthOutput').value = `${state.width.toFixed(1)} μm`;
      render();
    });

    state.draw = () => {
      clearCanvas();
      const p = palette();
      heading('Wave Interference Bench', 'Monochrome Fraunhofer double-slit approximation · intensity normalised to 1');

      const plot = { left: 70, top: 105, right: 900, bottom: 455 };
      context.fillStyle = 'rgba(255,255,255,0.025)';
      context.fillRect(plot.left, plot.top, plot.right - plot.left, plot.bottom - plot.top);
      context.strokeStyle = p.ink;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(plot.left, plot.top);
      context.lineTo(plot.left, plot.bottom);
      context.lineTo(plot.right, plot.bottom);
      context.stroke();

      const lambda = state.wavelength * 1e-9;
      const separation = state.separation * 1e-6;
      const width = state.width * 1e-6;
      const screenRange = 0.12;
      context.strokeStyle = p.signal;
      context.lineWidth = 2;
      context.beginPath();
      for (let pixel = 0; pixel <= plot.right - plot.left; pixel += 1) {
        const screenPosition = M.mapRange(pixel, 0, plot.right - plot.left, -screenRange, screenRange);
        const intensity = M.diffractionIntensity(screenPosition, lambda, separation, width, distance);
        const x = plot.left + pixel;
        const y = plot.bottom - intensity * (plot.bottom - plot.top - 12);
        if (pixel === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.stroke();

      const gradient = context.createLinearGradient(plot.left, 0, plot.right, 0);
      gradient.addColorStop(0, 'rgba(0,0,0,0)');
      gradient.addColorStop(0.5, p.signal);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      context.globalAlpha = 0.14;
      context.fillStyle = gradient;
      context.fillRect(plot.left, plot.top, plot.right - plot.left, plot.bottom - plot.top);
      context.globalAlpha = 1;

      context.fillStyle = p.ink;
      context.font = '11px Tahoma, sans-serif';
      context.fillText('normalised intensity', 12, 116);
      context.fillText('screen position (−12 cm to +12 cm at L = 1 m)', 340, 490);
      context.strokeStyle = p.accent;
      context.setLineDash([5, 4]);
      context.beginPath();
      context.moveTo((plot.left + plot.right) / 2, plot.top);
      context.lineTo((plot.left + plot.right) / 2, plot.bottom);
      context.stroke();
      context.setLineDash([]);

      const fringeSpacing = lambda * distance / separation;
      const envelopeZero = lambda * distance / width;
      setReadout([
        { label: 'Wavelength', value: `${state.wavelength} nm` },
        { label: 'Approx. fringe spacing λL/d', value: `${(fringeSpacing * 100).toFixed(2)} cm` },
        { label: 'First envelope zero λL/a', value: `${(envelopeZero * 100).toFixed(2)} cm` },
        { label: 'Central intensity', value: '1.000' }
      ]);
    };
  }

  return Object.freeze({ mount, start, stop, render });
});
