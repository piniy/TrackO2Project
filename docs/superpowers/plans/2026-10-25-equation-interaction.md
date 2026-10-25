# Interaksi langsung pada rumus dan animasi halaman

## Batas perubahan

Pertahankan tampilan utama dan cerita scroll yang sudah disetujui. Hapus seluruh paragraf dan panel metode yang ditandai pengguna. Bagian Metode perhitungan menjadi satu area rumus; kontrol input tetap di CarbsCulator utama.

## Pembagian implementasi

1. Ubah komponen formula menjadi simbol LaTeX yang bisa diinspeksi melalui klik, sentuh, atau keyboard. Penjelasan muncul dinamis; keadaan awal hanya rumus dan kontrol putar yang ringkas.
2. Gunakan nilai dan faktor dari fungsi estimate yang sama untuk animasi substitusi, hasil perkalian tiap kategori, dan penjumlahan total. Terima snapshot input yang sudah divalidasi dari event tracko2:calculate. Reset dan penggantian hitungan membatalkan animasi sebelumnya.
3. Gunakan komponen yang sama dalam mode ringkas pada kartu rincian hasil agar proses hitung pengguna juga terlihat. Metode dapat memakai contoh sebelum pengguna menghitung dan beralih ke hasil aktual setelah perhitungan.
4. Tambahkan animasi masuk dan respons interaksi secukupnya melalui Web Animations dan CSS. Konten selalu terlihat secara default; preferensi reduced motion membatalkan animasi. Hindari transform pada induk area sticky.
5. Verifikasi inspeksi simbol, keyboard, setiap tahap perhitungan, data terbaru saat hitungan cepat diulang, pembatalan/reset, ID/EN, input maksimum, reduced motion, responsif, dan build.
