const TOTAL_LEVELS = 20;
const STORAGE_KEY ='TekaTeki_gambar_progress_v1';
const LEVELS_URL = 'levels.json';

let ALL_LEVELS = [];

const state = {
  levelIndex: 0,
  level: null,
  stepIndex: 0,
  elements: {},
  locked: false,
  hintUnlocked: false
};

const progress = loadProgress();

const audioBgm = new Audio('assets/audio/bgm.mp3');
audioBgm.loop = true;
audioBgm.volume = 0.5;

const audioClick = new Audio('assets/audio/click.mp3');
const audioWrong = new Audio('assets/audio/wrong.mp3');
const audioWin = new Audio('assets/audio/win.mp3');
const audioCorrect = new Audio('assets/audio/benar.mp3');

let bgmStarted = false;
document.body.addEventListener('pointerdown', () => {
  if (!bgmStarted) {
    audioBgm.play().catch(e => console.log('BGM ditahan oleh browser', e));
    bgmStarted = true;
  }
}, { once: true });

let isSoundOn = localStorage.getItem('soundState') !== 'mute';
const btnSoundEl = document.getElementById('btn-sound');

updateSoundIcon();
applySoundState();

function updateSoundIcon() {
  if (!btnSoundEl) return;
  btnSoundEl.textContent = isSoundOn ? '🔊' : '🔇';
}

function applySoundState() {
  const volume = isSoundOn ? 1 : 0;
  audioBgm.volume = isSoundOn ? 0.5 : 0;
  audioClick.volume = volume;
  audioWrong.volume = volume;
  audioWin.volume = volume;
  if (typeof audioCorrect !== 'undefined') audioCorrect.volume = volume;
}

function toggleSound() {
  isSoundOn = !isSoundOn;
  localStorage.setItem('soundState', isSoundOn ? 'on' : 'mute');
  updateSoundIcon();
  applySoundState();
  
  if (isSoundOn) {
    audioClick.currentTime = 0;
    audioClick.play().catch(()=>{});
  }
}

const stageEl = document.getElementById('stage');
const toastEl = document.getElementById('toast');
const levelNumEl = document.getElementById('level-num');
const hintBar = document.getElementById('hint-bar');
const screenMenu = document.getElementById('screen-menu');
const screenWin = document.getElementById('screen-win');
const levelGrid = document.getElementById('level-grid');

document.getElementById('btn-back').addEventListener('click', () => openMenu());
document.getElementById('btn-restart').addEventListener('click', () => {
  if (state.level) loadLevel(state.levelIndex, true);
});
document.getElementById('btn-menu-from-win').addEventListener('click', () => {
  screenWin.classList.add('hidden');
  openMenu();
});
document.getElementById('btn-next-level').addEventListener('click', () => {
  screenWin.classList.add('hidden');
  const next = state.levelIndex + 1;
  if (next < ALL_LEVELS.length) loadLevel(next, true);
  else openMenu();
});
document.getElementById('btn-reset-progress').addEventListener('click', () => {
  if (confirm('Hapus semua progres permainan?')) {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }
});

init();

async function init() {
  try {
    const data = await loadLevelsData();
    ALL_LEVELS = data.levels;
  } catch (err) {
    hintBar.textContent = 'Gagal memuat data level. Coba muat ulang halaman.';
    console.error('Gagal memuat level:', err);
    return;
  }
  renderLevelGrid();
  openMenu();
}

