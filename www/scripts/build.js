#!/usr/bin/env node
/**
 * =============================================================================
 *  BUILD SCRIPT — Otak Usil / Teka-Teki Gambar
 * =============================================================================
 * Skrip ini adalah SATU-SATUNYA tempat yang boleh menghasilkan file turunan.
 * Tujuannya: menjaga prinsip DRY (Don't Repeat Yourself) — kita hanya menulis
 * data di SATU sumber (levels.json + folder assets/), lalu skrip ini yang
 * menurunkan dua file JS pendukung:
 *
 *   1. levels-data.js   → salinan levels.json yang dibungkus sebagai variabel
 *                         JavaScript (window.__LEVELS_DATA__). Ini kunci utama
 *                         agar game tetap 100% offline-ready: <script src="...">
 *                         TIDAK diblokir CORS oleh protokol file://, berbeda
 *                         dengan fetch()/XHR yang selalu diblokir browser saat
 *                         membuka index.html langsung dari harddisk.
 *
 *   2. asset-manifest.js → daftar lengkap semua file statis (gambar, audio,
 *                         ikon, shell aplikasi) yang otomatis dipindai dari
 *                         disk, lengkap dengan versi cache yang dihitung dari
 *                         hash konten. Dipakai oleh sw.js (Service Worker)
 *                         untuk pre-cache di strategi Cache-First.
 *
 * Cara pakai:
 *   node scripts/build.js
 *
 * Jalankan skrip ini SETIAP KALI kamu:
 *   - mengubah levels.json (menambah/mengedit level, soal, atau elemen)
 *   - menambah/menghapus file di folder assets/
 *
 * Game tetap bisa dimainkan tanpa build (game.js punya fallback fetch()),
 * tapi build wajib dijalankan sebelum distribusi offline / build APK agar
 * data & cache selalu sinkron dengan versi terbaru.
 * =============================================================================
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');

// -----------------------------------------------------------------------------
// 1. EMBED levels.json → levels-data.js
// -----------------------------------------------------------------------------
function buildLevelsData() {
  const levelsPath = path.join(ROOT, 'levels.json');
  const raw = fs.readFileSync(levelsPath, 'utf8');

  // Validasi JSON di awal supaya kesalahan sintaks langsung ketahuan saat build,
  // bukan saat game sudah berjalan di HP pemain.
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    throw new Error(`levels.json tidak valid: ${err.message}`);
  }

  const output =
    `// FILE HASIL GENERATE OTOMATIS — JANGAN DIEDIT MANUAL.\n` +
    `// Sumber asli: levels.json — edit file itu, lalu jalankan "node scripts/build.js".\n` +
    `// Tujuan: menyediakan data level tanpa fetch(), supaya game tetap berjalan\n` +
    `// walau dibuka langsung lewat file:// (tanpa server lokal / Node.js).\n` +
    `window.__LEVELS_DATA__ = ${JSON.stringify(parsed, null, 2)};\n`;

  fs.writeFileSync(path.join(ROOT, 'levels-data.js'), output, 'utf8');
  console.log('✔ levels-data.js berhasil dibuat dari levels.json');
  return parsed;
}

// -----------------------------------------------------------------------------
// 2. PINDAI folder proyek → asset-manifest.js (untuk precache Service Worker)
// -----------------------------------------------------------------------------
function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith('.')) continue; // lewati file/folder tersembunyi
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === 'scripts' || name === 'node_modules') continue; // bukan aset runtime
      walk(full, out);
    } else {
      out.push(full);
    }
  }
  return out;
}

function buildAssetManifest() {
  // Berkas "shell" inti aplikasi (wajib ada agar app-nya bisa jalan sama sekali).
  const CORE_SHELL = [
    './',
    './index.html',
    './game.js',
    './levels-data.js',
    './manifest.json',
  ];

  // Pindai folder assets/ secara rekursif — jadi menambah file gambar/audio baru
  // TIDAK PERLU mengedit sw.js sama sekali, cukup jalankan build ulang.
  const assetsDir = path.join(ROOT, 'assets');
  const scanned = walk(assetsDir).map((f) => './' + path.relative(ROOT, f).split(path.sep).join('/'));

  const allAssets = Array.from(new Set([...CORE_SHELL, ...scanned]));

  // Hitung hash konten seluruh file untuk versi cache otomatis.
  // Dengan begini developer TIDAK PERLU mengingat-ingat menaikkan nomor versi
  // manual di sw.js — begitu ada file yang berubah, versi cache ikut berubah
  // dan Service Worker otomatis membuang cache lama (mencegah bug "cache basi").
  const hash = crypto.createHash('sha1');
  for (const rel of allAssets) {
    const full = path.join(ROOT, rel);
    if (fs.existsSync(full) && fs.statSync(full).isFile()) {
      hash.update(rel);
      hash.update(fs.readFileSync(full));
    }
  }
  const cacheVersion = 'v' + hash.digest('hex').slice(0, 10);

  const output =
    `// FILE HASIL GENERATE OTOMATIS — JANGAN DIEDIT MANUAL.\n` +
    `// Dibuat oleh scripts/build.js dengan memindai levels.json + folder assets/.\n` +
    `// Dipakai oleh sw.js untuk pre-cache aset (strategi Cache-First).\n` +
    `self.__CACHE_VERSION__ = ${JSON.stringify(cacheVersion)};\n` +
    `self.__PRECACHE_ASSETS__ = ${JSON.stringify(allAssets, null, 2)};\n`;

  fs.writeFileSync(path.join(ROOT, 'asset-manifest.js'), output, 'utf8');
  console.log(`✔ asset-manifest.js berhasil dibuat (${allAssets.length} aset, versi ${cacheVersion})`);
}

// -----------------------------------------------------------------------------
// Jalankan build
// -----------------------------------------------------------------------------
try {
  buildLevelsData();
  buildAssetManifest();
  console.log('\nBuild selesai. Proyek siap dijalankan offline (file://), di server statis, maupun dibungkus ke APK.');
} catch (err) {
  console.error('✘ Build gagal:', err.message);
  process.exit(1);
}
