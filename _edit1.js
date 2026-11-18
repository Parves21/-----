const fs=require('fs');
const p='index.html';
let s=fs.readFileSync(p,'utf8');
let fails=0;
function rep(oldSub,newSub,label){
  const c=s.split(oldSub).length-1;
  if(c!==1){console.log('FAIL '+label+': count='+c);fails++;return;}
  s=s.replace(oldSub,newSub);console.log('OK '+label);
}
function repAll(oldSub,newSub,label){
  const c=s.split(oldSub).length-1;
  if(c<1){console.log('FAIL '+label+': count='+c);fails++;return;}
  s=s.split(oldSub).join(newSub);console.log('OK '+label+' x'+c);
}

/* ---------- 1. NAV ---------- */
// course dropdown -> direct button
{
  const lines=s.split('\n');
  const i=lines.findIndex(l=>l.includes("on('course')")&&l.includes('data-v="course"')&&l.includes('CFG.courses'));
  if(i<0){console.log('FAIL nav course line');fails++;}
  else{
    lines[i]=" d+='<button class=\"nv'+((on('course')||on('clsn'))?' on':'')+'\" data-v=\"clsn\"><b>'+ic('course')+'</b>"+'কোর্স</button>'+"';";
    console.log('OK nav course->clsn (line '+(i+1)+')');
    s=lines.join('\n');
  }
}
// drop help dropdown
{
  const lines=s.split('\n');
  const i=lines.findIndex(l=>l.includes("on('privacy')")&&l.includes('সহায়তা'));
  if(i<0){console.log('FAIL nav help line');fails++;}
  else{console.log('OK help dropdown removed (line '+(i+1)+')');lines[i]='';s=lines.join('\n');}
}
// mobile bottom bar course -> clsn
rep('["course","কোর্স","course"]','["clsn","কোর্স","course"]','mobile bar');

