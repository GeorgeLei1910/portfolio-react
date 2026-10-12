import { onRequestGet as handleType } from '../functions/api/[type].js';
import { onRequestGet as handleHealth } from '../functions/api/health.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/api/health') {
      return handleHealth({ request, env, params: {} });
    }

    if (url.pathname.startsWith('/api/')) {
      const parts = url.pathname.split('/').filter(Boolean);
      const type = parts[1]; // e.g. /api/programmer -> 'programmer'
      if (type) {
        return handleType({ request, env, params: { type } });
      }
    }

    return env.ASSETS.fetch(request);
  }
};
