const CACHE_NAME = 'pulsaraja-v5'; // Ganti versi terus biar ke-reset
const APP_SHELL = [
  '/index.html',
  '/manifest.json', 
  '/icon-192.png', 
  '/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))));
  self.clients.claim();
});

// Network First: Coba internet dulu. Gagal? Pake cache.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
