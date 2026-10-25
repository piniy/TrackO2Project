// Educational scenarios. Scores express learning progress, not measured emissions.
export const gameCards = [
  { title: 'Tugas merangkum bacaan', question: 'Kamu punya artikel dan ingin memahami gagasan utamanya. Apa langkah awal yang paling membantu?', topic: 'Kebiasaan belajar', options: [
    { text: 'Baca sekilas, tandai bagian sulit, lalu ajukan pertanyaan yang spesifik.', correct: true, feedback: 'Tujuan dan konteks yang jelas membantu kamu menilai jawaban AI dan tetap terlibat dalam proses belajar.' },
    { text: 'Minta AI membuat ulang rangkuman berkali-kali tanpa membaca hasilnya.', correct: false, feedback: 'Membaca hasil dan memperjelas kebutuhan lebih berguna daripada mengulang permintaan tanpa arah.' }
  ] },
  { title: 'Poster kegiatan sekolah', question: 'Kamu sudah memiliki foto kegiatan yang sesuai. Apa pilihan yang masuk akal untuk membuat poster?', topic: 'Pilihan alat', options: [
    { text: 'Buat banyak gambar AI baru meskipun foto yang ada sudah sesuai.', correct: false, feedback: 'Generasi gambar memerlukan komputasi. Pertimbangkan dulu apakah materi yang ada sudah memenuhi tujuan.' },
    { text: 'Gunakan foto yang ada dan fokus memperjelas pesan posternya.', correct: true, feedback: 'Memilih alat dan materi sesuai kebutuhan adalah kebiasaan yang bisa kamu terapkan, tanpa menganggap dampaknya sudah terukur.' }
  ] },
  { title: 'Sebuah klaim tentang air', question: 'Temanmu bilang setiap prompt AI selalu menghabiskan jumlah air yang sama. Bagaimana kamu menanggapinya?', topic: 'Jejak air', options: [
    { text: 'Periksa sumbernya, lokasi pusat data, dan apa yang dimaksud dengan penggunaan air.', correct: true, feedback: 'Tepat. Jejak air bergantung pada konteks. Konsumsi air dan pengambilan air juga perlu dibedakan.' },
    { text: 'Langsung gunakan angka itu untuk semua model dan lokasi.', correct: false, feedback: 'Satu angka tidak otomatis berlaku untuk semua kondisi. Periksa metode dan batasan penelitian terlebih dahulu.' }
  ] },
  { title: 'Membaca hasil CarbsCulator', question: 'Kalkulator menampilkan 4,5 g CO₂e untuk satu gambar. Apa arti hasil ini?', topic: 'Literasi data', options: [
    { text: 'Pengukuran pasti dari server AI yang baru saja aku gunakan.', correct: false, feedback: 'Kalkulator tidak terhubung ke pengukuran server. Angkanya berasal dari parameter prototipe dalam proposal.' },
    { text: 'Estimasi berdasarkan parameter prototipe, dengan asumsi yang perlu dibaca.', correct: true, feedback: 'Betul. Estimasi membantu eksplorasi; hasilnya tidak membuktikan emisi pasti sebuah layanan.' }
  ] },
  { title: 'Angka energi yang besar', question: 'Kamu membaca laporan konsumsi listrik seluruh pusat data. Apakah angka itu sama dengan konsumsi listrik AI saja?', topic: 'Energi', options: [
    { text: 'Tidak. Pusat data menjalankan berbagai layanan, jadi cakupan datanya perlu diperiksa.', correct: true, feedback: 'Tepat. Cakupan dan definisi data menentukan kesimpulan yang boleh kita tarik.' },
    { text: 'Ya. Semua kegiatan pusat data pasti merupakan AI.', correct: false, feedback: 'Pusat data juga melayani penyimpanan, jaringan, dan layanan digital lain. Jangan menyamakan cakupannya.' }
  ] }
];
export function assessChoice(card, index) {
  const option = card.options[index];
  if (!option) throw new RangeError('Pilihan tidak tersedia.');
  return { correct: option.correct, feedback: option.feedback };
}
