// FILE HASIL GENERATE OTOMATIS — JANGAN DIEDIT MANUAL.
// Sumber asli: levels.json — edit file itu, lalu jalankan "node scripts/build.js".
// Tujuan: menyediakan data level tanpa fetch(), supaya game tetap berjalan
// walau dibuka langsung lewat file:// (tanpa server lokal / Node.js).
window.__LEVELS_DATA__ = {
  "judulGame": "TEKA-TEKI GAMBAR",
  "versiSkema": "1.0",
  "levels": [
    {
      "level": 1,
      "pertanyaan": "Dimanakah ular berada?",
      "tipeMekanik": "click",
      "posisiPertanyaan": {
        "x": 4,
        "y": 2,
        "width": 92,
        "height": 12
      },
      "latarBelakang": "linear-gradient(180deg, #E0F2FE 0%, #7DD3FC 100%)",
      "elemen": [
        {
          "id": "batu",
          "tipe": "image",
          "visual": "assets/image/batu.png",
          "x": 5,
          "y": 62,
          "width": 32,
          "height": 26,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 1,
          "efekKlik": "buka"
        },
        {
          "id": "sungai",
          "tipe": "image",
          "visual": "assets/image/sungai.png",
          "x": 38,
          "y": 70,
          "width": 57,
          "height": 25,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 1
        },
        {
          "id": "pohon",
          "tipe": "image",
          "visual": "assets/image/pohon.png",
          "x": 28,
          "y": 26,
          "width": 55,
          "height": 48,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 2,
          "efekKlik": "goyang"
        },
        {
          "id": "ular",
          "tipe": "image",
          "visual": "assets/image/ular.png",
          "x": 46,
          "y": 42,
          "width": 26,
          "height": 18,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 3
        }
      ],
      "kunciJawaban": {
        "langkah": [
          {
            "aksi": "click",
            "targetId": "pohon",
            "efek": "reveal",
            "revealIds": [
              "ular"
            ],
            "pesan": "Ada sesuatu di balik dahan..."
          },
          {
            "aksi": "click",
            "targetId": "ular",
            "efek": "menang"
          }
        ]
      }
    },
    {
      "level": 2,
      "pertanyaan": "Cari kucing yang bersembunyi!",
      "tipeMekanik": "click",
      "posisiPertanyaan": {
        "x": 4,
        "y": 2,
        "width": 92,
        "height": 12
      },
      "latarBelakang": "linear-gradient(180deg, #FEF3C7 0%, #FCD34D 100%)",
      "efekSalahKlik": "getar",
      "elemen": [
        {
          "id": "sofa",
          "tipe": "image",
          "visual": "assets/image/sofa.png",
          "x": 3,
          "y": 75,
          "width": 50,
          "height": 30,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 2,
          "efekKlik": "angkat"
        },
        {
          "id": "meja",
          "tipe": "image",
          "visual": "assets/image/meja.png",
          "x": 54,
          "y": 18,
          "width": 42,
          "height": 32,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 1
        },
        {
          "id": "lampu",
          "tipe": "image",
          "visual": "assets/image/lampu.png",
          "x": -10,
          "y": 15,
          "width": 100,
          "height": 80,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 1
        },
        {
          "id": "kucing",
          "tipe": "image",
          "visual": "assets/image/kucing.png",
          "x": 13,
          "y": 65,
          "width": 20,
          "height": 30,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 3,
          "isTargetJawaban": true
        }
      ],
      "kunciJawaban": {
        "langkah": [
          {
            "aksi": "click",
            "targetId": "sofa",
            "efek": "reveal",
            "revealIds": [
              "kucing"
            ],
            "pesan": "Dia tidur di pojok sofa!"
          },
          {
            "aksi": "click",
            "targetId": "kucing",
            "efek": "menang"
          }
        ]
      }
    },
    {
      "level": 3,
      "pertanyaan": "Rapihkan bukunya!",
      "tipeMekanik": "drag",
      "posisiPertanyaan": {
        "x": 4,
        "y": 2,
        "width": 92,
        "height": 12
      },
      "latarBelakang": "linear-gradient(180deg, #E0E7FF 0%, #A5B4FC 100%)",
      "elemen": [
        {
          "id": "rak_buku",
          "tipe": "image",
          "visual": "assets/image/rak_buku.png",
          "x": -12,
          "y": 8,
          "width": 80,
          "height": 60,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 3,
          "isTarget": true,
          "hitbox": {
            "x": 3,
            "y": 20,
            "width": 20,
            "height": 10
          }
        },
        {
          "id": "buku",
          "tipe": "image",
          "visual": "assets/image/buku.png",
          "x": 15,
          "y": 60,
          "width": 25,
          "height": 22,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 4
        },
        {
          "id": "kursi",
          "tipe": "image",
          "visual": "assets/image/kursi.png",
          "x": 35,
          "y": 40,
          "width": 82,
          "height": 60,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 1
        }
      ],
      "kunciJawaban": {
        "langkah": [
          {
            "aksi": "drag",
            "targetId": "buku",
            "tujuanId": "rak_buku",
            "efek": "menang",
            "pesan": "Buku dirapihkan ke dalam rak",
            "ubahZIndex": {
              "id": "buku",
              "nilai": 1
            }
          }
        ]
      }
    },
    {
      "level": 4,
      "pertanyaan": "Dimana burung pipit bersembunyi?",
      "tipeMekanik": "click",
      "posisiPertanyaan": {
        "x": 4,
        "y": 2,
        "width": 92,
        "height": 12
      },
      "latarBelakang": "linear-gradient(180deg, #D1FAE5 0%, #6EE7B7 100%)",
      "elemen": [
        {
          "id": "pohon_besar",
          "tipe": "image",
          "visual": "assets/image/pohon_besar.png",
          "x": 0,
          "y": 0,
          "width": 82,
          "height": 82,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 1,
          "efekKlik": "goyang"
        },
        {
          "id": "orang",
          "tipe": "image",
          "visual": "assets/image/orang.png",
          "x": 40,
          "y": 50,
          "width": 60,
          "height": 30,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 3,
          "efekKlik": "goyang"
        },
        {
          "id": "semak",
          "tipe": "image",
          "visual": "assets/image/semak.png",
          "x": 8,
          "y": 70,
          "width": 42,
          "height": 20,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 3,
          "efekKlik": "angkat"
        },
        {
          "id": "burung",
          "tipe": "image",
          "visual": "assets/image/burung.png",
          "x": 20,
          "y": 70,
          "width": 18,
          "height": 14,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 4
        }
      ],
      "kunciJawaban": {
        "langkah": [
          {
            "aksi": "click",
            "targetId": "semak",
            "efek": "reveal",
            "revealIds": [
              "burung"
            ],
            "pesan": "Dia bersembunyi di semak!"
          },
          {
            "aksi": "click",
            "targetId": "burung",
            "efek": "menang"
          }
        ],
        "umpanSalah": [
          {
            "aksi": "click",
            "efek": "none",
            "targetId": "pohon_besar",
            "pesan": "Tidak ada di sini..."
          },
          {
            "aksi": "click",
            "efek": "none",
            "targetId": "orang",
            "pesan": "Orang ini tidak tau.."
          }
        ]
      }
    },
    {
      "level": 5,
      "pertanyaan": "Susun mainan ke tempatnya masing-masing!",
      "tipeMekanik": "drag",
      "posisiPertanyaan": {
        "x": 4,
        "y": 2,
        "width": 92,
        "height": 12
      },
      "latarBelakang": "linear-gradient(180deg, #FCE7F3 0%, #F9A8D4 100%)",
      "elemen": [
        {
          "id": "karpet_bulat",
          "tipe": "image",
          "visual": "assets/image/karpet_bulat.png",
          "x": 2,
          "y": 72,
          "width": 38,
          "height": 22,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 0
        },
        {
          "id": "kotak_bola",
          "tipe": "image",
          "visual": "assets/image/kotak_bola.png",
          "x": 57,
          "y": 25,
          "width": 43,
          "height": 42,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 2,
          "isTarget": true,
          "hitbox": {
            "x": 45,
            "y": 22,
            "width": 45,
            "height": 30
          }
        },
        {
          "id": "kotak_boneka",
          "tipe": "image",
          "visual": "assets/image/kotak_boneka.png",
          "x": 58,
          "y": 58,
          "width": 42,
          "height": 42,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 2,
          "isTarget": true,
          "hitbox": {
            "x": 55,
            "y": 60,
            "width": 30,
            "height": 20
          }
        },
        {
          "id": "bola",
          "tipe": "image",
          "visual": "assets/image/bola.png",
          "x": 13,
          "y": 35,
          "width": 25,
          "height": 25,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 4
        },
        {
          "id": "boneka",
          "tipe": "image",
          "visual": "assets/image/boneka.png",
          "x": 12,
          "y": 62,
          "width": 18,
          "height": 24,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 4
        }
      ],
      "kunciJawaban": {
        "langkah": [
          {
            "aksi": "drag",
            "targetId": "bola",
            "tujuanId": "kotak_bola",
            "efek": "tetap",
            "pesan": "Bola diletakan di kotak!",
            "ubahZIndex": {
              "id": "bola",
              "nilai": 2
            },
            "posisiAkhir": {
              "x": 66,
              "y": 34
            }
          },
          {
            "aksi": "drag",
            "targetId": "boneka",
            "tujuanId": "kotak_boneka",
            "efek": "menang",
            "pesan": "Semua mainan rapi!",
            "ubahZIndex": {
              "id": "boneka",
              "nilai": 2
            },
            "posisiAkhir": {
              "x": 68,
              "y": 67
            }
          }
        ]
      }
    },
    {
      "level": 6,
      "pertanyaan": "Jangan biarkan Dia menangis !",
      "tipeMekanik": "drag",
      "posisiPertanyaan": {
        "x": 4,
        "y": 2,
        "width": 92,
        "height": 12
      },
      "latarBelakang": "linear-gradient(180deg, #E0F7FF 0%, #B3E5FC 100%)",
      "elemen": [
        {
          "id": "karpet",
          "tipe": "image",
          "visual": "assets/image/karpet.png",
          "x": 0,
          "y": 20,
          "width": 100,
          "height": 100,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 0
        },
        {
          "id": "anak_menangis",
          "tipe": "image",
          "visual": "assets/image/anak_menangis.png",
          "x": 0,
          "y": 45,
          "width": 80,
          "height": 30,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 2,
          "isTarget": true,
          "hitbox": {
            "x": 15,
            "y": 50,
            "width": 40,
            "height": 40
          }
        },
        {
          "id": "mobilan",
          "tipe": "image",
          "visual": "assets/image/mobilan.png",
          "x": 85,
          "y": 25,
          "width": 35,
          "height": 15,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 4
        },
        {
          "id": "anak_bermain",
          "tipe": "image",
          "visual": "assets/image/anak_bermain.png",
          "x": 0,
          "y": 45,
          "width": 80,
          "height": 30,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 5
        }
      ],
      "kunciJawaban": {
        "langkah": [
          {
            "aksi": "drag",
            "targetId": "mobilan",
            "tujuanId": "anak_menangis",
            "efek": "menang",
            "pesan": "Dia senang sekarang!",
            "sembunyikan": [
              "anak_menangis",
              "mobilan"
            ],
            "tampilkan": [
              "anak_bermain"
            ]
          }
        ]
      }
    },
    {
      "level": 7,
      "pertanyaan": "Dimana ikan merah berada ?",
      "tipeMekanik": "drag_question",
      "posisiPertanyaan": {
        "x": 4,
        "y": 10,
        "width": 92,
        "height": 12,
        "isDraggable": true
      },
      "latarBelakang": "linear-gradient(180deg, #CFFAFE 0%, #67E8F9 100%)",
      "elemen": [
        {
          "id": "gurita",
          "tipe": "image",
          "visual": "assets/image/gurita.png",
          "x": 65,
          "y": 60,
          "width": 30,
          "height": 30,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 2
        },
        {
          "id": "ikan2",
          "tipe": "image",
          "visual": "assets/image/ikan2.png",
          "x": 5,
          "y": 0,
          "width": 90,
          "height": 100,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 1
        },
        {
          "id": "ikan",
          "tipe": "image",
          "visual": "assets/image/ikan.png",
          "x": 30,
          "y": 8,
          "width": 22,
          "height": 20,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 2
        },
        {
          "id": "karang",
          "tipe": "image",
          "visual": "assets/image/karang.png",
          "x": -5,
          "y": 73,
          "width": 50,
          "height": 30,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 1
        },
        {
          "id": "rumput_laut",
          "tipe": "image",
          "visual": "assets/image/rumput_laut.png",
          "x": 53,
          "y": 53,
          "width": 50,
          "height": 70,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 1
        }
      ],
      "kunciJawaban": {
        "langkah": [
          {
            "aksi": "drag_question",
            "arah": "atas",
            "jarak": 30,
            "efek": "reveal",
            "revealIds": [],
            "pesan": "Lihat apa yang ada di baliknya!"
          },
          {
            "aksi": "click",
            "targetId": "ikan",
            "efek": "menang"
          }
        ]
      }
    },
    {
      "level": 8,
      "pertanyaan": "Cari koin emas yang tersembunyi!",
      "tipeMekanik": "click",
      "posisiPertanyaan": {
        "x": 16,
        "y": 4,
        "width": 76,
        "height": 13
      },
      "latarBelakang": "linear-gradient(180deg, #FEF9C3 0%, #FDE047 100%)",
      "elemen": [
        {
          "id": "peti",
          "tipe": "image",
          "visual": "assets/image/peti.png",
          "x": 0,
          "y": 50,
          "width": 58,
          "height": 25,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 2,
          "efekKlik": "buka"
        },
        {
          "id": "peti",
          "tipe": "image",
          "visual": "assets/image/peti.png",
          "visualBuka": "assets/image/peti_terbuka.png",
          "x": 0,
          "y": 50,
          "width": 58,
          "height": 25,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 2,
          "efekKlik": "buka"
        },
        {
          "id": "tong",
          "tipe": "image",
          "visual": "assets/image/tong.png",
          "x": 65,
          "y": 50,
          "width": 35,
          "height": 25,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 2,
          "efekKlik": "buka"
        },
        {
          "id": "tong",
          "tipe": "image",
          "visual": "assets/image/tong.png",
          "visualBuka": "assets/image/tong_kosong.png",
          "x": 65,
          "y": 50,
          "width": 35,
          "height": 25,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 2,
          "efekKlik": "buka"
        },
        {
          "id": "tumpukan_pasir",
          "tipe": "image",
          "visual": "assets/image/pasir.png",
          "x": 35,
          "y": 70,
          "width": 30,
          "height": 25,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 3,
          "efekKlik": "sibak"
        },
        {
          "id": "koin",
          "tipe": "image",
          "visual": "assets/image/koin_emas.png",
          "x": 44,
          "y": 76,
          "width": 14,
          "height": 14,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 2
        }
      ],
      "kunciJawaban": {
        "langkah": [
          {
            "aksi": "click",
            "targetId": "peti",
            "efek": "lanjut",
            "pesan": "Hanya ada sampah di sini..."
          },
          {
            "aksi": "click",
            "targetId": "tong",
            "efek": "lanjut",
            "pesan": "Kosong juga!"
          },
          {
            "aksi": "click",
            "targetId": "tumpukan_pasir",
            "efek": "reveal",
            "revealIds": [
              "koin"
            ],
            "pesan": "Ketemu! Koin emas!"
          },
          {
            "aksi": "click",
            "targetId": "koin",
            "efek": "menang"
          }
        ]
      }
    },
    {
      "level": 9,
      "pertanyaan": "Susun potongan puzzle secara berurutan!",
      "tipeMekanik": "drag",
      "posisiPertanyaan": {
        "x": 12,
        "y": 4,
        "width": 80,
        "height": 13
      },
      "latarBelakang": "linear-gradient(180deg, #DDD6FE 0%, #A78BFA 100%)",
      "elemen": [
        {
          "id": "latar",
          "tipe": "image",
          "visual": "assets/image/latar_bingkai.png",
          "x": 20,
          "y": 5,
          "width": 60,
          "height": 55,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 1
        },
        {
          "id": "bingkai_1",
          "tipe": "image",
          "visual": "assets/image/bingkai_puzzle_1.png",
          "x": 19.5,
          "y": 10,
          "width": 39.5,
          "height": 33.5,
          "isDraggable": false,
          "isHidden": true,
          "isTarget": true,
          "zIndex": 5,
          "urutan": 1
        },
        {
          "id": "bingkai_2",
          "tipe": "image",
          "visual": "assets/image/bingkai_puzzle_2.png",
          "x": 49.5,
          "y": 12.8,
          "width": 30.5,
          "height": 28,
          "isDraggable": false,
          "isHidden": true,
          "isTarget": true,
          "zIndex": 5,
          "urutan": 2
        },
        {
          "id": "bingkai_3",
          "tipe": "image",
          "visual": "assets/image/bingkai_puzzle_3.png",
          "x": 19.5,
          "y": 27,
          "width": 30.5,
          "height": 28,
          "isDraggable": false,
          "isHidden": true,
          "isTarget": true,
          "zIndex": 5,
          "urutan": 3
        },
        {
          "id": "bingkai_4",
          "tipe": "image",
          "visual": "assets/image/bingkai_puzzle_4.png",
          "x": 39.5,
          "y": 21.5,
          "width": 40.5,
          "height": 39.5,
          "isDraggable": false,
          "isHidden": true,
          "isTarget": true,
          "zIndex": 5,
          "urutan": 4
        },
        {
          "id": "puzzle_1",
          "tipe": "image",
          "visual": "assets/image/puzzle_1.png",
          "x": 40,
          "y": 55,
          "width": 20,
          "height": 20,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 4
        },
        {
          "id": "puzzle_2",
          "tipe": "image",
          "visual": "assets/image/puzzle_2.png",
          "x": 15,
          "y": 65,
          "width": 20,
          "height": 20,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 4
        },
        {
          "id": "puzzle_3",
          "tipe": "image",
          "visual": "assets/image/puzzle_3.png",
          "x": 60,
          "y": 65,
          "width": 20,
          "height": 20,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 4
        },
        {
          "id": "puzzle_4",
          "tipe": "image",
          "visual": "assets/image/puzzle_4.png",
          "x": 50,
          "y": 80,
          "width": 20,
          "height": 20,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 4
        }
      ],
      "kunciJawaban": {
        "langkah": [
          {
            "aksi": "drag",
            "targetId": "puzzle_1",
            "tujuanId": "bingkai_1",
            "efek": "tetap",
            "sembunyikan": [
              "puzzle_1"
            ],
            "tampilkan": [
              "bingkai_1"
            ],
            "pesan": "Bagian pertama pas!"
          },
          {
            "aksi": "drag",
            "targetId": "puzzle_2",
            "tujuanId": "bingkai_2",
            "efek": "tetap",
            "sembunyikan": [
              "puzzle_2"
            ],
            "tampilkan": [
              "bingkai_2"
            ],
            "pesan": "Bagian kedua cocok!"
          },
          {
            "aksi": "drag",
            "targetId": "puzzle_3",
            "tujuanId": "bingkai_3",
            "efek": "tetap",
            "sembunyikan": [
              "puzzle_3"
            ],
            "tampilkan": [
              "bingkai_3"
            ],
            "pesan": "Hampir selesai!"
          },
          {
            "aksi": "drag",
            "targetId": "puzzle_4",
            "tujuanId": "bingkai_4",
            "efek": "menang",
            "sembunyikan": [
              "puzzle_4"
            ],
            "tampilkan": [
              "bingkai_4"
            ],
            "pesan": "Puzzle selesai!"
          }
        ]
      }
    },
    {
      "level": 10,
      "pertanyaan": "Gabungkan bahan untuk membuat kue!",
      "tipeMekanik": "merge",
      "posisiPertanyaan": {
        "x": 14,
        "y": 4,
        "width": 78,
        "height": 13
      },
      "latarBelakang": "linear-gradient(180deg, #FECACA 0%, #F87171 100%)",
      "elemen": [
        {
          "id": "tepung",
          "tipe": "image",
          "visual": "assets/image/tepung.png",
          "x": 6,
          "y": 30,
          "width": 20,
          "height": 28,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 6
        },
        {
          "id": "telur",
          "tipe": "image",
          "visual": "assets/image/telur.png",
          "x": 28,
          "y": 40,
          "width": 18,
          "height": 22,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 6
        },
        {
          "id": "air",
          "tipe": "image",
          "visual": "assets/image/air.png",
          "x": 50,
          "y": 32,
          "width": 18,
          "height": 26,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 6
        },
        {
          "id": "gula",
          "tipe": "image",
          "visual": "assets/image/gula.png",
          "x": 72,
          "y": 38,
          "width": 18,
          "height": 26,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 6
        },
        {
          "id": "mangkuk",
          "tipe": "image",
          "visual": "assets/image/mangkuk.png",
          "x": 25,
          "y": 75,
          "width": 50,
          "height": 25,
          "isDraggable": false,
          "isHidden": false,
          "isTarget": true,
          "zIndex": 7
        },
        {
          "id": "adonan_kue",
          "tipe": "image",
          "visual": "assets/image/adonan_kue.png",
          "x": 25,
          "y": 75,
          "width": 50,
          "height": 25,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 4
        },
        {
          "id": "kue_matang",
          "tipe": "image",
          "visual": "assets/image/kue_matang.png",
          "x": 25,
          "y": 75,
          "width": 50,
          "height": 25,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 5
        }
      ],
      "kunciJawaban": {
        "langkah": [
          {
            "aksi": "merge",
            "sourceId": "telur",
            "destId": "mangkuk",
            "efek": "none",
            "hasil": {
              "pertahankanTarget": true
            },
            "pesan": "Telur dimasukkan ke mangkuk!"
          },
          {
            "aksi": "merge",
            "sourceId": "tepung",
            "destId": "mangkuk",
            "efek": "none",
            "hasil": {
              "pertahankanTarget": true
            },
            "pesan": "Tepung dimasukkan ke mangkuk!"
          },
          {
            "aksi": "merge",
            "sourceId": "gula",
            "destId": "mangkuk",
            "efek": "none",
            "hasil": {
              "pertahankanTarget": true
            },
            "pesan": "Gula tercampur rata!"
          },
          {
            "aksi": "merge",
            "sourceId": "air",
            "destId": "mangkuk",
            "efek": "none",
            "hasil": {
              "pertahankanTarget": true
            },
            "pesan": "Air ditambahkan, bahan lengkap!"
          },
          {
            "aksi": "click",
            "targetId": "mangkuk",
            "efek": "reveal",
            "revealIds": [
              "adonan_kue"
            ],
            "sembunyikan": [
              "mangkuk"
            ],
            "pesan": "Semua bahan jadi adonan kue!"
          },
          {
            "aksi": "click",
            "targetId": "adonan_kue",
            "efek": "reveal",
            "revealIds": [
              "kue_matang"
            ],
            "sembunyikan": [
              "adonan_kue"
            ],
            "pesan": "Kue matang sempurna!"
          },
          {
            "aksi": "click",
            "targetId": "kue_matang",
            "efek": "menang",
            "pesan": "Berhasil membuat kue enak!"
          }
        ]
      }
    },
    {
      "level": 11,
      "pertanyaan": "Bantu anak kecil itu keluar!",
      "tipeMekanik": "drag",
      "posisiPertanyaan": {
        "x": 10,
        "y": 4,
        "width": 80,
        "height": 13
      },
      "latarBelakang": "linear-gradient(180deg, #A7F3D0 0%, #34D399 100%)",
      "elemen": [
        {
          "id": "kamar",
          "tipe": "image",
          "visual": "assets/image/kamar.png",
          "x": 0,
          "y": 0,
          "width": 100,
          "height": 100,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 1
        },
        {
          "id": "pintu_tertutup",
          "tipe": "image",
          "visual": "assets/image/pintu_tertutup.png",
          "x": 33.3,
          "y": 30.5,
          "width": 30,
          "height": 38,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 3
        },
        {
          "id": "pintu_terbuka",
          "tipe": "image",
          "visual": "assets/image/pintu_terbuka.png",
          "x": 33.3,
          "y": 30.5,
          "width": 30,
          "height": 38,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 2
        },
        {
          "id": "gembok",
          "tipe": "image",
          "visual": "assets/image/gembok.png",
          "x": 52.5,
          "y": 49.5,
          "width": 8,
          "height": 8,
          "isDraggable": false,
          "isHidden": false,
          "isTarget": true,
          "zIndex": 4
        },
        {
          "id": "anak_kecil",
          "tipe": "image",
          "visual": "assets/image/anak_kecil.png",
          "x": 2,
          "y": 40,
          "width": 30,
          "height": 30,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 6
        },
        {
          "id": "kotak_kunci_tertutup",
          "tipe": "image",
          "visual": "assets/image/kotak_kunci_tertutup.png",
          "x": 76,
          "y": 76,
          "width": 14,
          "height": 12,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 6
        },
        {
          "id": "kotak_kunci_terbuka",
          "tipe": "image",
          "visual": "assets/image/kotak_kunci_terbuka.png",
          "x": 76,
          "y": 76,
          "width": 14,
          "height": 12,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 6
        },
        {
          "id": "kunci",
          "tipe": "image",
          "visual": "assets/image/kunci.png",
          "x": 76,
          "y": 76,
          "width": 14,
          "height": 12,
          "isDraggable": true,
          "isHidden": true,
          "zIndex": 7
        }
      ],
      "kunciJawaban": {
        "langkah": [
          {
            "aksi": "click",
            "targetId": "kotak_kunci_tertutup",
            "efek": "reveal",
            "revealIds": [
              "kotak_kunci_terbuka"
            ],
            "sembunyikan": [
              "kotak_kunci_tertutup"
            ],
            "pesan": "Kotak terbuka!",
            "bocoran_jawaban": "Cari kotak misterius untuk membukanya."
          },
          {
            "aksi": "click",
            "targetId": "kotak_kunci_terbuka",
            "efek": "reveal",
            "revealIds": [
              "kunci"
            ],
            "sembunyikan": [
              "kotak_kunci_terbuka"
            ],
            "pesan": "Kunci ditemukan!",
            "bocoran_jawaban": "Ketuk sekali lagi kotak untuk mengambil kunci di dalamnya."
          },
          {
            "aksi": "drag",
            "targetId": "kunci",
            "tujuanId": "gembok",
            "efek": "lanjut",
            "sembunyikan": [
              "kunci",
              "gembok"
            ],
            "pesan": "Gembok terbuka!",
            "bocoran_jawaban": "Seret kunci arahkan tepat ke gembok di gagang pintu."
          },
          {
            "aksi": "click",
            "targetId": "pintu_tertutup",
            "efek": "reveal",
            "revealIds": [
              "pintu_terbuka"
            ],
            "sembunyikan": [
              "pintu_tertutup"
            ],
            "pesan": "Pintu berhasil dibuka!",
            "bocoran_jawaban": "Gembok sudah lepas! Sekarang ketuk pintunya."
          },
          {
            "aksi": "click",
            "targetId": "pintu_terbuka",
            "efek": "menang",
            "pesan": "Berhasil! Anak kecil bisa keluar.",
            "bocoran_jawaban": "Klik pintu yang terbuka untuk menyelesaikan permainan!"
          },
          {
            "aksi": "click",
            "targetId": "kotak_kunci_terbuka",
            "efek": "reveal",
            "revealIds": [
              "kunci"
            ],
            "sembunyikan": [
              "kotak_kunci_terbuka"
            ],
            "pesan": "Kunci di dapatkan!",
            "bocoran_jawaban": "Seret kunci ke arah Gembok pada pintu."
          },
          {
            "aksi": "drag",
            "targetId": "kunci",
            "tujuanId": "gembok",
            "efek": "lanjut",
            "sembunyikan": [
              "kunci",
              "gembok"
            ],
            "pesan": "Gembok terbuka!"
          },
          {
            "aksi": "click",
            "targetId": "pintu_tertutup",
            "efek": "reveal",
            "revealIds": [
              "pintu_terbuka"
            ],
            "sembunyikan": [
              "pintu_tertutup"
            ],
            "pesan": "Pintu berhasil dibuka!",
            "bocoran_jawaban": "Klik pintunya!"
          },
          {
            "aksi": "click",
            "targetId": "pintu_terbuka",
            "efek": "menang",
            "pesan": "Berhasil! Anak kecil bisa keluar.",
            "bocoran_jawaban": "Klik pintu yang terbuka"
          }
        ]
      }
    },
    {
      "level": 12,
      "pertanyaan": "",
      "tipeMekanik": "click",
      "posisiPertanyaan": {
        "x": 25,
        "y": 50,
        "width": 15,
        "height": 14
      },
      "latarBelakang": "linear-gradient(180deg, #1E3A8A 0%, #3B82F6 100%)",
      "elemen": [
        {
          "id": "kamar",
          "tipe": "image",
          "visual": "assets/image/latar_malam.png",
          "x": 0,
          "y": 0,
          "width": 100,
          "height": 100,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 1
        },
        {
          "id": "teks_kiri",
          "tipe": "text",
          "teks": "Cari dimanakah ",
          "x": 20,
          "y": 0,
          "width": 30,
          "height": 20,
          "warna": "#000000",
          "ukuranHuruf": 15,
          "tebal": true,
          "isDraggable": false,
          "isClickable": false,
          "isHidden": false,
          "zIndex": 9
        },
        {
          "id": "kata_bintang",
          "tipe": "text",
          "teks": "BINTANG",
          "x": 49,
          "y": 0,
          "width": 20,
          "height": 20,
          "warna": "#000000",
          "ukuranHuruf": 15,
          "tebal": true,
          "rataTengah": true,
          "isDraggable": false,
          "isClickable": true,
          "isHidden": false,
          "zIndex": 10
        },
        {
          "id": "teks_kanan",
          "tipe": "text",
          "teks": " berada!",
          "x": 66,
          "y": 0,
          "width": 20,
          "height": 20,
          "warna": "#000000",
          "ukuranHuruf": 15,
          "tebal": true,
          "rataTengah": true,
          "isDraggable": false,
          "isClickable": false,
          "isHidden": false,
          "zIndex": 9
        },
        {
          "id": "awan_1",
          "tipe": "image",
          "visual": "assets/image/awan_1.png",
          "x": 5,
          "y": 25,
          "width": 28,
          "height": 18,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 5
        },
        {
          "id": "awan_2",
          "tipe": "image",
          "visual": "assets/image/awan_2.png",
          "x": 60,
          "y": 25,
          "width": 30,
          "height": 30,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 5
        },
        {
          "id": "bulan",
          "tipe": "image",
          "visual": "assets/image/bulan.png",
          "x": 15,
          "y": 50,
          "width": 18,
          "height": 18,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 4
        },
        {
          "id": "bintang",
          "tipe": "image",
          "visual": "assets/image/bintang.png",
          "x": 50,
          "y": 25,
          "width": 15,
          "height": 10,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 4
        }
      ],
      "kunciJawaban": {
        "langkah": [
          {
            "aksi": "click",
            "targetId": "bintang",
            "efek": "none",
            "pesan": "❌ Itu cuma gambar, bukan yang dimaksud!",
            "bocoran_jawaban": "Klik gambar bintang dahulu!"
          },
          {
            "aksi": "click",
            "targetId": "awan_1",
            "efek": "none",
            "pesan": "Cuma awan biasa...",
            "bocoran_jawaban": "Klik awan sebelah kiri!"
          },
          {
            "aksi": "click",
            "targetId": "awan_2",
            "efek": "none",
            "pesan": "Bukan disini juga",
            "bocoran_jawaban": "Klik awan sebelah kanan"
          },
          {
            "aksi": "click",
            "targetId": "bulan",
            "efek": "none",
            "pesan": "Itu bulan bukan bintang",
            "bocoran_jawaban": " klik gambar bulannya"
          },
          {
            "aksi": "click",
            "targetId": "kata_bintang",
            "efek": "menang",
            "pesan": "⭐ BENAR! Jawabannya ada di tulisan ini!",
            "bocoran_jawaban": "Klik tulisan BINTANG pada pertanyaan!"
          }
        ]
      }
    },
    {
      "level": 13,
      "pertanyaan": "Cari harta karun yang tersembunyi paling dalam!",
      "tipeMekanik": "click",
      "posisiPertanyaan": {
        "x": 12,
        "y": 4,
        "width": 80,
        "height": 13
      },
      "latarBelakang": "linear-gradient(180deg, #D97706 0%, #92400E 100%)",
      "elemen": [
        {
          "id": "tumpukan_kayu",
          "tipe": "image",
          "visual": "assets/image/kayu.png",
          "x": 8,
          "y": 40,
          "width": 25,
          "height": 35,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 2,
          "efekKlik": "sibak"
        },
        {
          "id": "batu_besar",
          "tipe": "image",
          "visual": "assets/image/batu_besar.png",
          "x": 38,
          "y": 50,
          "width": 28,
          "height": 30,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 2,
          "efekKlik": "angkat"
        },
        {
          "id": "daun_kering",
          "tipe": "image",
          "visual": "assets/image/daun_kering.png",
          "x": 70,
          "y": 45,
          "width": 25,
          "height": 32,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 2,
          "efekKlik": "sibak"
        },
        {
          "id": "peti_kecil",
          "tipe": "image",
          "visual": "assets/image/peti_kecil.png",
          "x": 42,
          "y": 56,
          "width": 20,
          "height": 18,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 3,
          "efekKlik": "buka"
        },
        {
          "id": "harta_karun",
          "tipe": "image",
          "visual": "assets/image/harta_karun.png",
          "x": 45,
          "y": 60,
          "width": 16,
          "height": 12,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 4
        }
      ],
      "kunciJawaban": {
        "langkah": [
          {
            "aksi": "click",
            "targetId": "tumpukan_kayu",
            "efek": "none",
            "pesan": "Cuma kayu biasa"
          },
          {
            "aksi": "click",
            "targetId": "daun_kering",
            "efek": "none",
            "pesan": "Hanya daun kering"
          },
          {
            "aksi": "click",
            "targetId": "batu_besar",
            "efek": "reveal",
            "revealIds": [
              "peti_kecil"
            ],
            "pesan": "Ada peti kecil!"
          },
          {
            "aksi": "click",
            "targetId": "peti_kecil",
            "efek": "reveal",
            "revealIds": [
              "harta_karun"
            ],
            "pesan": "Harta karun!"
          },
          {
            "aksi": "click",
            "targetId": "harta_karun",
            "efek": "menang"
          }
        ]
      }
    },
    {
      "level": 14,
      "pertanyaan": "Susun angka dari yang terkecil ke terbesar!",
      "tipeMekanik": "drag",
      "posisiPertanyaan": {
        "x": 10,
        "y": 4,
        "width": 85,
        "height": 13
      },
      "latarBelakang": "linear-gradient(180deg, #F0ABFC 0%, #C026D3 100%)",
      "elemen": [
        {
          "id": "tempat_1",
          "tipe": "image",
          "visual": "assets/image/tempat_angka_1.png",
          "x": 8,
          "y": 25,
          "width": 18,
          "height": 22,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 1,
          "isTarget": true,
          "urutan": 1
        },
        {
          "id": "tempat_2",
          "tipe": "image",
          "visual": "assets/image/tempat_angka_2.png",
          "x": 30,
          "y": 25,
          "width": 18,
          "height": 22,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 1,
          "isTarget": true,
          "urutan": 2
        },
        {
          "id": "tempat_3",
          "tipe": "image",
          "visual": "assets/image/tempat_angka_3.png",
          "x": 52,
          "y": 25,
          "width": 18,
          "height": 22,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 1,
          "isTarget": true,
          "urutan": 3
        },
        {
          "id": "tempat_4",
          "tipe": "image",
          "visual": "assets/image/tempat_angka_4.png",
          "x": 74,
          "y": 25,
          "width": 18,
          "height": 22,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 1,
          "isTarget": true,
          "urutan": 4
        },
        {
          "id": "angka_3",
          "tipe": "image",
          "visual": "assets/image/angka_3.png",
          "x": 12,
          "y": 60,
          "width": 16,
          "height": 20,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 2
        },
        {
          "id": "angka_1",
          "tipe": "image",
          "visual": "assets/image/angka_1.png",
          "x": 34,
          "y": 65,
          "width": 16,
          "height": 20,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 2
        },
        {
          "id": "angka_4",
          "tipe": "image",
          "visual": "assets/image/angka_4.png",
          "x": 56,
          "y": 60,
          "width": 16,
          "height": 20,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 2
        },
        {
          "id": "angka_2",
          "tipe": "image",
          "visual": "assets/image/angka_2.png",
          "x": 78,
          "y": 65,
          "width": 16,
          "height": 20,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 2
        }
      ],
      "kunciJawaban": {
        "langkah": [
          {
            "aksi": "drag",
            "targetId": "angka_1",
            "tujuanId": "tempat_1",
            "efek": "tetap",
            "pesan": "Benar! 1 adalah yang terkecil"
          },
          {
            "aksi": "drag",
            "targetId": "angka_2",
            "tujuanId": "tempat_2",
            "efek": "tetap",
            "pesan": "Bagus! Selanjutnya 2"
          },
          {
            "aksi": "drag",
            "targetId": "angka_3",
            "tujuanId": "tempat_3",
            "efek": "tetap",
            "pesan": "Tepat! Lalu 3"
          },
          {
            "aksi": "drag",
            "targetId": "angka_4",
            "tujuanId": "tempat_4",
            "efek": "menang",
            "pesan": "Urutan angka selesai!"
          }
        ]
      }
    },
    {
      "level": 15,
      "pertanyaan": "Buatlah payung dari bahan yang ada!",
      "tipeMekanik": "merge",
      "posisiPertanyaan": {
        "x": 14,
        "y": 4,
        "width": 78,
        "height": 13
      },
      "latarBelakang": "linear-gradient(180deg, #60A5FA 0%, #2563EB 100%)",
      "elemen": [
        {
          "id": "kain",
          "tipe": "image",
          "visual": "assets/image/kain.png",
          "x": 8,
          "y": 35,
          "width": 24,
          "height": 22,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 2
        },
        {
          "id": "kayu_panjang",
          "tipe": "image",
          "visual": "assets/image/kayu_panjang.png",
          "x": 38,
          "y": 40,
          "width": 20,
          "height": 30,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 2
        },
        {
          "id": "tali",
          "tipe": "image",
          "visual": "assets/image/tali.png",
          "x": 68,
          "y": 45,
          "width": 22,
          "height": 12,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 2
        },
        {
          "id": "payung_setengah",
          "tipe": "image",
          "visual": "assets/image/payung_setengah.png",
          "x": 30,
          "y": 30,
          "width": 30,
          "height": 32,
          "isDraggable": true,
          "isHidden": true,
          "zIndex": 3
        },
        {
          "id": "payung_lengkap",
          "tipe": "image",
          "visual": "assets/image/payung_lengkap.png",
          "x": 35,
          "y": 25,
          "width": 32,
          "height": 40,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 4
        },
        {
          "id": "tempat_payung",
          "tipe": "image",
          "visual": "assets/image/tempat_payung.png",
          "x": 70,
          "y": 60,
          "width": 22,
          "height": 25,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 1,
          "isTarget": true
        }
      ],
      "kunciJawaban": {
        "langkah": [
          {
            "aksi": "merge",
            "targetId": "kain",
            "tujuanId": "kayu_panjang",
            "efek": "reveal",
            "revealIds": [
              "payung_setengah"
            ],
            "sembunyikanIds": [
              "kain",
              "kayu_panjang"
            ],
            "pesan": "Bahan utama terpasang!"
          },
          {
            "aksi": "merge",
            "targetId": "tali",
            "tujuanId": "payung_setengah",
            "efek": "reveal",
            "revealIds": [
              "payung_lengkap"
            ],
            "sembunyikanIds": [
              "tali",
              "payung_setengah"
            ],
            "pesan": "Payung jadi!"
          },
          {
            "aksi": "drag",
            "targetId": "payung_lengkap",
            "tujuanId": "tempat_payung",
            "efek": "menang",
            "pesan": "Payung siap dipakai!"
          }
        ]
      }
    },
    {
      "level": 16,
      "pertanyaan": "Geser pertanyaan lalu gabungkan warna!",
      "tipeMekanik": "drag_question",
      "posisiPertanyaan": {
        "x": 20,
        "y": 45,
        "width": 60,
        "height": 15,
        "isDraggable": true
      },
      "latarBelakang": "linear-gradient(180deg, #FBCFE8 0%, #EC4899 100%)",
      "elemen": [
        {
          "id": "cat_merah",
          "tipe": "image",
          "visual": "assets/image/cat_merah.png",
          "x": 10,
          "y": 20,
          "width": 20,
          "height": 28,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 2
        },
        {
          "id": "cat_kuning",
          "tipe": "image",
          "visual": "assets/image/cat_kuning.png",
          "x": 40,
          "y": 25,
          "width": 20,
          "height": 28,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 2
        },
        {
          "id": "cat_biru",
          "tipe": "image",
          "visual": "assets/image/cat_biru.png",
          "x": 70,
          "y": 20,
          "width": 20,
          "height": 28,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 2
        },
        {
          "id": "cat_oranye",
          "tipe": "image",
          "visual": "assets/image/cat_oranye.png",
          "x": 22,
          "y": 62,
          "width": 18,
          "height": 24,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 3
        },
        {
          "id": "cat_hijau",
          "tipe": "image",
          "visual": "assets/image/cat_hijau.png",
          "x": 58,
          "y": 62,
          "width": 18,
          "height": 24,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 3
        },
        {
          "id": "palet",
          "tipe": "image",
          "visual": "assets/image/palet.png",
          "x": 38,
          "y": 60,
          "width": 28,
          "height": 22,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 1,
          "isTarget": true
        }
      ],
      "kunciJawaban": {
        "langkah": [
          {
            "aksi": "drag_question",
            "arah": "kanan",
            "jarak": 40,
            "efek": "none",
            "pesan": "Lihat semua cat warna!"
          },
          {
            "aksi": "merge",
            "targetId": "cat_merah",
            "tujuanId": "cat_kuning",
            "efek": "reveal",
            "revealIds": [
              "cat_oranye"
            ],
            "sembunyikanIds": [
              "cat_merah",
              "cat_kuning"
            ],
            "pesan": "Merah + Kuning = Oranye!"
          },
          {
            "aksi": "merge",
            "targetId": "cat_kuning",
            "tujuanId": "cat_biru",
            "efek": "reveal",
            "revealIds": [
              "cat_hijau"
            ],
            "sembunyikanIds": [
              "cat_kuning",
              "cat_biru"
            ],
            "pesan": "Kuning + Biru = Hijau!"
          },
          {
            "aksi": "drag",
            "targetId": "cat_oranye",
            "tujuanId": "palet",
            "efek": "tetap",
            "pesan": "Oranye masuk palet!"
          },
          {
            "aksi": "drag",
            "targetId": "cat_hijau",
            "tujuanId": "palet",
            "efek": "menang",
            "pesan": "Campuran warna selesai!"
          }
        ]
      }
    },
    {
      "level": 17,
      "pertanyaan": "Selesaikan semua langkah untuk menanam bunga!",
      "tipeMekanik": "click",
      "posisiPertanyaan": {
        "x": 8,
        "y": 4,
        "width": 88,
        "height": 13
      },
      "latarBelakang": "linear-gradient(180deg, #86EFAC 0%, #16A34A 100%)",
      "elemen": [
        {
          "id": "sekop",
          "tipe": "image",
          "visual": "assets/image/sekop.png",
          "x": 8,
          "y": 55,
          "width": 20,
          "height": 28,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 2
        },
        {
          "id": "tanah",
          "tipe": "image",
          "visual": "assets/image/tanah_gembur.png",
          "x": 35,
          "y": 60,
          "width": 28,
          "height": 22,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 1,
          "isTarget": true
        },
        {
          "id": "lubang_tanah",
          "tipe": "image",
          "visual": "assets/image/lubang_tanah.png",
          "x": 38,
          "y": 64,
          "width": 22,
          "height": 16,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 2
        },
        {
          "id": "biji_bunga",
          "tipe": "image",
          "visual": "assets/image/biji_bunga.png",
          "x": 68,
          "y": 30,
          "width": 16,
          "height": 16,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 2
        },
        {
          "id": "bibit_bunga",
          "tipe": "image",
          "visual": "assets/image/bibit_bunga.png",
          "x": 42,
          "y": 52,
          "width": 18,
          "height": 24,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 3
        },
        {
          "id": "air",
          "tipe": "image",
          "visual": "assets/image/air.png",
          "x": 72,
          "y": 55,
          "width": 20,
          "height": 26,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 2
        },
        {
          "id": "bunga_mekar",
          "tipe": "image",
          "visual": "assets/image/bunga_mekar.png",
          "x": 38,
          "y": 40,
          "width": 26,
          "height": 36,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 4
        }
      ],
      "kunciJawaban": {
        "langkah": [
          {
            "aksi": "drag",
            "targetId": "sekop",
            "tujuanId": "tanah",
            "efek": "reveal",
            "revealIds": [
              "lubang_tanah"
            ],
            "sembunyikanIds": [
              "tanah"
            ],
            "pesan": "Lubang tanah sudah dibuat!"
          },
          {
            "aksi": "drag",
            "targetId": "biji_bunga",
            "tujuanId": "lubang_tanah",
            "efek": "reveal",
            "revealIds": [
              "bibit_bunga"
            ],
            "sembunyikanIds": [
              "biji_bunga",
              "lubang_tanah"
            ],
            "pesan": "Biji ditanam, tumbuh bibit!"
          },
          {
            "aksi": "drag",
            "targetId": "air",
            "tujuanId": "bibit_bunga",
            "efek": "reveal",
            "revealIds": [
              "bunga_mekar"
            ],
            "sembunyikanIds": [
              "air",
              "bibit_bunga"
            ],
            "pesan": "Disiram, bunga mekar!"
          },
          {
            "aksi": "click",
            "targetId": "bunga_mekar",
            "efek": "menang",
            "pesan": "Bunga indah tumbuh sempurna!"
          }
        ]
      }
    },
    {
      "level": 18,
      "pertanyaan": "Cari 3 butir permata yang tersembunyi!",
      "tipeMekanik": "click",
      "posisiPertanyaan": {
        "x": 12,
        "y": 4,
        "width": 80,
        "height": 13
      },
      "latarBelakang": "linear-gradient(180deg, #64748B 0%, #1E293B 100%)",
      "elemen": [
        {
          "id": "batu_gua_1",
          "tipe": "image",
          "visual": "assets/image/batu_gua.png",
          "x": 5,
          "y": 30,
          "width": 25,
          "height": 35,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 2,
          "efekKlik": "pecah"
        },
        {
          "id": "batu_gua_2",
          "tipe": "image",
          "visual": "assets/image/batu_gua.png",
          "x": 35,
          "y": 20,
          "width": 28,
          "height": 38,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 2,
          "efekKlik": "pecah"
        },
        {
          "id": "batu_gua_3",
          "tipe": "image",
          "visual": "assets/image/batu_gua.png",
          "x": 68,
          "y": 35,
          "width": 26,
          "height": 36,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 2,
          "efekKlik": "pecah"
        },
        {
          "id": "tumpukan_batu",
          "tipe": "image",
          "visual": "assets/image/tumpukan_batu.png",
          "x": 40,
          "y": 60,
          "width": 25,
          "height": 22,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 2,
          "efekKlik": "sibak"
        },
        {
          "id": "permata_merah",
          "tipe": "image",
          "visual": "assets/image/permata_merah.png",
          "x": 12,
          "y": 42,
          "width": 12,
          "height": 12,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 3
        },
        {
          "id": "permata_biru",
          "tipe": "image",
          "visual": "assets/image/permata_biru.png",
          "x": 42,
          "y": 32,
          "width": 12,
          "height": 12,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 3
        },
        {
          "id": "permata_hijau",
          "tipe": "image",
          "visual": "assets/image/permata_hijau.png",
          "x": 48,
          "y": 66,
          "width": 12,
          "height": 12,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 3
        },
        {
          "id": "kotak_permata",
          "tipe": "image",
          "visual": "assets/image/kotak_permata.png",
          "x": 75,
          "y": 65,
          "width": 20,
          "height": 18,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 1,
          "isTarget": true
        }
      ],
      "kunciJawaban": {
        "langkah": [
          {
            "aksi": "click",
            "targetId": "batu_gua_1",
            "efek": "reveal",
            "revealIds": [
              "permata_merah"
            ],
            "pesan": "Permata merah ketemu!"
          },
          {
            "aksi": "click",
            "targetId": "batu_gua_2",
            "efek": "reveal",
            "revealIds": [
              "permata_biru"
            ],
            "pesan": "Permata biru ditemukan!"
          },
          {
            "aksi": "click",
            "targetId": "batu_gua_3",
            "efek": "none",
            "pesan": "Batu ini kosong"
          },
          {
            "aksi": "click",
            "targetId": "tumpukan_batu",
            "efek": "reveal",
            "revealIds": [
              "permata_hijau"
            ],
            "pesan": "Permata hijau yang terakhir!"
          },
          {
            "aksi": "click",
            "targetId": "permata_merah",
            "efek": "kumpul",
            "pesan": "1 permata terkumpul"
          },
          {
            "aksi": "click",
            "targetId": "permata_biru",
            "efek": "kumpul",
            "pesan": "2 permata terkumpul"
          },
          {
            "aksi": "click",
            "targetId": "permata_hijau",
            "efek": "menang",
            "pesan": "Semua permata masuk kotak!"
          }
        ]
      }
    },
    {
      "level": 19,
      "pertanyaan": "Rakit robot lalu nyalakan dengan tombol!",
      "tipeMekanik": "merge",
      "posisiPertanyaan": {
        "x": 10,
        "y": 4,
        "width": 85,
        "height": 13
      },
      "latarBelakang": "linear-gradient(180deg, #94A3B8 0%, #475569 100%)",
      "elemen": [
        {
          "id": "badan_robot",
          "tipe": "image",
          "visual": "assets/image/badan_robot.png",
          "x": 38,
          "y": 40,
          "width": 28,
          "height": 35,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 2
        },
        {
          "id": "kepala_robot",
          "tipe": "image",
          "visual": "assets/image/kepala_robot.png",
          "x": 10,
          "y": 20,
          "width": 24,
          "height": 26,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 2
        },
        {
          "id": "tangan_robot",
          "tipe": "image",
          "visual": "assets/image/tangan_robot.png",
          "x": 68,
          "y": 35,
          "width": 22,
          "height": 28,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 2
        },
        {
          "id": "kaki_robot",
          "tipe": "image",
          "visual": "assets/image/kaki_robot.png",
          "x": 12,
          "y": 65,
          "width": 26,
          "height": 22,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 2
        },
        {
          "id": "baterai",
          "tipe": "image",
          "visual": "assets/image/baterai.png",
          "x": 70,
          "y": 65,
          "width": 18,
          "height": 20,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 2
        },
        {
          "id": "robot_setengah",
          "tipe": "image",
          "visual": "assets/image/robot_setengah.png",
          "x": 35,
          "y": 25,
          "width": 32,
          "height": 50,
          "isDraggable": true,
          "isHidden": true,
          "zIndex": 3
        },
        {
          "id": "robot_lengkap",
          "tipe": "image",
          "visual": "assets/image/robot_lengkap.png",
          "x": 32,
          "y": 20,
          "width": 36,
          "height": 58,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 4
        },
        {
          "id": "tombol_nyala",
          "tipe": "image",
          "visual": "assets/image/tombol_nyala.png",
          "x": 75,
          "y": 15,
          "width": 18,
          "height": 18,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 1,
          "efekKlik": "nyala"
        }
      ],
      "kunciJawaban": {
        "langkah": [
          {
            "aksi": "merge",
            "targetId": "badan_robot",
            "tujuanId": "kaki_robot",
            "efek": "reveal",
            "revealIds": [
              "robot_setengah"
            ],
            "sembunyikanIds": [
              "badan_robot",
              "kaki_robot"
            ],
            "pesan": "Badan dan kaki terpasang!"
          },
          {
            "aksi": "merge",
            "targetId": "kepala_robot",
            "tujuanId": "tangan_robot",
            "efek": "none",
            "pesan": "Salah urutan, pasang ke badan!"
          },
          {
            "aksi": "merge",
            "targetId": "kepala_robot",
            "tujuanId": "robot_setengah",
            "efek": "tetap",
            "sembunyikanIds": [
              "kepala_robot"
            ],
            "pesan": "Kepala terpasang!"
          },
          {
            "aksi": "merge",
            "targetId": "tangan_robot",
            "tujuanId": "robot_setengah",
            "efek": "reveal",
            "revealIds": [
              "robot_lengkap"
            ],
            "sembunyikanIds": [
              "tangan_robot",
              "robot_setengah"
            ],
            "pesan": "Tangan terpasang, robot hampir jadi!"
          },
          {
            "aksi": "drag",
            "targetId": "baterai",
            "tujuanId": "robot_lengkap",
            "efek": "tetap",
            "sembunyikanIds": [
              "baterai"
            ],
            "pesan": "Baterai terpasang!"
          },
          {
            "aksi": "click",
            "targetId": "tombol_nyala",
            "efek": "menang",
            "pesan": "Robot menyala dan bergerak!"
          }
        ]
      }
    },
    {
      "level": 20,
      "pertanyaan": "Selesaikan misi akhir: Selamatkan hutan dari polusi!",
      "tipeMekanik": "click",
      "posisiPertanyaan": {
        "x": 6,
        "y": 4,
        "width": 90,
        "height": 14,
        "isDraggable": true
      },
      "latarBelakang": "linear-gradient(180deg, #374151 0%, #111827 100%)",
      "elemen": [
        {
          "id": "asap_pabrik",
          "tipe": "image",
          "visual": "assets/image/asap_pabrik.png",
          "x": 10,
          "y": 10,
          "width": 30,
          "height": 35,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 2,
          "efekKlik": "hilang"
        },
        {
          "id": "sampah_plastik",
          "tipe": "image",
          "visual": "assets/image/sampah_plastik.png",
          "x": 60,
          "y": 60,
          "width": 28,
          "height": 25,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 2
        },
        {
          "id": "pohon_tebang",
          "tipe": "image",
          "visual": "assets/image/pohon_tebang.png",
          "x": 35,
          "y": 45,
          "width": 25,
          "height": 35,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 2,
          "efekKlik": "tanam"
        },
        {
          "id": "bibit_pohon",
          "tipe": "image",
          "visual": "assets/image/bibit_pohon_besar.png",
          "x": 8,
          "y": 60,
          "width": 20,
          "height": 28,
          "isDraggable": true,
          "isHidden": false,
          "zIndex": 2
        },
        {
          "id": "tempat_sampah",
          "tipe": "image",
          "visual": "assets/image/tempat_sampah.png",
          "x": 78,
          "y": 30,
          "width": 18,
          "height": 28,
          "isDraggable": false,
          "isHidden": false,
          "zIndex": 1,
          "isTarget": true
        },
        {
          "id": "pabrik_bersih",
          "tipe": "image",
          "visual": "assets/image/pabrik_bersih.png",
          "x": 8,
          "y": 15,
          "width": 32,
          "height": 38,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 3
        },
        {
          "id": "pohon_hijau",
          "tipe": "image",
          "visual": "assets/image/pohon_hijau_besar.png",
          "x": 32,
          "y": 30,
          "width": 32,
          "height": 50,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 3
        },
        {
          "id": "hutan_bersih",
          "tipe": "image",
          "visual": "assets/image/hutan_bersih.png",
          "x": 0,
          "y": 0,
          "width": 100,
          "height": 100,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 5
        },
        {
          "id": "matahari",
          "tipe": "image",
          "visual": "assets/image/matahari.png",
          "x": 70,
          "y": 8,
          "width": 22,
          "height": 22,
          "isDraggable": false,
          "isHidden": true,
          "zIndex": 4
        }
      ],
      "kunciJawaban": {
        "langkah": [
          {
            "aksi": "drag_question",
            "arah": "kiri",
            "jarak": 45,
            "efek": "none",
            "pesan": "Lihat kerusakan hutan ini!"
          },
          {
            "aksi": "click",
            "targetId": "asap_pabrik",
            "efek": "reveal",
            "revealIds": [
              "pabrik_bersih"
            ],
            "sembunyikanIds": [
              "asap_pabrik"
            ],
            "pesan": "Asap pabrik dihilangkan!"
          },
          {
            "aksi": "drag",
            "targetId": "sampah_plastik",
            "tujuanId": "tempat_sampah",
            "efek": "tetap",
            "sembunyikanIds": [
              "sampah_plastik"
            ],
            "pesan": "Sampah plastik dibersihkan!"
          },
          {
            "aksi": "drag",
            "targetId": "bibit_pohon",
            "tujuanId": "pohon_tebang",
            "efek": "reveal",
            "revealIds": [
              "pohon_hijau"
            ],
            "sembunyikanIds": [
              "bibit_pohon",
              "pohon_tebang"
            ],
            "pesan": "Pohon baru ditanam!"
          },
          {
            "aksi": "click",
            "targetId": "pabrik_bersih",
            "efek": "none",
            "pesan": "Pabrik sudah ramah lingkungan"
          },
          {
            "aksi": "click",
            "targetId": "pohon_hijau",
            "efek": "reveal",
            "revealIds": [
              "hutan_bersih",
              "matahari"
            ],
            "sembunyikanIds": [
              "pabrik_bersih",
              "pohon_hijau",
              "tempat_sampah"
            ],
            "pesan": "Hutan mulai pulih!"
          },
          {
            "aksi": "click",
            "targetId": "matahari",
            "efek": "menang",
            "pesan": "SELAMAT! Hutan kembali hijau dan asri!"
          }
        ]
      }
    }
  ]
};
