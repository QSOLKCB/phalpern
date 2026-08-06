/*
 * Physics X 95 application shell
 * Copyright (c) 2026 QSOL-IMC
 * SPDX-License-Identifier: MPL-2.0
 */
(function () {
  'use strict';

  const C = window.PhysicsXContent;
  const Atlas = window.PhysicsXAtlas;
  if (!C || !Atlas) throw new Error('Physics X 95 dependencies did not load.');

  const $ = (selector, root) => (root || document).querySelector(selector);
  const $$ = (selector, root) => Array.from((root || document).querySelectorAll(selector));
  const escapeHTML = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
  const normalize = (value) => String(value).toLocaleLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '');

  const workspace = $('#workspace');
  const statusMessage = $('#statusMessage');
  const routeStatus = $('#routeStatus');
  const progressStatus = $('#progressStatus');
  const networkStatus = $('#networkStatus');
  const bookmarkButton = $('#bookmarkButton');
  const studyButton = $('#studyButton');
  const teacherButton = $('#teacherButton');
  const themeButton = $('#themeButton');
  const searchDialog = $('#searchDialog');
  const globalSearch = $('#globalSearch');
  const searchResults = $('#searchResults');
  const toast = $('#toast');

  const STORAGE = Object.freeze({
    bookmarks: 'physicsx95.bookmarks',
    studied: 'physicsx95.studied',
    teacher: 'physicsx95.teacher',
    theme: 'physicsx95.theme',
    lessons: 'physicsx95.lessons'
  });

  function loadSet(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || '[]');
      return new Set(Array.isArray(value) ? value : []);
    } catch {
      return new Set();
    }
  }

  function saveSet(key, value) {
    try { localStorage.setItem(key, JSON.stringify([...value])); } catch { /* Storage can be unavailable. */ }
  }

  function loadObject(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || '{}');
      return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
    } catch {
      return {};
    }
  }

  function saveObject(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Storage can be unavailable. */ }
  }

  const articleById = (id) => C.articles.find((article) => article.id === id);
  const lessonById = (id) => C.lessonPaths.find((lesson) => lesson.id === id);
  const exhibitById = (id) => C.atlas.find((exhibit) => exhibit.id === id);
  const categoryById = (id) => C.categories.find((category) => category.id === id);

  const storedTheme = (() => {
    try { return localStorage.getItem(STORAGE.theme); } catch { return null; }
  })();
  const preferredTheme = storedTheme === 'dark' || storedTheme === 'light'
    ? storedTheme
    : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  const state = {
    route: '',
    bookmarks: loadSet(STORAGE.bookmarks),
    studied: new Set([...loadSet(STORAGE.studied)].filter((id) => articleById(id))),
    teacher: (() => { try { return localStorage.getItem(STORAGE.teacher) === '1'; } catch { return false; } })(),
    theme: preferredTheme,
    lessons: loadObject(STORAGE.lessons),
    storyCategory: 'all',
    timelineFilter: 'all',
    glossaryQuery: '',
    toastTimer: 0
  };

  function routeFromLocation() {
    return location.hash.replace(/^#\/?/, '').trim() || 'home';
  }

  function routeTitle(route) {
    const [kind, id] = route.split('/');
    if (kind === 'article') return articleById(id)?.title || 'Story';
    if (kind === 'lesson') return lessonById(id)?.title || 'Classroom pathway';
    if (kind === 'atlas' && id) return exhibitById(id)?.title || 'Experiment';
    return {
      home: 'Home',
      stories: 'Stories',
      timeline: 'Timeline',
      atlas: 'Interactive experiments',
      lessons: 'Classroom pathways',
      glossary: 'Glossary',
      sources: 'Reference desk',
      about: 'About & help'
    }[kind] || 'Not found';
  }

  function navigate(route) {
    const clean = String(route || 'home').replace(/^#\/?/, '');
    if (clean === state.route) {
      renderRoute(clean);
      return;
    }
    location.hash = `#/${clean}`;
  }

  function setStatus(message) {
    statusMessage.textContent = message;
  }

  function showToast(message, duration) {
    clearTimeout(state.toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    state.toastTimer = window.setTimeout(() => { toast.hidden = true; }, duration || 2400);
  }

  function documentWindow(title, subtitle, content) {
    return `
      <article class="document-window">
        <div class="document-title-bar"><strong>${escapeHTML(title)}</strong><span>${escapeHTML(subtitle || 'Physics X 95')}</span></div>
        <div class="document-content">${content}</div>
      </article>`;
  }

  function renderContentsTree() {
    const groups = C.categories.map((category) => {
      const articles = C.articles.filter((article) => article.category === category.id);
      return `
        <details class="tree-group" open>
          <summary>${escapeHTML(category.icon)} ${escapeHTML(category.label)}</summary>
          <ul>${articles.map((article) => `<li><a href="#/article/${article.id}" data-route="article/${article.id}">${escapeHTML(article.title)}</a></li>`).join('')}</ul>
        </details>`;
    }).join('');
    $('#contentsTree').innerHTML = `
      <a class="tree-special-link" href="#/home" data-route="home">⌂ Start</a>
      <a class="tree-special-link" href="#/stories" data-route="stories">▤ All stories</a>
      ${groups}
      <a class="tree-special-link" href="#/timeline" data-route="timeline">◷ Timeline</a>
      <a class="tree-special-link" href="#/atlas" data-route="atlas">◉ Interactive experiments</a>
      <a class="tree-special-link" href="#/lessons" data-route="lessons">▣ Classroom pathways</a>
      <a class="tree-special-link" href="#/glossary" data-route="glossary">A–Z Glossary</a>
      <a class="tree-special-link" href="#/sources" data-route="sources">§ Reference desk</a>`;
  }

  function bookmarkLabel(route) {
    const [kind, id] = route.split('/');
    if (kind === 'article') return articleById(id)?.title;
    if (kind === 'lesson') return lessonById(id)?.title;
    if (kind === 'atlas' && id) return exhibitById(id)?.title;
    return null;
  }

  function renderFavourites() {
    const routes = [...state.bookmarks].filter((route) => bookmarkLabel(route));
    $('#favoritesList').innerHTML = routes.length
      ? routes.map((route) => `<a href="#/${route}" data-route="${escapeHTML(route)}">☆ ${escapeHTML(bookmarkLabel(route))}</a>`).join('')
      : '<p>No favourites yet. Open a story, experiment, or pathway and choose <strong>Bookmark</strong>.</p>';
  }

  function updateNavigation() {
    const [kind] = state.route.split('/');
    const topRoute = kind === 'article' ? 'stories' : kind === 'lesson' ? 'lessons' : kind;
    $$('.menu-bar [data-route]').forEach((button) => button.classList.toggle('active', button.dataset.route === topRoute));
    $$('#contentsTree [data-route]').forEach((link) => {
      if (link.dataset.route === state.route) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  function updateToolbar() {
    const [kind, id] = state.route.split('/');
    const bookmarkable = Boolean(bookmarkLabel(state.route));
    const bookmarked = state.bookmarks.has(state.route);
    bookmarkButton.disabled = !bookmarkable;
    bookmarkButton.setAttribute('aria-pressed', String(bookmarked));
    bookmarkButton.querySelector('span').textContent = bookmarked ? '★' : '☆';

    const studyable = kind === 'article' && Boolean(articleById(id));
    const studied = studyable && state.studied.has(id);
    studyButton.disabled = !studyable;
    studyButton.setAttribute('aria-pressed', String(studied));
    progressStatus.textContent = `${state.studied.size} of ${C.articles.length} topics studied`;
    teacherButton.setAttribute('aria-pressed', String(state.teacher));
    themeButton.setAttribute('aria-pressed', String(state.theme === 'dark'));
    themeButton.querySelector('span').textContent = state.theme === 'dark' ? '☀' : '◐';
  }

  function updateTheme() {
    document.documentElement.dataset.theme = state.theme;
    document.body.classList.toggle('teacher-mode', state.teacher);
    const themeMeta = $('meta[name="theme-color"]');
    if (themeMeta) themeMeta.content = state.theme === 'dark' ? '#101a18' : '#254f4a';
    Atlas.render();
  }

  function updateNetworkStatus() {
    const online = navigator.onLine;
    networkStatus.textContent = online ? 'Online · local-first' : 'Offline · cached edition';
    networkStatus.classList.toggle('offline', !online);
  }

  function renderHome() {
    const featured = ['mach-boltzmann', 'annus-mirabilis', 'solvay-1927'].map(articleById);
    const content = `
      <div class="hero-grid">
        <section>
          <p class="eyebrow">People · arguments · experiments</p>
          <h1>Physics becomes clearer before the argument is over.</h1>
          <p class="lede">An offline, source-aware history lab inspired by physicist and science writer Paul Halpern—and by the question-led spirit of Richard Feynman’s Physics X.</p>
          <div class="button-row">
            <a class="route-button primary" href="#/article/mach-boltzmann" data-route="article/mach-boltzmann">Enter the atom debate →</a>
            <a class="route-button" href="#/atlas" data-route="atlas">Open experiments</a>
            <a class="route-button" href="#/timeline" data-route="timeline">Browse the timeline</a>
          </div>
          <p>This is an independent educational tribute by Trent Slade / QSOL-IMC. It is not an official Halpern publication or an endorsed adaptation of his books.</p>
        </section>
        <aside class="hero-panel">
          <h2>On this disc</h2>
          <div class="count-grid">
            <div class="count-chip"><strong>${C.articles.length}</strong><span>source-aware stories</span></div>
            <div class="count-chip"><strong>${C.atlas.length}</strong><span>interactive exhibits</span></div>
            <div class="count-chip"><strong>${C.timeline.length}</strong><span>timeline events</span></div>
            <div class="count-chip"><strong>${C.glossary.length}</strong><span>glossary terms</span></div>
          </div>
          <h3>Your local progress</h3>
          <p><strong>${state.studied.size}</strong> of ${C.articles.length} stories marked studied. Bookmarks, theme, and pathway steps stay in this browser.</p>
        </aside>
      </div>
      <h2>Three doors into the history</h2>
      <div class="card-grid">${featured.map(renderTopicCard).join('')}</div>
      <h2>A bookshelf, not a substitute</h2>
      <p>These cards map selected Halpern titles to lab themes. The original books remain the full journeys.</p>
      <div class="card-grid">${C.books.slice(0, 3).map((book) => `
        <section class="book-card">
          <span class="category-badge">Paul Halpern</span>
          <h2>${escapeHTML(book.title)}</h2>
          <p>${escapeHTML(book.focus)}</p>
          <a class="route-button" href="#/article/${book.article}" data-route="article/${book.article}">Explore the theme</a>
        </section>`).join('')}</div>
      <div class="button-row"><a class="route-button" href="#/article/halpern-bookshelf" data-route="article/halpern-bookshelf">Open the full bookshelf map</a></div>`;
    workspace.innerHTML = documentWindow('Start — Physics X 95', 'History Lab · Edition 1.0.0', content);
  }

  function renderTopicCard(article) {
    const category = categoryById(article.category);
    const label = C.claimLabels[article.status];
    return `
      <section class="topic-card">
        <div><span class="status-badge ${article.status}">${escapeHTML(label.label)}</span></div>
        <h2>${escapeHTML(article.title)}</h2>
        <p>${escapeHTML(article.summary)}</p>
        <span class="category-badge">${escapeHTML(category.icon)} ${escapeHTML(category.label)}</span>
        <a class="route-button" href="#/article/${article.id}" data-route="article/${article.id}">Read story →</a>
      </section>`;
  }

  function renderStories() {
    const categories = state.storyCategory === 'all'
      ? C.articles
      : C.articles.filter((article) => article.category === state.storyCategory);
    const content = `
      <p class="eyebrow">Encyclopedia</p>
      <h1>Stories and arguments</h1>
      <p class="lede">Begin with a disagreement, then follow its equations, evidence, people, and afterlife.</p>
      <div class="view-filter"><label>Section<select id="storyCategory"><option value="all">All sections</option>${C.categories.map((category) => `<option value="${category.id}"${state.storyCategory === category.id ? ' selected' : ''}>${escapeHTML(category.label)}</option>`).join('')}</select></label></div>
      <div class="card-grid">${categories.map(renderTopicCard).join('')}</div>`;
    workspace.innerHTML = documentWindow('Stories', `${categories.length} topics displayed`, content);
  }

  function renderArticle(id) {
    const article = articleById(id);
    if (!article) return renderNotFound();
    const category = categoryById(article.category);
    const label = C.claimLabels[article.status];
    const sourceLinks = article.sources.map((sourceId) => {
      const source = C.sources[sourceId];
      return `<li><a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(source.title)}</a></li>`;
    }).join('');
    const sections = article.sections.map((section) => `
      <section><h2>${escapeHTML(section.heading)}</h2>${section.paragraphs.map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join('')}</section>`).join('');
    const equation = article.equation ? `
      <section class="equation-box">
        <h2>Declared relationship</h2>
        <div class="equation">${escapeHTML(article.equation.expression)}</div>
        <p>${escapeHTML(article.equation.explanation)}</p>
      </section>` : '';
    const related = article.related.map((relatedId) => {
      const relatedArticle = articleById(relatedId);
      return `<a href="#/article/${relatedId}" data-route="article/${relatedId}">${escapeHTML(relatedArticle.title)}</a>`;
    }).join('');
    const content = `
      <header class="article-header">
        <p class="eyebrow">${escapeHTML(category.label)}</p>
        <h1>${escapeHTML(article.title)}</h1>
        <p class="lede">${escapeHTML(article.deck)}</p>
        <div class="article-meta">
          <span class="status-badge ${article.status}">${escapeHTML(label.label)}</span>
          <span class="meta-chip">${escapeHTML(article.period)}</span>
          <span class="meta-chip">${escapeHTML(article.figures.join(' · '))}</span>
          ${state.studied.has(article.id) ? '<span class="meta-chip">✓ Studied</span>' : ''}
        </div>
        <p>${escapeHTML(article.summary)}</p>
      </header>
      <div class="article-layout">
        <div class="article-copy">
          ${sections}
          ${equation}
          <section class="activity-box"><header>${escapeHTML(article.activity.title)}</header><div><ol>${article.activity.steps.map((step) => `<li>${escapeHTML(step)}</li>`).join('')}</ol></div></section>
          <details class="knowledge-check"${state.teacher ? ' open' : ''}><summary>Knowledge check: ${escapeHTML(article.check.question)}</summary><div><p>${escapeHTML(article.check.answer)}</p></div></details>
          <section class="teacher-note"><h2>Teacher note</h2><p>${escapeHTML(article.teacherNote)}</p></section>
          <h2>Continue through the network</h2>
          <div class="related-links">${related}</div>
        </div>
        <aside class="article-aside">
          <section class="info-box"><h2>At a glance</h2><ul>${article.atGlance.map((item) => `<li>${escapeHTML(item)}</li>`).join('')}</ul></section>
          <section class="caution-box"><h2>${escapeHTML(label.label)}</h2><p>${escapeHTML(label.meaning)}</p></section>
          <section class="source-box"><h2>Source trail</h2><ul>${sourceLinks}</ul></section>
        </aside>
      </div>`;
    workspace.innerHTML = documentWindow(article.title, `${category.label} · ${article.period}`, content);
  }

  function renderTimeline() {
    const events = state.timelineFilter === 'all'
      ? C.timeline
      : C.timeline.filter((event) => event.era === state.timelineFilter);
    const content = `
      <p class="eyebrow">Chronology</p>
      <h1>The argument changes as evidence arrives.</h1>
      <p class="lede">Dates organise the record without pretending that ideas develop in a single straight line.</p>
      <div class="view-filter"><label>Thread<select id="timelineFilter"><option value="all">All threads</option>${C.categories.filter((category) => category.id !== 'orientation').map((category) => `<option value="${category.id}"${state.timelineFilter === category.id ? ' selected' : ''}>${escapeHTML(category.label)}</option>`).join('')}</select></label></div>
      <div class="timeline">${events.map((event) => {
        const source = C.sources[event.source];
        return `<article class="timeline-event"><time>${escapeHTML(event.year)}</time><h2>${escapeHTML(event.title)}</h2><p>${escapeHTML(event.detail)}</p><a href="#/article/${event.article}" data-route="article/${event.article}">Open related story</a> · <a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">Source</a></article>`;
      }).join('')}</div>`;
    workspace.innerHTML = documentWindow('Timeline', `${events.length} events displayed`, content);
  }

  function renderAtlasCard(exhibit) {
    const label = C.claimLabels[exhibit.status];
    return `
      <section class="atlas-card">
        <span class="status-badge ${exhibit.status}">${escapeHTML(label.label)}</span>
        <h2>${escapeHTML(exhibit.title)}</h2>
        <p>${escapeHTML(exhibit.description)}</p>
        <span class="category-badge">${escapeHTML(exhibit.namespace)}</span>
        <a class="route-button" href="#/atlas/${exhibit.id}" data-route="atlas/${exhibit.id}">Launch exhibit →</a>
      </section>`;
  }

  function renderAtlas() {
    const content = `
      <p class="eyebrow">Interactive atlas</p>
      <h1>Models you can argue with</h1>
      <p class="lede">Every exhibit declares its model class. Change a parameter, make a prediction, and keep the non-claims visible.</p>
      <div class="card-grid">${C.atlas.map(renderAtlasCard).join('')}</div>`;
    workspace.innerHTML = documentWindow('Interactive experiments', `${C.atlas.length} exhibits · no external dependencies`, content);
  }

  function renderAtlasExhibit(id) {
    const exhibit = exhibitById(id);
    if (!exhibit) return renderNotFound();
    const label = C.claimLabels[exhibit.status];
    const article = articleById(exhibit.article);
    const content = `
      <p class="eyebrow">Interactive exhibit</p>
      <h1>${escapeHTML(exhibit.title)}</h1>
      <p class="lede">${escapeHTML(exhibit.description)}</p>
      <div class="article-meta"><span class="status-badge ${exhibit.status}">${escapeHTML(label.label)}</span><span class="meta-chip">${escapeHTML(exhibit.namespace)}</span></div>
      <section class="atlas-stage">
        <div class="canvas-frame"><canvas id="atlasCanvas" width="960" height="560" role="img" aria-label="${escapeHTML(exhibit.title)} interactive visual"><p>Your browser does not support canvas. The article and declared relationship remain available.</p></canvas></div>
        <div id="atlasControls" class="atlas-controls" aria-label="Exhibit controls"></div>
        <div id="atlasReadout" class="atlas-readout" aria-live="polite"></div>
        <div id="atlasDetail" class="atlas-description" aria-live="polite" hidden></div>
        <div class="atlas-description"><strong>Model boundary:</strong> ${escapeHTML(label.meaning)}</div>
      </section>
      <div class="button-row"><a class="route-button" href="#/article/${article.id}" data-route="article/${article.id}">Read: ${escapeHTML(article.title)}</a><a class="route-button" href="#/atlas" data-route="atlas">All exhibits</a></div>`;
    workspace.innerHTML = documentWindow(exhibit.title, exhibit.namespace, content);
    Atlas.mount({
      canvas: $('#atlasCanvas'),
      controls: $('#atlasControls'),
      readout: $('#atlasReadout'),
      detail: $('#atlasDetail')
    });
    Atlas.start(id);
  }

  function lessonProgress(lesson) {
    const saved = Array.isArray(state.lessons[lesson.id]) ? state.lessons[lesson.id] : [];
    return new Set(saved.filter((index) => Number.isInteger(index) && index >= 0 && index < lesson.sequence.length));
  }

  function renderLessons() {
    const cards = C.lessonPaths.map((lesson) => {
      const completed = lessonProgress(lesson).size;
      return `
        <section class="lesson-card">
          <span class="category-badge">${escapeHTML(lesson.duration)} · ${completed}/${lesson.sequence.length} steps</span>
          <h2>${escapeHTML(lesson.title)}</h2>
          <p>${escapeHTML(lesson.summary)}</p>
          <a class="route-button" href="#/lesson/${lesson.id}" data-route="lesson/${lesson.id}">${completed ? 'Continue pathway' : 'Open pathway'} →</a>
        </section>`;
    }).join('');
    const content = `
      <p class="eyebrow">Teacher edition</p>
      <h1>Classroom pathways</h1>
      <p class="lede">Each pathway crosses historical record, a declared model, source work, and a claim-audit task.</p>
      <div class="card-grid">${cards}</div>`;
    workspace.innerHTML = documentWindow('Classroom pathways', `${C.lessonPaths.length} complete sequences`, content);
  }

  function renderLesson(id) {
    const lesson = lessonById(id);
    if (!lesson) return renderNotFound();
    const progress = lessonProgress(lesson);
    const steps = lesson.sequence.map((step, index) => {
      const links = [
        step.article ? `<a href="#/article/${step.article}" data-route="article/${step.article}">Story</a>` : '',
        step.atlas ? `<a href="#/atlas/${step.atlas}" data-route="atlas/${step.atlas}">Exhibit</a>` : ''
      ].filter(Boolean).join(' · ');
      return `
        <li class="lesson-step${progress.has(index) ? ' completed' : ''}" data-step-row="${index}">
          <div><h3>${escapeHTML(step.title)} · ${step.minutes} min</h3><p>${escapeHTML(step.detail)}${links ? `<br>${links}` : ''}</p></div>
          <label><input type="checkbox" data-lesson-step="${index}"${progress.has(index) ? ' checked' : ''}> Done</label>
        </li>`;
    }).join('');
    const content = `
      <p class="eyebrow">Classroom pathway</p>
      <h1>${escapeHTML(lesson.title)}</h1>
      <p class="lede">${escapeHTML(lesson.summary)}</p>
      <div class="lesson-overview"><div><strong>Audience</strong><span>${escapeHTML(lesson.audience)}</span></div><div><strong>Duration</strong><span>${escapeHTML(lesson.duration)}</span></div><div><strong>Progress</strong><span id="lessonProgressText">${progress.size} of ${lesson.sequence.length} steps</span></div></div>
      <h2>Objectives</h2><ul>${lesson.objectives.map((objective) => `<li>${escapeHTML(objective)}</li>`).join('')}</ul>
      <h2>Materials</h2><ul>${lesson.materials.map((material) => `<li>${escapeHTML(material)}</li>`).join('')}</ul>
      <h2>Sequence</h2><ol class="lesson-sequence" data-lesson-id="${lesson.id}">${steps}</ol>
      <div class="lesson-actions"><button type="button" data-action="reset-lesson" data-lesson-id="${lesson.id}">Reset pathway progress</button></div>
      <h2>Assessment prompts</h2><ol>${lesson.assessment.map((prompt) => `<li>${escapeHTML(prompt)}</li>`).join('')}</ol>`;
    workspace.innerHTML = documentWindow(lesson.title, `${lesson.duration} · ${lesson.audience}`, content);
  }

  function glossaryEntries(query) {
    const normalized = normalize(query).trim();
    return C.glossary.filter((entry) => !normalized || normalize(`${entry.term} ${entry.definition}`).includes(normalized));
  }

  function updateGlossaryList() {
    const container = $('#glossaryEntries');
    if (!container) return;
    const entries = glossaryEntries(state.glossaryQuery);
    container.innerHTML = entries.map((entry) => `
      <div class="glossary-entry"><dt>${escapeHTML(entry.term)}</dt><dd>${escapeHTML(entry.definition)}${entry.article ? ` <a href="#/article/${entry.article}" data-route="article/${entry.article}">Story</a>` : ''}</dd></div>`).join('');
    $('#glossaryCount').textContent = `${entries.length} terms displayed`;
  }

  function renderGlossary() {
    const content = `
      <p class="eyebrow">A–Z reference</p>
      <h1>Glossary</h1>
      <p class="lede">Definitions remain connected to the arguments in which they do work.</p>
      <div class="view-filter"><label>Filter terms<input id="glossaryFilter" type="search" value="${escapeHTML(state.glossaryQuery)}" autocomplete="off" placeholder="entropy, Solvay, QED…"></label><span id="glossaryCount"></span></div>
      <dl id="glossaryEntries" class="glossary-list"></dl>`;
    workspace.innerHTML = documentWindow('Glossary', `${C.glossary.length} terms`, content);
    updateGlossaryList();
  }

  function renderSources() {
    const groups = {};
    Object.entries(C.sources).forEach(([id, source]) => {
      if (!groups[source.kind]) groups[source.kind] = [];
      groups[source.kind].push({ id, ...source });
    });
    const groupMarkup = Object.entries(groups).sort(([a], [b]) => a.localeCompare(b)).map(([kind, sources]) => `
      <section class="source-group"><h2>${escapeHTML(kind)}</h2><ul class="source-list">${sources.map((source) => `<li><a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(source.title)}</a><p>${escapeHTML(source.note)}</p></li>`).join('')}</ul></section>`).join('');
    const content = `
      <p class="eyebrow">Reference desk</p>
      <h1>Follow the story outward.</h1>
      <p class="lede">Institutional records, primary-source guides, author pages, and professional histories anchor the lab. External pages naturally require a network connection.</p>
      <section class="caution-box"><h2>Copyright boundary</h2><p>The lab contains original summaries and software. It links to Halpern’s books and external archives; it does not reproduce book chapters, archival photographs, or proceedings wholesale.</p></section>
      ${groupMarkup}`;
    workspace.innerHTML = documentWindow('Reference desk', `${Object.keys(C.sources).length} declared sources`, content);
  }

  function renderAbout() {
    const labelRows = Object.entries(C.claimLabels).map(([id, entry]) => `<tr><th><span class="status-badge ${id}">${escapeHTML(entry.label)}</span></th><td>${escapeHTML(entry.meaning)}</td></tr>`).join('');
    const content = `
      <p class="eyebrow">About this edition</p>
      <h1>A quiet surprise for someone who keeps the people inside physics.</h1>
      <p class="lede">Physics X 95 was built by Trent Slade / QSOL-IMC as an independent educational tribute to Paul Halpern’s history-of-physics work.</p>
      <h2>What it is</h2>
      <p>A zero-build, offline-first encyclopedia with original teaching prose, source trails, saved local progress, a searchable glossary, classroom pathways, and dependency-free canvas exhibits. Its 1990s multimedia interface follows the design language of the QSOLKCB Synergetics 95 educator project without using proprietary encyclopedia assets.</p>
      <h2>What it is not</h2>
      <p>It is not affiliated with or endorsed by Paul Halpern, Saint Joseph’s University, Basic Books, Caltech, the Solvay Institutes, CERN, or the Nobel Foundation. It is not a replacement for Halpern’s books or the primary and institutional sources linked in the Reference Desk.</p>
      <h2>Editorial labels</h2>
      <table class="editorial-table"><thead><tr><th>Label</th><th>Meaning in this lab</th></tr></thead><tbody>${labelRows}</tbody></table>
      <h2>Offline and privacy posture</h2>
      <p>The core application has no framework, CDN, tracker, account, cookie, or server runtime. Bookmarks, study marks, theme, and pathway progress use local browser storage and never leave the device through this application.</p>
      <h2>Keyboard and display help</h2>
      <ul><li>Use the menu and explorer links as ordinary keyboard-focusable controls.</li><li>The Find button searches every local content collection.</li><li>Teacher mode expands knowledge checks and reveals teaching notes.</li><li>Theme switches between paper and dark editions.</li><li>Animations start paused when the operating system requests reduced motion.</li></ul>
      <div class="button-row"><a class="route-button" href="#/sources" data-route="sources">Open the Reference Desk</a><a class="route-button" href="#/article/history-is-working-physics" data-route="article/history-is-working-physics">Read the editorial method</a></div>`;
    workspace.innerHTML = documentWindow('About & help', `Physics X 95 · ${C.edition}`, content);
  }

  function renderNotFound() {
    const content = `<p class="eyebrow">File not found</p><h1>That drawer is empty.</h1><p>The requested local route does not match a story, exhibit, pathway, or reference view in this edition.</p><div class="button-row"><a class="route-button primary" href="#/home" data-route="home">Return home</a></div>`;
    workspace.innerHTML = documentWindow('Not found', 'Physics X 95', content);
  }

  function renderRoute(route) {
    Atlas.stop();
    state.route = route;
    const [kind, id] = route.split('/');
    if (kind === 'home') renderHome();
    else if (kind === 'stories') renderStories();
    else if (kind === 'article') renderArticle(id);
    else if (kind === 'timeline') renderTimeline();
    else if (kind === 'atlas' && id) renderAtlasExhibit(id);
    else if (kind === 'atlas') renderAtlas();
    else if (kind === 'lessons') renderLessons();
    else if (kind === 'lesson') renderLesson(id);
    else if (kind === 'glossary') renderGlossary();
    else if (kind === 'sources') renderSources();
    else if (kind === 'about') renderAbout();
    else renderNotFound();

    const title = routeTitle(route);
    routeStatus.textContent = title;
    document.title = `${title} — Physics X 95`;
    updateNavigation();
    updateToolbar();
    setStatus(`${title} ready`);
    workspace.scrollTop = 0;
  }

  function searchIndex() {
    const articles = C.articles.map((article) => ({
      kind: 'Story',
      title: article.title,
      route: `article/${article.id}`,
      summary: article.deck,
      text: [article.title, article.deck, article.summary, article.figures.join(' '), ...article.atGlance, ...article.sections.flatMap((section) => [section.heading, ...section.paragraphs])].join(' ')
    }));
    const glossary = C.glossary.map((entry) => ({
      kind: 'Glossary',
      title: entry.term,
      route: 'glossary',
      summary: entry.definition,
      text: `${entry.term} ${entry.definition}`
    }));
    const exhibits = C.atlas.map((exhibit) => ({ kind: 'Exhibit', title: exhibit.title, route: `atlas/${exhibit.id}`, summary: exhibit.description, text: `${exhibit.title} ${exhibit.namespace} ${exhibit.description}` }));
    const lessons = C.lessonPaths.map((lesson) => ({ kind: 'Pathway', title: lesson.title, route: `lesson/${lesson.id}`, summary: lesson.summary, text: `${lesson.title} ${lesson.summary} ${lesson.objectives.join(' ')} ${lesson.sequence.map((step) => `${step.title} ${step.detail}`).join(' ')}` }));
    const timeline = C.timeline.map((event) => ({ kind: 'Timeline', title: `${event.year} — ${event.title}`, route: `article/${event.article}`, summary: event.detail, text: `${event.year} ${event.title} ${event.detail}` }));
    return [...articles, ...glossary, ...exhibits, ...lessons, ...timeline];
  }

  const SEARCH_INDEX = searchIndex();

  function renderSearch(query) {
    const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
    if (!terms.length || terms.join('').length < 2) {
      searchResults.innerHTML = '<div class="search-empty">Type two or more characters to search the local edition.</div>';
      return;
    }
    const ranked = SEARCH_INDEX.map((item) => {
      const haystack = normalize(item.text);
      const title = normalize(item.title);
      const matches = terms.filter((term) => haystack.includes(term));
      const titleMatches = terms.filter((term) => title.includes(term));
      return { item, score: matches.length + titleMatches.length * 2 };
    }).filter((entry) => entry.score > 0).sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title)).slice(0, 36);
    searchResults.innerHTML = ranked.length ? ranked.map(({ item }) => `
      <a class="search-result" href="#/${item.route}" data-route="${escapeHTML(item.route)}"><strong>${escapeHTML(item.title)}</strong><span>${escapeHTML(item.kind)} · ${escapeHTML(item.summary)}</span></a>`).join('') : '<div class="search-empty">No local entries match that search.</div>';
  }

  function openSearch(initialValue) {
    globalSearch.value = initialValue || '';
    renderSearch(globalSearch.value);
    if (typeof searchDialog.showModal === 'function') searchDialog.showModal();
    else searchDialog.setAttribute('open', '');
    window.setTimeout(() => globalSearch.focus(), 0);
  }

  function closeSearch() {
    if (typeof searchDialog.close === 'function' && searchDialog.open) searchDialog.close();
    else searchDialog.removeAttribute('open');
  }

  function toggleBookmark() {
    const label = bookmarkLabel(state.route);
    if (!label) return;
    if (state.bookmarks.has(state.route)) {
      state.bookmarks.delete(state.route);
      showToast(`Removed “${label}” from favourites.`);
    } else {
      state.bookmarks.add(state.route);
      showToast(`Bookmarked “${label}”.`);
    }
    saveSet(STORAGE.bookmarks, state.bookmarks);
    renderFavourites();
    updateToolbar();
  }

  function toggleStudied() {
    const [kind, id] = state.route.split('/');
    if (kind !== 'article' || !articleById(id)) return;
    if (state.studied.has(id)) {
      state.studied.delete(id);
      showToast('Topic marked for another pass.');
    } else {
      state.studied.add(id);
      showToast('Topic marked studied.');
    }
    saveSet(STORAGE.studied, state.studied);
    renderArticle(id);
    updateToolbar();
  }

  function toggleTeacher() {
    state.teacher = !state.teacher;
    try { localStorage.setItem(STORAGE.teacher, state.teacher ? '1' : '0'); } catch { /* Ignore. */ }
    updateTheme();
    updateToolbar();
    showToast(state.teacher ? 'Teacher notes and answers expanded.' : 'Teacher mode off.');
  }

  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(STORAGE.theme, state.theme); } catch { /* Ignore. */ }
    updateTheme();
    updateToolbar();
    showToast(`${state.theme === 'dark' ? 'Dark' : 'Paper'} theme active.`);
  }

  function updateLessonStep(input) {
    const list = input.closest('[data-lesson-id]');
    if (!list) return;
    const lesson = lessonById(list.dataset.lessonId);
    if (!lesson) return;
    const progress = lessonProgress(lesson);
    const index = Number(input.dataset.lessonStep);
    if (input.checked) progress.add(index);
    else progress.delete(index);
    state.lessons[lesson.id] = [...progress].sort((a, b) => a - b);
    saveObject(STORAGE.lessons, state.lessons);
    input.closest('.lesson-step').classList.toggle('completed', input.checked);
    const label = $('#lessonProgressText');
    if (label) label.textContent = `${progress.size} of ${lesson.sequence.length} steps`;
    setStatus(`${lesson.title}: ${progress.size} of ${lesson.sequence.length} steps complete`);
  }

  function resetLesson(id) {
    const lesson = lessonById(id);
    if (!lesson) return;
    delete state.lessons[id];
    saveObject(STORAGE.lessons, state.lessons);
    renderLesson(id);
    showToast('Pathway progress reset.');
  }

  document.addEventListener('click', (event) => {
    const routeTarget = event.target.closest('[data-route]');
    if (routeTarget) {
      event.preventDefault();
      const route = routeTarget.dataset.route;
      if (routeTarget.closest('#searchDialog')) closeSearch();
      navigate(route);
      return;
    }
    const actionTarget = event.target.closest('[data-action]');
    if (actionTarget?.dataset.action === 'reset-lesson') resetLesson(actionTarget.dataset.lessonId);
  });

  workspace.addEventListener('change', (event) => {
    if (event.target.id === 'storyCategory') {
      state.storyCategory = event.target.value;
      renderStories();
      updateNavigation();
    } else if (event.target.id === 'timelineFilter') {
      state.timelineFilter = event.target.value;
      renderTimeline();
      updateNavigation();
    } else if (event.target.matches('[data-lesson-step]')) {
      updateLessonStep(event.target);
    }
  });

  workspace.addEventListener('input', (event) => {
    if (event.target.id !== 'glossaryFilter') return;
    state.glossaryQuery = event.target.value;
    updateGlossaryList();
  });

  $('#quickSearchForm').addEventListener('submit', (event) => {
    event.preventDefault();
    openSearch($('#quickSearch').value);
  });
  $('#searchButton').addEventListener('click', () => openSearch(''));
  globalSearch.addEventListener('input', () => renderSearch(globalSearch.value));
  $('#backButton').addEventListener('click', () => history.back());
  $('#forwardButton').addEventListener('click', () => history.forward());
  bookmarkButton.addEventListener('click', toggleBookmark);
  studyButton.addEventListener('click', toggleStudied);
  teacherButton.addEventListener('click', toggleTeacher);
  themeButton.addEventListener('click', toggleTheme);
  $('#printButton').addEventListener('click', () => window.print());

  $('#contentsTab').addEventListener('click', () => {
    $('#contentsTab').setAttribute('aria-selected', 'true');
    $('#favoritesTab').setAttribute('aria-selected', 'false');
    $('#contentsPanel').hidden = false;
    $('#favoritesPanel').hidden = true;
  });
  $('#favoritesTab').addEventListener('click', () => {
    $('#contentsTab').setAttribute('aria-selected', 'false');
    $('#favoritesTab').setAttribute('aria-selected', 'true');
    $('#contentsPanel').hidden = true;
    $('#favoritesPanel').hidden = false;
    renderFavourites();
  });

  window.addEventListener('hashchange', () => renderRoute(routeFromLocation()));
  window.addEventListener('online', updateNetworkStatus);
  window.addEventListener('offline', updateNetworkStatus);

  updateTheme();
  renderContentsTree();
  renderFavourites();
  updateNetworkStatus();
  renderRoute(routeFromLocation());

  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    navigator.serviceWorker.register('./sw.js').catch(() => setStatus('Ready · offline cache unavailable in this session'));
  }
})();
