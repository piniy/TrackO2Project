export async function accountApi(path, method = 'GET', data) {
  let response;
  try {
    response = await fetch(path, {
      method, credentials: 'same-origin', cache: 'no-store', signal: AbortSignal.timeout(15000),
      headers: data ? { 'Content-Type': 'application/json' } : {},
      body: data ? JSON.stringify(data) : undefined
    });
  } catch {
    throw new Error('Koneksi terputus. Periksa jaringan dan coba lagi.');
  }
  let body;
  try { body = await response.json(); }
  catch { throw new Error('Layanan akun belum tersedia. Coba lagi nanti.'); }
  if (!response.ok) throw Object.assign(new Error(body.error ?? 'Permintaan gagal.'), { status: response.status });
  return body;
}

export function accountStore() {
  return {
    user: null, ready: false, error: '', signingOut: false,
    init() {
      this.restore();
      this.onFocus = () => this.restore();
      window.addEventListener('focus', this.onFocus);
    },
    async restore() {
      try { this.user = await accountApi('/auth/session'); this.error = ''; }
      catch (error) {
        if (error.status === 401) this.user = null;
        else this.error = error.message;
      } finally { this.ready = true; }
    },
    async logout() {
      this.signingOut = true;
      try {
        await accountApi('/auth/logout', 'POST');
        this.user = null;
        location.assign('./index.html');
      } catch (error) { this.error = error.message; this.signingOut = false; }
    }
  };
}
