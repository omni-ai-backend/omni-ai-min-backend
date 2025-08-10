
const http = require('http');
const { chatHandler } = require('./api/chat.js');
const { healthHandler } = require('./api/health.js');
const { versionHandler } = require('./api/version.js');

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/api/chat')) return chatHandler(req, res);
  if (req.url.startsWith('/api/health')) return healthHandler(req, res);
  if (req.url.startsWith('/api/version')) return versionHandler(req, res);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Omni AI Backend up. Endpoints: /api/chat, /api/health, /api/version');
});
server.listen(3000, ()=> console.log('Local: http://localhost:3000'));