/**
 * Mengambil data level dengan strategi berlapis (data-driven, anti-CORS):
 *
 * 1. Jika halaman dibuka lewat http/https (server statis, PWA, atau WebView
 *    Capacitor), coba fetch() levels.json langsung. Cara ini paling fleksibel
 *    karena data bisa diperbarui tanpa perlu build ulang.
 * 2. Jika fetch gagal (mis. offline, atau file levels.json tidak tersedia),
 *    ATAU halaman dibuka lewat protokol file:// (di mana fetch() ke file lokal
 *    selalu diblokir CORS oleh browser), gunakan data yang sudah di-embed
 *    langsung sebagai variabel JavaScript lewat <script src="levels-data.js">.
 *    Tag <script> tidak pernah kena blokir CORS, beda dengan fetch()/XHR,
 *    sehingga cara ini menjamin game tetap 100% offline-ready walau dibuka
 *    langsung dari file manager HP tanpa server lokal sama sekali.
 *
 * levels-data.js sendiri di-generate otomatis dari levels.json lewat
 * "node scripts/build.js" — jadi tetap satu sumber data (DRY), tidak ada
 * duplikasi manual antara file JSON dan file JS.
 */
async function loadLevelsData() {
  if (location.protocol !== 'file:') {
    try {
      const res = await fetch(LEVELS_URL, { cache: 'no-store' });
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('Fetch levels.json gagal, beralih ke data ter-embed:', err);
    }
  }

  if (window.__LEVELS_DATA__) return window.__LEVELS_DATA__;

  throw new Error('Tidak ada sumber data level yang tersedia (fetch gagal & data embed tidak ditemukan).');
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return { unlockedLevel: 1, completed: [] };
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function openMenu() {
  stageEl.innerHTML = '';
  screenMenu.classList.remove('hidden');
  hintBar.textContent = 'Pilih level untuk mulai bermain.';
  document.getElementById('btn-hint').classList.add('hidden');
  renderLevelGrid();
}

function renderLevelGrid() {
  levelGrid.innerHTML = '';
  for (let i = 1; i <= TOTAL_LEVELS; i++) {
    const tile = document.createElement('div');
    const isDone = progress.completed.includes(i);
    const isUnlocked = i <= progress.unlockedLevel;
    tile.className = 'level-tile ' + (isDone ? 'done' : isUnlocked ? 'unlocked' : 'locked');
    tile.innerHTML = isDone
      ? `✓<span style="font-size:10px">Lv${i}</span>`
      : isUnlocked
        ? `${i}`
        : `🔒`;
    if (isUnlocked && ALL_LEVELS.length) {
      tile.addEventListener('click', () => {
        audioBgm.play().catch(e => console.log("BGM diblokir:", e));
        bgmStarted = true;
        screenMenu.classList.add('hidden');
        loadLevel(i - 1, true);
      });
    }
    levelGrid.appendChild(tile);
  }
}

function loadLevel(index, hideMenu) {
  if (!ALL_LEVELS[index]) { openMenu(); return; }
  state.levelIndex = index;
  state.level = structuredClone(ALL_LEVELS[index]);
  state.stepIndex = 0;
  state.locked = false;
  state.elements = {};
  state.hintUnlocked = false;
  if (hideMenu) screenMenu.classList.add('hidden');
  document.getElementById('btn-hint').classList.remove('hidden');
  screenWin.classList.add('hidden');
  renderStage(state.level);
  levelNumEl.textContent = state.level.level;
  hintBar.textContent = mechanicHint(state.level.tipeMekanik);
}

function mechanicHint(tipe) {
  switch (tipe) {
    case 'click': return 'Ketuk objek di layar untuk mengungkap petunjuk.';
    case 'drag': return 'Seret objek ke tempat yang tepat.';
    case 'merge': return 'Seret satu objek ke objek lain untuk menggabungkannya.';
    case 'drag_question': return 'Coba geser tulisan pertanyaannya!';
    default: return 'Pecahkan teka-tekinya!';
  }
}

function setVisual(node, tipe, visual) {
  let visWrapper = node.querySelector('.visual-wrapper');
  if (!visWrapper) {
    visWrapper = document.createElement('div');
    visWrapper.className = 'visual-wrapper';
    visWrapper.style.width = '100%';
    visWrapper.style.height = '100%';
    visWrapper.style.display = 'flex';
    visWrapper.style.alignItems = 'center';
    visWrapper.style.justifyContent = 'center';
    visWrapper.style.pointerEvents = 'none';
    node.insertBefore(visWrapper, node.firstChild);
  }

  if (tipe === 'image') {
    visWrapper.innerHTML = `<img src="${visual}" style="width:100%; height:100%; object-fit:contain; user-select:none; pointer-events:none;" draggable="false">`;
  } else if (tipe === 'svg') {
    visWrapper.innerHTML = visual;
  } else {
    visWrapper.textContent = visual;
  }
}

function renderStage(level) {
  stageEl.innerHTML = '';
  const bgWarna = level.latarBelakang || '#ffffff';
  
  if (bgWarna.includes('gradient')) {
    stageEl.style.backgroundImage = bgWarna;
    document.body.style.backgroundImage = bgWarna;
    document.getElementById('console-frame').style.backgroundImage = bgWarna;
  } else {
    stageEl.style.background = bgWarna;
    document.body.style.background = bgWarna;
    document.getElementById('console-frame').style.background = bgWarna;
  }

  const qPos = level.posisiPertanyaan || { x: 10, y: 4, width: 80, height: 13 };
  const qbox = document.createElement('div');
  qbox.id = 'question-box';
  qbox.className = 'qbox';
  qbox.style.left = qPos.x + '%';
  qbox.style.top = qPos.y + '%';
  qbox.style.width = qPos.width + '%';
  qbox.style.minHeight = qPos.height + '%';
  qbox.textContent = level.pertanyaan;
  if (level.tipeMekanik === 'drag_question') {
    qbox.classList.add('qbox-draggable');
    const hint = document.createElement('div');
    hint.className = 'grab-hint hidden-el';
    hint.textContent = '✋';
    qbox.appendChild(hint);
    attachQuestionDragHandlers(qbox, qPos);
  }
  stageEl.appendChild(qbox);

  level.elemen.forEach(el => {
    state.elements[el.id] = el;
    stageEl.appendChild(buildElementNode(el));
  });
}


function buildElementNode(el) {
  const node = document.createElement('div');
  node.className = 'game-el' + (el.isDraggable ? ' draggable' : '') + (el.isHidden ? ' hidden-el' : '');
  node.id = 'el-' + el.id;
  node.dataset.id = el.id;
  node.style.left = el.x + '%';
  node.style.top = el.y + '%';
  node.style.width = el.width + '%';
  node.style.height = el.height + '%';
  node.style.zIndex = el.zIndex || 1;

  setVisual(node, el.tipe, el.visual || el.teks);
  
  if (el.tipe === 'text') {
    if (el.warna) node.style.color = el.warna;
    if (el.ukuranHuruf) node.style.fontSize = el.ukuranHuruf + 'px';
    if (el.tebal) node.style.fontWeight = 'bold';
    if (el.rataTengah) node.style.textAlign = 'center';
  }

  if (el.label) {
    const lbl = document.createElement('span');
    lbl.className = 'el-label';
    lbl.textContent = el.label;
    node.appendChild(lbl);
  }

  node.dataset.isDraggable = el.isDraggable ? 'true' : 'false';
  node.dataset.isTarget = el.isTarget ? 'true' : 'false';
  if (el.efekKlik) node.dataset.efekKlik = el.efekKlik;
  if (el.hitbox && typeof el.hitbox === 'object') {
    node.dataset.hitbox = JSON.stringify(el.hitbox);
  }
  if (el.isTarget) node.classList.add('is-target');

  attachElementHandlers(node);
  return node;
}

function attachElementHandlers(node) {
  node.addEventListener('pointerdown', (e) => {
    if (state.locked) return;
    e.preventDefault();
    const data = state.elements[node.dataset.id];
    if (!data) return;

    const stageRect = stageEl.getBoundingClientRect();
    const startLeft = parseFloat(node.style.left);
    const startTop = parseFloat(node.style.top);
    const startX = e.clientX, startY = e.clientY;
    let moved = false;

    try { node.setPointerCapture(e.pointerId); } catch (err) {}

    function onMove(ev) {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) moved = true;
      if (data.isDraggable && moved) {
        node.classList.add('dragging');
        const dxPct = (dx / stageRect.width) * 100;
        const dyPct = (dy / stageRect.height) * 100;
        node.style.left = (startLeft + dxPct) + '%';
        node.style.top = (startTop + dyPct) + '%';
      }
    }

    function onUp() {
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerup', onUp);
      node.removeEventListener('pointercancel', onUp);
      node.classList.remove('dragging');

      if (state.locked) return;

      if (moved && data.isDraggable) {
        handleDragEnd(node, data, startLeft, startTop);
      } else if (!moved) {
        audioClick.currentTime = 0;
        audioClick.play();
        handleClick(node, data);
      }
    }

    node.addEventListener('pointermove', onMove);
    node.addEventListener('pointerup', onUp);
    node.addEventListener('pointercancel', onUp);
  });
}

