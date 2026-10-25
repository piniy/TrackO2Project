# TraCkO2

Website edukasi bilingual Indonesia/Inggris untuk membantu pelajar memahami jejak lingkungan AI melalui materi, estimasi karbon, video, sumber penelitian, dan permainan pilihan.

## Menjalankan versi sekarang

Gunakan Node.js 22.12 atau lebih baru dan npm. Dari folder proyek:

```powershell
npm.cmd ci
npm.cmd run dev
```

Buka http://127.0.0.1:5173/. Untuk menguji dan membuat hasil produksi:

```powershell
npm.cmd test
npm.cmd run build
npm.cmd run preview
```

Pratinjau produksi: http://127.0.0.1:4173/. Salin isi `dist/` ke layanan hosting statis untuk penerbitan. Pekerjaan ini belum menerbitkan situs atau mengubah layanan Firebase.

`index.html` sumber menggunakan fragmen HTML yang diproses oleh Vite. Gunakan server Vite selama pengembangan; untuk server HTTP biasa, sajikan folder `dist/` setelah build.

## Pilihan bahasa ID / EN

Tombol ID / EN di header tersedia pada semua halaman, termasuk saat menu ponsel ditutup. Bahasa awal adalah Indonesia; pilihan disimpan di `localStorage` dengan kunci `tracko2-language` dan dibaca kembali saat memuat ulang atau pindah halaman. Jika penyimpanan diblokir, pergantian bahasa tetap bekerja pada halaman yang sedang dibuka.

Pergantian bahasa berlangsung langsung dan mempertahankan isian serta hasil kalkulator, progres serta skor game, pencarian, filter, dan materi yang sedang dibuka. Format angka mengikuti bahasa: misalnya `13,20` dalam ID dan `13.20` dalam EN. Judul halaman, deskripsi, label aksesibilitas, diagram, materi, dan penjelasan hasil ikut diterjemahkan.

Terjemahan antarmuka ada di `src/i18n/catalogue.js`; terjemahan aktivitas, materi, ringkasan sumber, dan skenario game ada di `src/i18n/content-en.js`. Teks Indonesia pada sumber menjadi kunci terjemahan; perbarui pasangan Inggrisnya jika teks sumber diubah. Teks dinamis Alpine menggunakan `$t(text, values)`, sedangkan teks HTML statis diterjemahkan tanpa mengganti struktur DOM. Tambahkan `data-i18n-number="0.1"` untuk angka parameter statis yang memerlukan format lokal.

Video dan dokumen proposal asli tetap dalam Bahasa Indonesia dan diberi keterangan. Nama penulis serta judul sumber dipertahankan sesuai dokumen aslinya. Tanpa JavaScript, materi statis tetap dapat dibaca dalam Bahasa Indonesia dan tombol bahasa disembunyikan.

## Halaman

| Rute | Isi |
| --- | --- |
| `index.html` | Hero pengenalan, cerita sinematik berbasis scroll, CarbsCulator lengkap, pengantar topik, dan tim |
| `kalkulator.html` | CarbsCulator, rincian hasil, respons edukatif, dan metode |
| `edukasi.html` | Materi karbon, air, energi, dan kebiasaan belajar; pencarian dan filter |
| `kampanye.html` | Video lokal yang sudah ada dan panduan diskusi |
| `referensi.html` | Pustaka publik dan tabel parameter prototipe |
| `game.html` | Lima situasi penggunaan AI, penjelasan, hasil belajar, dan mulai ulang |

## Struktur sumber

```text
src/
  components/   Header, footer, kalkulator bersama, cerita visual, dan ikon
  content/      Materi, sumber referensi, faktor aktivitas, dan skenario game
  features/     Pengendali Alpine.js dan fungsi perhitungan
  i18n/         Katalog terjemahan ID/EN, format angka, dan preferensi bahasa
  build/        Perender materi menjadi HTML statis
  styles/       Token desain dan CSS responsif
  main.js       Registrasi komponen interaktif dan font lokal
public/
  assets/
    images/     Foto tim dan poster video
    video/      Video awal proyek
    documents/  Proposal yang diberikan pengguna
tests/          Pengujian logika perhitungan dan skenario belajar
docs/           Rencana implementasi dan catatan verifikasi
legacy/         Salinan sumber asli sebelum refaktor
dist/           Hasil build; tidak dimasukkan ke Git
```

HTML, CSS, dan JavaScript tetap menjadi sumber utama. Alpine.js 3.17.5 mengelola interaksi; Vite 8.3.5 mengembangkan dan membangun situs statis. Font Outfit dan Plus Jakarta Sans dibundel secara lokal. Tidak ada dependensi CDN pada halaman produksi.

## Mengubah materi dan angka

- Edit materi di `src/content/articles.js`.
- Edit sumber bacaan di `src/content/references.js`.
- Edit faktor prototipe di `src/content/activities.js`. Tabel parameter, label formulir, dan perhitungan pada kedua halaman mengambil angka dari modul ini.
- Edit situasi game di `src/content/game-cards.js`.
- Edit navigasi bersama di `src/components/header.html` dan footer di `src/components/footer.html`.
- Jalankan kembali build setelah mengubah materi. Materi dan referensi disisipkan menjadi HTML sehingga tetap tersedia tanpa JavaScript dan tanpa pengambilan data dari backend.

