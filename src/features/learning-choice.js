export const learningOptions = [
  { id: 'specific', text: 'Baca catatan, lalu minta penjelasan bagian yang belum kupahami.', feedback: 'Tujuanmu jelas dan kamu tetap terlibat belajar. Cocokkan penjelasannya dengan buku atau sumber tepercaya sebelum digunakan.', appropriate: true },
  { id: 'repeat', text: 'Minta jawaban lengkap berulang kali, lalu langsung salin.', feedback: 'Tentukan dulu bagian yang perlu dibantu. Baca hasilnya dan periksa sumber; mengulang permintaan saja tidak memastikan jawaban benar.', appropriate: false }
];

export default () => ({
  options: learningOptions,
  selected: null,
  get answer() { return this.options.find(option => option.id === this.selected); },
  choose(id) { if (this.options.some(option => option.id === id)) this.selected = id; }
});
