import { activities } from '../content/activities.js';

export function classify(total) {
  if (total === 0) return null;
  if (total < 0.2) return { label: 'Di bawah rentang klasifikasi', tip: 'Proposal memulai klasifikasi pada 0,2 g CO₂e. Hasil ini berada di bawah rentang tersebut.' };
  if (total <= 2) return { label: 'Micro usage', tip: 'Mulai kenali aktivitas yang paling sering kamu lakukan. Tetap pilih AI sesuai kebutuhan tugas.' };
  if (total <= 5) return { label: 'Low usage', tip: 'Periksa kembali jawaban sebelum mengirim permintaan berikutnya. Konteks yang jelas membantu proses belajarmu.' };
  if (total <= 15) return { label: 'Moderate usage', tip: 'Lihat aktivitas dengan kontribusi terbesar. Pertimbangkan apakah materi yang sudah ada bisa digunakan kembali.' };
  if (total <= 40) return { label: 'High usage', tip: 'Tinjau permintaan yang berulang dan tentukan tujuan sebelum membuat konten baru.' };
  return { label: 'Extreme usage', tip: 'Coba tinjau kembali kebutuhan aktivitasmu. Pilih tugas yang memang memerlukan AI dan sisakan waktu untuk analisis mandiri.' };
}

export function estimate(counts) {
  const breakdown = activities.map((activity) => {
    const count = Number(counts[activity.id] ?? 0);
    if (!Number.isSafeInteger(count) || count < 0 || count > 10000) {
      throw new RangeError('Isi setiap aktivitas dengan bilangan bulat antara 0 dan 10.000.');
    }
    // Integer tenths avoid floating-point errors at classification boundaries.
    return { ...activity, count, tenths: count * Math.round(activity.factor * 10) };
  });
  const total = breakdown.reduce((sum, item) => sum + item.tenths, 0) / 10;
  return { total, count: breakdown.reduce((sum, item) => sum + item.count, 0), breakdown: breakdown.map(item => ({ ...item, emission: item.tenths / 10 })), tier: classify(total) };
}
