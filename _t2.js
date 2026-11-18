const {spawn}=require('child_process');
const http=require('http');
const WebSocket=require('ws');
const CH='C:/Program Files/Google/Chrome/Application/chrome.exe';
const DP=9258;
const UD=process.cwd()+'/_cd3';
const proc=spawn(CH,['--headless=new','--disable-gpu','--no-sandbox','--disable-extensions','--remote-debugging-port='+DP,'--user-data-dir='+UD,'--window-size=1400,900','about:blank'],{stdio:'ignore'});
function get(u){return new Promise(function(res,rej){http.get(u,function(r){var d='';r.on('data',function(c){d+=c;});r.on('end',function(){res(d);});}).on('error',rej);});}
function sleep(ms){return new Promise(function(r){setTimeout(r,ms);});}
function out(k,v){console.log(k+' => '+JSON.stringify(v));}
(async function(){
  await sleep(2500);
  var list=JSON.parse(await get('http://127.0.0.1:'+DP+'/json/list'));
  var page=list.filter(function(x){return x.type==='page';})[0];
  var ws=new WebSocket(page.webSocketDebuggerUrl);
  var id=0,waits={};
  function send(m,p){return new Promise(function(res){var i=++id;waits[i]=res;ws.send(JSON.stringify({id:i,method:m,params:p||{}}));});}
  ws.on('message',function(m){var o=JSON.parse(m);if(o.id&&waits[o.id]){waits[o.id](o.result);delete waits[o.id];}});
  await new Promise(function(r){ws.on('open',r);});
  await send('Page.enable');await send('Runtime.enable');
  async function ev(code){
    var r=await send('Runtime.evaluate',{expression:'(function(){'+code+'})()',returnByValue:true,awaitPromise:true});
    if(r.exceptionDetails)return 'EXC:'+(r.exceptionDetails.exception?r.exceptionDetails.exception.description:r.exceptionDetails.text);
    return r.result?r.result.value:undefined;
  }
  await send('Page.navigate',{url:'http://127.0.0.1:8765/index.html'});
  await sleep(1500);
  out('nav',await ev('return Array.from(document.querySelectorAll("#dn .nv")).map(function(b){return b.textContent.trim()})'));
  out('dropdowns',await ev('return document.querySelectorAll("#dn .dd").length'));
  out('loggedOutBooks',await ev('return $("pd").innerHTML.indexOf("data-v=\\"books\\"")'));
  out('footerBooks',await ev('return $("ft").innerHTML.indexOf("data-v=\\"books\\"")'));
  out('courseGoesToClsn',await ev('show("course");return V'));
  out('loggedIn?',await ev('return !!(U)'));
  out('doAdmin',await ev('authM(false);$("le").value="nurislam42021@gmail.com";$("lp").value="Parves21";$("as").click();return "clicked"'));
  await sleep(800);
  out('U',await ev('return U&&U.email'));
  out('isAdmin',await ev('return isAdmin()'));
  out('V',await ev('return V'));
  out('nav2',await ev('return Array.from(document.querySelectorAll("#dn .nv")).map(function(b){return b.textContent.trim()})'));
  out('menuHasHelp',await ev('return $("pd").innerHTML.indexOf("data-m=\\"help\\"")>-1'));
  out('reportLB',await ev('return reportH().indexOf("id=\\"lb\\"")>-1'));
  out('reportPcard',await ev('return reportH().indexOf("id=\\"pcard\\"")>-1'));
  out('reportWeak',await ev('return reportH().indexOf("weakH")>-1 || document.body.innerHTML.indexOf("দুর্বল অধ্যায়")>-1'));
  out('helpM',await ev('return typeof helpM'));
  out('consoleErrs',await ev('return (window.__errs||[]).join("|")||"none"'));
  ws.close();proc.kill();process.exit(0);
})().catch(function(e){console.log('TESTERR '+e.message);try{proc.kill();}catch(_){}process.exit(0);});
