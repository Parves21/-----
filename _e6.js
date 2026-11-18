const fs=require('fs');
const F='index.html';
let s=fs.readFileSync(F,'utf8');
let fails=0;
function rep(oldSub,newSub,label){
  const c=s.split(oldSub).length-1;
  if(c!==1){console.log('FAIL '+label+': count='+c);fails++;return;}
  s=s.replace(oldSub,()=>newSub);console.log('OK '+label);
}

rep('<div class="pcd" id="pcard"></div>','<div id="pcard"></div>','report pcard container');

rep(
"function saveSite(msg){var cf={};KEYS.forEach(function(k){cf[k]=CFG[k]});\n",
"function saveSite(msg){var cf={};KEYS.forEach(function(k){cf[k]=CFG[k]});\n"+
"if(!FB){try{localStorage.setItem('dtd_content',JSON.stringify({v:CV,cfg:cf,books:D}))}catch(e){}foot();nav();if($('am')){$('am').textContent=msg||'সেভ হয়েছে (এই ডিভাইসে)।';$('am').style.color='var(--ok)'}return Promise.resolve()}\n",
'saveSite local');

rep(
"function admin2(a,b){var m=$('am');",
"function admin2(a,b){var m=$('am');if(!FB&&/^(nt|ntd|rl|rs|ap|au)$/.test(a)){m.textContent='ডেমো মোডে এটি সম্ভব নয় (Firebase সংযোগ নেই)। সেটিংস, বই, অধ্যায় ও প্রশ্ন সম্পাদনা এখানে কাজ করে।';m.style.color='var(--bad)';return true}",
'admin2 local guard');

fs.writeFileSync(F,s);
console.log(fails?('FAILURES='+fails):'PHASE6 DONE');