function handleClick(node, data) {
  const step = currentStep();
  if (!step) return;

  const daftarUmpan = state.level.kunciJawaban && state.level.kunciJawaban.umpanSalah;
  if (daftarUmpan) {
    const umpan = daftarUmpan.find(u => u.targetId === data.id);
    if (umpan) {
      if (umpan.pesan) showToast(umpan.pesan);
      audioWrong.currentTime = 0;
      audioWrong.play();
      return;
    }
  }
  if (step.aksi === 'click' && step.targetId === data.id) {
    if (data.efekKlik === 'sibak') {
    node.style.pointerEvents = 'none'; 
  }
  if (data.efekKlik === 'buka' && data.visualBuka) {
    const imgEl = node.querySelector('img');
    if (imgEl) {
      imgEl.src = data.visualBuka;
      node.style.pointerEvents = 'none'; 
    }
  }
    
  if (data.efekKlik) bump(node, data.efekKlik);
    applyStep(step); 
  } else {
    showWrong(); 
  }
}


function showWrong() {
  audioWrong.currentTime = 0;
  audioWrong.play();

  const mark = document.getElementById('wrong-mark');
  if (mark) {
    mark.textContent = '❌';
    mark.style.color = '#ef4444';
    mark.classList.add('show');
    setTimeout(() => mark.classList.remove('show'), 500);
  }

  stageEl.classList.add('shake');
  setTimeout(() => stageEl.classList.remove('shake'), 500);

  if (navigator.vibrate) navigator.vibrate(200);
}

