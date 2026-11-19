const {spawn}=require('child_process');
const http=require('http');
const fs=require('fs');
const WebSocket=require('ws');
const CH='C:/Program Files/Google/Chrome/Application/chrome.exe';
const DP=9262;
const UD=process.cwd()+'/_cd6';
const proc=spawn(CH,['--headless=new','--disable-gpu','--no-sandbox','--disable-extensions','--hide-scrollbars','--remote-debugging-port='+DP,'--user-data-dir='+UD,'--window-size=1401,900','about:blank'],{stdio:'ignore'});
function get(u){return new Promise(function(res,rej){http.get(u,function(r){var d='';r.on('data',function(c){d+=c;});r.on('end',function(){res(d);});}).on('error',rej);});}
function sleep(ms){return new Promise(function(r){setTimeout(r,ms);});}
(async function(){
  await sleep(2200);
  var list=JSON.parse(await get('http://127.0.0.1:'+DP+'/json/list'));
  var page=list.filter(function(x){return x.type==='page';})[0];
  var ws=new WebSocket(page.webSocketDebuggerUrl);
  var id=0,waits={};
  function send(m,p){return new Promise(function(res){var i=++id;waits[i]=res;ws.send(JSON.stringify({id:i,method:m,params:p||{}}));});}
  ws.on('message',function(m){var o=JSON.parse(m);if(o.id&&waits[o.id]){waits[o.id](o.result);delete waits[o.id];}});
  await new Promise(function(r){ws.on('open',r);});
  await send('Page.enable');await send('Runtime.enable');
  async function ev(code){var r=await send('Runtime.evaluate',{expression:'(function(){'+code+'})()',returnByValue:true,awaitPromise:true});if(r.exceptionDetails)return 'EXC:'+(r.exceptionDetails.exception?r.exceptionDetails.exception.description:r.exceptionDetails.text);return r.result?r.result.value:undefined;}
  async function shot(f){var r=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(f,Buffer.from(r.data,'base64'));console.log('shot '+f);}
  await send('Page.navigate',{url:'http://127.0.0.1:8765/index.html'});await sleep(1600);
  console.log('nav='+JSON.stringify(await ev('return Array.from(document.querySelectorAll("#dn .nv")).map(function(b){return b.textContent.trim()})')));
  console.log('dropdowns='+await ev('return document.querySelectorAll("#dn .dd").length'));
  console.log('logoPanelOut_books='+await ev('return $("pd").innerHTML.indexOf("data-v=\\"books\\"")'));
  console.log('logoPanelOut_help='+await ev('return $("pd").innerHTML.indexOf("data-m=\\"help\\"")'));
  console.log('footer_books='+await ev('return $("ft").innerHTML.indexOf("data-v=\\"books\\"")'));
  await ev('show("clsn");return V');
  await sleep(500);
  console.log('clsnH2='+await ev('var e=document.querySelector("#app h2");return e?e.textContent:""'));
  await shot('shot_clsn.png');
  await ev('show("report");return V');
  await sleep(500);
  console.log('reportNoLogin='+await ev('return document.querySelector("#app").textContent.slice(0,80)'));
  ws.close();proc.kill();process.exit(0);
})().catch(function(e){console.log('ERR '+e.message);try{proc.kill();}catch(_){}process.exit(0);});
