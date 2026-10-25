# Verifikasi refaktor UI dan struktur TraCkO2

Tanggal: 25 Oktober 2026. Lingkup: implementasi dan pengujian lokal pada hasil produksi `dist/`, bukan penerbitan.

## Hero pengenalan sebelum animasi

Hero baru memperkenalkan TraCkO2 melalui satu H1, ringkasan, ilustrasi karbon/air/energi, serta tombol menuju cerita dan langsung ke kalkulator. Judul cerita menggunakan H2. Efek mengetik ditunda sampai setidaknya 70% adegan masuk ke layar agar pengunjung dapat membaca pembuka terlebih dahulu.

Build dan 15 tes yang ada lulus. Browser memverifikasi urutan hero, animasi, dan kalkulator; pengetikan yang belum dimulai saat hero terlihat; kedua tombol; hasil contoh 13,20 g; serta pergantian bahasa pada judul dan tombol. Tampilan ditinjau pada 1440×1000, 1191×668, 390×844, dan 320×700 tanpa overflow horizontal atau kesalahan JavaScript. Screenshot disimpan di `review-ui-2026-10-25/welcome-hero/`.

## Cerita sinematik dan transisi kalkulator

Beranda kini memakai timeline scroll dengan pengetikan prompt, keyframe kamera yang mengikuti aliran data, indikator pemrosesan server, pasokan listrik, semburan visual, dan pengungkapan awan CO2. Selanjutnya tersedia CarbsCulator lengkap pada halaman yang sama. Markup kalkulator dibagi dengan halaman khusus, dan fragmen HTML bersarang diselesaikan saat build.

Pemeriksaan Chrome terisolasi mencakup keempat tahap dan lintasan data, indikator pemrosesan, kamera desktop/ponsel, kontrol tahap dengan keyboard, tautan langsung ke kalkulator, serta hasil contoh 13,20 g pada kedua halaman. Tata letak diperiksa pada 1440×1000, 1191×668, 390×844, dan 320×700. Mode reduced-motion, layar landscape 844×390, serta JavaScript nonaktif menampilkan alur statis, empat penjelasan, dan form kalkulator. Tidak ditemukan kesalahan JavaScript dalam pemeriksaan cerita.

Screenshot berada di direktori pendamping `review-ui-2026-10-25/prompt-journey/`, dengan awalan `cinema-` untuk revisi sinematik terbaru. Screenshot `stage-` merekam rancangan awal sebelum pengguna meminta kamera yang lebih dramatis. Catatan pengujian sebelumnya tetap dipertahankan sebagai riwayat.

## Revisi komentar browser

Komentar visual pengguna diterapkan pada beranda, pustaka, tabel parameter, dan footer bersama. Judul pustaka menjadi "Pustaka terbuka"; judul tabel menjadi "Parameter CarbsCulator". Label kecil beranda, banner ringkasan, empat kotak batas penggunaan, kotak penjelasan penggunaan angka, kolom asal parameter, dan kalimat estimasi pada footer dihapus.

Build produksi berhasil. Pemeriksaan Chrome terisolasi memastikan judul serta penghapusan yang diminta, empat baris parameter dengan tiga kolom, contoh interaktif beranda, filter referensi, pencarian kosong, dan reset. Beranda serta pustaka diperiksa pada desktop 1191×668 dan ponsel 390×844 serta 320×700. Ketiga kolom parameter muat tanpa gulir horizontal pada kedua ukuran ponsel. Tidak ada kesalahan JavaScript atau resource gagal dalam pemeriksaan ini.

Screenshot dan hasil terstruktur tersimpan di direktori pendamping `review-ui-2026-10-25/comments-round-1/`. Hasil awal refaktor tetap didokumentasikan di bawah sebagai catatan pemeriksaan sebelumnya.

## Hasil

