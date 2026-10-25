// Luccioni et al. (2024), Table 2: mean energy per 1,000 inferences.
// Carbon values in the UI are calculated from rounded table means, rather than
// presented as independently measured entries from Figure 1.
export const luccioniSource = 'https://arxiv.org/html/2311.16863v3';
export const studyCarbonIntensity = 297.6; // g CO2e / kWh, study region (Oregon).
export const inferenceTasks = [
  { id: 'image', label: 'Membuat gambar', energy: 2.907, example: 'Bayangkan AI menghasilkan 1.000 gambar baru dari instruksi teks.' },
  { id: 'caption', label: 'Memberi keterangan gambar', energy: 0.063, example: 'Bayangkan AI menuliskan deskripsi singkat untuk 1.000 gambar yang sudah tersedia.' },
  { id: 'summary', label: 'Meringkas teks', energy: 0.049, example: 'Bayangkan AI meringkas 1.000 bacaan menjadi teks yang lebih pendek.' },
  { id: 'text', label: 'Menghasilkan teks', energy: 0.047, example: 'Bayangkan AI melanjutkan atau menyusun teks baru untuk 1.000 permintaan.' },
  { id: 'qa', label: 'Menjawab dari bacaan', energy: 0.003, example: 'Bayangkan AI menemukan jawaban untuk 1.000 pertanyaan di dalam bacaan yang disediakan.' },
  { id: 'classification', label: 'Mengklasifikasikan teks', energy: 0.002, example: 'Bayangkan AI mengelompokkan 1.000 teks, misalnya berdasarkan kategori atau sentimennya.' }
];

// Li et al., revision 26 March 2025, Table 1. GPT-3 175B, assumed
// 0.004 kWh/request, <=800 input words and 150–300 output words.
// Unit: mL consumed per request. Includes direct cooling + electricity supply.
export const waterSource = 'https://arxiv.org/html/2304.03271v5#S3.T1';
export const waterLocations = [
  { id: 'texas', label: 'Texas', onsite: 1.000, offsite: 6.590, total: 7.590, projected: false },
  { id: 'us', label: 'Rata-rata AS', onsite: 2.200, offsite: 14.704, total: 16.904, projected: false },
  { id: 'indonesia', label: 'Indonesia (proyeksi)', onsite: 7.600, offsite: 11.992, total: 19.592, projected: true },
  { id: 'washington', label: 'Washington', onsite: 3.800, offsite: 43.706, total: 47.506, projected: false }
];

export const journeyStages = [
  { title: 'Kamu mengirim prompt', description: 'Misalnya, kamu meminta AI membantu menjelaskan sebuah materi.' },
  { title: 'Server memprosesnya', description: 'Model AI dijalankan pada komputer di pusat data untuk menghasilkan jawaban.' },
  { title: 'Listrik dan pendingin bekerja', description: 'Komputer membutuhkan listrik. Sistem pendingin menjaga suhu peralatan.' },
  { title: 'Ada jejak lingkungan', description: 'Penyediaan listrik dapat menghasilkan emisi. Sebagian sistem pendingin dan pembangkit listrik juga memakai air.' }
];

