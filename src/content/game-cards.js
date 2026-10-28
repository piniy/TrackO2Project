// Educational scenarios. Scores express learning progress, not measured emissions.
export const gameCards = [
  { title: 'Tugas merangkum bacaan', question: 'Kamu punya artikel dan ingin memahami gagasan utamanya. Apa langkah awal yang paling membantu?', topic: 'Kebiasaan belajar', options: [
    { text: 'Baca sekilas, tandai bagian sulit, lalu ajukan pertanyaan yang spesifik.', correct: true, feedback: 'Tujuan dan konteks yang jelas membantu kamu menilai jawaban AI dan tetap terlibat dalam proses belajar. Jelaskan kembali gagasannya dan periksa sumber sebelum memakai jawaban.' },
    { text: 'Minta AI membuat ulang rangkuman berkali-kali tanpa membaca hasilnya.', correct: false, feedback: 'Membaca hasil dan memperjelas kebutuhan lebih berguna daripada mengulang permintaan tanpa arah.' }
  ] },
  { title: 'Poster kegiatan sekolah', question: 'Kamu sudah memiliki foto kegiatan yang sesuai. Apa pilihan yang masuk akal untuk membuat poster?', topic: 'Pilihan alat', options: [
    { text: 'Buat banyak gambar AI baru meskipun foto yang ada sudah sesuai.', correct: false, feedback: 'Generasi gambar memerlukan komputasi. Pertimbangkan dulu apakah materi yang ada sudah memenuhi tujuan.' },
    { text: 'Gunakan foto yang ada dan fokus memperjelas pesan posternya.', correct: true, feedback: 'Gunakan materi yang sesuai tujuan dan pastikan izin penggunaannya. Ini pilihan yang bisa dijelaskan, tanpa menganggap penghematan emisinya sudah terukur.' }
  ] },
  { title: 'Sebuah klaim tentang air', question: 'Temanmu memakai skenario air GPT-3 dari sebuah paper untuk semua layanan AI. Apa yang perlu diperiksa?', topic: 'Jejak air', options: [
    { text: 'Periksa sumbernya, lokasi pusat data, dan apa yang dimaksud dengan penggunaan air.', correct: true, feedback: 'Tepat. Periksa model, tahun, panjang permintaan, lokasi, dan jalur air yang dihitung. Konsumsi air berbeda dari pengambilan air; koefisien hanya berlaku dalam skenario sumbernya.' },
    { text: 'Langsung gunakan angka itu untuk semua model dan lokasi.', correct: false, feedback: 'Satu angka tidak otomatis berlaku untuk semua kondisi. Periksa metode dan batasan penelitian terlebih dahulu.' }
  ] },
  { title: 'Membaca hasil CarbsCulator', question: 'Kalkulator menampilkan 4,5 g CO₂e untuk satu gambar. Apa arti hasil ini?', topic: 'Literasi data', options: [
    { text: 'Pengukuran pasti dari server AI yang baru saja aku gunakan.', correct: false, feedback: 'Kalkulator tidak terhubung ke pengukuran server. Angkanya berasal dari parameter prototipe dalam proposal.' },
    { text: 'Estimasi berdasarkan parameter prototipe, dengan asumsi yang perlu dibaca.', correct: true, feedback: 'Betul. Faktor 4,5 berasal dari proposal TraCkO2 dan kategori penggunaannya adalah kategori simulasi. Hasil tidak membuktikan emisi pasti layanan atau penghematan nyata.' }
  ] },
  { title: 'Angka energi yang besar', question: 'Kamu membaca laporan konsumsi listrik seluruh pusat data. Apakah angka itu sama dengan konsumsi listrik AI saja?', topic: 'Energi', options: [
    { text: 'Tidak. Pusat data menjalankan berbagai layanan, jadi cakupan datanya perlu diperiksa.', correct: true, feedback: 'Tepat. Periksa cakupan layanan, tahun, satuan, dan apakah angka berupa pengukuran atau proyeksi. Data seluruh pusat data tidak dapat langsung dinyatakan sebagai AI saja.' },
    { text: 'Ya. Semua kegiatan pusat data pasti merupakan AI.', correct: false, feedback: 'Pusat data juga melayani penyimpanan, jaringan, dan layanan digital lain. Jangan menyamakan cakupannya.' }
  ] }
];
export function assessChoice(card, index) {
  const option = card.options[index];
  if (!option) throw new RangeError('Pilihan tidak tersedia.');
  return { correct: option.correct, feedback: option.feedback };
}
