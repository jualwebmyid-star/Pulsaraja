self.addEventListener('install', (e) => {
  self.skipWaiting();
});
self.addEventListener('fetch', (e) => {
  // Ambil dari internet dulu. Gagal? Baru ambil cache.
});
