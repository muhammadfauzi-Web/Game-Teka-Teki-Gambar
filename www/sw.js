/**
 * =============================================================================
 *  SERVICE WORKER — Teka-Teki Gambar
 * =============================================================================
 * Strategi utama: CACHE-FIRST untuk semua aset media (gambar .png, audio .mp3)
 * dan script (.js), karena aset-aset ini bersifat statis — begitu ter-cache,
 * tidak perlu dicek ulang ke jaringan setiap kali dipakai. Ini membuat game
 * tetap bisa dimainkan 100% offline setelah pemuatan pertama.
 *
 * Daftar aset yang di-precache TIDAK ditulis manual di sini (anti hardcode).
 * Semuanya diimpor dari asset-manifest.js, yaitu file yang di-generate otomatis
 * oleh "node scripts/build.js" dengan memindai folder assets/ + levels.json.
 * Jadi kalau kamu menambah gambar/audio baru, cukup jalankan build ulang —
 * TIDAK perlu menyentuh file sw.js ini sama sekali.
 * =============================================================================
 */

importScripts('./asset-manifest.js');

// Fallback jika asset-manifest.js belum sempat di-generate (mis. saat dev awal):
// tetap sediakan daftar minimum agar Service Worker tidak gagal total.
const CACHE_VERSION = self.__CACHE_VERSION__ || 'v-dev-fallback';
const PRECACHE_ASSETS = self.__PRECACHE_ASSETS__ || [
  './',
  './index.html',
  './game.js',
  './levels-data.js',
  './manifest.json',
];

const CACHE_NAME = `teka-teki-gambar-${CACHE_VERSION}`;

// Ekstensi yang dianggap "aset statis" dan selalu memakai strategi Cache-First.
const STATIC_ASSET_REGEX = /\.(png|jpg|jpeg|webp|svg|gif|mp3|wav|ogg|js|css|woff2?)$/i;

// -----------------------------------------------------------------------------
// INSTALL: precache seluruh app-shell + aset dari manifest
// -----------------------------------------------------------------------------
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .catch((err) => console.warn('Sebagian aset gagal di-precache:', err))
  );
  self.skipWaiting(); // langsung aktifkan versi baru tanpa menunggu tab lama ditutup
});

// -----------------------------------------------------------------------------
// ACTIVATE: buang cache versi lama (mencegah cache basi menumpuk)
// -----------------------------------------------------------------------------
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// -----------------------------------------------------------------------------
// FETCH: strategi berbeda tergantung jenis permintaan
// -----------------------------------------------------------------------------
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return; // biarkan POST/PUT dll lewat apa adanya

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;

  // Permintaan navigasi (mis. membuka index.html) → coba jaringan dulu supaya
  // selalu dapat versi terbaru saat online, tapi tetap ada fallback offline.
  if (request.mode === 'navigate') {
    event.respondWith(networkFirstWithOfflineFallback(request));
    return;
  }

  // Aset statis same-origin (gambar/audio/script/css) → Cache-First murni,
  // sekaligus meng-cache aset BARU secara dinamis (runtime caching) supaya
  // file yang belum sempat di-precache tetap otomatis tersimpan saat pertama
  // kali diakses.
  if (isSameOrigin && STATIC_ASSET_REGEX.test(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Sisanya (mis. font Google, CDN Tailwind) → coba cache dulu, lalu jaringan,
  // dan simpan hasilnya untuk pemakaian offline berikutnya.
  event.respondWith(cacheFirst(request));
});

/**
 * Cache-First: pakai cache jika ada; kalau tidak ada, ambil dari jaringan
 * lalu simpan salinannya ke cache untuk permintaan berikutnya.
 */
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const fresh = await fetch(request);
    // Hanya simpan respons yang valid (hindari menyimpan error/opaque yang rusak)
    if (fresh && fresh.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, fresh.clone());
    }
    return fresh;
  } catch (err) {
    // Benar-benar offline dan tidak ada di cache — tidak ada yang bisa dikembalikan.
    return cached || Response.error();
  }
}

/**
 * Network-First (khusus navigasi halaman): utamakan versi terbaru dari
 * jaringan; kalau gagal (offline), jatuhkan ke index.html dari cache supaya
 * aplikasi tetap bisa terbuka.
 */
async function networkFirstWithOfflineFallback(request) {
  try {
    const fresh = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, fresh.clone());
    return fresh;
  } catch (err) {
    const cachedPage = (await caches.match(request)) || (await caches.match('./index.html'));
    return cachedPage || Response.error();
  }
}
