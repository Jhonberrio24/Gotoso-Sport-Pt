import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const isDevelopment = process.env.NODE_ENV !== 'production' && !process.argv.includes('--production');
const port = Number(process.env.PORT) || 3000;

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

const serveProductionFile = async (request, response) => {
  const dist = resolve(root, 'dist');
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const requestedPath = resolve(dist, `.${pathname}`);
  if (requestedPath !== dist && !requestedPath.startsWith(`${dist}${sep}`)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  let filePath = requestedPath;
  try {
    if ((await stat(filePath)).isDirectory()) filePath = resolve(filePath, 'index.html');
  } catch {
    filePath = resolve(dist, 'index.html');
  }

  try {
    const content = await readFile(filePath);
    response.writeHead(200, { 'Content-Type': mimeTypes[extname(filePath)] ?? 'application/octet-stream' });
    response.end(content);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
};

let vite;
const server = createServer((request, response) => {
  if (vite) {
    vite.middlewares(request, response, (error) => {
      if (error) {
        console.error('Vite middleware failed:', error);
        response.writeHead(500);
        response.end('Internal server error');
      }
    });
    return;
  }
  void serveProductionFile(request, response);
});

if (isDevelopment) {
  const { createServer: createViteServer } = await import('vite');
  vite = await createViteServer({
    configFile: resolve(root, 'vite.config.ts'),
    server: { middlewareMode: true, hmr: { server } },
  });
}

server.on('error', async (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(
      `El puerto ${port} ya está en uso. Detén el servidor anterior con Ctrl+C o inicia este con otro puerto: $env:PORT=3001; npm run dev`,
    );
  } else {
    console.error('No se pudo iniciar el servidor:', error.message);
  }
  await vite?.close();
  process.exitCode = 1;
});

server.listen(port, () => {
  console.log(`Gotoso Sport PT running at http://localhost:${port}`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, async () => {
    server.close();
    await vite?.close();
    process.exit(0);
  });
}