export const educationMessages = {
  'Bayangkan AI menghasilkan 1.000 gambar baru dari instruksi teks.': 'Imagine AI generating 1,000 new images from text instructions.',
  'Bayangkan AI menuliskan deskripsi singkat untuk 1.000 gambar yang sudah tersedia.': 'Imagine AI writing short descriptions for 1,000 existing images.',
  'Bayangkan AI meringkas 1.000 bacaan menjadi teks yang lebih pendek.': 'Imagine AI summarizing 1,000 readings into shorter texts.',
  'Bayangkan AI melanjutkan atau menyusun teks baru untuk 1.000 permintaan.': 'Imagine AI continuing or composing new text for 1,000 requests.',
  'Bayangkan AI menemukan jawaban untuk 1.000 pertanyaan di dalam bacaan yang disediakan.': 'Imagine AI finding answers to 1,000 questions within supplied readings.',
  'Bayangkan AI mengelompokkan 1.000 teks, misalnya berdasarkan kategori atau sentimennya.': 'Imagine AI classifying 1,000 texts, for example by topic or sentiment.',
  'Untuk membayangkan skalanya': 'To picture the scale',
  'Sekitar {amount} kali mengisi penuh baterai HP.': 'About {amount} full phone charges.',
  'Setara energi LED 9 W yang menyala selama {amount} {unit}.': 'The same energy as a 9 W LED running for {amount} {unit}.',
  'Cara membandingkannya': 'How this comparison works',
  'Analogi emisi memakai acuan EPA AS: 12,4 g CO₂ per pengisian HP. Angka AI memakai CO₂e. Ini perbandingan skala, bukan pengukuran perangkatmu.': 'The emission analogy uses the US EPA reference: 12.4 g CO₂ per phone charge. The AI figure uses CO₂e. This compares scale rather than measuring your device.',
  'Emisi AI dihitung dari energi studi × 297,6 g CO₂e/kWh.': 'AI emissions are calculated from study energy × 297.6 g CO₂e/kWh.',
  'LED diasumsikan memakai daya tetap 9 W. Durasi = energi tugas ÷ 0,009 kW; ini perbandingan energi, bukan pengukuran lampumu.': 'The LED is assumed to draw a constant 9 W. Duration = task energy ÷ 0.009 kW; this compares energy rather than measuring your lamp.',
  'Acuan analogi EPA': 'EPA comparison reference',
  'Perbandingan konsumsi air GPT-3 menurut lokasi': 'GPT-3 water consumption by location',
  'Indonesia (proyeksi)': 'Indonesia (projected)',
  'Tahukah Kamu?': 'Did you know?',
  'Pelajari hubungan AI dengan energi, emisi karbon, dan air melalui diagram berikut.': 'Explore how AI relates to energy, carbon emissions, and water through these diagrams.',
  'Bagaimana AI memproses permintaanmu?': 'How does AI process your request?',
  'Coba kirim contoh prompt, atau pilih tahap untuk membaca prosesnya.': 'Send the sample prompt, or select a stage to read about the process.',
  'Jelaskan materi ini.': 'Explain this topic.',
  'Perangkatmu': 'Your device',
  'Koneksi internet': 'Internet connection',
  'Server AI': 'AI server',
  'Kirim contoh prompt': 'Send sample prompt',
  'Mengirim…': 'Sending…',
  'Tahap pemrosesan AI': 'AI processing stages',
  'Kamu mengirim prompt': 'You send a prompt',
  'Misalnya, kamu meminta AI membantu menjelaskan sebuah materi.': 'For example, you ask AI to help explain a topic.',
  'Server memprosesnya': 'Servers process it',
  'Model AI dijalankan pada komputer di pusat data untuk menghasilkan jawaban.': 'An AI model runs on computers in a data center to generate an answer.',
  'Listrik dan pendingin bekerja': 'Power and cooling systems work',
  'Komputer membutuhkan listrik. Sistem pendingin menjaga suhu peralatan.': 'Computers need electricity. Cooling systems regulate the equipment temperature.',
  'Ada jejak lingkungan': 'There is an environmental footprint',
  'Penyediaan listrik dapat menghasilkan emisi. Sebagian sistem pendingin dan pembangkit listrik juga memakai air.': 'Supplying electricity can produce emissions. Some cooling systems and power plants also use water.',
  'Emisi AI menurut jenis tugas': 'AI emissions by task',
  'Pilih batang untuk melihat angkanya. Data Luccioni dkk. membandingkan rata-rata tugas pada model yang diuji, per 1.000 inferensi.': 'Select a bar to see its value. Luccioni et al. compare task averages across the tested models, per 1,000 inferences.',
  'Pilih metrik grafik': 'Choose chart metric',
  'Emisi karbon': 'Carbon emissions',
  'Energi listrik': 'Electrical energy',
  'Grafik perbandingan tugas AI': 'AI task comparison chart',
  'Membuat gambar': 'Generating images',
  'Memberi keterangan gambar': 'Captioning images',
  'Meringkas teks': 'Summarizing text',
  'Menghasilkan teks': 'Generating text',
  'Menjawab dari bacaan': 'Extractive question answering',
  'Mengklasifikasikan teks': 'Classifying text',
  'Skala logaritmik; setiap interval menunjukkan kenaikan 10 kali.': 'Logarithmic scale; each interval represents a tenfold increase.',
  'per 1.000 inferensi': 'per 1,000 inferences',
  'Rata-rata energi': 'Mean energy',
  'Emisi hasil konversi': 'Converted emissions',
  'Energi × 297,6 g CO₂e/kWh, intensitas listrik lokasi studi.': 'Energy × 297.6 g CO₂e/kWh, the study location’s electricity intensity.',
  'Angka ini berlaku pada konfigurasi studi, bukan faktor emisi setiap prompt ChatGPT.': 'These values apply to the study setup, rather than every ChatGPT prompt.',
  'Luccioni dkk. (2024), Tabel 2 dan metode': 'Luccioni et al. (2024), Table 2 and methodology',
  'Mengapa AI juga memakai air?': 'Why does AI use water, too?',
  'Air mendukung sebagian sistem pendingin dan produksi listrik. Pilih model untuk melihat data yang tersedia dalam studi.': 'Water supports some cooling systems and electricity generation. Select a model to see the data available in this study.',
  'Model dalam studi': 'Model in the study',
  'Jumlah permintaan': 'Number of requests',
  'Grafik konsumsi air GPT-3 menurut lokasi': 'GPT-3 water consumption by location',
  'Rata-rata AS': 'US average',
  'Pilih lokasi': 'Choose a location',
  'Pendinginan langsung': 'Direct cooling',
  'Penyediaan listrik': 'Electricity supply',
  'Estimasi konsumsi air untuk {count} permintaan': 'Estimated water consumption for {count} requests',
  'GPT-3 175B · skenario lokasi dalam studi': 'GPT-3 175B · location scenarios in the study',
  'mL per permintaan': 'mL per request',
  'Asumsi studi: 0,004 kWh/permintaan; masukan ≤800 kata dan keluaran 150–300 kata.': 'Study assumptions: 0.004 kWh/request; input ≤800 words and output 150–300 words.',
  '*Indonesia memakai proyeksi fasilitas per Juli 2023. Ini skenario studi, bukan pengukuran ChatGPT di Indonesia saat ini.': '*Indonesia uses facility projections as of July 2023. This is a study scenario, not a measurement of ChatGPT in Indonesia today.',
  'Data model ini belum tersedia dalam studi.': 'This model has no data in this study.',
  'Sumber ini menghitung GPT-3 175B. Kita tidak dapat memakai angkanya sebagai kebutuhan air GPT-4 atau GPT-4o.': 'This source models GPT-3 175B. Its figures cannot be used as the water demand of GPT-4 or GPT-4o.',
  'Lihat data GPT-3': 'View GPT-3 data',
  'Konsumsi air adalah air yang tidak kembali ke lingkungan air setempat, misalnya karena menguap; berbeda dengan seluruh air yang diambil.': 'Water consumption is water that does not return to the local water environment, for example through evaporation; it differs from total water withdrawal.',
  'Li dkk. (revisi 2025), Tabel 1': 'Li et al. (2025 revision), Table 1',
  'Mulai hitung emisi karbonmu!': 'Start estimating your carbon emissions!',
  'Gunakan CarbsCulator untuk mencoba estimasi aktivitas AI dengan parameter proposal TraCkO2.': 'Use CarbsCulator to explore estimated AI activity emissions using the TraCkO2 proposal parameters.',
  'Buka CarbsCulator': 'Open CarbsCulator',
  'Aktifkan JavaScript untuk mencoba animasi dan memilih data grafik.': 'Enable JavaScript to try the animation and select chart data.'
};
