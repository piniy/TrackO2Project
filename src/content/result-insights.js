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
    steps: ['Tentukan tujuan dan sertakan konteks dalam satu pertanyaan.', 'Baca jawabannya sebelum mengirim pertanyaan lanjutan.', 'Untuk definisi sederhana, coba catatan atau buku pelajaran.']
  },
  summary: {
    title: 'Baca dulu, lalu ringkas seperlunya.',
    steps: ['Tandai bagian bacaan yang belum kamu pahami.', 'Sebutkan panjang dan fokus ringkasan yang dibutuhkan.', 'Simpan ringkasan yang sudah sesuai agar bisa dibaca kembali.']
  },
  longText: {
    title: 'Buat kerangka sebelum meminta draf.',
    steps: ['Tentukan tujuan, pembaca, dan kerangka tulisanmu.', 'Minta bantuan pada bagian yang memang perlu dikembangkan.', 'Sunting draf yang ada sebelum membuat ulang seluruh teks.']
  },
  image: {
    title: 'Gunakan ulang visual yang sudah sesuai.',
    steps: ['Periksa foto atau ilustrasi yang sudah kamu miliki.', 'Tentukan pesan, gaya, dan kebutuhan visual sebelum meminta gambar.', 'Perbaiki bagian yang perlu saja, lalu simpan hasil yang bisa dipakai ulang.']
  }
};
