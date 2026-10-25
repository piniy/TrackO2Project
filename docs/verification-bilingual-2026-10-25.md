# Verifikasi bilingual TraCkO2 — 25 Oktober 2026

Implementasi lokal ID/EN mencakup beranda, CarbsCulator, edukasi, kampanye, referensi, dan game. Bahasa Indonesia menjadi bahasa awal dan fallback HTML. Terjemahan tersedia secara lokal, tanpa layanan penerjemah atau dependensi tambahan.

## Pemeriksaan otomatis

- `npm.cmd test`: 14 tes lulus, meliputi lima tes domain, dua tes geometri cerita, dan tujuh tes lokalisasi.
- Tes lokalisasi memeriksa bahasa yang didukung, penyimpanan diblokir, fallback, interpolasi, format angka, kelengkapan terjemahan seluruh materi dan lima skenario, pencarian berdasarkan bahasa, serta teks animasi saat berganti bahasa.
- `npm.cmd run build`: berhasil membangun keenam halaman.
- Satu build sempat menemui kunci berkas Windows (`EPERM` pada `dist/assets`); pengulangan build berhasil. Hasil terakhir inilah yang diperiksa kembali di browser.

## Pemeriksaan browser

Hasil produksi disajikan dari `http://127.0.0.1:4173/` dan diperiksa memakai Chromium lokal. Setiap rute diuji dalam ID dan EN pada 1440×900, 1024×768, 390×844, 320×740, dan 844×390: total 60 kombinasi. Tidak ditemukan overflow horizontal atau error JavaScript. Kontrol bahasa tetap terlihat pada ponsel saat menu ditutup. Pada layar 320px, menu memakai ikon dengan nama aksesibel agar header tetap satu baris.

Pemeriksaan fungsional:

- Pilihan EN tersimpan setelah reload dan navigasi antarhalaman.
- Contoh kalkulator menghasilkan nilai yang sama: `13,20` dalam ID dan `13.20` dalam EN, dengan empat input tetap `10`, `3`, `1`, `2`. Rincian aktivitas, penjelasan kategori, pesan validasi, dan catatan input berubah mengikuti bahasa.
- Mengubah input tanya singkat dari 10 menjadi 11 menghasilkan `13.30` dalam EN. Satu aktivitas menggunakan bentuk tunggal dalam keterangan hasil.
- Lima situasi game, pilihan, penjelasan, hasil 5/5, dan mulai ulang bekerja. Pilihan terkunci dan skor bertahan ketika bahasa diganti sebelum maupun setelah game selesai.
- Pencarian `water withdrawal` pada EN dan `pengambilan air` pada ID menemukan materi air. Query, filter topik, serta `<details>` terbuka bertahan saat bahasa diganti. Pencarian selalu menggunakan teks pada bahasa yang aktif.
- Teks prompt yang dianimasikan dan petunjuk menggulir mengikuti bahasa, termasuk saat bahasa diganti setelah animasi selesai.
- Judul dokumen, deskripsi, placeholder, teks tab baru, dan label aksesibilitas mengikuti bahasa. Audit teks statis tidak menemukan teks antarmuka Indonesia yang tertinggal pada EN; pengecualian disengaja berupa nama, judul dokumen asli, merek, dan satuan ilmiah.
- Tombol bahasa dapat diaktifkan dengan keyboard; status `aria-pressed` dan `html[lang]` berubah. Menu ponsel tetap terbuka saat bahasa diganti; Escape menutupnya dan mengembalikan fokus ke tombol menu.
- Ketika akses `localStorage` melempar `SecurityError`, bahasa tetap dapat diganti dan contoh kalkulator EN tetap menghasilkan `13.20` tanpa error JavaScript.
- Tanpa JavaScript, keempat materi edukasi statis tetap terlihat dalam ID dan kontrol bahasa disembunyikan.

Bukti lokal yang dapat dibuat ulang tersimpan di `.playwright-mcp/bilingual/`, termasuk hasil 60 kombinasi dalam `viewport-results.json` dan tangkapan desktop/ponsel. Folder bukti mengikuti aturan Git ignore proyek.

## Batas hasil

Pemeriksaan ini memakai hasil build lokal. Video, audio, subtitle, dan isi PDF proposal tidak diterjemahkan; antarmuka menampilkan keterangan bahasa asal. Judul bibliografi dan penulis mengikuti sumber asli. Tidak ada penerbitan situs atau perubahan layanan database dalam pekerjaan bilingual ini.