function handleDragEnd(node, data, startLeft, startTop) {
  const step = currentStep();
  if (!step) { showWrong(); snapBack(node, startLeft, startTop); return; }

  if (step.aksi === 'drag' && step.targetId === data.id) {
    let zonaDeteksi = step.zona;
    if (step.tujuanId) {
      const dataTujuan = state.elements[step.tujuanId];
      if (dataTujuan) {
        zonaDeteksi = (dataTujuan.hitbox && typeof dataTujuan.hitbox === 'object')
          ? dataTujuan.hitbox
          : { x: dataTujuan.x, y: dataTujuan.y, width: dataTujuan.width, height: dataTujuan.height };
      }
    }
    if (!zonaDeteksi) { showWrong(); snapBack(node, startLeft, startTop); return; }

    const overlap = overlapRatio(node, zonaDeteksi);
    if (overlap >= 0.25) {
      if (step.posisiAkhir) {
        node.style.left = step.posisiAkhir.x + '%';
        node.style.top = step.posisiAkhir.y + '%';
        data.isDraggable = false;
        node.classList.remove('draggable');
        node.style.pointerEvents = 'none';
      } else {
        snapInto(node, zonaDeteksi);
      }

      applyStepCommands(step);

      audioClick.currentTime = 0;
      audioClick.play();
      applyStep(step);
    } else {
      showWrong();
      snapBack(node, startLeft, startTop);
    }
    return;
  }

  if (step.aksi === 'merge' && step.sourceId === data.id) {
    const destNode = document.getElementById('el-' + step.destId);
    if (destNode && elementsOverlap(node, destNode) >= 0.25) {
      performMerge(node, destNode, step);
      applyStepCommands(step);
      audioClick.currentTime = 0;
      audioClick.play();
      applyStep(step);
    } else {
      showWrong();
      snapBack(node, startLeft, startTop);
    }
    return;
  }

  showWrong();
  snapBack(node, startLeft, startTop);
}

