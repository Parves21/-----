const {spawn}=require('child_process');
const fs=require('fs');
const CH='C:/Program Files/Google/Chrome/Application/chrome.exe';
const ud=process.cwd()+'/_cdata2';
const proc=spawn(CH,['--headless=new','--disable-gpu','--no-sandbox ducts','--disable-extensions','--remote-debugging-port=9224','--user-data-dir='+ud,'--window-size=1400,900','about:blank'],{stdio:'ignore'});
const get=(u)=>new Promise((res,rej)=>{require('http').get(u,r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>res(d));}).on('error',rej)});
const start=Date.now();
setTimeout(async()=>{
  try{
    const j=JSON.parse(await get('http://127.0.0.1:9224/json/list'));
    const pg=j.find(x=>x.type==='page');
    fs.writeFileSync('_ws2.txt',pg.webSocketDebuggerUrl);
    console.log('WS '+pg.webSocketDebuggerUrl);
  }catch(e){console.log('ERR '+e.message)}
  setTimeout(()=>{try{proc.kill()}catch(e){}},300); process.exit(0);
},2500);
