# Otak Usil — Data-Driven Brain-Out Style Puzzle (Level 1–20)

A PWA-ready puzzle game engine that renders every level purely from JSON.
No level logic is hardcoded in JS — add a new object to `levels.json` and
it plays instantly.

## Files

| File                    | Role                                                                 |
|-------------------------|-----------------------------------------------------------------------|
| `index.html`            | Markup + Tailwind/CSS (comic UI shell, screens, animations)          |
| `game.js`               | The engine: loads level data, renders elements, handles all mechanics|
| `levels.json`           | The 20-level dataset — **the single source of truth** (pure data)    |
| `levels-data.js`        | Auto-generated from `levels.json` — same data embedded as a JS variable (`window.__LEVELS_DATA__`) so it loads with zero CORS issues under `file://` |
| `asset-manifest.js`     | Auto-generated list of every cacheable file (images/audio/shell), plus an auto-computed cache version hash |
| `scripts/build.js`      | Build script — regenerates the two files above from `levels.json` + `assets/` |
| `manifest.json`         | PWA manifest (installable, portrait-locked)                          |
| `sw.js`                 | Service worker — Cache-First strategy for offline play               |

## Running it — three ways, all fully offline-ready

**1. Directly via `file://` (no server at all)**
Just double-click `index.html`. `game.js` detects `location.protocol === 'file:'`
and reads level data from the embedded `levels-data.js` instead of calling
`fetch()`, so there's no CORS error. (Service workers don't run under `file://`
in any browser — that's a browser platform limitation, not something this
project can work around — so offline media caching only kicks in under #2/#3
below. The game itself still works fine without it since all assets are local
files already.)

**2. Static server (recommended for development)**

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

Any static host (Netlify, GitHub Pages, `npx serve`, etc.) works too. In this
mode `game.js` tries `fetch('levels.json')` first (so you can edit the JSON
and refresh without rebuilding), falling back to the embedded data if that
fails.

