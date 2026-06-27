const CACHE_NAME = 'pulsaraja-v4'; // Naikin versi biar ke-reset cache lama
const APP_SHELL = [
  '/', // Ini kunci nya bos
  '/index.html',
  '/manifest.json', 
  '/icon-192.png', 
  '/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('SW: Caching App Shell');
      return cache.addAll(APP_SHELL);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Strategi: Cache First. Gak ada internet? Gas cache.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      return cached || fetch(e.request);
    })
  );
});
