
const { setCORS } = require('./_helpers.js');
const VERSION = '1.0.0';
function versionHandler(req, res){
  setCORS(res);
  if(req.method === 'OPTIONS'){ res.statusCode=200; return res.end(); }
  res.setHeader('Content-Type','application/json; charset=utf-8');
  res.end(JSON.stringify({ version: VERSION }));
}
module.exports = (req, res)=> versionHandler(req, res);
module.exports.versionHandler = versionHandler;
