> Superseded for current UI: the user requested preserving the original interface and scroll animation. See `verification-restored-ui-2026-10-25.md` for the restored version. The notes below describe the earlier portal redesign.

# Verifikasi portal edukasi TraCkO2

Tanggal: 25 Oktober 2026. Lingkup: perubahan lokal pada proyek Vite; pratinjau produksi `http://127.0.0.1:4173/`. Tidak ada deploy atau perubahan Firebase/database.

## Perubahan yang diperiksa

- Beranda memakai foto `data center.webp` yang diberikan pengguna dan logo proyek asli. Susunan: Home, Layanan, Tahukah Kamu?, CarbsCulator, Games, About Team.
- Header/footer dan penamaan halaman konsisten. Slogan tambahan, globe SVG, serta cerita pembuka SVG lama tidak lagi dirender. Ikon berasal dari Lucide resmi dan disimpan lokal bersama lisensinya.
- Tahukah Kamu? memiliki penjelasan proses AI dengan tahapan yang dapat dipilih, grafik energi/karbon Luccioni, dan grafik konsumsi air GPT-3 dengan lokasi serta jumlah permintaan.
- CarbsCulator mempertahankan faktor proposal, menampilkan rincian dan analogi, serta menyajikan saran dengan alasan dan simulasi satu permintaan lebih sedikit.
- Teks baru tercakup dalam ID/EN; judul halaman, deskripsi, label, dan angka mengikuti bahasa.

## Sumber dan interpretasi

Grafik Luccioni mengambil enam rata-rata dari [Tabel 2](https://arxiv.org/html/2311.16863v3), kWh per 1.000 inferensi. Grafik karbon menghitung energi × 297,6 g CO₂e/kWh berdasarkan intensitas listrik lokasi studi. Nilai ditandai sebagai hasil konversi, bukan pembacaan langsung grafik emisi atau faktor per prompt ChatGPT. Skala logaritmik tertulis pada grafik.

Diagram air mengambil [Li dkk., revisi 2025, Tabel 1 dan bagian 3.3.2](https://arxiv.org/html/2304.03271v5#S3.T1). Angka adalah skenario GPT-3 175B dengan asumsi 0,004 kWh/permintaan, masukan sekitar ≤800 kata dan keluaran 150–300 kata. Konsumsi pendinginan langsung dan penyediaan listrik dipisah. Indonesia ditandai sebagai proyeksi fasilitas per Juli 2023. Memilih GPT-4 atau GPT-4o menampilkan penjelasan bahwa sumber tidak menyediakan angka sebanding; tidak ada angka model yang direka.

Faktor kalkulator tetap mengikuti proposal halaman 5: 0,1; 0,4; 2,0; 4,5 g CO₂e per aktivitas. Data grafik penelitian tidak dicampur menjadi faktor proposal. Analogi mempertahankan [acuan EPA](https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator-calculations-and-references), konteks AS, asumsi LED 9 W, dan penjelasan perbedaan CO₂/CO₂e. Simulasi tidak menyatakan pengurangan emisi nyata.

## Hasil pemeriksaan otomatis

- `npm.cmd test`: **22/22 lulus**. Cakupan meliputi parameter dan validasi kalkulator, sumber diagram, bilingual, skenario Games, analogi, pemilihan saran, dan simulasi. Empat tes lama terkait cerita SVG yang sudah tidak dirender tetap dipertahankan; kelulusan tes tersebut tidak dianggap verifikasi UI baru.
- `npm.cmd run build`: **lulus**, enam halaman produksi dihasilkan.
- `git diff --check`: **lulus** setelah merapikan satu baris kosong tambahan di akhir halaman kalkulator.

## Pemeriksaan browser produksi

Matriks **36 kombinasi**: enam halaman (`index`, `edukasi`, `kalkulator`, `game`, `referensi`, `kampanye`) × dua bahasa × tiga viewport: 1440×1000, 390×844, dan 844×390.

- Semua halaman memiliki satu H1 dengan nama yang sesuai, judul halaman diterjemahkan, tidak ada overflow horizontal, tidak ada gambar non-lazy yang rusak, dan tidak ada SVG inline yang dirender.
- Tidak ada exception JavaScript pada matriks tersebut. Pemeriksaan konsol sesi terakhir juga menunjukkan nol error.
- Pemeriksaan tambahan pada lebar 320 px: menu ponsel dapat dibuka, tautan Layanan menuju `#layanan`, menu tertutup setelah dipilih, dan tidak ada overflow horizontal.
- Semua foto tim berhasil dimuat dan di-decode. Screenshot beranda, grafik, kartu hasil, tampilan ponsel, dan tim diperiksa secara visual.
- Grafik Luccioni: perpindahan energi/karbon dan pemilihan ringkasan memperbarui detail; ringkasan 0,049 kWh/1.000 inferensi.
- Diagram air: model tanpa data menampilkan pesan yang benar. Pada skenario Indonesia dan 100 permintaan, detail menampilkan total sekitar 1,96 L dengan pembagian 760 mL langsung dan sekitar 1,20 L penyediaan listrik.
- Contoh kalkulator: hasil 13,20 g CO₂e; menghapus satu permintaan gambar dalam simulasi menghasilkan 8,70 g, selisih 4,5 g atau 34,1%.
- Input maksimum 10.000 pada tiap kategori: total 70.000,00 g; simulasi 69.995,50 g, selisih 0,006%. Pada 375×812, tidak ada overflow dan tinggi kartu meningkat mengikuti isi (937 px wadah untuk 936 px kartu).
- Bahasa dapat diganti tanpa kehilangan hasil maksimum; format menjadi `70,000.00` pada EN. Reset kembali ke nol.
- Games: kelima situasi dapat diselesaikan, hasil muncul (3/5 ketika selalu memilih opsi pertama), dan Main lagi mengembalikan situasi pertama.
- Preferensi reduced motion: contoh prompt langsung menuju penjelasan akhir tanpa pemutaran animasi.
- JavaScript nonaktif: judul edukasi, navigasi, dan tabel fallback dengan enam tugas tetap tersedia.

Screenshot lokal tersimpan di `.playwright-mcp/portal-*.png` (folder diabaikan Git). Dokumentasi asal aset ada di `docs/asset-sources.md`.

## Batas verifikasi

Ini verifikasi lokal, bukan pemeriksaan situs Netlify yang sudah diperbarui. Tidak ada pengujian dampak belajar atau pengurangan emisi nyata. Kebutuhan air per model ChatGPT terbaru tidak dapat disimpulkan dari studi GPT-3. Video lama sekitar 48 MB tetap tanpa autoplay; kompresi dan caption belum menjadi bagian pekerjaan ini. Navigasi keyboard dasar dan pengurangan gerakan diperiksa, tetapi ini bukan audit aksesibilitas dengan pembaca layar.
