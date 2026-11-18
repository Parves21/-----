const fs=require('fs');
const parts=fs.readFileSync('_ws.txt','utf8').trim().split(':');
const port=parts[2].replace('/devtools/page/','');
const ws=fs.readFileSync('_ws.txt','utf8').trim();
module.exports={ws,httpPort:port};
