export async function onRequest(context) {
  const pathname = new URL(context.request.url).pathname;
  const forbiddenExact = ['/README.md', '/LAUNCH-NOTES.md', '/site-spec.json', '/.git', '/.gitignore', '/.env', '/build.py'];
  const forbiddenPrefixes = ['/.git/', '/.wrangler/', '/artifacts/', '/node_modules/'];
  if (forbiddenExact.includes(pathname) || forbiddenPrefixes.some((p) => pathname.startsWith(p))) {
    return new Response('Not found', {
      status: 404,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'cache-control': 'no-store',
        'x-robots-tag': 'noindex, nofollow, noarchive',
      },
    });
  }
  return context.next();
}
