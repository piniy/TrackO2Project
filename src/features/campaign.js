export const campaignSource = 'https://arxiv.org/html/2508.15734v1';

export const campaignCopy = {
  fact: 'Studi Google melaporkan 0,24 Wh untuk median prompt teks Gemini Apps pada Mei 2025.',
  qualification: 'Ini studi yang ditulis penyedia untuk satu produk yang melayani beberapa model, bukan pengukuran setiap prompt AI, setiap model Gemini saat ini, atau penggunaan di Indonesia. Batas energi mencakup akselerator, CPU/DRAM, mesin siaga, dan fasilitas; tidak mencakup perangkat pengguna, jaringan eksternal, atau pelatihan.',
  invitation: 'Pakai AI, Pahami Jejaknya. Tentukan tujuan, minta keluaran yang dibutuhkan, lalu periksa hasilnya. Diskusikan juga efisiensi dan keterbukaan penyedia layanan.'
};

export function campaignText(translate = text => text) {
  return [translate(campaignCopy.fact), translate(campaignCopy.qualification), `${translate('Sumber:')} Google, arXiv:2508.15734v1 (2025), ${translate('Bagian 3.1, 3.4 dan Tabel 1')}. ${campaignSource}`, translate(campaignCopy.invitation)].join('\n\n');
}

export async function copyCampaignText(text, clipboard) {
  if (typeof clipboard?.writeText !== 'function') return false;
  try { await clipboard.writeText(text); return true; }
  catch { return false; }
}

export default () => ({
  answer: '', checked: false, copyState: '',
  get shareText() { return campaignText(text => this.$store.i18n.t(text)); },
  get feedback() {
    return this.answer === 'context'
      ? 'Tepat. Periksa produk, waktu, jenis tugas, satuan, dan batas pengukuran sebelum mengulang klaim. Angka median dari satu studi tidak menjadi faktor universal.'
      : 'Coba tinjau cakupannya. Studi Google membahas median prompt teks Gemini Apps pada Mei 2025. Angka itu tidak berlaku untuk semua prompt, model, lokasi, atau waktu.';
  },
  checkClaim() { if (this.answer) this.checked = true; },
  async copyText() {
    this.copyState = await copyCampaignText(this.shareText, globalThis.navigator?.clipboard) ? 'copied' : 'fallback';
    if (this.copyState === 'fallback') {
      this.$refs.shareText?.focus();
      this.$refs.shareText?.select();
    }
  }
});