- `npm.cmd test`: 5 tes lulus, 0 gagal.
- `npm.cmd run build`: berhasil dengan Vite 8.3.5; enam dokumen HTML diproduksi.
- Browser: Google Chrome headless, sesi terisolasi. Alat browser bersama sedang dipakai, sehingga pemeriksaan memakai pustaka Playwright dari runtime yang tersedia dan instalasi Chrome lokal tanpa mengganggu sesi lain.
- 11 kelompok pemeriksaan browser lulus.
- 24 kombinasi halaman dan viewport lulus: enam halaman masing-masing pada 1440×1000, 390×844, 320×700, dan 844×390.
- Tidak ada kesalahan JavaScript di browser atau respons resource gagal dalam pemeriksaan akhir.
- Delapan URL lokal halaman, dokumen, dan media mengembalikan HTTP 200.
- Arsip 26 berkas dibandingkan dengan commit awal: 17 berkas media identik byte; isi 9 berkas teks identik setelah normalisasi CRLF/LF. Arsip tidak disertakan dalam `dist/`.

## Fungsi yang diperiksa

| Bagian | Bukti perilaku |
| --- | --- |
| Navigasi | Enam tujuan tersedia; tepat satu halaman aktif; menu ponsel membuka, menutup dengan Escape, dan mengembalikan fokus |
| Beranda | Pilihan aktivitas dan slider keyboard mengubah estimasi; seluruh foto tim berhasil dimuat |
| Kalkulator | Validasi nol, contoh 13,20 g, rincian empat kategori, input berubah, hitung ulang 14,00 g, penolakan angka negatif, reset, dan hasil maksimum 70.000,00 g tanpa overflow ponsel |
| Edukasi | Filter air, pembukaan artikel native, pencarian kosong, dan pemulihan semua materi |
| Referensi | Pencarian penulis, filter energi, pencarian kosong, reset, dan empat baris parameter |
| Game | Lima situasi, penjelasan tiap jawaban, pilihan terkunci setelah dijawab, penyelesaian dengan skor 5/5, serta mulai ulang |
| Video | Tidak ada permintaan MP4 saat halaman dibuka; `preload=none`; tidak autoplay; pemutaran serta decoding dimensi/durasi berhasil |
| Tanpa JavaScript | Navigasi terlihat pada keenam halaman; empat artikel dan empat referensi tersedia; artikel air dapat dibuka dengan kontrol `details` native |
| Tampilan | Screenshot desktop dan ponsel ditinjau; tidak ada overflow horizontal halaman pada ukuran yang diuji |

## Pengujian logika

Tes mencakup faktor dan rincian yang konsisten, nol aktivitas, rentang di bawah klasifikasi, sembilan titik batas kategori, penolakan input negatif/pecahan/NaN/tak hingga/di atas batas, serta satu jawaban terbaik yang memiliki penjelasan untuk tiap skenario.

Jumlah 10 tanya singkat + 3 ringkasan + 1 teks panjang + 2 gambar menghasilkan 1 + 1,2 + 2 + 9 = 13,2 g CO2e. Faktor berasal dari proposal, halaman 5, bukan pengukuran layanan AI. Unit perhitungan internal memakai persepuluhan integer untuk menjaga batas klasifikasi.

## Bukti yang disimpan

Direktori pendamping: `D:/Competitions/Iostc undip 2026/review-ui-2026-10-25/`.

- `browser-results.json`: hasil akhir terstruktur.
- `browser-check.cjs`: skrip pemeriksaan browser; memakai lokasi runtime dan Chrome pada mesin ini.
- `home-desktop.png`, `home-desktop-viewport.png`, `home-mobile.png`.
- `calculator-desktop.png`, `calculator-mobile.png`.
- `education-mobile.png`, `game-mobile.png`, `game-complete-desktop.png`, `mobile-menu.png`.
- `paper-page-3.png` hingga `paper-page-6.png`: render halaman proposal yang relevan.

## Batas verifikasi

Tidak ada perubahan konsol Firebase, akun, aturan akses, deployment, atau data produksi. Situs baru tidak memanggil Firebase. Tidak ada penyimpanan riwayat atau monitoring otomatis penggunaan AI. Sumber primer ditinjau untuk materi, tetapi faktor proposal belum divalidasi untuk setiap model komersial. Materi dan game belum diuji dengan pengguna sekolah untuk membuktikan dampak belajar. Caption dan kompresi video masih menjadi pekerjaan tersendiri.
