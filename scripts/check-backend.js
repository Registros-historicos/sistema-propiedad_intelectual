const http = require('http');
const urls = [
  'http://localhost:4200/api/tableros/investigadores/sexo/',
  'http://localhost:4200/api/tableros/investigadores/categorias/',
  'http://localhost:4200/api/tableros/registros/estatus'
];

function check(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    });
    req.on('error', (err) => {
      resolve({ url, error: err.message });
    });
    req.setTimeout(5000, () => {
      req.abort();
      resolve({ url, error: 'timeout' });
    });
  });
}

(async () => {
  for (const u of urls) {
    const r = await check(u);
    if (r.error) console.log(`${r.url} -> ERROR: ${r.error}`);
    else console.log(`${r.url} -> HTTP ${r.status}`);
  }
})();
