
const { setCORS } = require('./_helpers.js');
function healthHandler(req, res){
  setCORS(res);
  if(req.method === 'OPTIONS'){ res.statusCode=200; return res.end(); }
  res.setHeader('Content-Type','application/json; charset=utf-8');
  res.statusCode = 200;
  res.end(JSON.stringify({ ok:true, service:'omni-ai-backend', time: new Date().toISOString() }));
}
module.exports = (req, res)=> healthHandler(req, res);
module.exports.healthHandler = healthHandler;
