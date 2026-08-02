import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

const dist = new URL('../dist/', import.meta.url);
const root = new URL('../', import.meta.url);

await rm(dist, { recursive: true, force: true });
await mkdir(new URL('server/', dist), { recursive: true });
await mkdir(new URL('.openai/', dist), { recursive: true });

for (const file of ['index.html', 'app.js', 'style.css']) {
  await cp(new URL(file, root), new URL(file, dist));
}

await cp(new URL('.openai/hosting.json', root), new URL('.openai/hosting.json', dist));

await writeFile(new URL('server/index.js', dist), `export default {
  async fetch(request, env) {
    if (env.ASSETS) {
      const assetUrl = new URL(request.url);
      if (assetUrl.pathname === '/') assetUrl.pathname = '/index.html';
      return env.ASSETS.fetch(new Request(assetUrl, request));
    }
    return new Response('Barberia Ritual', { status: 200 });
  },
};
`);
