'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const index = read('index.html');
const manifest = JSON.parse(read('manifest.webmanifest'));
const serviceWorker = read('sw.js');
const workflow = read('.github/workflows/pages.yml');
const app = read('js/app.js');
const atlas = read('js/atlas.js');

for (const file of ['index.html', 'styles.css', 'js/content.js', 'js/math.js', 'js/atlas.js', 'js/app.js', 'assets/icon.svg', 'manifest.webmanifest', 'sw.js', 'README.md']) {
  assert.ok(fs.statSync(path.join(root, file)).size > 0, `${file} exists and is not empty`);
}

assert.match(index, /<html lang="en">/);
assert.match(index, /Content-Security-Policy/);
assert.match(index, /class="skip-link"/);
assert.match(index, /id="themeButton"/);
assert.doesNotMatch(index, /<script(?![^>]*\bsrc=)[^>]*>/i, 'No inline scripts');
assert.doesNotMatch(index, /<(?:script|link)[^>]+(?:src|href)="https?:/i, 'No remote runtime dependencies');

const ids = [...index.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, 'HTML IDs are unique');

for (const asset of ['index.html', 'styles.css', 'js/content.js', 'js/math.js', 'js/atlas.js', 'js/app.js', 'assets/icon.svg', 'manifest.webmanifest']) {
  assert.match(serviceWorker, new RegExp(asset.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `Service worker precaches ${asset}`);
}

assert.equal(manifest.display, 'standalone');
assert.equal(manifest.scope, './');
assert.ok(manifest.start_url.startsWith('./'));
assert.ok(manifest.icons.every((icon) => !/^https?:/.test(icon.src)), 'Manifest icons are local');

assert.match(app, /prefers-color-scheme: dark/, 'Theme honours system preference');
assert.match(app, /serviceWorker\.register/, 'Application registers the service worker');
assert.match(atlas, /prefers-reduced-motion: reduce/, 'Atlas honours reduced-motion preference');
assert.match(atlas, /M\.createRng\('brownian-1905'\)/, 'Brownian model uses a replayable seed');
assert.match(atlas, /M\.gamma\(state\.beta\)/, 'Light clock uses the tested Lorentz factor');

for (const action of ['actions/checkout', 'actions/configure-pages', 'actions/upload-pages-artifact', 'actions/deploy-pages']) {
  assert.match(workflow, new RegExp(`${action.replace('/', '\\/')}@v\\d+`), `Workflow uses ${action}`);
}
assert.match(workflow, /node --check/);
assert.match(workflow, /tests\/math\.test\.js/);
assert.match(workflow, /tests\/content\.test\.js/);
assert.match(workflow, /tests\/static\.test\.js/);
assert.match(workflow, /tests\/service-worker\.test\.js/);

console.log('Physics X 95 static, accessibility, and offline-shell checks: PASS');
