# TraCkO2

Website edukasi berbahasa Indonesia tentang penggunaan AI dan emisi karbon, dengan kalkulator estimasi emisi dan permainan simulasi lingkungan.

## Snapshot awal

Commit pertama menyimpan situs asli berbasis HTML, CSS, dan JavaScript beserta gambar dan video yang digunakannya. Chart.js dan Firebase dimuat dari CDN.

Saat repositori disiapkan, refaktor struktur dan antarmuka sedang berlangsung dalam pekerjaan terpisah. Perubahan tersebut tetap berada di folder kerja lokal dan belum menjadi bagian dari snapshot awal ini.

## Menjalankan snapshot awal

Dengan Python 3 terpasang, jalankan dari folder proyek:

```sh
python -m http.server 8000
```

Buka <http://localhost:8000>. Koneksi internet diperlukan untuk layanan dan pustaka eksternal.

## Berkas utama pada snapshot awal

| Berkas | Isi |
| --- | --- |
| `index.html` | Halaman utama, materi edukasi, dan kalkulator |
| `game.html` | Permainan simulasi lingkungan |
| `login.html` | Halaman masuk |
| `script.js` | Interaksi halaman utama |
| `firebase.js` | Inisialisasi Firebase di browser |
| `style.css`, `dokumentasi.css` | Tampilan situs |
| `Diagram TraCkO2.csv` | Data diagram |
| `coba` | Berkas HTML prototipe |

## Status snapshot awal

- Pemeriksaan `node --check script.js` menemukan kesalahan sintaks pada baris 153.
- Alur masuk menyimpan kata sandi di `localStorage`; gunakan data percobaan selama pengembangan.
- Hasil kalkulator merupakan estimasi. Dasar angka dan batas interpretasinya masih perlu divalidasi.

Konfigurasi Firebase untuk browser termasuk dalam sumber aplikasi. Berkas kredensial server, pengaturan lokal, dependensi, dan hasil pengujian sementara dikecualikan melalui `.gitignore`.

## Menyimpan perubahan ke GitHub

Setelah mengubah dan memeriksa berkas:

```sh
git status
git add <berkas-yang-diubah>
git commit -m "Jelaskan perubahan"
git push
```
