import { createServer } from 'node:http';
import { createApi } from './app.js';

const port = Number(process.env.PORT || 3001);
const host = process.env.HOST || '127.0.0.1';
const server = createServer({ requestTimeout: 70_000, headersTimeout: 10_000 }, createApi());
server.listen(port, host, () => console.log(`TraCkO2 API: http://${host}:${port}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close());