function applyStepCommands(step) {
  if (step.ubahZIndex && step.ubahZIndex.id) {
    const el = state.elements[step.ubahZIndex.id];
    const nodeZ = document.getElementById('el-' + step.ubahZIndex.id);
    if (el) el.zIndex = step.ubahZIndex.nilai;
    if (nodeZ) nodeZ.style.zIndex = step.ubahZIndex.nilai;
  }
}

function performMerge(sourceNode, destNode, step) {
  const hasil = step.hasil || {};
  sourceNode.classList.add('hidden-el');
  sourceNode.style.pointerEvents = 'none';
  setTimeout(() => sourceNode.remove(), 260);

  const destData = state.elements[destNode.dataset.id];
  if (hasil.pertahankanTarget === true) {
     destData.isTarget = true;
     destData.isDraggable = false;
  }
  
  if (hasil.visual) {
    const newTipe = hasil.tipe || destData.tipe;
    setVisual(destNode, newTipe, hasil.visual);
  }
  
  if (hasil.width) destNode.style.width = hasil.width + '%';
  if (hasil.height) destNode.style.height = hasil.height + '%';
  bump(destNode, 'pop');

  if (hasil.newId) {
    delete state.elements[destData.id];
    destData.id = hasil.newId;
    destNode.id = 'el-' + hasil.newId;
    destNode.dataset.id = hasil.newId;
    state.elements[hasil.newId] = destData;
  }
  if (hasil.isDraggable) {
    destData.isDraggable = true;
    destNode.classList.add('draggable');
  }
}

function attachQuestionDragHandlers(qbox, qPos) {
  qbox.addEventListener('pointerdown', (e) => {
    if (state.locked) return;
    e.preventDefault();
    const stageRect = stageEl.getBoundingClientRect();
    const startLeft = qPos.x, startTop = qPos.y;
    const startX = e.clientX, startY = e.clientY;
    let maxDist = 0;

    try { qbox.setPointerCapture(e.pointerId); } catch (err) {}

    function onMove(ev) {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      const dist = Math.hypot(dx, dy);
      if (dist > maxDist) maxDist = dist;
      qbox.classList.add('dragging');
      const dxPct = (dx / stageRect.width) * 100;
      const dyPct = (dy / stageRect.height) * 100;
      qbox.style.left = (startLeft + dxPct) + '%';
      qbox.style.top = (startTop + dyPct) + '%';
    }

    function onUp() {
      qbox.removeEventListener('pointermove', onMove);
      qbox.removeEventListener('pointerup', onUp);
      qbox.removeEventListener('pointercancel', onUp);
      qbox.classList.remove('dragging');
      if (state.locked) return;

      const step = currentStep();
      if (step && step.aksi === 'drag_question' && maxDist >= (step.jarakMinimum || 30)) {
        audioClick.currentTime = 0;
        audioClick.play();
        applyStep(step);
      } else {
        qbox.style.left = startLeft + '%';
        qbox.style.top = startTop + '%';
      }
    }

    qbox.addEventListener('pointermove', onMove);
    qbox.addEventListener('pointerup', onUp);
    qbox.addEventListener('pointercancel', onUp);
  });
}

function currentStep() {
  const steps = state.level && state.level.kunciJawaban && state.level.kunciJawaban.langkah;
  if (!steps) return null;
  return steps[state.stepIndex] || null;
}