**3. Packaged as an Android APK** — see [Packaging as an Android app](#packaging-as-an-android-app-capacitor) below.

### After editing `levels.json` or adding/removing files in `assets/`

```bash
node scripts/build.js
```

This regenerates `levels-data.js` and `asset-manifest.js` (and bumps the
Service Worker's cache version automatically via a content hash) — nothing
else needs to be touched by hand.

## JSON Schema

```jsonc
{
  "level": 1,
  "pertanyaan": "Dimanakah ular berada?",   // question text shown in the plate
  "tipeMekanik": "click",                    // click | drag | merge | drag_question
  "posisiPertanyaan": { "x":10,"y":4,"width":80,"height":13 }, // % of stage
  "latarBelakang": "linear-gradient(...)",   // any CSS background value
  "elemen": [
    {
      "id": "pohon",
      "tipe": "emoji",          // "emoji" | "svg" (raw inline <svg> string)
      "visual": "🌳",
      "x": 32, "y": 24, "width": 46, "height": 48,  // all % of stage box
      "isDraggable": false,
      "isHidden": false,
      "zIndex": 2,
      "efekKlik": "goyang"      // optional: shake feedback on a wrong click
    }
  ],
  "kunciJawaban": {
    "langkah": [                 // ordered steps the player must satisfy
      { "aksi": "click", "targetId": "pohon", "efek": "reveal", "revealIds": ["ular"] },
      { "aksi": "click", "targetId": "ular",  "efek": "menang" }
    ]
  }
}
```

### `aksi` (action) types inside `langkah`

- **`click`** — `targetId` must be clicked. `efek` can be `"reveal"`
  (unhides `revealIds`, moves to next step) or `"menang"` (wins the level).
- **`drag`** — `targetId` must be dragged so it overlaps `zona`
  (`{x,y,width,height}` in stage %) by ≥40% of its own area.
- **`merge`** — `sourceId` must be dragged onto `destId` (≥30% overlap).
  On success, `destId`'s visual/size can be replaced via `hasil`
  (`visual`, `width`, `height`, optionally `newId` to rename it and
  `isDraggable:true` to chain into a further `drag`/`merge` step —
  see Level 19 & 20 for multi-step combo puzzles).
- **`drag_pertanyaan`** — only valid when `tipeMekanik` is
  `"drag_question"`. The question plate itself becomes draggable;
  once dragged past `jarakMinimum` pixels it fires `efek`.

Steps execute strictly in order (`state.stepIndex`), so a level can chain
any combination of the four mechanics (Level 19 = merge → drag,
Level 20 = drag_question → merge).

## Engine mechanics (game.js)

- **Pointer Events** (`pointerdown/move/up/cancel`) unify mouse + touch —
  no separate touch handlers needed.
- **Click vs. drag** is disambiguated by a 6px movement threshold.
- **Coordinates** are percentage-based relative to the `#stage` box, which
  is locked to a 9:14.5 aspect ratio — this is what makes the layout
  responsive across phone sizes without extra media queries.
- **Overlap math** (`overlapRatio`, `elementsOverlap`) converts bounding
  client rects into intersection-over-element-area ratios for drop-zone
  and merge detection.
- Wrong drags **snap back** to their origin; wrong clicks on marked
  decoys **shake** (`efekKlik:"goyang"`) for feedback.
- **Progress** is stored in `localStorage` under `otakusil_progress_v1` as
  `{ unlockedLevel, completed[] }` — the level-select grid reads this to
  lock/unlock/checkmark tiles.

## Extending

To add Level 21+: append an object to the `levels` array in `levels.json`
following the schema above and bump `TOTAL_LEVELS` in `game.js`. Then run
`node scripts/build.js`. No other code changes are required.

## Packaging as an Android app (Capacitor)

Karena proyek ini tidak butuh backend sama sekali (semua data & aset sudah
lokal), membungkusnya menjadi `.apk` dengan [Capacitor](https://capacitorjs.com/)
hanya butuh beberapa langkah. Capacitor menjalankan folder ini di dalam
WebView Android lewat skema lokal (mis. `https://localhost`) — bukan
`file://` — sehingga Service Worker (`sw.js`) tetap aktif dan cache-first
tetap bekerja normal di dalam APK.

1. **Siapkan folder proyek Capacitor** (di luar folder `www` ini, atau di root):

   ```bash
   npm init -y
   npm install @capacitor/core @capacitor/cli @capacitor/android
   npx cap init "Teka-Teki Gambar" "com.namamu.tekatekigambar" --web-dir=www
   ```

   Pastikan folder `www/` di sini (`index.html`, `game.js`, `assets/`, dst.)
   sudah berada di lokasi yang ditunjuk `--web-dir`. Jalankan
   `node scripts/build.js` dulu sebelum langkah ini supaya `levels-data.js`
   dan `asset-manifest.js` versi terbaru ikut terbawa.

2. **Tambahkan platform Android**:

   ```bash
   npx cap add android
   npx cap copy
   ```

3. **Buka & build lewat Android Studio**:

   ```bash
   npx cap open android
   ```

   Di Android Studio: `Build → Generate Signed Bundle / APK`, pilih **APK**,
   buat/gunakan keystore, lalu build. File `.apk` hasil build ada di
   `android/app/build/outputs/apk/`.

4. **Setiap kali mengubah konten** (level baru, ganti gambar/audio):

   ```bash
   node scripts/build.js   # regenerasi data + manifest cache
   npx cap copy            # salin ulang folder www/ ke proyek Android
   ```

   lalu build ulang APK dari Android Studio.

**Alternatif lebih ringan (tanpa Android Studio):** jika hanya ingin
membungkus cepat tanpa perlu konfigurasi native, [PWABuilder](https://www.pwabuilder.com/)
bisa membaca `manifest.json` yang sudah disediakan di sini dan langsung
menghasilkan paket Android (TWA/APK) dari URL PWA yang sudah di-hosting.
Ini cocok untuk rilis cepat, sementara Capacitor cocok kalau nanti kamu
butuh akses plugin native (mis. notifikasi, IAP, admob) di masa depan.
