export const articles = [
  {
    id: 'jejak-karbon', topic: 'karbon', title: 'Jawaban digital, proses yang nyata.', icon: 'leaf', readTime: '3 menit baca',
    summary: 'Kenali hubungan antara permintaan AI, komputasi, listrik, dan emisi.',
    paragraphs: [
      'Saat kamu mengirim permintaan ke AI, komputer menjalankan model untuk menghasilkan jawaban. Proses menjalankan model ini disebut inferensi. Energi yang dipakai dan emisi yang terkait dapat berbeda menurut model, jenis tugas, perangkat keras, serta sumber listrik.',
      'Luccioni dan rekan meneliti energi serta emisi untuk 1.000 inferensi pada konfigurasi model dan tugas tertentu. Perbandingan ini membantu kita memahami bahwa tugas AI tidak selalu memiliki kebutuhan sumber daya yang sama.'
    ],
    takeaway: 'Baca estimasi bersama satuan, asumsi, dan sumbernya.', sources: ['luccioni', 'proposal']
  },
  {
    id: 'jejak-air', topic: 'air', title: 'Mengapa AI juga berkaitan dengan air?', icon: 'drop', readTime: '3 menit baca',
    summary: 'Pelajari jejak air yang menyertai infrastruktur komputasi.',
    paragraphs: [
      'Jejak lingkungan AI juga berkaitan dengan air. Penelitian Li dan rekan membahas penggunaan air dalam pengoperasian infrastruktur AI, termasuk pendinginan dan keterkaitannya dengan pembangkitan listrik.',
      'Perhatikan perbedaan pengambilan air (water withdrawal) dan konsumsi air (water consumption). Air yang diambil dari suatu sumber tidak selalu seluruhnya dikonsumsi; sebagian dapat dikembalikan. Menyamakan keduanya dapat membuat informasi menyesatkan.',
      'Efisiensi air dapat berubah menurut lokasi, waktu, dan kondisi operasi. Koefisien pada penjelajah riset hanya berlaku di dalam skenario studi yang dipilih, dengan model, panjang permintaan, dan batas perhitungan yang ditentukan. Angka itu bukan konversi tetap untuk semua prompt.'
    ],
    takeaway: 'Jejak air bergantung pada konteks, bukan hanya jumlah prompt.', sources: ['water']
  },
  {
    id: 'energi-pusat-data', topic: 'energi', title: 'Listrik di balik layar.', icon: 'bolt', readTime: '2 menit baca',
    summary: 'Server bukan satu-satunya komponen pusat data yang memerlukan listrik.',
    paragraphs: [
      'Pusat data menampung server, perangkat penyimpanan, jaringan, dan peralatan pendukung. Laporan Energy and AI dari IEA menjelaskan bahwa server serta sistem pendinginan sama-sama menjadi bagian dari kebutuhan listrik fasilitas ini.',
      'Kebutuhan energi pusat data berbeda menurut peralatan, efisiensi, dan layanan yang dijalankan. Data seluruh pusat data juga tidak boleh langsung dianggap sebagai data AI saja.',
      'Saat membaca proyeksi kebutuhan listrik, periksa tahun dan skenarionya. Proyeksi adalah perkiraan berdasarkan asumsi, bukan pengukuran masa depan yang sudah pasti.'
    ],
    takeaway: 'Bedakan data AI, data pusat data, dan proyeksi energi.', sources: ['iea']
  },
  {
    id: 'prompt-bijak', topic: 'kebiasaan', title: 'Mulai dari pertanyaan yang lebih jelas.', icon: 'chat', readTime: '2 menit baca',
    summary: 'Gunakan AI sesuai kebutuhan, sambil tetap mengandalkan pemikiranmu sendiri.',
    paragraphs: [
      'Sebelum membuka AI, tentukan tujuanmu: memahami sebuah konsep, memeriksa langkah, atau menyusun ide awal. Tuliskan konteks, bentuk jawaban, dan batasan yang dibutuhkan.',
      'Baca dan periksa jawaban sebelum mengulang permintaan. Untuk tugas sederhana, pertimbangkan catatan pelajaran, buku, atau pencarian langsung. Pilihan alat mengikuti kebutuhan tugas.',
      'Gunakan hasil AI sebagai bahan berpikir. Periksa sumber dan kerjakan analisis dengan pemahamanmu sendiri. Saran ini merupakan panduan belajar; situs ini belum mengukur perubahan perilaku atau penghematan emisi nyata.'
    ],
    takeaway: 'Tentukan tujuan, beri konteks, lalu periksa hasilnya.', sources: ['proposal']
  },
  {
    id: 'pelatihan-inferensi', topic: 'energi', title: 'Melatih model dan memakai model: apa bedanya?', icon: 'bolt', readTime: '2 menit baca',
    summary: 'Bedakan proses membangun kemampuan model dari proses menjawab permintaan sehari-hari.',
    paragraphs: [
      'Pelatihan mengubah parameter model menggunakan data dan komputasi. Inferensi menjalankan model yang sudah dilatih untuk menghasilkan keluaran, misalnya penjelasan materi atau keterangan gambar. Mengirim satu pertanyaan tidak sama dengan melatih ulang seluruh model.',
      'Keduanya membutuhkan sumber daya. Untuk membandingkannya, periksa penyebut: satu proses pelatihan, 1.000 inferensi pengujian, atau satu prompt median dalam layanan produksi adalah ukuran yang berbeda.',
      'Kebutuhan dalam pemakaian juga bergantung pada tugas, model, dan konfigurasi. Data eksperimen Luccioni tidak menetapkan satu faktor untuk seluruh jawaban chatbot modern.'
    ],
    takeaway: 'Sebutkan proses dan penyebutnya sebelum membandingkan angka.', sources: ['luccioni', 'water']
  },
  {
    id: 'air-dan-lokasi', topic: 'air', title: 'Mengapa lokasi air itu penting?', icon: 'drop', readTime: '2 menit baca',
    summary: 'Jumlah liter belum menjelaskan seluruh akibat bagi masyarakat dan lingkungan setempat.',
    paragraphs: [
      'Air tersedia tidak merata. Tekanan air berkaitan dengan besarnya kebutuhan dibanding pasokan terbarukan di suatu wilayah. Kebutuhan tambahan perlu dilihat bersama musim, sumber air, dan pengguna lain di daerah tersebut.',
      'Kerangka Aqueduct dari WRI membantu menyaring risiko air berdasarkan wilayah. Indikatornya perlu dilengkapi kajian lokal; indikator global tidak membuktikan dampak satu pusat data atau satu prompt terhadap warga.',
      'Untuk diskusi sekolah, ajukan pertanyaan kepada penyedia layanan: dari mana air pendingin berasal, bagaimana efisiensinya, dan apakah dampak setempat dilaporkan? Proyeksi Indonesia dalam studi Li bukan pengukuran penggunaan ChatGPT Indonesia masa kini.'
    ],
    takeaway: 'Baca jumlah air bersama lokasi, musim, dan kondisi masyarakat.', sources: ['aqueduct', 'water']
  }
];
