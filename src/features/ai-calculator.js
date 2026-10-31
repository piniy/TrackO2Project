import { sendPrompt } from '../services/ai.js';

const messages = {
  not_configured: ['Layanan Gemini belum dikonfigurasi oleh pengelola website.', 'The site operator has not configured Gemini yet.'],
  invalid_prompt: ['Isi prompt dengan 1–8.000 karakter.', 'Enter a prompt with 1–8,000 characters.'],
  prompt_too_large: ['Prompt terlalu panjang. Kurangi teks lalu coba lagi.', 'The prompt is too long. Shorten it and try again.'],
  rate_limited: ['Terlalu banyak permintaan. Tunggu satu menit sebelum mencoba lagi.', 'Too many requests. Wait a minute before trying again.'],
  provider_limit: ['Kuota Gemini sedang dibatasi. Coba lagi nanti.', 'Gemini is limiting requests. Try again later.'],
  upstream_timeout: ['Waktu tunggu habis. Permintaan mungkin sudah diproses; coba lagi akan mengirim permintaan baru.', 'The request timed out. It may already have been processed; retrying sends a new request.'],
  upstream_unavailable: ['Gemini belum dapat menjawab. Periksa konfigurasi layanan atau coba lagi nanti.', 'Gemini is unavailable. Check the service configuration or try again later.'],
  origin_not_allowed: ['Alamat website belum diizinkan oleh backend.', 'This website origin is not allowed by the backend.'],
  network_error: ['Tidak dapat menghubungi backend. Pastikan server API berjalan.', 'Cannot reach the backend. Make sure the API server is running.']
};

export default () => ({
  prompt: '', submittedPrompt: '', busy: false, result: null, error: '',
  get locale() { return this.$store?.i18n?.locale ?? 'id'; },
  text(id, en) { return this.locale === 'en' ? en : id; },
  get errorMessage() { const pair = messages[this.error] || messages.network_error; return pair[this.locale === 'en' ? 1 : 0]; },
  number(value, digits = 0) {
    if (value === null || value === undefined) return this.text('Tidak tersedia', 'Unavailable');
    return new Intl.NumberFormat(this.locale === 'en' ? 'en-US' : 'id-ID', { maximumFractionDigits: digits, maximumSignificantDigits: 6 }).format(value);
  },
  get emissionNotice() {
    return this.result?.emissions?.reason === 'usage_incomplete'
      ? this.text('Metadata token belum lengkap atau tidak cocok. Emisi tidak dihitung.', 'Token metadata is incomplete or inconsistent. Emissions were not calculated.')
      : this.text('Estimasi karbon belum tersedia: faktor konversi untuk model dan jenis token ini belum dikonfigurasi. Ini bukan berarti emisinya nol.', 'Carbon estimate unavailable: conversion factors for this model and token types have not been configured. This does not mean zero emissions.');
  },
  async submit() {
    if (this.busy) return;
    if (!this.prompt.trim() || this.prompt.length > 8000) { this.error = 'invalid_prompt'; return; }
    this.busy = true; this.error = '';
    const prompt = this.prompt.trim();
    try {
      const result = await sendPrompt(prompt);
      this.result = result; this.submittedPrompt = prompt;
      this.$nextTick?.(() => this.$refs.aiResult?.focus({ preventScroll: true }));
    } catch (error) { this.error = error.message; }
    finally { this.busy = false; }
  }
});