function applyStep(step) {
  if (step.pesan) showToast(step.pesan);

  if (step.sembunyikan && Array.isArray(step.sembunyikan)) {
    step.sembunyikan.forEach(id => {
      const el = state.elements[id];
      const node = document.getElementById('el-' + id);
      if (el) el.isHidden = true;
      if (node) node.classList.add('hidden-el');
    });
  }
  if (step.tampilkan && Array.isArray(step.tampilkan)) {
    step.tampilkan.forEach(id => revealElement(id));
  }

  if (step.efek === 'reveal') {
    (step.revealIds || []).forEach(revealElement);
    state.stepIndex++;
  } else if (step.efek === 'lanjut') {
    state.stepIndex++;
  } else if (step.efek === 'none') {
    state.stepIndex++;
  } else if (step.efek === 'tetap') {
    state.stepIndex++;
  } else if (step.efek === 'menang') {
    winLevel();
  }
}

function revealElement(id) {
  const node = document.getElementById('el-' + id);
  const data = state.elements[id];
  if (data) data.isHidden = false;
  if (node) {
    node.classList.remove('hidden-el');
    bump(node, 'pop');
  }
}

function overlapRatio(node, zonaPercent) {
  const stageRect = stageEl.getBoundingClientRect();
  const a = node.getBoundingClientRect();
  const zonePx = {
    left: stageRect.left + (zonaPercent.x / 100) * stageRect.width,
    top: stageRect.top + (zonaPercent.y / 100) * stageRect.height,
    width: (zonaPercent.width / 100) * stageRect.width,
    height: (zonaPercent.height / 100) * stageRect.height
  };
  const ix = Math.max(0, Math.min(a.right, zonePx.left + zonePx.width) - Math.max(a.left, zonePx.left));
  const iy = Math.max(0, Math.min(a.bottom, zonePx.top + zonePx.height) - Math.max(a.top, zonePx.top));
  const interArea = ix * iy;
  const aArea = a.width * a.height;
  return aArea > 0 ? interArea / aArea : 0;
}

function elementsOverlap(nodeA, nodeB) {
  const a = nodeA.getBoundingClientRect();
  const b = nodeB.getBoundingClientRect();
  const ix = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
  const iy = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  const interArea = ix * iy;
  const aArea = a.width * a.height;
  return aArea > 0 ? interArea / aArea : 0;
}

function snapBack(node, left, top) {
  node.style.left = left + '%';
  node.style.top = top + '%';
}

function snapInto(node, zonaPercent) {
  const w = parseFloat(node.style.width);
  const h = parseFloat(node.style.height);
  node.style.left = (zonaPercent.x + zonaPercent.width / 2 - w / 2) + '%';
  node.style.top = (zonaPercent.y + zonaPercent.height / 2 - h / 2) + '%';
}

function bump(node, animClass) {
  node.classList.remove(animClass);
  void node.offsetWidth;
  node.classList.add(animClass);
}

let toastTimer = null;
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
}

function winLevel() {
  state.locked = true;
  
  const mark = document.getElementById('wrong-mark');
  if (mark) {
    mark.textContent = '✅';
    mark.style.color = '#22c55e';
    mark.classList.add('show');
  }
  
  audioCorrect.currentTime = 0;
  audioCorrect.play().catch(e => console.log("Suara benar dimainkan", e));

  setTimeout(() => { 
    if (mark) mark.classList.remove('show');
    
    audioBgm.pause();
    audioWin.currentTime = 0;
    audioWin.play();
    
    setTimeout(() => { 
      if (bgmStarted) audioBgm.play().catch(() => {}); 
    }, 2500); 

    const n = state.level.level;
    if (!progress.completed.includes(n)) progress.completed.push(n);
    progress.unlockedLevel = Math.max(progress.unlockedLevel, n + 1);
    saveProgress();

    const isLast = state.levelIndex >= ALL_LEVELS.length - 1;
    document.getElementById('win-emoji').textContent = isLast ? '🏆' : '🎉';
    document.getElementById('btn-next-level').textContent = isLast ? 'Selesai' : 'Lanjut ▶';
    document.getElementById('btn-next-level').style.display = 'block';

    setTimeout(() => screenWin.classList.remove('hidden'), 100);
  }, 1500);
}

