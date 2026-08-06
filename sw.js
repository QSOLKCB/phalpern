/* Physics X 95 offline cache — SPDX-License-Identifier: MPL-2.0 */
'use strict';

const CACHE_NAME = 'physicsx95-v1.0.0';
const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './js/content.js',
  './js/math.js',
  './js/atlas.js',
  './js/app.js',
  './assets/icon.svg',
  './manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('physicsx95-') && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  const cachedResponse = caches.match(event.request);
  const network = fetch(event.request).then(async (response) => {
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(event.request, response.clone());
    }
    return response;
  });

  event.respondWith(
    cachedResponse
      .then((cached) => cached || network)
      .catch(() => (event.request.mode === 'navigate'
        ? caches.match('./index.html').then((response) => response || Response.error())
        : Response.error()))
  );
  event.waitUntil(network.catch(() => undefined));
});
