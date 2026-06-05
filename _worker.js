const FORBIDDEN_PREFIXES = ['/.git/', '/.wrangler/', '/artifacts/'];
const FORBIDDEN_EXACT = new Set(['/README.md', '/site-spec.json', '/.git', '/.git/config', '/.git/HEAD', '/.git/index', '/artifacts/internal/site-spec.json']);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (FORBIDDEN_EXACT.has(url.pathname) || FORBIDDEN_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))) {
      return new Response('Not found', {
        status: 404,
        headers: {
          'content-type': 'text/plain; charset=utf-8',
          'x-robots-tag': 'noindex, nofollow',
        },
      });
    }
    return env.ASSETS.fetch(request);
  },
};
