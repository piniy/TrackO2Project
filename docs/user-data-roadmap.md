# Batas arsitektur: materi publik dan database pengguna

Pembaruan online 31 Oktober 2026: akun, pairing, snapshot metadata dan ekspor akun diimplementasikan dengan PostgreSQL/Supabase Edge Function. Routing Vercel berada di vercel.json. Riwayat akun dapat dibaca dari web dan tab Account Android 0.4.0; tinjauan/koreksi tetap pada ponsel asal. Materi, kalkulator dan game publik tidak memerlukan akun. Bagian lama di bawah merupakan catatan arah awal; lihat README untuk implementasi terkini.

Status: arah pengembangan yang dikonfirmasi pengguna pada 25 Oktober 2026. Database pengguna direncanakan untuk tahap berikutnya; dokumen ini tidak menyatakan bahwa layanan tersebut sudah tersedia.

## Dua tanggung jawab yang berbeda

| Bagian | Lokasi dan tanggung jawab |
| --- | --- |
| Materi publik | `src/content/` dan `public/assets/`: materi edukasi, ringkasan sumber, parameter kalkulator, skenario game, video, dan dokumen. Dibangun menjadi situs statis dan tetap dapat dibaca tanpa akun. |
| Data pengguna | Database pada tahap berikutnya: data yang dimiliki pengguna dan membutuhkan akun, penyimpanan, serta pengambilan kembali. Tidak dimasukkan ke HTML publik atau modul materi. |

Pustaka "Referensi & Data" adalah antarmuka untuk sumber pembelajaran publik. Pustaka ini tidak menggantikan database akun pengguna yang direncanakan.

## Bentuk perluasan yang disiapkan

Pertahankan HTML dan pengendali fitur sebagai lapisan antarmuka. Ketika fitur akun dibangun, tambahkan modul layanan di `src/services/` untuk autentikasi dan operasi data pengguna. Modul tersebut menjadi batas antara fitur UI dan penyedia backend; materi publik tidak mengambil data melalui layanan akun.

Fungsi `estimate(counts)` di `src/features/calculation.js` tetap berisi logika perhitungan saja. Layanan penyimpanan dapat menerima hasilnya tanpa mengubah perhitungan atau memindahkan materi ke database.

Kandidat cakupan awal database, untuk dirinci saat tahap akun dimulai:

- Profil pengguna dan preferensi.
- Riwayat perhitungan yang sengaja disimpan pengguna.
- Progres materi atau hasil game, bila fitur penyimpanan progres dipilih.

Untuk setiap rekaman perhitungan, rencanakan penyimpanan jumlah aktivitas, total dan satuan, waktu pencatatan, versi parameter, serta salinan faktor yang digunakan. `factorVersion` sudah tersedia di `src/content/activities.js`; hasil lama harus tetap dapat dijelaskan saat faktor berubah.

Identitas pemilik data berasal dari autentikasi yang diverifikasi layanan. Pengambilan dan perubahan data harus mengikuti kepemilikan pengguna. Jangan menghidupkan kembali formulir login lokal lama sebagai autentikasi database.

## Dampak pada pengalaman pengguna

Pengunjung tetap dapat membaca materi, mencoba kalkulator, menonton video, dan memainkan game tanpa akun. Tahap akun dapat menambahkan tindakan seperti "Simpan hasil" serta halaman profil/riwayat sesuai kebutuhan yang disepakati. Hasil hanya ditandai tersimpan setelah layanan mengonfirmasi penyimpanan; kegagalan menyimpan tetap mempertahankan hasil di layar.

## Status implementasi

- Sudah ada: struktur konten publik, komponen UI bersama, pengendali fitur terpisah, fungsi kalkulasi mandiri, dan versi faktor.
- Belum ada: layanan akun, koneksi database pengguna, skema produksi, aturan akses, sinkronisasi, atau riwayat tersimpan.
- Penyedia backend belum diputuskan pada tahap ini. Integrasi Firebase lama tersedia sebagai referensi arsip, bukan koneksi aktif pada situs baru.

Tahap berikutnya adalah merinci kebutuhan akun dan data yang benar-benar perlu disimpan, kemudian mengimplementasikan autentikasi, layanan data, dan UI penyimpanan beserta pemeriksaan akses serta kegagalannya.
