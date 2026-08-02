import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

const dist = new URL('../dist/', import.meta.url);
const root = new URL('../', import.meta.url);

await rm(dist, { recursive: true, force: true });
await mkdir(new URL('server/', dist), { recursive: true });
await mkdir(new URL('.openai/', dist), { recursive: true });

for (const file of ['index.html', 'app.js', 'style.css']) {
  await cp(new URL(file, root), new URL(file, dist));
}

await cp(new URL('assets/', root), new URL('assets/', dist), { recursive: true });

await cp(new URL('.openai/hosting.json', root), new URL('.openai/hosting.json', dist));

const html = await readFile(new URL('index.html', root), 'utf8');
const css = await readFile(new URL('style.css', root), 'utf8');
const javascript = await readFile(new URL('app.js', root), 'utf8');
const page = html
  .replace('</head>', `<style>${css}</style></head>`)
  .replace('</body>', `<script>${javascript}</script></body>`)
  .replace(/<script src="app\.js" defer><\/script>/, '');

await writeFile(new URL('server/index.js', dist), `const page = ${JSON.stringify(page)};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(page, {
        headers: { 'content-type': 'text/html; charset=UTF-8' },
      });
    }
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }
    return new Response('PÃ¡gina nÃ£o encontrada', { status: 404 });
  },
};
`);
