# Verifikasi pemulihan UI dan animasi

25 Oktober 2026. Menindaklanjuti koreksi pengguna: "dont change all the UI kept our animation before".

## Hasil perubahan

- Palet warna, radius, font, hero globe, header, footer, dan tata letak utama dikembalikan ke gaya sebelumnya.
- `src/components/journey.html`, `src/features/journey.js`, `src/styles/journey.css`, dan `src/styles/welcome.css` identik dengan versi sebelum perubahan portal. `tokens.css` juga dikembalikan.
- Animasi sinematik asli kembali dirender dan didaftarkan sebagai `promptJourney`: pengetikan prompt, pergerakan kamera dan sinyal, server, listrik, serta pengenalan emisi.
- CSS portal yang menimpa seluruh situs dihapus. Gaya tambahan dibatasi pada layanan, grafik, dan isi simulasi baru.
- Ilustrasi komputer sederhana pengganti dihapus dari fragmen edukasi agar tidak menggantikan atau menduplikasi animasi asli.
- Grafik Luccioni dan air, copy edukasi, serta fungsi analogi/saran/simulasi kalkulator tetap dipertahankan. Penamaan bagian tetap jelas.

## Pemeriksaan

- `npm.cmd test`: 22/22 lulus.
- `npm.cmd run build`: lulus.
- `git diff` untuk keempat berkas hero/animasi dan token desain menunjukkan tidak ada perubahan dari versi awal.
- Browser produksi 1440×1000: hero lama tersedia, hero foto portal sudah tidak ada. Empat posisi scroll (0; 0,38; 0,64; 0,94) memperbarui tahap 0→1→2→3 dan transformasi kamera. Tidak ada exception JavaScript.
- Browser 390×844: hero lama dan animasi aktif, tidak ada overflow horizontal, menu dapat dibuka.
- Grafik dapat berganti ke energi dan menampilkan 2,907 kWh pada tugas gambar. Contoh kalkulator masih menghasilkan 13,20 g CO₂e.
- Screenshot hero desktop/ponsel dan tahap server animasi diperiksa secara visual di `.playwright-mcp/restored-*.png`.

Belum ada deploy. Catatan pemeriksaan portal sebelumnya bersifat historis dan bukan gambaran tampilan saat ini.

## Tindak lanjut delapan komentar browser

- Menghapus label kecil hero, daftar Karbon/Air/Energi di bawah globe, tautan Langsung hitung di bagian animasi, catatan panjang Indonesia, paragraf pengantar kalkulator beranda, serta catatan tambahan pada panel hasil.
- Label grafik air menjadi "Perbandingan konsumsi air GPT-3 menurut lokasi" dan ikut diterjemahkan. Label Indonesia memakai keterangan ringkas "(proyeksi)" agar tidak menyisakan tanda bintang tanpa catatan.
- Tombol tahapan kini transparan dan membulat, dengan sorotan mint lembut pada tahap aktif. Garis yang melintas di belakang label dihilangkan.
- Saat memeriksa tombol, ditemukan penentuan posisi scroll memakai `$el` dari tombol yang diklik. Navigasi kini mengambil elemen bagian animasi melalui `scene.closest('.prompt-journey')`; klik menuju empat tahap berhasil. Timeline dan pergerakan kamera dipertahankan.
- Browser 967×742 dan 390×844: elemen yang diminta sudah hilang, grafik ID/EN sesuai, contoh kalkulator 13,20 g, tidak ada overflow horizontal atau exception JavaScript. Screenshot akhir tombol diperiksa di `.playwright-mcp/comments-animation-final.png`.
- 22/22 tes otomatis, build produksi, dan pemeriksaan diff lulus.
