# Verifikasi interaksi langsung pada persamaan

25 Oktober 2026. Menindaklanjuti koreksi pengguna mengenai persamaan interaktif dan animasi situs. Tidak ada deploy.

## Hasil

- Bagian Metode perhitungan memakai seluruh lebar konten untuk persamaan. Paragraf penjelasan awal, daftar faktor yang berulang, instruksi form, catatan contoh, serta panel batasan di kanan dihapus dari bagian tersebut.
- Keadaan awal hanya menampilkan persamaan LaTeX dengan simbol E, Σ, nᵢ, fᵢ yang menjadi tombol native, serta kontrol putar kecil. Tidak ada formulir input kedua atau legenda statis.
- Klik, fokus keyboard, atau sentuh simbol membuka penjelasan terkait melalui transisi. Escape menutup penjelasan. Nilai dan label mengikuti bahasa.
- Pemutaran berjalan melalui substitusi jumlah dan faktor, perkalian tiap aktivitas, penjumlahan kontribusi, dan total. Semua frame memakai fungsi estimate dan faktor yang sama dengan kalkulator.
- Kalkulator mengirim snapshot input tervalidasi melalui event lokal. Komponen ringkas pada kartu Rincian dan komponen metode memakai snapshot yang sama. Pemutaran offscreen menunggu hingga terlihat; perhitungan baru membatalkan proses lama. Reset mengembalikan rumus simbolik.
- Animasi masuk diterapkan pada hero, kartu layanan, diagram, judul halaman, materi, referensi, game, dan bagian tim. Konten terlihat secara default. Area sticky kalkulator dan cerita sinematik tidak diberi transform induk.

## Verifikasi

- `npm.cmd test`: **26/26 lulus**, termasuk frame angka pada nilai nol, contoh, dan input maksimum serta keluaran MathML.
- `npm.cmd run build`: **lulus**.
- `git diff --check`: **lulus**.
- Browser 1324×742: metode memiliki lebar 1.200 px, nol input tambahan, dan penjelasan simbol tersembunyi sebelum dipilih. Simbol faktor menampilkan empat faktor; simbol jumlah dapat diinspeksi melalui fokus keyboard, dan Escape menutupnya.
- Pemutaran menampilkan satu perkalian aktif dalam fase products, kemudian total contoh 13,20 g CO₂e. Contoh kalkulator utama dan persamaan ringkas menghasilkan total yang sama.
- Perhitungan berikutnya dengan satu gambar menghasilkan **8,70 g CO₂e**, sehingga nilai lama tidak tertinggal. Reset mengembalikan total utama nol dan metode symbolic.
- Bahasa EN memperbarui label penjelasan dan format total menjadi 13.20.
- Reduced motion langsung menampilkan fase total tanpa pemutaran bertahap, tanpa perkalian aktif.
- Efek masuk kartu layanan teramati sebagai Web Animation berdurasi 520 ms dari translateY(16px) ke normal. Tanpa JavaScript, judul beranda tetap terlihat.
- Viewport 1324×742, 967×742, 390×844, dan 844×390 diuji dengan 10.000 aktivitas tiap kategori. Ketika formula ringkas pertama kali menyebabkan lebar minimum grid membesar pada ponsel, batas `min-width: 0` ditambahkan pada item grid kalkulator. Pemeriksaan ulang 390 dan 844 px menunjukkan tidak ada overflow pada fase produk, baik di kartu hasil maupun metode.
- Tidak ada exception JavaScript pada alur utama. Screenshot keadaan awal, inspeksi, perkalian, hasil, serta ponsel diperiksa secara visual di `.playwright-mcp/equation-*.png`.

Lingkup verifikasi adalah implementasi dan perhitungan lokal, bukan hasil belajar, dampak emisi nyata, atau audit aksesibilitas dengan pembaca layar.

## Penguatan animasi dan penghapusan teks lanjutan

- Banner estimasi, deskripsi di bawah judul CarbsCulator, dan paragraf batas jumlah input dihapus sesuai tiga komentar terbaru. Referensi aria-describedby menuju paragraf yang dihapus juga dihapus; batas min/max/step dan validasi tetap bekerja.
- Animasi masuk diperkuat: form 950 ms dari translateY(42px) dan scale(.975); baris aktivitas 820 ms dengan jeda 150/255/360/465 ms. Panel hasil memakai pembukaan clip-path 950 ms agar posisi sticky tidak berubah.
- Bar grafik dan rincian hasil tumbuh selama 950 ms. Kartu dan tombol memiliki respons hover/klik yang lebih jelas. Bagian dapat mengulang entrance setelah berada jauh di luar viewport.
- Angka hasil terlihat menghitung naik selama 1.000 ms disertai gerakan dan sorotan. Nilai result.total tetap akurat sejak awal; teks pembaca layar memakai angka tepat, terpisah dari angka animasi.
- Sampling browser dalam tab aktif memperlihatkan nilai visual 4,60 pada sekitar 166 ms, 8,66 pada 333 ms, 12,55 pada 666 ms, dan 13,20 setelah selesai, sementara nilai sebenarnya tetap 13,20 sepanjang proses.
- Perhitungan ulang selesai pada 8,70; reset mengembalikan nol. Dengan reduced motion, nilai langsung 13,20 dan tidak ada animasi pada angkanya.
- Desktop 1324×742, ponsel 390×844, dan landscape 844×390 diperiksa. Tidak ada overflow horizontal. Ketiga target teks dan referensi bantuan input sudah tidak ada dalam DOM. Screenshot tampilan akhirnya diperiksa di `.playwright-mcp/strong-motion-calculator-*.png`.
- 26 tes otomatis dan build produksi lulus; pemeriksaan diff bersih.
