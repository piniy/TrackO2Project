# TraCkO2

Website edukasi bilingual Indonesia/Inggris tentang jejak lingkungan AI. Struktur beranda: Home, Layanan, Edukasi, CarbsCulator, Games, dan About Team. Tampilan utama, palet warna, dan animasi scroll sinematik dipertahankan. Hero memakai foto pusat data yang diberikan pengguna, dengan layout dua kolom sebelumnya.

## Menjalankan dan memeriksa

Gunakan Node.js 22.12 atau lebih baru. Dari folder proyek:

```powershell
npm.cmd ci
npm.cmd run dev
npm.cmd test
npm.cmd run build
npm.cmd run preview
```

Server pengembangan: http://127.0.0.1:5173/. Pratinjau hasil produksi: http://127.0.0.1:4173/. Sumber HTML menggunakan fragmen yang diproses Vite; untuk hosting statis gunakan isi `dist/` setelah build.

## Halaman

| Rute | Isi |
| --- | --- |
| `index.html` | Hero foto, empat layanan, animasi scroll, grafik edukasi, trial kalkulator, Games, dan tim |
| `edukasi.html` | Edukasi: grafik Luccioni, diagram air, materi dengan pencarian dan filter |
| `kalkulator.html` | CarbsCulator, rincian, analogi, saran, simulasi, rumus LaTeX interaktif dan metode |
| `game.html` | Tiga game solo × lima ronde: perbandingan energi, pilihan tugas dan estimasi air; konfirmasi, hasil, review, replay, ID/EN |
| `referensi.html` | Referensi dan Metode: sumber bacaan dan tabel faktor proposal |

## Mengubah sumber

- Header dan footer: `src/components/`.
- Diagram edukasi: `src/components/education.html`, `src/features/education.js`, `src/content/education-data.js`, `src/styles/education.css`.
- Kalkulator lengkap: `src/components/calculator.html`, `src/features/calculator.js`, `src/features/calculation.js`. Trial Home: `src/components/calculator-trial.html` dan `src/styles/calculator-trial.css`; pemindahan input: `src/features/calculator-handoff.js`.
- Profil tim: `src/content/team.js` untuk enam anggota; `src/components/team.html`, `src/features/team.js`, dan `src/styles/team.css` untuk pemilihan profil. Muhammad Hisyam Adz Dzaki memakai foto asli. Lima nama/foto lainnya masih placeholder; job desk dan kutipan memakai Lorem ipsum sesuai permintaan.
- Faktor proposal: `src/content/activities.js`. Formulir, tabel faktor, dan hitungan menggunakan modul yang sama.
- Analogi dan saran: `src/content/result-insights.js`, `src/features/result-insights.js`.
- Materi, sumber, game: `src/content/articles.js`, `references.js`, `game-cards.js`.
- Tampilan asli: `src/styles/main.css`, `tokens.css`, `welcome.css`, `journey.css`. Tambahan lokal: `content-additions.css`, `education.css`, dan `calculator-refresh.css` untuk simulasi.
- Terjemahan: `src/i18n/catalogue.js`, `content-en.js`, `portal-messages.js`; pesan diagram dan hasil berada pada modul kontennya masing-masing.

Alpine.js mengelola interaksi. Vite menghasilkan enam halaman statis. Font dan ikon tersedia lokal, tanpa kebutuhan CDN saat halaman dibuka. Ikon memakai file Lucide resmi yang tidak diedit; sumber dan lisensi dijelaskan pada `docs/asset-sources.md`. Hero memakai foto pusat data yang diberikan pengguna. Animasi scroll yang ada dipertahankan dan diberi efek listrik serta awan pada tahap terkait. Grafik memakai HTML/CSS. Rumus menggunakan KaTeX lokal dengan simbol yang dapat diinspeksi. Pemutaran memperlihatkan substitusi, perkalian, dan penjumlahan. Input tetap di kalkulator utama; snapshot yang tervalidasi dipakai bersama oleh rumus metode dan animasi ringkas kartu hasil. Implementasi ada di `src/features/formula.js`, `src/components/formula.html`, `src/components/calculation-formula.html`, dan `src/styles/formula.css`. Animasi halaman memakai `src/features/page-motion.js` dan `src/styles/page-motion.css`, dengan konten terlihat secara default dan dukungan reduced motion.

