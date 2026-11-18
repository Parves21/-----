const http=require('http'),fs=require('fs'),path=require('path');
const root=process.cwd();
http.createServer((q,r)=>{
  let f=path.join(root,decodeURIComponent(q.url.split('?')[0]));
  if(q.url==='/'||q.url.startsWith('/?'))f=path.join(root,'index.html');
  fs.readFile(f,(e,d)=>{
    if(e){r.writeHead(404);r.end('nf');return;}
    const ext=path.extname(f);
    const t={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'}[ext]||'application/octet-stream';
    r.writeHead(200,{'Content-Type':t});r.end(d);
  });
}).listen(8765,'127.0.0.1',()=>console.log('http://127.0.0.1:8765'));
