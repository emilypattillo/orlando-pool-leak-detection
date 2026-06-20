const FORBIDDEN_PREFIXES = ['/.git/', '/.wrangler/', '/artifacts/', '/node_modules/'];
const FORBIDDEN_EXACT = new Set(['/README.md', '/LAUNCH-NOTES.md', '/site-spec.json', '/.git', '/.gitignore', '/.env', '/.git/config', '/.git/HEAD', '/.git/index', '/artifacts/internal/site-spec.json', '/build.py']);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (FORBIDDEN_EXACT.has(url.pathname) || FORBIDDEN_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))) {
      return new Response('Not found', {
        status: 404,
        headers: {
          'content-type': 'text/plain; charset=utf-8',
          'cache-control': 'no-store',
          'x-robots-tag': 'noindex, nofollow, noarchive',
        },
      });
    }
    return env.ASSETS.fetch(request);
  },
};