Pilihan ID/EN disimpan dengan kunci `tracko2-language`. Pergantian bahasa memperbarui teks dan format angka tanpa menghapus isian kalkulator atau progres Games. Jika penyimpanan diblokir, pergantian tetap bekerja dalam halaman yang terbuka. Materi statis dan tabel fallback tersedia tanpa JavaScript; kalkulator, grafik interaktif, pencarian, dan game memerlukannya.

Trial kalkulator di Home hanya berisi input. Tombol **Hitung estimasi** memvalidasi isian lalu membuka dialog **Lihat hasil**. Tautannya membawa empat jumlah aktivitas ke `kalkulator.html?from=home&chat=…&summary=…&longText=…&image=…#hasil`. Halaman tujuan memvalidasi ulang jumlahnya dan menghitung sendiri totalnya, kemudian menampilkan rincian, analogi, saran, dan animasi rumus. Tidak ada total yang dipercaya dari URL atau input yang disimpan ke penyimpanan browser. **Isi contoh** di Home hanya mengisi form; pengunjung tetap menekan tombol hitung untuk membuka dialog.

## Data dan batas interpretasi

**Grafik riset Luccioni:** enam rata-rata energi dari Tabel 2, dalam kWh per 1.000 inferensi. Tombol karbon menampilkan konversi energi × 297,6 g CO₂e/kWh sesuai intensitas lokasi studi. Grafik memakai skala logaritmik yang diberi keterangan. Nilai tidak disajikan sebagai faktor setiap prompt ChatGPT.

**Diagram air:** estimasi GPT-3 175B berdasarkan Li dkk., revisi 2025, Tabel 1. Pengunjung dapat memilih lokasi dan mengubah jumlah permintaan. Konsumsi air langsung dan penyediaan listrik dipisah. Skenario Indonesia ditandai sebagai proyeksi fasilitas per Juli 2023. Model GPT-4/GPT-4o menampilkan bahwa sumber tidak menyediakan angka sebanding; tidak ada angka model rekaan.

**CarbsCulator:** faktor prototipe proposal halaman 5 adalah 0,1; 0,4; 2,0; dan 4,5 g CO₂e per aktivitas. Faktor belum divalidasi untuk semua layanan AI. Hasil tetap berupa estimasi pembelajaran. Kategori mengikuti proposal, bukan batas aman lingkungan.

**Analogi:** memakai acuan EPA AS dan asumsi LED 9 W, dengan penjelasan CO₂/CO₂e serta sumber pada kartu. Analogi hanya membantu membayangkan skala. Simulasi satu permintaan lebih sedikit memakai faktor proposal yang sama dan bukan bukti pengurangan emisi nyata.

Sumber primer:

- https://arxiv.org/html/2311.16863v3
- https://arxiv.org/html/2304.03271v5#S3.T1
- https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator-calculations-and-references
- `public/assets/documents/tracko2-proposal.pdf`

## Verifikasi dan publikasi

Catatan trial Home: `docs/verification-home-trial-2026-10-25.md`, mencakup 30 tes otomatis, build produksi, dialog, pemindahan input, ID/EN, dan responsif. Pemeriksaan rumus dan animasi sebelumnya ada di `docs/verification-equation-interaction-2026-10-25.md`.

Pemeriksaan profil tim dan penamaan Edukasi dicatat di `docs/verification-home-trial-2026-10-25.md`. Pemilihan anggota membesarkan potret aktif dan mengganti detail selama 620 ms; perangkat mobile memakai baris yang bisa digeser. Arrow Left/Right, Home, dan End juga memilih profil. Reduced motion mematikan animasi.

Perubahan ini belum diterbitkan ke Netlify. Akun, Firebase, dan database pengguna tidak diubah. Video lama tetap lokal, sekitar 48 MB, tanpa autoplay; kompresi dan caption video belum dikerjakan. Rencana data pengguna ada di `docs/user-data-roadmap.md`. Sumber asli tetap berada di `legacy/2026-10-25/` sebagai arsip.
