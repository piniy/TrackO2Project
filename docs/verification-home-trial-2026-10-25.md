# Trial CarbsCulator di Home

Pemeriksaan lokal pada 25 Oktober 2026 menggunakan build produksi di `http://127.0.0.1:4173/`. Perubahan belum diterbitkan ke Netlify.

## Perilaku

- Home memakai form trial tanpa panel hasil. Isian kosong menampilkan pesan validasi dan tidak membuka dialog.
- **Isi contoh** mengisi 10 tanya singkat, 3 ringkasan, 1 teks panjang, dan 2 gambar. Dialog baru muncul setelah **Hitung estimasi** ditekan.
- Dialog native memiliki judul/deskripsi, fokus awal pada **Lihat hasil**, serta penutupan melalui Escape, klik latar, ikon tutup, atau **Ubah input**. Fokus kembali ke tombol hitung; nilai input tetap ada.
- **Lihat hasil** membuka halaman kalkulator lengkap dengan keempat jumlah aktivitas di URL. Hasil dihitung ulang pada halaman tujuan. Contoh menghasilkan 13,20 g CO₂e tanpa pengisian ulang atau tombol hitung kedua.
- Halaman tujuan memfokuskan panel `#hasil` dan tetap memuat animasi rumus, rincian, analogi, serta saran.
- Pengalihan membawa jumlah, tanpa menerima total atau alamat tujuan dari URL. Tidak membutuhkan akun atau penyimpanan input di browser.

## Validasi

- `npm.cmd test`: 30 tes lulus. Empat tes baru mencakup round trip input, contoh 13,2 g, batas maksimum, input kosong/tidak sah, parameter hilang/ganda, serta parameter total/redirect yang diabaikan.
- `npm.cmd run build`: berhasil.
- Browser desktop 1324 × 742: dialog, validasi kosong, contoh, Escape, edit, latar, fokus, serta navigasi berhasil. Home tidak memiliki `.result-panel`.
- Browser 390 × 844: dialog muat tanpa luapan horizontal; ID/EN dan pilihan bahasa bertahan setelah navigasi. Semua input dan total 13,20 g terbawa. Panel hasil terlihat di bawah header.
- Browser 844 × 390: seluruh isi dialog muat; tidak ada luapan horizontal.
- Browser input tidak sah (`chat=-1`): form tujuan tetap nol tanpa hasil otomatis.
- Browser seluruh kategori 10.000: 40.000 aktivitas menghasilkan 70.000 g CO₂e sesuai perhitungan.
- Konsol browser pada alur yang diperiksa: tanpa error atau warning.

Screenshot lokal berada di `.playwright-mcp/home-trial-dialog-desktop.png`, `home-trial-dialog-mobile.png`, dan `home-trial-result-mobile.png`.

## Profil tim dan penamaan

Navigasi, layanan Home, judul bagian, dan judul halaman kini memakai Edukasi. Banner pengantar CarbsCulator dan paragraf grafik yang ditandai pengguna telah dihapus; tautan sumber tetap tersedia.

About Team memakai enam profil. Muhammad Hisyam Adz Dzaki mempertahankan foto yang ada, sedangkan lima anggota lain memakai placeholder. Job desk dan kutipan menggunakan Lorem ipsum. Profil aktif membesar dan mengangkat kartunya selama 620 ms, sementara profil sebelumnya kembali mengecil; nama, job desk, dan kutipan ikut berganti. Di HP baris profil dapat digeser.

Pemeriksaan sebelum koreksi tampilan terakhir: pemilihan klik dan keyboard, pergantian ID/EN, reduced motion, serta ukuran 1324 × 742, 390 × 844, dan 320 × 740 berfungsi tanpa luapan horizontal. Animasi terukur berubah dari lebar sekitar 153 px menuju 366 px pada desktop. Screenshot saat itu: `.playwright-mcp/team-desktop-hisyam.png`, `team-desktop-selected.png`, dan `team-mobile-selected.png`.

Koreksi terakhir sesuai arahan pengguna: judul About Team ditengahkan dan foto memakai `object-fit: contain` agar terlihat utuh tanpa crop. Tidak dilakukan audit atau pemeriksaan browser tambahan setelah koreksi tersebut; hanya build untuk memperbarui pratinjau lokal.