document.addEventListener('click', (e) => {
  if (
    e.target.tagName === 'BUTTON' || 
    e.target.closest('.level-tile') || 
    e.target.closest('.btn-pop') || 
    e.target.closest('.icon-btn')
  ) {
    audioClick.currentTime = 0;
    audioClick.play().catch(err => console.log("Gagal memutar suara tombol:", err));
  }
});

document.getElementById('btn-hint').addEventListener('click', (e) => {
  e.stopPropagation(); 
  if (state.locked || !state.level) return;
  if (state.hintUnlocked === true) {
    berikanHadiahHint();
  } 
  else {
    putarIklanReward();
  }
});

async function putarIklanReward() {
  if (typeof admob === 'undefined') {
    showToast("Fitur iklan hanya berjalan di Aplikasi Android.");
    return;
  }

  showToast("Memuat iklan petunjuk...");
  state.locked = true;

  try {
    
    const rewarded = new admob.RewardedAd({
      adUnitId: 'ca-app-pub-3940256099942544/5224354917'
    });

    const onReward = () => {
      state.hintUnlocked = true;
      berikanHadiahHint();
      document.removeEventListener('admob.rewarded.reward', onReward);
    };
    document.addEventListener('admob.rewarded.reward', onReward);

    const onDismiss = () => {
      state.locked = false;
      document.removeEventListener('admob.rewarded.dismiss', onDismiss);
      document.removeEventListener('admob.rewarded.reward', onReward);
    };
    document.addEventListener('admob.rewarded.dismiss', onDismiss);

    await rewarded.load();
    await rewarded.show();

  } catch (error) {
    console.error("AdMob Error:", error);
    showToast("Gagal memuat iklan. Periksa koneksi internet Anda.");
    state.locked = false;
  }
}


document.addEventListener('deviceready', async () => {
  try {
    if (typeof admob !== 'undefined') {
      await admob.start();
      console.log('AdMob SDK berhasil dimulai');
    }
  } catch (e) {
    console.error('Gagal memulai AdMob:', e);
  }
}, false);



function berikanHadiahHint() {
  if (!state.level || !state.level.kunciJawaban || !state.level.kunciJawaban.langkah) {
    showToast("Tidak ada petunjuk untuk langkah ini.");
    return;
  }
   if (state.level.tipeMekanik === 'drag_question') {
    const hintHand = document.querySelector('.grab-hint');
    if (hintHand) {
      hintHand.classList.remove('hidden-el');
      bump(hintHand, 'pop');
    }
    const qbox = document.getElementById('question-box');
    if (qbox) {
      qbox.classList.add('tampil-garis');
    }
  }

  const daftarLangkah = state.level.kunciJawaban.langkah;
  let targetStep = null;

  for (let i = state.stepIndex; i < daftarLangkah.length; i++) {
    const langkah = daftarLangkah[i];
    if (!langkah.bocoran_jawaban) continue;
    targetStep = langkah;
    break;
  }

  if (!targetStep && daftarLangkah.length > 0) {
    for (let i = 0; i < daftarLangkah.length; i++) {
      const langkah = daftarLangkah[i];
      if (!langkah.bocoran_jawaban) continue;
      targetStep = langkah;
      break;
    }
  }

  if (targetStep && targetStep.bocoran_jawaban) {
    showToast(`💡 = ${targetStep.bocoran_jawaban}`);
  } else {
    showToast("Perhatikan objek pada layar!");
  }
}


document.getElementById('btn-sound').addEventListener('click', (e) => {
  e.stopPropagation();
  toggleSound();
});