Untuk tahap UI saat ini, "Database Server" ditampilkan sebagai pustaka referensi dan data publik. Database pengguna tetap menjadi bagian pengembangan berikutnya; pustaka publik tidak menggantikan kebutuhan tersebut. Materi edukasi tetap berada dalam situs, sedangkan data pribadi pengguna nantinya dikelola melalui layanan terpisah.

Versi saat ini belum menghubungkan akun atau database pengguna. Login serta konfigurasi awal dipertahankan dalam arsip sumber; konfigurasi dan data pada layanan Firebase belum disentuh. Kalkulator saat ini belum menyimpan riwayat. Rencana batas tanggung jawab dan perluasannya dijelaskan di `docs/user-data-roadmap.md`.

## Dasar isi dan batas interpretasi

Dasar tujuan: proposal `public/assets/documents/tracko2-proposal.pdf`, khususnya halaman 3-6. Faktor prototipe halaman 5: tanya singkat 0,1; ringkasan 0,4; teks panjang 2,0; gambar 4,5 g CO2e per aktivitas.

Nilai tersebut berasal dari proposal, bukan faktor universal yang telah divalidasi untuk seluruh layanan AI. Rentang kategori dari proposal adalah kategori prototipe, bukan batas aman lingkungan. Hasil di bawah 0,2 g dijelaskan sebagai di bawah rentang klasifikasi proposal. Nol aktivitas tidak mendapat kategori.

Materi tambahan menggunakan sumber primer:

- Luccioni, Jernite, dan Strubell: https://arxiv.org/abs/2311.16863
- Li, Yang, Islam, dan Ren: https://arxiv.org/abs/2304.03271
- IEA, Energy and AI (2025): https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai

Materi air membedakan pengambilan dan konsumsi air. Tidak ada konversi tetap prompt ke liter air, kWh, atau analogi peralatan yang belum didukung asumsi. Riset, materi, dan game tidak membuktikan perubahan perilaku atau pengurangan emisi nyata.

Video lama dipertahankan sebagai video edukasi efek rumah kaca, tanpa klaim bahwa itu merupakan kampanye baru buatan tim. Video tidak autoplay dan memakai `preload="none"`; ukuran file masih sekitar 48 MB. Caption dan kompresi video belum dikerjakan dalam refaktor ini. Link ke sumber asli memerlukan internet, sedangkan materi ringkas dan media lokal disertakan dalam situs.

## Verifikasi

Lihat `docs/verification-2026-10-25.md`. Catatan mencakup tes logika, build produksi, halaman dan viewport, fungsi utama, video, materi tanpa JavaScript, serta penambahan cerita sinematik. Ini adalah pemeriksaan lokal; tidak ada klaim verifikasi produksi atau audit keamanan menyeluruh.

## Cerita pembuka berbasis scroll

Beranda dibuka dengan hero pengenalan TraCkO2 dan pilihan menuju cerita atau langsung menghitung. Setelah itu, keyframe kamera SVG mengikuti posisi scroll: prompt dengan efek mengetik, perjalanan data bercahaya, pemrosesan di rak server, pasokan listrik, lalu semburan visual yang memperkenalkan emisi. Pengetikan dimulai ketika bagian cerita sudah cukup terlihat di layar. Semburan adalah transisi grafis; narasi menghubungkan emisi dengan penyediaan listrik. Tidak ada pustaka animasi tambahan atau video pembuka yang harus diunduh.

Markup cerita ada di `src/components/journey.html`, timeline dan perpindahan kamera di `src/features/journey.js`, serta tampilannya di `src/styles/journey.css`. Pengguna dapat menggulir secara normal, memilih tahap dengan keyboard, atau langsung menuju kalkulator. Preferensi gerakan berkurang, layar pendek, dan JavaScript nonaktif menyediakan alur statis yang dapat dibaca. Kalkulator beranda dan halaman khusus berbagi `src/components/calculator.html`.

Penambahan bilingual diverifikasi melalui 14 tes otomatis, build produksi, dan 60 kombinasi halaman/bahasa/viewport. Catatan rinci terdapat di `docs/verification-bilingual-2026-10-25.md`.

## Snapshot awal

Commit pertama repositori menyimpan situs asli. Sebanyak 26 berkas sumber dan media asli dipertahankan di `legacy/2026-10-25/`; arsip tidak dimasukkan dalam hasil produksi. Versi tersebut memuat Firebase dan Chart.js dari CDN, memiliki JavaScript yang gagal diparse, serta login lokal yang menyimpan kata sandi. Gunakan arsip untuk referensi sejarah, bukan penerbitan.

## Menyimpan perubahan ke GitHub

Setelah mengubah dan memeriksa berkas:

```sh
git status
git add <berkas-yang-diubah>
git commit -m "Jelaskan perubahan"
git push
```
