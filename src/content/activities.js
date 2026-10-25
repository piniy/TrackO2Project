// Prototype parameters from the supplied TraCkO2 proposal, page 5, Table 1.
// These are not independently validated factors for any commercial AI service.
export const factorVersion = 'proposal-2026-v1';
export const activities = [
  { id: 'chat', title: 'Tanya jawab singkat', description: 'Cek definisi atau ajukan pertanyaan pendek.', factor: 0.1, icon: 'chat', color: 'green' },
  { id: 'summary', title: 'Merangkum teks', description: 'Minta ringkasan dari sebuah bacaan.', factor: 0.4, icon: 'document', color: 'blue' },
  { id: 'longText', title: 'Membuat teks panjang', description: 'Buat draf esai, cerita, atau tulisan panjang.', factor: 2, icon: 'pen', color: 'purple' },
  { id: 'image', title: 'Membuat gambar', description: 'Hasilkan satu aset visual dengan AI.', factor: 4.5, icon: 'image', color: 'orange' }
];
export const formatNumber = (number, digits = 1) => new Intl.NumberFormat('id-ID', { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(number);
