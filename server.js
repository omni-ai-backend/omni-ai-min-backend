import http from 'http';
import { handler } from './api/chat.js';

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/api/chat')) {
    await handler(req, res);
  } else {
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('Omni AI Minimal Backend running. Use POST /api/chat');
  }
});
server.listen(3000, ()=> console.log('http://localhost:3000'));