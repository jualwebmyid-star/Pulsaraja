const CACHE_NAME = 'pulsaraja-v3';
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Pas install, langsung cache semua
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

// Hapus cache lama
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Offline First: Ambil dari cache dulu, gagal baru internet
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