/* ---------- 2. setMenu: profile dropdown ---------- */
{
  const lines=s.split('\n');
  const i=lines.findIndex(l=>l.startsWith(' if(U)h+=')&&l.includes('data-v="profile"'));
  const j=lines.findIndex(l=>l.startsWith(' else h+=')&&l.includes('data-m="reg"'));
  if(i<0||j<0){console.log('FAIL setMenu i='+i+' j='+j);fails++;}
  else{
    // logged-in: after report button, ensure books + help entries exist
    let L=lines[i];
    if(!L.includes('data-v="books"')){
      // insert books + help before admin part
      const anchor="+(isStaff()?";
      const k=L.indexOf(anchor);
      const ins="<button data-v=\"books\">'+ic('book',18)+'"+'বই'+"</button>"+
                "<button data-m=\"help\">'+ic('help',18)+'"+'সহায়তা'+"</button>"+anchor;
      L=L.slice(0,k)+ins+L.slice(k);
      console.log('OK logged-in menu: books+help added');
    }
    // logged-out: remove the standalone books button
    let E=lines[j];
    E=E.replace(/<button data-v="books">'\+ic\('book',18\)\+'[^']*'<\/button>/,'').replace(/<button data-v="books">[^<]*<\/button>/,'');
    if(E.includes('data-v="books"')){
      // fallback: remove via regex on the tail
      E=E.replace(/<button data-v="books">.*?<\/button>/,'');
    }
    if(E.includes('data-v="books"')){console.log('WARN logged-out books still present');}
    else console.log('OK logged-out menu: books removed');
    lines[i]=L;lines[j]=E;s=lines.join('\n');
  }
}
// menu click handler: add help modal action
rep("else if(t.dataset.m==='login')authM(false);else if(t.dataset.m==='reg')authM(true);",
    "else if(t.dataset.m==='login')authM(false);else if(t.dataset.m==='reg')authM(true);else if(t.dataset.m==='help')helpM();",
    'menu handler help');

/* ---------- 3. show(): course view -> redirect to clsn ---------- */
rep("else if(v==='course')h=","else if(v==='course'){show('clsn');return}else if(0)h=",'course view redirect');
// initFB re-show regex
rep("/^(home|books|mcq|cq|course)$/.test(V)","/^(home|books|mcq|cq|clsn)$/.test(V)",'initFB regex');
// courseH back button
rep("data-a=\"go\" data-v=\"course\">","data-a=\"go\" data-v=\"clsn\">",'courseH back');

/* ---------- 4. admin login (local/demo mode) ---------- */
rep("var $=function(i){return document.getElementById(i)},U=null,L={},V='home',FB=null,AB=0,AC=0,PY={};",
    "var $=function(i){return document.getElementById(i)},U=null,L={},V='home',FB=null,AB=0,AC=0,PY={},ADM={e:'nurislam42021@gmail.com',p:'Parves21'};",
    'ADM const');
// isAdmin: local fallback
rep("function isAdmin(){var e=FB&&FB.a.currentUser&&FB.a.currentUser.email;",
    "function isAdmin(){var e=FB&&FB.a.currentUser&&FB.a.currentUser.email;if(!e&&U&&U.email&&!FB)e=U.email;",
    'isAdmin local email');
rep("return !!(e&&CFG.admin&&e.toLowerCase()===CFG.admin.toLowerCase())}",
    "return !!(e&&((CFG.admin&&e.toLowerCase()===CFG.admin.toLowerCase())||(e.toLowerCase()===ADM.e)))}",
    'isAdmin ADM check');
// local login: grant admin when credentials match
rep("if(FB)FB.a.signInWithEmailAndPassword(e,p).then(function(c){afterSignIn(c.user,AM.after);busy(false)}).catch(bad);",
    "if(FB)FB.a.signInWithEmailAndPassword(e,p).then(function(c){afterSignIn(c.user,AM.after);busy(false)}).catch(bad);\n else if(e===ADM.e&&p===ADM.p){var a={id:'admin-local',email:ADM.e,name:'Admin',wa:'',createdAt:Date.now(),paidUntil:Date.now()+36500*864e5,approved:true,h:''};us=ld('dtd_users')||{};us[e]=a;sv('dtd_users',us);sv('dtd_cur',e);setU(a);closeM();toast('অ্যাডমিন作为 admin লগইন সফল');if(AM.after)need(AM.after)}else ",
    'local admin login');
// local signup: block admin email
rep("else hash(p).then(function(h){us=ld('dtd_users')||{};if(us[e]){bad({code:'auth/email-already-in-use'});return}",
    "else if(e===ADM.e){bad({code:'auth/email-already-in-use'});return}else hash(p).then(function(h){us=ld('dtd_users')||{};if(us[e]){bad({code:'auth/email-already-in-use'});return}",
    'block admin signup');
// boot: restore admin session
rep("if(CFG.firebase.apiKey){if(window.firebase)initFB()}else{us=ld('dtd_users')||{};var cu=ld('dtd_cur');if(cu&&us[cu])setU(us[cu])}",
    "if(CFG.firebase.apiKey){if(window.firebase)initFB()}else{us=ld('dtd_users')||{};var cu=ld('dtd_cur');if(cu&&us[cu])setU(us[cu]);if(cu===ADM.e&&(!us[cu]||us[cu].h==null)){us[cu]=us[cu]||{};us[cu].id='admin-local';us[cu].email=ADM.e;us[cu].name=us[cu].name||'Admin';us[cu].paidUntil=Date.now()+36500*864e5;us[cu].approved=true;sv('dtd_users',us);setU(us[cu])}}",
    'boot admin restore');

/* ---------- 5. help modal ---------- */
{
  const anchor="function foot(){";
  const i=s.indexOf(anchor);
  if(i<0){console.log('FAIL foot anchor');fails++;}
  else{
    const helpFn=
"function helpM(){var wl='https://wa.me/88'+CFG.wa;modal('<h3>'+ic('help',22)+'posted fresno Airways</h3>'+\n"+
"'<div class=\"mg\">'+\n"+
"mi(ic('help'),'হোয়াটসঅ্যাপ','সরাসরি কথা বলুন',{href:1,a:lk(wl)}) +\n"+
"mi(ic('users'),'ফেসবুক','পেজ ও কমিউনিটি',{href:1,a:lk(CFG.fb)}) +\n"+
"mi(ic('play'),'ইউটিউব','비ificio ক্লাস',{href:1,a:lk(CFG.yt)}) +\n"+
"mi(ic('lock'),'গোপনীয়তা নীতি','আপনার তথ্য কীভাবে ব্যবহার হয়',{a:'data-v=\"privacy\" onclick=\"closeM()\"'}) +\n"+
"'</div><div class=\"row\"><button class=\"bt g\" onclick=\"closeM()\">বন্ধ করুন</button></div>')}\n";
    // fix the two accidental foreign tokens programmatically
    let fn=helpFn.replace('posted fresno Airways','সহায়তা').replace('비ificio ক্লাস','ভিডিও ক্লাস');
    s=s.slice(0,i)+fn+s.slice(i);
    console.log('OK helpM added');
  }
}

fs.writeFileSync(p,s);
console.log(fails?('FAILURES='+fails):'PHASE DONE');
