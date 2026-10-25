export const references = [
  {
    id: 'proposal', title: 'TraCkO2: Website Edukasi dan Monitoring Jejak Karbon dari Penggunaan Artificial Intelligence',
    author: 'Tim TraCkO2 · SMA Negeri 2 Semarang', year: '2026', topic: 'proyek', kind: 'Proposal proyek',
    summary: 'Landasan tujuan, rancangan CarbsCulator, dan empat faktor estimasi pada prototipe ini. Tabel parameter terdapat pada halaman 5; klasifikasi pada halaman 6.',
    limitation: 'Parameter proposal adalah asumsi prototipe. Kesesuaiannya dengan tiap layanan AI belum divalidasi secara independen.',
    url: '/assets/documents/tracko2-proposal.pdf'
  },
  {
    id: 'luccioni', title: 'Power Hungry Processing: Watts Driving the Cost of AI Deployment?',
    author: 'A. S. Luccioni, Y. Jernite & E. Strubell', year: '2023 / 2024', topic: 'karbon', kind: 'Paper penelitian',
    summary: 'Membandingkan energi dan emisi untuk 1.000 inferensi pada berbagai tugas dan model. Jenis tugas serta model memengaruhi hasil pengukuran.',
    limitation: 'Hasil berlaku pada konfigurasi pengujian penelitian. Paper ini tidak menetapkan satu angka universal per prompt untuk semua layanan AI.',
    url: 'https://arxiv.org/abs/2311.16863'
  },
  {
    id: 'water', title: 'Making AI Less “Thirsty”: Uncovering and Addressing the Secret Water Footprint of AI Models',
    author: 'P. Li, J. Yang, M. A. Islam & S. Ren', year: '2023 / revisi 2025', topic: 'air', kind: 'Paper penelitian',
    summary: 'Menyajikan metode estimasi jejak air AI dan membahas perbedaan efisiensi air menurut lokasi serta waktu operasi.',
    limitation: 'Pengambilan air dan konsumsi air adalah metrik berbeda. Angka studi tidak dapat dijadikan konversi tetap air per prompt.',
    url: 'https://arxiv.org/abs/2304.03271'
  },
  {
    id: 'iea', title: 'Energy and AI — Energy demand from AI',
    author: 'International Energy Agency (IEA)', year: '2025', topic: 'energi', kind: 'Laporan lembaga',
    summary: 'Menjelaskan kebutuhan listrik server, jaringan, penyimpanan, dan pendinginan pusat data serta skenario permintaan energinya.',
    limitation: 'Data pusat data mencakup beragam layanan digital, bukan seluruhnya AI. Proyeksi juga bergantung pada skenario dan asumsi.',
    url: 'https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai'
  }
];
