'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const listeners = {};
let cacheUpdated = false;
const cachedResponse = new Response('cached shell');
const freshResponse = new Response('fresh shell');
const cache = {
  addAll: async () => {},
  put: async (request, response) => {
    assert.equal(request.url, 'https://example.test/index.html');
    assert.equal(await response.text(), 'fresh shell');
    cacheUpdated = true;
  }
};
const caches = {
  open: async () => cache,
  keys: async () => [],
  delete: async () => true,
  match: async () => cachedResponse.clone()
};
const self = {
  location: { origin: 'https://example.test' },
  clients: { claim: async () => {} },
  skipWaiting: async () => {},
  addEventListener: (name, handler) => { listeners[name] = handler; }
};

vm.runInNewContext(
  fs.readFileSync(path.resolve(__dirname, '../sw.js'), 'utf8'),
  { self, caches, fetch: async () => freshResponse.clone(), URL, Response, Promise }
);

assert.equal(typeof listeners.fetch, 'function', 'Service worker registers a fetch handler');

let responsePromise;
let lifetimePromise;
const request = { method: 'GET', mode: 'navigate', url: 'https://example.test/index.html' };
listeners.fetch({
  request,
  respondWith: (promise) => { responsePromise = promise; },
  waitUntil: (promise) => { lifetimePromise = promise; }
});

assert.ok(responsePromise, 'Fetch response is delegated to respondWith');
assert.ok(lifetimePromise, 'Background refresh is delegated to waitUntil');

(async () => {
  const response = await responsePromise;
  assert.equal(await response.text(), 'cached shell', 'Cached shell responds immediately');
  await lifetimePromise;
  assert.equal(cacheUpdated, true, 'Fresh shell is written before the event lifetime ends');
  console.log('Physics X 95 service-worker lifetime: PASS');
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
