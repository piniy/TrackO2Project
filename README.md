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

## Akun dan koneksi Android

Akun online memakai PostgreSQL dan Edge Function Supabase pada proyek TraCkO2 (jvvfskotiwgzgovxsvpb). Vercel meneruskan /auth/* dan /v1/* melalui vercel.json. Kredensial server tetap di Edge Function, tidak disertakan pada website atau APK.

Buka https://track-o2-project.vercel.app/login.html, buat akun, lalu buka Dashboard dan buat kode koneksi. Di aplikasi Android 0.4.0, buka Settings → Connect an account dan masukkan kode tersebut; alamat cloud sudah terisi. USB atau komputer yang terus menyala tidak diperlukan.

Dashboard web dan tab Account Android menampilkan data akun yang sama dari semua ponsel terhubung. Keduanya menyediakan halaman riwayat dan ekspor seluruh metadata. Riwayat lokal Android tetap terpisah agar data ponsel lain tidak diunggah ulang. Tinjauan/koreksi dilakukan pada ponsel asal, lalu diunggah otomatis. Pemutusan ponsel dari web menghapus unggahannya dan mencabut aksesnya.

Cookie sesi cloud bersifat HttpOnly, Secure, SameSite=Lax dan berlaku 30 hari. Dashboard web serta tab Account Android memperbarui data setiap lima detik saat terlihat. Android mengunggah setelah perubahan dan saat aplikasi dibuka, dengan JobScheduler untuk percobaan ulang. Koneksi terputus mempertahankan catatan lokal dan halaman akun yang terakhir diunduh. Android dapat menunda pekerjaan latar belakang; sinkronisasi memerlukan internet.

Backend SQLite pada ../TrackO2Android/backend/ tetap tersedia untuk pengembangan lokal. Vite meneruskan API ke port 8787 secara default. Untuk memakai cloud saat menjalankan Vite, gunakan TRACKO2_API_TARGET=https://jvvfskotiwgzgovxsvpb.supabase.co/functions/v1/tracko2. Akun lokal tidak dipindahkan otomatis ke cloud: buat akun online dan pasangkan ponsel untuk mengunggah riwayatnya.

Implementasi ini dibuat tanpa menjalankan tes, QA atau verifikasi atas permintaan pengguna. Build APK dan build deployment hanya untuk menghasilkan artefak yang dapat dipasang/dipublikasikan.

## Halaman

| Rute | Isi |
| --- | --- |
| `index.html` | Hero foto, empat layanan, animasi scroll, grafik edukasi, trial kalkulator, Games, dan tim |
| `edukasi.html` | Edukasi: grafik Luccioni, diagram air, materi dengan pencarian dan filter |
| `kalkulator.html` | CarbsCulator, rincian, analogi, saran, simulasi, rumus LaTeX interaktif dan metode |
| `game.html` | Tiga game solo × lima ronde: perbandingan energi, pilihan tugas dan estimasi air; konfirmasi, hasil, review, replay, ID/EN |
| `referensi.html` | Referensi dan Metode: sumber bacaan dan tabel faktor proposal |
| `android.html` | Unduhan APK Android, deteksi aktivitas otomatis, sinkronisasi akun, dan FAQ; ID/EN |

APK online: `public/downloads/tracko2-online-0.4.0-debug.apk`, disalin dari build Android 0.4.0 (kode 5). Minimum Android 8.0/API 26. Build debug untuk pengembangan. Build Vite menyertakannya di `dist/downloads/`.

## Mengubah sumber

- Header dan footer: `src/components/`.
- Favicon dan gambar preview tautan: `public/favicon.png`, `public/favicon.ico`, `public/apple-touch-icon.png`, dan `public/assets/images/brand/tracko2-share.png`. Metadata Open Graph/Twitter dan origin publik berada di `src/build/site-metadata.js`; setiap route memakai judul, deskripsi, dan canonical URL masing-masing. Aset perlu ikut deployment agar preview tautan publik berubah.
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
