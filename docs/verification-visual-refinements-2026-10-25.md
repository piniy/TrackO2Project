# Verifikasi penyempurnaan visual dan rumus interaktif

25 Oktober 2026. Tindak lanjut tujuh komentar browser. Tidak ada deploy.

## Perubahan

- Tautan kecil "Mulai dari satu prompt" di bawah hero dihapus.
- Hero memakai foto pusat data yang diberikan pengguna, dalam layout dua kolom yang sama. Foto dipilih untuk menjelaskan infrastruktur yang dibahas; caption menghubungkannya dengan listrik dan pendinginan, tanpa menyatakan uap pada foto sebagai emisi CO₂.
- Ilustrasi listrik mendapat halo, cahaya bergerak pada orbit, dan sorotan pada simbol petir. Ilustrasi emisi mendapat gerakan awan, lapisan cahaya lembut, serta partikel yang bergerak. Efek memakai elemen ilustrasi yang ada dan tidak mengubah timeline/kamera. Awan tetap simbol edukasi, bukan gambaran CO₂ yang terlihat secara fisik.
- Kartu detail Luccioni mengganti baris angka berulang dengan contoh tugas dan analogi. Mode karbon memakai perbandingan pengisian HP dari acuan EPA yang sudah digunakan kalkulator. Mode energi membandingkan durasi LED 9 W. Asumsi/sumber tersedia dalam detail yang dapat dibuka.
- Breadcrumb di kelima halaman dalam dihapus; header dan penamaan halaman dipertahankan.
- Rumus pada halaman kalkulator dirender memakai KaTeX lokal, dengan HTML dan MathML. Pengunjung dapat mengubah empat jumlah aktivitas, menyorot suku terpilih, membaca uraian numerik dan kontribusinya. Faktor serta fungsi perhitungan sama dengan kalkulator. Contoh rumus memiliki kontrol sendiri dan tidak mengubah hasil kalkulator utama.
- KaTeX JavaScript dimuat hanya ketika komponen rumus dirender; tidak ada CDN atau penyimpanan data tambahan.

## Hasil pemeriksaan

- `npm.cmd test`: **25/25 lulus**, termasuk analogi diagram, rumus yang dapat dirender menjadi MathML, input tidak valid, parameter proposal, dan bilingual.
- `npm.cmd run build`: **lulus**.
- `git diff --check`: **lulus**.
- Browser 1324×900: foto berhasil dimuat, globe dan tautan kecil sudah tidak ada. Tahap listrik menjalankan `electricity-flow`/`electricity-glow`; tahap emisi menjalankan `emission-billow`/`emission-drift`. Tidak ada exception JavaScript pada alur interaksi utama.
- Memilih tugas memberi keterangan gambar menampilkan 18,749 g CO₂e per 1.000 inferensi, contoh tugas, dan analogi sekitar 1,5 pengisian HP. Mengganti metrik menghasilkan analogi LED 9 W selama 7,0 jam dari 0,063 kWh. Angka dan lingkup dijelaskan dalam asumsi, bukan faktor universal layanan AI.
- Rumus contoh awal menghasilkan 13,20 g. Mengubah jumlah gambar dari 2 menjadi 1 menghasilkan 8,70 g. Input −1 menampilkan pesan kesalahan; mengembalikan contoh lalu mengganti bahasa menghasilkan 13.20 dalam EN. Sorotan kontribusi ikut berubah.
- Matriks **24 kombinasi**: enam halaman × viewport 1324×742, 967×742, 390×844, 844×390. Semua halaman memiliki nol breadcrumb dan tidak ada overflow horizontal. Rumus diuji sampai 10.000 aktivitas setiap kategori (total 70.000 g) pada setiap viewport.
- Reduced motion: mode sinematik dimatikan dan keempat efek listrik/awan yang diperiksa menunjukkan `animation-name: none`.
- Resource browser pada beranda menunjukkan nol unduhan JavaScript KaTeX.
- Screenshot hero, listrik, emisi, dan rumus diperiksa secara visual. Berkas pemeriksaan berada di `.playwright-mcp/refinements-*.png` dan diabaikan Git.

Lingkup tetap verifikasi lokal. Tidak ada klaim perubahan emisi nyata atau pengujian hasil belajar.
