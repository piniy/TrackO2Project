export const reviewedDate = '2026-10-27';
export const references = [
  {
    id: 'proposal', title: 'TraCkO2: Website Edukasi dan Monitoring Jejak Karbon dari Penggunaan Artificial Intelligence',
    author: 'Tim TraCkO2 · SMA Negeri 2 Semarang', year: '2026', topic: 'proyek', kind: 'Proposal proyek',
    summary: 'Landasan tujuan, rancangan CarbsCulator, dan empat faktor estimasi pada prototipe ini. Tabel parameter terdapat pada halaman 5; klasifikasi pada halaman 6.',
    limitation: 'Parameter proposal adalah asumsi prototipe. Kesesuaiannya dengan tiap layanan AI belum divalidasi secara independen.',
    version: 'Proposal TraCkO2 2026, halaman 5–6', dataYear: 'Asumsi proposal 2026',
    taskUnit: 'g CO₂e per aktivitas dalam empat kategori simulasi', geography: 'Lokasi layanan tidak ditentukan',
    evidence: 'Parameter prototipe untuk pembelajaran', included: 'Emisi simulasi berdasarkan empat faktor proposal',
    excluded: 'Pengukuran server, energi dan air aktual tidak dilaporkan',
    url: '/assets/documents/tracko2-proposal.pdf'
  },
  {
    id: 'luccioni', title: 'Power Hungry Processing: Watts Driving the Cost of AI Deployment?',
    author: 'A. S. Luccioni, Y. Jernite & E. Strubell', year: '2023 / 2024', topic: 'karbon', kind: 'Paper penelitian',
    summary: 'Membandingkan energi dan emisi untuk 1.000 inferensi pada berbagai tugas dan model. Jenis tugas serta model memengaruhi hasil pengukuran.',
    limitation: 'Hasil berlaku pada konfigurasi pengujian penelitian. Paper ini tidak menetapkan satu angka universal per prompt untuk semua layanan AI.',
    version: 'arXiv:2311.16863v3 · 15 Oktober 2024', dataYear: 'Eksperimen paper 2023/2024; tanggal pengukuran tidak dilaporkan',
    taskUnit: 'Rata-rata kWh per 1.000 inferensi studi; konversi g CO₂e', geography: 'Konfigurasi pengujian di Oregon, AS',
    evidence: 'Eksperimen tugas dan model yang diuji', included: 'Energi operasi pengujian; konversi dengan 297,6 g CO₂e/kWh',
    excluded: 'Daur hidup perangkat, air, dan faktor universal jawaban chatbot tidak dicakup',
    url: 'https://arxiv.org/html/2311.16863v3'
  },
  {
    id: 'water', title: 'Making AI Less “Thirsty”: Uncovering and Addressing the Secret Water Footprint of AI Models',
    author: 'P. Li, J. Yang, M. A. Islam & S. Ren', year: '2023 / revisi 2025', topic: 'air', kind: 'Paper penelitian',
    summary: 'Menyajikan metode estimasi jejak air AI dan membahas perbedaan efisiensi air menurut lokasi serta waktu operasi.',
    limitation: 'Pengambilan air dan konsumsi air adalah metrik berbeda. Angka studi tidak dapat dijadikan konversi tetap air per prompt.',
    version: 'arXiv:2304.03271v5 · 26 Maret 2025', dataYear: 'Asumsi GPT-3; proyeksi fasilitas Indonesia per Juli 2023',
    taskUnit: 'mL per permintaan GPT-3 yang didefinisikan; L per satu pelatihan', geography: 'Skenario lokasi AS dan Indonesia dalam studi',
    evidence: 'Pemodelan konsumsi air operasional', included: 'Pendinginan onsite dan air terkait penyediaan listrik',
    excluded: 'Air tertanam dalam pembuatan perangkat dikecualikan dari contoh operasional',
    url: 'https://arxiv.org/html/2304.03271v5#S3.T1'
  },
  {
    id: 'iea', title: 'Energy and AI — Energy demand from AI',
    author: 'International Energy Agency (IEA)', year: '2025', topic: 'energi', kind: 'Laporan lembaga',
    summary: 'Menjelaskan kebutuhan listrik server, jaringan, penyimpanan, dan pendinginan pusat data serta skenario permintaan energinya.',
    limitation: 'Data pusat data mencakup beragam layanan digital, bukan seluruhnya AI. Proyeksi juga bergantung pada skenario dan asumsi.',
    version: 'Energy and AI · 10 April 2025', dataYear: 'Data dasar 2024 dan skenario menuju 2030/2035',
    taskUnit: 'Kebutuhan listrik agregat dan proyeksi, bukan per prompt', geography: 'Global dan regional',
    evidence: 'Laporan lembaga dengan data dan pemodelan skenario', included: 'Server, penyimpanan, jaringan dan pendinginan pusat data',
    excluded: 'Tidak menetapkan faktor emisi atau air setiap prompt pengguna',
    url: 'https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai'
  },
  {
    id: 'gemini', title: 'Measuring the environmental impact of delivering AI at Google Scale',
    author: 'C. Elsworth dkk. · Google', year: '2025', topic: 'energi', kind: 'Studi penyedia layanan',
    summary: 'Melaporkan energi, emisi dan air pendingin untuk median prompt teks Gemini Apps pada Mei 2025, beserta rincian energi layanan.',
    limitation: 'Studi ditulis penyedia layanan dan mencakup produk dengan beberapa model. Median bukan rata-rata untuk menghitung total pribadi, bukan faktor Indonesia, dan bukan pengukuran semua model Gemini masa kini.',
    version: 'arXiv:2508.15734v1 · 21 Agustus 2025', dataYear: 'Mei 2025',
    taskUnit: 'Median prompt teks Gemini Apps: Wh, g CO₂e, mL pendinginan', geography: 'Infrastruktur produksi Google; bukan faktor Indonesia',
    evidence: 'Studi produksi yang dilaporkan penyedia layanan', included: 'Akselerator, CPU/DRAM, mesin idle, overhead fasilitas; emisi berbasis pasar dan alokasi perangkat serving; air pendingin',
    excluded: 'Angka air tidak mencakup air terkait listrik atau air tertanam; bukan seluruh siklus hidup layanan',
    url: 'https://arxiv.org/html/2508.15734v1'
  },
  {
    id: 'shumba', title: 'A Water Efficiency Dataset for African Data Centers',
    author: 'N. Shumba, O. Tshekiso, P. Li, G. Fanti & S. Ren', year: '2024 / revisi 2026', topic: 'air', kind: 'Paper penelitian',
    summary: 'Memodelkan efisiensi air dan contoh inferensi historis GPT-4 serta Llama-3-70B dengan data lokasi dan asumsi energi.',
    limitation: 'Asumsi inferensi berasal dari 2024; revisi 2026 memperbaiki pengolahan WUE. Skenario bukan rata-rata global atau kinerja layanan sekarang. GPT-4 memakai asumsi model proprietari; GPT-4o tidak dihitung.',
    version: 'arXiv:2412.03716v3 · 12 Juni 2026', dataYear: 'Asumsi inferensi berdasarkan sumber publik pertengahan 2024',
    taskUnit: 'L per laporan 5.000 token atau email 250 token dalam skenario', geography: '41 negara Afrika; evaluasi terpilih dan pembanding AS/global',
    evidence: 'Dataset dan pemodelan skenario historis', included: 'Air onsite dan terkait listrik; kebocoran air digambarkan terpisah',
    excluded: 'Bukan data model saat ini; tidak memberi nilai GPT-4o atau dampak kausal warga',
    url: 'https://arxiv.org/html/2412.03716v3'
  },
  {
    id: 'aqueduct', title: 'Aqueduct 4.0: Updated Decision-Relevant Global Water Risk Indicators',
    author: 'S. Kuzma dkk. · World Resources Institute (WRI)', year: '2023', topic: 'air', kind: 'Catatan teknis lembaga',
    summary: 'Menjelaskan indikator risiko air berbasis wilayah dan perbandingan kebutuhan dengan pasokan air untuk membantu membaca konteks dampak lokal.',
    limitation: 'Aqueduct adalah alat penyaringan risiko dan perlu kajian lokal. Indikator wilayah tidak membuktikan dampak satu pusat data atau satu prompt.',
    version: 'Aqueduct 4.0 · 16 Agustus 2023', dataYear: 'Data historis berbagai tahun; proyeksi 2030, 2050, 2080',
    taskUnit: 'Indikator risiko air wilayah; bukan liter per prompt', geography: 'Global, sub-DAS dan agregasi wilayah',
    evidence: 'Kerangka indikator dan pemodelan hidrologi', included: 'Pasokan, kebutuhan dan beragam risiko air wilayah',
    excluded: 'Tidak mengukur jejak satu layanan AI atau membuktikan dampak fasilitas tertentu',
    url: 'https://www.wri.org/research/aqueduct-40-updated-decision-relevant-global-water-risk-indicators'
  }
];
