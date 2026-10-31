import { accountApi } from '../services/account.js';

export function loginForm() {
  return {
    mode: new URLSearchParams(location.search).get('mode') === 'register' ? 'register' : 'login',
    email: '', password: '', confirmPassword: '', showPassword: false, busy: false, error: '',
    init() {
      this.$watch('$store.account.user', user => { if (user) location.replace('./dashboard.html'); });
      if (this.$store.account.user) location.replace('./dashboard.html');
    },
    setMode(mode) { this.mode = mode; this.error = ''; this.password = ''; this.confirmPassword = ''; },
    async submit() {
      if (this.busy) return;
      this.error = '';
      if (this.mode === 'register' && this.password !== this.confirmPassword) {
        this.error = this.$store.i18n.locale === 'en' ? 'Passwords do not match.' : 'Kata sandi belum sama.'; return;
      }
      this.busy = true;
      try {
        await accountApi(`/auth/${this.mode}`, 'POST', { email: this.email.trim(), password: this.password });
        this.password = ''; this.confirmPassword = '';
        await this.$store.account.restore();
        if (this.$store.account.user) location.assign('./dashboard.html');
        else this.error = this.$store.account.error || 'Sesi tidak tersedia. Coba masuk kembali.';
      } catch (error) { this.error = error.message; }
      finally { this.busy = false; }
    }
  };
}

export function activityDashboard() {
  let timer, running = false, disposed = false, delay = 5000;
  return {
    data: null, loading: true, error: '', connection: 'loading', checkedAt: null,
    code: '', codeExpires: null, pairing: false, pairError: '', revoking: '',
    get en() { return this.$store.i18n.locale === 'en'; },
    get connectedText() {
      return this.connection === 'online' ? (this.en ? 'Automatic updates on' : 'Pembaruan otomatis aktif')
        : this.connection === 'offline' ? (this.en ? 'Reconnecting… showing last received data' : 'Menghubungkan kembali… menampilkan data terakhir')
          : (this.en ? 'Connecting…' : 'Menghubungkan…');
    },
    init() {
      this.$watch('$store.account.ready', () => this.checkSession());
      this.$watch('$store.account.user', () => this.checkSession());
      this.wake = () => { if (!document.hidden) { delay = 5000; this.refresh(); } else clearTimeout(timer); };
      document.addEventListener('visibilitychange', this.wake);
      window.addEventListener('online', this.wake);
      this.checkSession();
    },
    checkSession() {
      if (!this.$store.account.ready) return;
      if (!this.$store.account.user) {
        if (this.$store.account.error) { this.error = this.$store.account.error; this.loading = false; }
        else location.replace('./login.html');
        return;
      }
      this.refresh();
    },
    async refresh() {
      clearTimeout(timer);
      if (disposed || running || !this.$store.account.user || document.hidden) return;
      running = true;
      try {
        const data = await accountApi('/v1/dashboard');
        if (disposed) return;
        this.data = data; this.error = ''; this.connection = 'online'; this.checkedAt = Date.now(); delay = 5000;
      } catch (error) {
        if (disposed) return;
        if (error.status === 401) { this.data = null; this.$store.account.user = null; location.replace('./login.html'); return; }
        this.connection = 'offline'; this.error = error.message; delay = Math.min(delay * 2, 60000);
      } finally {
        running = false; this.loading = false;
        if (!disposed && !document.hidden && this.$store.account.user) timer = setTimeout(() => this.refresh(), delay);
      }
    },
    async pair() {
      if (this.pairing) return;
      this.pairing = true; this.pairError = '';
      try { const result = await accountApi('/v1/pairing', 'POST'); this.code = result.code; this.codeExpires = Date.now() + result.expires_in * 1000; }
      catch (error) { this.pairError = error.message; }
      finally { this.pairing = false; }
    },
    async revoke(device) {
      if (!confirm(this.en ? 'Disconnect this phone and delete its uploaded activities?' : 'Putuskan ponsel ini dan hapus aktivitas yang telah diunggah?')) return;
      this.revoking = device.id;
      try { await accountApi(`/v1/devices/${device.id}`, 'DELETE'); await this.refresh(); }
      catch (error) { this.error = error.message; }
      finally { this.revoking = ''; }
    },
    category(key) {
      const names = this.en ? { chat: 'Short chat', summary: 'Summarisation', longText: 'Long writing', image: 'Image generation', unclassified: 'Unclassified' }
        : { chat: 'Chat singkat', summary: 'Ringkasan', longText: 'Tulisan panjang', image: 'Pembuatan gambar', unclassified: 'Belum dikategorikan' };
      return names[key] ?? key;
    },
    formatDate(value) { return new Date(value).toLocaleString(this.en ? 'en-GB' : 'id-ID', { dateStyle: 'medium', timeStyle: 'short' }); },
    destroy() { disposed = true; clearTimeout(timer); document.removeEventListener('visibilitychange', this.wake); window.removeEventListener('online', this.wake); }
  };
}
