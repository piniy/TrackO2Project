# Gemini + CarbsCulator

Basis implementasi: https://github.com/piniy/TrackO2Project commit `26cf7173ea485249cddb1f30c3c974a8df4cd99a` (`main`).

## Menjalankan lokal

Node.js >=22.12, npm. Backend memakai HTTP dan fetch bawaan Node, tanpa SDK tambahan.

1. Jalankan `npm ci`.
2. Salin `.env.example` menjadi `.env` di root proyek.
3. Isi `GEMINI_API_KEY` dari [Google AI Studio](https://aistudio.google.com/apikey) dan `GEMINI_MODEL` dengan ID model teks yang tersedia pada proyek Google Anda. Jangan kirim key lewat chat, commit, atau variabel berawalan `VITE_`.
4. Terminal pertama: `npm run dev:api` (127.0.0.1:3001).
5. Terminal kedua: `npm run dev` (127.0.0.1:5173).
6. Buka `/kalkulator.html`. Form Gemini berada di atas kalkulator aktivitas.

`npm test` menjalankan unit dan HTTP integration tests menggunakan respons Gemini tiruan; tidak mengirim prompt berbayar. `npm run build` membangun frontend. Untuk preview build, jalankan backend bersama `npm run preview`.

## Alur dan kontrak

Browser → `POST /api/chat` → backend → Gemini `generateContent` → metadata token → estimasi di backend → browser.

Request JSON: `{ "prompt": "Jelaskan apa itu jejak karbon." }`. Maksimum 8.000 karakter dan 32 KiB body. Hanya field `prompt` diterima; pengguna tidak dapat memilih endpoint/model, menyisipkan token, atau mengubah faktor melalui request. Maksimum output 2.048 token. Tidak ada pengiriman ulang otomatis. Setiap pengiriman adalah single-turn; input tidak mencakup percakapan sebelumnya.

Respons: `answer`, `model`, `modelVersion`, `finishReason`, `blocked`, `usage`, `emissions`, `requestId`. `usage` berisi `inputTokens`, `outputTokens`, `thinkingTokens`, `cachedTokens`, `toolTokens`, `totalTokens`. Input/output/total yang tidak tersedia tetap `null`. Field opsional thinking/cache/tool yang dihilangkan penyedia diperlakukan sebagai 0; estimasi hanya diteruskan jika penjumlahan cocok dengan total yang dilaporkan.

`GET /api/status` mengembalikan provider, model, dan apakah konfigurasi key/model terisi. `ready` tidak membuktikan bahwa key valid atau kuota tersedia. Tidak ada key yang dikirim ke browser. Kegagalan memakai `{ "error": { "code": "...", "requestId": "..." } }`; pesan internal penyedia tidak diteruskan.

Kode utama: 400 input tidak valid; 403 origin ditolak; 413 terlalu besar; 415 harus JSON; 429 batas permintaan; 502 kegagalan penyedia; 503 belum dikonfigurasi; 504 timeout. Respons yang diblokir atau terpotong tetap menampilkan metadata yang tersedia.

## Faktor emisi: sengaja kosong

Metadata Gemini menyatakan penggunaan token, bukan energi atau emisi aktual. Tidak ada koefisien karbon default yang dibuat-buat. Sampai faktor lengkap tersedia, `emissions.status = "unavailable"` dan `gramsCO2e = null`; UI menyatakan belum tersedia, bukan nol. Jawaban dan token tetap dapat ditampilkan.

Konfigurasi server:

| Variabel | Isi |
| --- | --- |
| `EMISSION_MODEL` | Harus sama persis dengan `GEMINI_MODEL` |
| `EMISSION_FACTOR_VERSION` | Versi skenario/faktor yang dapat ditelusuri |
| `EMISSION_FACTOR_SOURCE` | Sumber atau asumsi skenario yang dinyatakan secara eksplisit |
| `EMISSION_SYSTEM_BOUNDARY` | Cakupan energi/emisi, lokasi/periode/asumsi dan pengecualian |
| `EMISSION_INPUT_G_PER_1K` | g CO₂e per 1.000 token input tanpa cache |
| `EMISSION_OUTPUT_G_PER_1K` | g CO₂e per 1.000 token output |
| `EMISSION_THINKING_G_PER_1K` | g CO₂e per 1.000 token reasoning |
| `EMISSION_CACHED_G_PER_1K` | g CO₂e per 1.000 token input cache |

Rumus skenario linear:

`gCO2e = ((input − cached) × Finput + cached × Fcached + output × Foutput + thinking × Fthinking) / 1000`.

Cache sudah termasuk input sehingga dikurangi sebelum menghitung input tanpa cache. Thinking dihitung terpisah dan tidak dijumlahkan ulang ke output. Faktor diperlukan untuk setiap jenis token dengan jumlah >0. Total harus cocok dengan input + output + thinking, cache tidak boleh melebihi input, dan penggunaan tool tidak didukung di versi ini. Metadata yang tidak cocok menghasilkan `usage_incomplete`, bukan angka tebakan.

Koefisien harus nonnegatif dan finite. Faktor 0 hanya pantas untuk skenario yang secara eksplisit membenarkannya; kosong tidak dianggap 0. Hasil menyertakan rincian token/faktor/gram, versi, sumber, model, dan cakupan. Model alias dapat berubah: pilih model/version yang cocok dengan riset dan perbarui faktor saat model berubah. `modelVersion` yang dikembalikan penyedia tetap ditampilkan untuk audit. Ini pendekatan skenario linear, bukan pengukuran fisik; pemakaian nyata dipengaruhi hardware, batching, panjang konteks, lokasi dan sistem pendingin.

Jika sumber menyediakan energi per token, konversikan satuan dengan benar: `g/1.000 token = Wh/1.000 token ÷ 1.000 × gCO2e/kWh`. Jelaskan apakah overhead fasilitas sudah tercakup agar tidak dihitung ganda. Jangan memakai intensitas listrik Indonesia hanya karena pengguna berada di Indonesia; lokasi komputasi penyedia belum tentu sama.

Angka median per prompt pada studi Gemini Apps tidak otomatis menjadi faktor per token untuk model Gemini API. Faktor proposal kalkulator aktivitas lama juga tidak dipakai di sini.

## Deployment

Disediakan `api/chat.js` dan `api/status.js` sebagai Node functions untuk Vercel, serta `vercel.json` untuk build frontend dan durasi fungsi chat. Isi variabel lingkungan pada proyek hosting, termasuk `ALLOWED_ORIGINS` berupa daftar origin HTTPS yang diizinkan, dipisahkan koma (tanpa trailing slash). Vercel menjalankan endpoint API dan frontend di origin yang sama. Pastikan paket hosting mendukung durasi fungsi 70 detik. Preview domain juga perlu dicantumkan jika ingin memanggil API dari preview.

Untuk hosting Node lain, jalankan `npm run start:api`; arahkan `/api/*` pada domain frontend ke server API melalui reverse proxy. `HOST` default `127.0.0.1`, `PORT` default `3001`. Hosting statis saja tidak menjalankan backend.

Batas lokal per instance: 30 request/menit dan 3 request aktif. Batas tidak persisten dan tidak dibagi antar-instance. Origin checks bukan autentikasi. Sebelum membuka layanan berbayar ke publik, pasang quota/budget pada proyek Google dan pembatasan bersama di gateway/hosting (serta akun/pembatasan akses bila dibutuhkan). Konfigurasi gateway dan akun bukan bagian implementasi ini.

Backend aplikasi tidak menyimpan atau mencatat prompt, jawaban, dan key. Browser menampilkan respons sebagai teks, bukan HTML. Google dan infrastruktur hosting memiliki kebijakan pemrosesan/log sendiri; sesuaikan konfigurasi penyedia serta pemberitahuan privasi untuk deployment Anda. Tidak ada database pengguna atau riwayat permanen yang dibuat.

## Referensi

- [Gemini GenerateContent dan UsageMetadata](https://ai.google.dev/api/generate-content#UsageMetadata).
- [Google: pengukuran dampak lingkungan Gemini Apps](https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference).

Tes menggunakan koefisien sintetis hanya untuk memverifikasi aritmetika; angka fixture bukan faktor untuk Gemini dan tidak dipasang pada konfigurasi aplikasi.
