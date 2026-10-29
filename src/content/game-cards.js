import { inferenceTasks, waterLocations, luccioniSource, waterSource } from './education-data.js';

// Explicit field registration replaces positional legacy translation mapping.
export const gameContentMessages = {};
const c = (id, en) => { gameContentMessages[id] = en; return id; };
export const gameSources = {
  luccioni: {
    id: 'luccioni', version: 'arXiv:2311.16863v3 · 2024', url: luccioniSource,
    label: 'Luccioni et al. · Table 2',
    scope: c('Rerata energi inferensi pada model dan konfigurasi yang diuji; bukan pengukuran penyedia AI saat ini.', 'Mean inference energy for tested models and configurations; not measurements of current AI providers.'),
    assumptions: c('kWh per 1.000 inferensi dikonversi menjadi Wh per inferensi. Perangkat memakai daya tetap yang diasumsikan. Referensi pengisian ponsel dalam paper: 22 Wh.', 'kWh per 1,000 inferences is converted to Wh per inference. Devices assume constant power. The paper’s phone-charge reference is 22 Wh.'),
    excluded: c('Tidak mencakup pembuatan perangkat, energi perangkat pengguna, atau emisi pribadi.', 'Excludes hardware manufacturing, user-device energy, and personal emissions.')
  },
  li: {
    id: 'li', version: 'arXiv:2304.03271v5 · 2025', url: waterSource,
    label: 'Li et al. · Table 1',
    scope: c('Estimasi konsumsi air operasional GPT-3: pendinginan langsung dan penyediaan listrik berdasarkan lokasi.', 'Estimated GPT-3 operational water consumption: direct cooling and location-based electricity supply.'),
    assumptions: c('GPT-3 175B; 0,004 kWh per permintaan; hingga 800 kata masukan dan 150–300 kata keluaran. Asumsi fasilitas per Juli 2023. Indonesia adalah proyeksi.', 'GPT-3 175B; 0.004 kWh per request; up to 800 input words and 150–300 output words. Facility assumptions as of July 2023. Indonesia is projected.'),
    excluded: c('Tidak mencakup pembuatan perangkat atau pelatihan. Bukan angka tetap semua layanan AI dan bukan air yang dihemat.', 'Excludes hardware manufacturing and training. Not a fixed value for all AI services and not water saved.')
  },
  authored: {
    id: 'authored', version: 'TraCkO2 · 2026-10-29', url: './edukasi.html#pahami',
    label: c('Skenario pembelajaran TraCkO2', 'TraCkO2 teaching scenario'),
    scope: c('Keputusan kualitatif berdasarkan kebutuhan tugas dalam skenario.', 'Qualitative decision based on the task requirements in this scenario.'),
    assumptions: c('Salah ketik sudah jelas. Koreksi manual memenuhi kebutuhan; fitur koreksi terarah juga valid tetapi menambah langkah.', 'The typo is obvious. Manual correction meets the need; focused correction is also valid but adds a step.'),
    excluded: c('Tidak ada estimasi Wh untuk penalaran, koreksi otomatis, atau pekerjaan manual.', 'No Wh estimates for reasoning, autocomplete, or manual work.')
  }
};
const factor = id => inferenceTasks.find(item => item.id === id).energy;
const activity = (id, text, en, icon, values) => ({ id, text: c(text, en), icon, ...values });
const image = (id, n, text, en) => activity(id, text, en, 'image', { inferenceCount: n, taskId: 'image', wh: n * factor('image') });
const device = (id, watts, minutes, text, en, icon) => activity(id, text, en, icon, { watts, minutes, wh: watts * minutes / 60 });
const energy = (id, options, explanation, english) => ({
  id, type: 'energy', sourceId: 'luccioni', evidenceType: 'study-comparison-with-device-assumption',
  question: c('Mana yang memakai lebih banyak listrik?', 'Which uses more electricity?'),
  context: c('Rerata studi AI × contoh perangkat dengan asumsi berlabel.', 'AI study mean × device illustration with labeled assumptions.'),
  explanation: c(explanation, english), options
});
const energyRounds = [
  energy('energy-01', [image('left', 1, '1 gambar AI · rerata studi', '1 AI image · study mean'), activity('right', '1 pengisian ponsel · referensi 22 Wh', '1 phone charge · 22 Wh reference', 'phone', { wh: 22, referenceWh: 22 })], 'Satu gambar pada rerata studi memakai lebih sedikit listrik daripada referensi satu pengisian ponsel. Ini perbandingan energi, bukan penghematan.', 'One image at the study mean uses less electricity than the phone-charge reference. This compares energy; it does not create savings.'),
  energy('energy-02', [image('left', 10, '10 gambar AI · rerata studi', '10 AI images · study mean'), device('right', 9, 60, 'LED 9 W · 1 jam', '9 W LED · 1 hour', 'bulb')], 'Sepuluh gambar pada rerata studi melampaui lampu 9 W selama satu jam. Jumlah keluaran memengaruhi skala energi.', 'Ten images at the study mean exceed a 9 W lamp running for one hour. Output count affects the energy scale.'),
  energy('energy-03', [image('left', 2, '2 gambar AI · rerata studi', '2 AI images · study mean'), device('right', 9, 30, 'LED 9 W · 30 menit', '9 W LED · 30 minutes', 'bulb')], 'Dua gambar pada rerata studi sedikit melampaui energi LED setengah jam. Asumsi lampu: daya tetap 9 W.', 'Two images at the study mean slightly exceed half an hour of LED energy. Lamp assumption: constant 9 W power.'),
  energy('energy-04', [image('left', 5, '5 gambar AI · rerata studi', '5 AI images · study mean'), device('right', 30, 60, 'Kipas 30 W · 1 jam', '30 W fan · 1 hour', 'refresh')], 'Kipas dengan asumsi daya tetap 30 W selama satu jam memakai lebih banyak energi dalam perbandingan ini.', 'A fan assumed to draw a constant 30 W for one hour uses more energy in this comparison.'),
  energy('energy-05', [activity('left', '1.000 inferensi keterangan gambar · rerata studi', '1,000 image-captioning inferences · study mean', 'image', { taskId: 'caption', inferenceCount: 1000, wh: 1000 * factor('caption') }), device('right', 40, 60, 'Laptop 40 W · 1 jam', '40 W laptop · 1 hour', 'document')], 'Captioning berarti menulis deskripsi gambar yang sudah ada. Angka ini untuk 1.000 inferensi benchmark, bukan satu permintaan percakapan.', 'Captioning means writing descriptions for existing images. This quantity is for 1,000 benchmark inferences, not one conversational request.')
];
const option = (id, text, en, n, meetsGoal, best) => ({ id, text: c(text, en), inferenceCount: n, meetsGoal, best, icon: 'document' });
const choice = (id, title, enTitle, goal, enGoal, taskId, baselineCount, baselineText, enBaseline, options, explanation, enExplanation) => ({
  id, type: 'choice', question: c(title, enTitle), context: c(goal, enGoal), taskId,
  factorWh: taskId ? factor(taskId) : null, baselineCount, baselineText: c(baselineText, enBaseline),
  comparisonText: c(baselineText.replace('Rencana awal:', 'Dibanding'), enBaseline.replace('Baseline plan: generate', 'Compared with generating')),
  options, explanation: c(explanation, enExplanation),
  sourceId: taskId ? 'luccioni' : 'authored', evidenceType: taskId ? 'authored-simulation-with-study-proxy' : 'authored-qualitative',
  assumptions: c('Skenario buatan: setiap keluaran diasumsikan memenuhi kebutuhan yang sama. Rerata studi adalah proksi tetap. Hanya inferensi baru dihitung, tanpa pencarian, penggunaan ulang, penyuntingan, atau perangkat pengguna.', 'Authored scenario: each output is assumed to meet the same need. Study means are fixed proxies. Only new inferences count, excluding search, reuse, editing, and user devices.')
});
const choiceRounds = [
  choice('choice-01', 'Postermu butuh dua ilustrasi.', 'Your poster needs two illustrations.', 'Brief sudah lengkap. Hasil minimum: dua ilustrasi yang sesuai.', 'The brief is complete. Minimum outcome: two suitable illustrations.', 'image', 10, 'Rencana awal: membuat 10 gambar', 'Baseline plan: generate 10 images', [option('many', 'Buat 10 kandidat gambar', 'Generate 10 candidate images', 10, true, false), option('focused', 'Buat 2 ilustrasi yang sesuai', 'Generate 2 suitable illustrations', 2, true, true), option('skip', 'Lewati ilustrasi yang diwajibkan', 'Skip the required illustrations', 0, false, false)], 'Dua ilustrasi sudah memenuhi brief. Mengurangi kandidat yang tidak diperlukan mengurangi generasi baru dalam simulasi.', 'Two illustrations meet the brief. Reducing unnecessary candidates avoids new generation in the simulation.'),
  choice('choice-02', 'Ada satu salah ketik di email.', 'There is one typo in your email.', 'Email sudah selesai. Hasil minimum: perbaiki satu kata yang jelas salah.', 'The email is finished. Minimum outcome: correct one obvious misspelled word.', null, null, 'Pertimbangkan kebutuhan tugas, tanpa estimasi energi', 'Consider the task need, without an energy estimate', [option('rewrite', 'Tulis ulang seluruh email dengan penalaran mendalam', 'Rewrite the whole email with deep reasoning', null, true, false), option('manual', 'Perbaiki kata itu secara manual', 'Correct the word manually', null, true, true), option('correction', 'Gunakan fitur koreksi terarah', 'Use a focused correction feature', null, true, false)], 'Perbaikan manual menyelesaikan kebutuhan tanpa permintaan AI tambahan. Koreksi terarah juga memenuhi tugas, tetapi menambah langkah. Tidak ada angka energi yang diasumsikan.', 'A manual correction meets the need without an additional AI request. Focused correction also meets the task but adds a step. No energy amount is assumed.'),
  choice('choice-03', 'Satu bacaan, satu rangkuman.', 'One reading, one summary.', 'Hasil minimum: satu rangkuman yang berguna. Setiap hasil diasumsikan memenuhi kebutuhan yang sama.', 'Minimum outcome: one useful summary. Each output is assumed to meet the same need.', 'summary', 4, 'Rencana awal: membuat 4 rangkuman', 'Baseline plan: generate 4 summaries', [option('four', 'Minta 4 rangkuman setara', 'Request 4 equivalent summaries', 4, true, false), option('three', 'Minta 3 rangkuman setara', 'Request 3 equivalent summaries', 3, true, false), option('one', 'Minta 1 rangkuman terarah, lalu periksa', 'Request 1 focused summary, then review it', 1, true, true)], 'Satu hasil yang diperiksa sudah cukup dalam skenario ini. Tiga rangkuman masih mengurangi proses dibanding empat, tetapi bukan pilihan paling sesuai.', 'One reviewed output is enough in this scenario. Three summaries still reduce processing compared with four, but are not the best fit.'),
  choice('choice-04', 'Empat foto butuh keterangan.', 'Four photos need captions.', 'Hasil minimum: satu keterangan yang sesuai untuk setiap foto yang sudah ada.', 'Minimum outcome: one suitable caption for each existing photo.', 'caption', 8, 'Rencana awal: membuat 8 keterangan', 'Baseline plan: generate 8 captions', [option('four', 'Buat 4 keterangan', 'Generate 4 captions', 4, true, true), option('eight', 'Buat 8 keterangan', 'Generate 8 captions', 8, true, false), option('incomplete', 'Biarkan 2 foto tanpa keterangan', 'Leave 2 photos without captions', 2, false, false)], 'Empat keterangan memenuhi kebutuhan empat foto. Mengosongkan dua foto tidak memenuhi tugas dan tidak mendapatkan estimasi penghematan.', 'Four captions meet the need for four photos. Leaving two photos uncaptioned fails the task and earns no saving estimate.'),
  choice('choice-05', 'Visual untuk satu slide.', 'A visual for one slide.', 'Sudah ada gambar yang sesuai dan izin pakainya tersedia. Hasil minimum: satu visual yang cocok.', 'A suitable image already exists and permission is available. Minimum outcome: one fitting visual.', 'image', 5, 'Rencana awal: membuat 5 gambar baru', 'Baseline plan: generate 5 new images', [option('one', 'Buat 1 visual baru', 'Generate 1 new visual', 1, true, false), option('reuse', 'Pakai kembali gambar yang sesuai', 'Reuse the suitable image', 0, true, true), option('five', 'Buat 5 kandidat baru', 'Generate 5 new candidates', 5, true, false)], 'Memakai gambar yang sudah sesuai menghindari generasi baru. Energi penggunaan ulang, penyuntingan, dan perangkat tidak dihitung; bukan klaim tanpa energi.', 'Reusing the suitable image avoids new generation. Reuse, editing, and device energy are excluded; this is not a zero-energy claim.')
];
const waterRounds = [
  ['water-01', 'us', 30, [50, 500, 5000], 'amount-1'],
  ['water-02', 'texas', 20, [150, 1500, 15], 'amount-0'],
  ['water-03', 'indonesia', 20, [40, 4000, 400], 'amount-2'],
  ['water-04', 'washington', 20, [10000, 1000, 100], 'amount-1'],
  ['water-05', 'us', 1, [2, 200, 20], 'amount-2']
].map(([id, locationId, requestCount, amounts, expectedOptionId]) => {
  const location = waterLocations.find(item => item.id === locationId);
  return { id, type: 'water', location, requestCount, expectedOptionId, sourceId: 'li', evidenceType: 'study-scenario-estimate',
    question: c('Berapa air yang dikonsumsi dalam skenario ini?', 'How much water is consumed in this scenario?'), context: location.label,
    explanation: c('Air pendinginan digunakan di fasilitas; air terkait listrik dikonsumsi dalam penyediaan listrik. Besarnya bergantung lokasi dan asumsi studi, bukan angka universal per prompt.', 'Cooling water is used at the facility; electricity-related water is consumed in electricity supply. The quantity depends on location and study assumptions, not a universal amount per prompt.'),
    options: amounts.map((ml, index) => ({ id: 'amount-' + index, ml }))
  };
});
export const games = [
  { id: 'energy', name: c('Tebak Energinya', 'Higher or Lower?'), premise: c('Mana yang memakai lebih banyak listrik?', 'Which uses more electricity?'), instruction: c('Pilih aktivitas yang memakai lebih banyak listrik, lalu buka perbandingannya.', 'Choose the activity that uses more electricity, then reveal the comparison.'), action: c('Mulai menebak', 'Start guessing'), icon: 'bolt', rounds: energyRounds },
  { id: 'choice', name: c('Pilih Cara yang Tepat', 'The Right Tool for the Job'), premise: c('Selesaikan tugas, kurangi proses yang berlebih.', 'Meet the goal with less unnecessary processing.'), instruction: c('Penuhi kebutuhan tugas dengan proses secukupnya.', 'Meet the task requirements with only the processing needed.'), action: c('Tentukan pilihan', 'Make your choice'), icon: 'bulb', rounds: choiceRounds },
  { id: 'water', name: c('Isi Botolnya', 'Fill the Bottle'), premise: c('Bisa bayangkan berapa banyak airnya?', 'Can you picture how much water it takes?'), instruction: c('Pilih perkiraan yang paling dekat dengan estimasi studi.', 'Choose the amount closest to the study estimate.'), action: c('Tebak jumlahnya', 'Guess the amount'), icon: 'drop', rounds: waterRounds }
];
