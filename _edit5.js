const fs=require('fs');
const p='index.html';
let s=fs.readFileSync(p,'utf8');
let fails=0;
function rep(oldSub,newSub,label){
  const c=s.split(oldSub).length-1;
  if(c!==1){console.log('FAIL '+label+': count='+c);fails++;return;}
  s=s.replace(oldSub,()=>newSub);console.log('OK '+label);
}

/* Pull Bengali strings straight from the existing file so nothing is retyped */
const B={
  help:s.match(/<button class="nv[^>]*><b>[^<]*<\/b>([^<]+)<em>/)?null:null
};
// grab existing labels from the old help dropdown if present, else from constants
const label=(re,fallback)=>{const m=s.match(re);return m?m[1]:fallback};
const HELP=label(/'<b>'\+ic\('help'[^)]*\)\+'([^']+)'/,null)||'সহায়তা';
const WA=label(/mi\(ic\('help'\),'([^']+)'/,null)||'হোয়াটসঅ্যাপ';
const DIR=label(/mi\(ic\('help'\),'[^']+','([^']+)'/,null)||'সরাসরি কথা বলুন';
const FBt=label(/mi\(ic\('users'\),'([^']+)'/,null)||'ফেসবুক';
const PGT=label(/mi\(ic\('users'\),'[^']+','([^']+)'/,null)||'পেজ ও কমিউনিটি';
const YT=label(/mi\(ic\('play'\),'([^']+)'/,null)||'ইউটিউব';
const VID=label(/mi\(ic\('play'\),'[^']+','([^']+)'/,null)||'ভিডিও ক্লাস';
const PRIV=label(/গোপনীয়তা/,null)?'গোপনীয়তা নীতি':'গোপনীয়তা ethics';
const PRIV2=label(/mi\(ic\('lock'\),'([^']+)'/,null)||'গোপনীয়তা নীতি';
const INFO=label(/mi\(ic\('lock'\),'[^']+','([^']+)'/,null)||'আপনার তথ্য কীভাবে ব্যবহার হয়';
const CLOSE=label(/<button class="bt g"[^>]*>([^<]+)<\/button>/,null)||'বন্ধ করুন';
console.log('labels:',HELP,WA,DIR,FBt,PGT,YT,VID,PRIV2,INFO,CLOSE);

/* helpM rewrite */
{
  const L=s.split('\n');
  const i0=L.findIndex(x=>x.startsWith('function helpM(){'));
  const i1=L.findIndex((x,i)=>i>i0 && x.startsWith('function foot(){'));
  if(i0<0||i1<0){console.log('FAIL helpM anchors');fails++;}
  else{
    const fn=[
      "function helpM(){var wl='https://wa.me/88'+CFG.wa;var h='<h3>'+ic('help',22)+'"+HELP+"</h3><div class=\"mg\">';",
      "h+=mi(ic('help'),'"+WA+"','"+DIR+"',{href:1,a:lk(wl)});",
      "h+=mi(ic('users'),'"+FBt+"','"+PGT+"',{href:1,a:lk(CFG.fb)});",
      "h+=mi(ic('play'),'"+YT+"','"+VID+"',{href:1,a:lk(CFG.yt)});",
      "h+=mi(ic('lock'),'"+PRIV2+"','"+INFO+"',{a:'data-hp=\"1\"'});",
      "h+='</div><div class=\"row\"><button class=\"bt g\" id=\"hmc\">'"+CLOSE+"</button></div>';",
      "modal(h);var bc=$('hmc');if(bc)bc.onclick=closeM;var pv=$('md').querySelector('[data-hp]');if(pv)pv.onclick=function(){closeM();show('privacy')};}"
    ];
    L.splice(i0,i1-i0,...fn);
    s=L.join('\n');
    console.log('OK helpM rewritten');
  }
}

/* menu: add Help button before logout in logged-in menu */
{
  const L=s.split('\n');
  const i=L.findIndex(x=>x.startsWith(' if(U)h+='));
  if(i<0){console.log('FAIL menuU');fails++;}
  else{
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
