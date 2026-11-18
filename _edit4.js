const fs=require('fs');
const p='index.html';
let s=fs.readFileSync(p,'utf8');
let fails=0;
function rep(oldSub,newSub,label){
  const c=s.split(oldSub).length-1;
  if(c!==1){console.log('FAIL '+label+': count='+c);fails++;return;}
  s=s.replace(oldSub,()=>newSub);console.log('OK '+label);
}
const bnHelp='সহায়তা'; // <- placeholder, replaced below

/* helpM rewrite (ASCII-safe) */
{
  const L=s.split('\n');
  const i0=L.findIndex(x=>x.startsWith('function helpM(){'));
  const i1=L.findIndex((x,i)=>i>i0 && x.startsWith('function foot(){'));
  if(i0<0||i1<0){console.log('FAIL helpM anchors');fails++;}
  else{
    const HELP='সহায়তা';
    const WA='হোয়াট্সঅ্যাপ';
    const DIR='সরাসরি কথা বলুন';
    const FB='ফেসবুক';
    const PG='পে\u09Ьজ ও কমিয়নিটি';
    const YT='ইউটুব';
    const VID='ভিডিও ক্লাস';
    const PRIV='গোপনীয়তা নীতি';
    const INFO='আপনার তথ্য কীভাবে ব্যবহার হয়';
    const CLOSE='বন্ধ করুন';
    const fn=[
      "function helpM(){var wl='https://wa.me/88'+CFG.wa;var h='<h3>'+ic('help',22)+'"+HELP+"</h3><div class=\"mg\">';",
      "h+=mi(ic('help'),'"+WA+"','"+DIR+"',{href:1,a:lk(wl)});",
      "h+=mi(ic('users'),'"+FB+"','"+PG+"',{href:1,a:lk(CFG.fb)});",
      "h+=mi(ic('play'),'"+YT+"','"+VID+"',{href:1,a:lk(CFG.yt)});",
      "h+=mi(ic('lock'),'"+PRIV+"','"+INFO+"',{a:'data-hp=\"1\"'});",
      "h+='</div><div class=\"row\"><button class=\"bt g\" id=\"hmc\">'"+CLOSE+"</button></div>';",
      "modal(h);var bc=$('hmc');if(bc)bc.onclick=closeM;var pv=$('md').querySelector('[data-hp]');if(pv)pv.onclick=function(){closeM();show('privacy')};}"
    ];
    L.splice(i0,i1-i0,...fn);
    s=L.join('\n');
    console.log('OK helpM rewritten');
  }
}

/* logged-in menu: add Help button before logout */
{
  const L=s.split('\n');
  const i=L.findIndex(x=>x.startsWith(' if(U)h+='));
  if(i<0){console.log('FAIL menuU');fails++;}
  else{
    const HELP='সহায়তা';
    const helpBtn="<button data-m=\"help\">'+ic('help',18)+'"+HELP+"</button>";
    const marker="+'<button data-m=\"out\">";
    const k=L[i].indexOf(marker);
    if(k<0){console.log('FAIL menuU marker');fails++;}
    else{L[i]=L[i].slice(0,k)+helpBtn+L[i].slice(k);console.log('OK menu: help added');s=L.join('\n');}
  }
}

rep("else if(v==='admin'){h=isStaff()?adminH():","else if(v==='admin'){h=(isStaff()||isAdmin())?adminH():",'admin view gate');
rep("if(v==='admin'&&isStaff()){edR();loadPay();loadReq();ntAL();if(isAdmin())loadUsers()}",
    "if(v==='admin'&&(isStaff()||isAdmin())){edR();if(FB){loadPay();loadReq()}ntAL();if(isAdmin()&&FB)loadUsers()}",
    'admin boot loaders');
rep("function access(){var n=Date.now();if(!U)return false;if(isStaff())return true;",
    "function access(){var n=Date.now();if(!U)return false;if(isStaff()||isAdmin())return true;",
    'access admin');
rep("function setU(u){U=u;nav();setMenu();bellR();actInit();if(V==='profile'||V==='admin')show(V==='admin'&&!isStaff()?'home':V)}",
    "function setU(u){U=u;nav();setMenu();bellR();actInit();if(V==='profile'||V==='admin')show(V==='admin'&&!(isStaff()||isAdmin())?'home':V)}",
    'setU admin');
rep(" if(isStaff())d+='<button class=\"nv'+(on('admin')?' on':'')+'\" data-v=\"admin\">",
    " if(isStaff()||isAdmin())d+='<button class=\"nv'+(on('admin')?' on':'')+'\" data-v=\"admin\">",
    'nav admin btn');

fs.writeFileSync(p,s);
console.log(fails?('FAILURES='+fails):'PHASE4 DONE');
