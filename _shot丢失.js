const {spawn}=require('child_process');
const http=require('http');
const fs=require('fs');
const WebSocket=require('ws');
const CH='C:/Program Files/Google/Chrome/Application/chrome.exe';
const DP=9264;
const UD=process.cwd()+'/_cd7';
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
  await sleep(1600);
  await ev('show("report");return V');await sleep(500);
  await shot('shot_report_loggedout.png');
  await ev('show("home");return V');await sleep(300);
  await ev('authM(false);return "ok"');await sleep(400);
  await ev('var t=document.querySelector("#md h3");return t?t.textContent:.textContent.slice(0,60)');
  await shot('shot_login.png');
  await ev('$("le").value="nurislam42021@gmail.com";$("lp").value="Parves21";$("as").click();return "ok"');await sleep(900);
  console.log('Vafter='+await ev('return V'));
  await shot('shot_admin.png');
  await ev('show("report");return V');await sleep(800);
  await shot('shot_report.png');
  await ev('show("books");return V');await sleep(300);
  console.log('booksAfterLogin='+await ev('return document.querySelector("#app h2")&&document.querySelector("#app h2").textContent'));