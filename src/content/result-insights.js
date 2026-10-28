// Illustrative reference comparisons, checked 2026-10-25. The electricity and
// phone factors are CO2; the vehicle factor is CO2e. These do not measure AI
// energy use or the visitor's devices. LED power is an explicit 9 W assumption.
export const comparisonBasis = Object.freeze({
  source: 'https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator-calculations-and-references',
  electricityGramsPerKwh: 394,
  ledWatts: 9,
  phoneGramsPerCharge: 12.4,
  carGramsPerMile: 393,
  metersPerMile: 1609.344
});

export const activityAdvice = {
  chat: {
    title: 'Mulai dari pertanyaan yang jelas.',
    reason: 'Konteks yang cukup membantu mengurangi pertanyaan ulang karena instruksi awal belum lengkap.',
    steps: ['Tentukan tujuan dan sertakan konteks dalam satu pertanyaan.', 'Baca jawabannya sebelum mengirim pertanyaan lanjutan.', 'Untuk definisi sederhana, coba catatan atau buku pelajaran.']
  },
  summary: {
    title: 'Baca dulu, lalu ringkas seperlunya.',
    reason: 'Ringkasan yang disimpan dapat dibaca lagi tanpa meminta AI membuat ulang bacaan yang sama.',
    steps: ['Tandai bagian bacaan yang belum kamu pahami.', 'Sebutkan panjang dan fokus ringkasan yang dibutuhkan.', 'Simpan ringkasan yang sudah sesuai agar bisa dibaca kembali.']
  },
  longText: {
    title: 'Buat kerangka sebelum meminta draf.',
    reason: 'Memperbaiki bagian tertentu membantumu menghindari pembuatan ulang seluruh draf yang masih bisa dipakai.',
    steps: ['Tentukan tujuan, pembaca, dan kerangka tulisanmu.', 'Minta bantuan pada bagian yang memang perlu dikembangkan.', 'Sunting draf yang ada sebelum membuat ulang seluruh teks.']
  },
  image: {
    title: 'Gunakan ulang visual yang sudah sesuai.',
    reason: 'Menggunakan aset yang sudah tersedia menghindari permintaan gambar baru yang sebenarnya tidak diperlukan.',
    steps: ['Periksa foto atau ilustrasi yang sudah kamu miliki.', 'Tentukan pesan, gaya, dan kebutuhan visual sebelum meminta gambar.', 'Perbaiki bagian yang perlu saja, lalu simpan hasil yang bisa dipakai ulang.']
  }
};

export const resultMessages = {
  'Jumlah aktivitas AI': 'Number of AI activities',
  'Masukkan jumlah permintaan untuk setiap jenis aktivitas dalam satu hari.': 'Enter the number of requests for each activity type in one day.',
  'Hasil CarbsCulator': 'CarbsCulator results',
  'Analogi emisi': 'Emission analogies',
  'Saran penggunaan AI': 'AI use suggestions',
  'Untuk membayangkan skalanya': 'To picture the scale',
  'Perkiraan emisi ini sebanding dengan ilustrasi berikut.': 'This emission estimate is comparable in scale to the following illustrations.',
  'Mengapa saran ini relevan?': 'Why is this suggestion relevant?',
  'Coba simulasi satu aktivitas lebih sedikit': 'Try a simulation with one fewer activity',
  'Simulasi perbandingan': 'Comparison simulation',
  'Jika satu permintaan {activity} tidak diperlukan, bagaimana estimasinya berubah?': 'If one {activity} request is unnecessary, how does the estimate change?',
  'Hasil saat ini': 'Current result',
  'Hasil simulasi': 'Simulated result',
  'Selisih dalam simulasi: {amount} g CO₂e ({percent}%).': 'Difference in this simulation: {amount} g CO₂e ({percent}%).',
  'Simulasi memakai faktor yang sama dengan kalkulator. Selisih ini bukan bukti pengurangan emisi nyata.': 'The simulation uses the same calculator factors. This difference is not evidence of real emissions reductions.',
  'Kalkulator menggunakan faktor proposal untuk pembelajaran. Hasilnya tidak mengukur emisi layanan AI tertentu.': 'The calculator uses proposal factors for learning. Its result does not measure emissions from a specific AI service.',
  'Isi aktivitas dan lihat hasil emisi, rincian, serta penjelasan menarik.': 'Enter your activities to see your emissions estimate, a breakdown, and useful insights.',
  'Isi jumlah aktivitas, lalu pilih Hitung estimasi.': 'Enter activity counts, then select Calculate estimate.',
  'Hasil akan dilengkapi rincian, analogi, dan saran yang sesuai dengan aktivitasmu.': 'Your result will include a breakdown, analogies, and suggestions based on your activities.',
  'Konteks yang cukup membantu mengurangi pertanyaan ulang karena instruksi awal belum lengkap.': 'Enough context helps reduce follow-up questions caused by incomplete initial instructions.',
  'Ringkasan yang disimpan dapat dibaca lagi tanpa meminta AI membuat ulang bacaan yang sama.': 'A saved summary can be read again without asking AI to recreate the same reading material.',
  'Memperbaiki bagian tertentu membantumu menghindari pembuatan ulang seluruh draf yang masih bisa dipakai.': 'Editing specific parts helps you avoid regenerating an entire draft that can still be used.',
  'Menggunakan aset yang sudah tersedia menghindari permintaan gambar baru yang sebenarnya tidak diperlukan.': 'Using an existing asset avoids a new image request that is not needed.'
};
