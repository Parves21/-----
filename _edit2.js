const fs=require('fs');
const p='index.html';
let s=fs.readFileSync(p,'utf8');
let fails=0;
function rep(oldSub,newSub,label){
  const c=s.split(oldSub).length-1;
  if(c!==1){console.log('FAIL '+label+': count='+c);fails++;return;}
  s=s.replace(oldSub,newSub);console.log('OK '+label);
}

/* ---------- A. repair doLogin ---------- */
rep(
"if(FB)FB.a.signInWithEmailAndPassword(e,p).then(function(c){afterSignIn(c.user,AM.after);busy(false)}).catch(bad);\n else if(e===ADM.e&&p===ADM.p){var a={id:'admin-local',email:ADM.e,name:'Admin',wa:'',createdAt:Date.now(),paidUntil:Date.now()+36500*864e5,approved:true,h:''};us=ld('dtd_users')||{};us[e]=a;sv('dtd_users',us);sv('dtd_cur',e);setU(a);closeM();toast('অ্যাডমিন作为 admin লগইন সফল');if(AM.after)need(AM.after)}else \n else hash(p).then(",
"if(FB){FB.a.signInWithEmailAndPassword(e,p).then(function(c){afterSignIn(c.user,AM.after);busy(false)}).catch(bad);return}\n if(e===ADM.e&&p===ADM.p){var a={id:'admin-local',email:ADM.e,name:'Admin',wa:'',createdAt:Date.now(),paidUntil:Date.now()+36500*864e5,approved:true,h:''};us=ld('dtd_users')||{};us[e]=a;sv('dtd_users',us);sv('dtd_cur',e);busy(false);setU(a);closeM();toast('অ্যাডমিন লগইন সফল');if(AM.after)need(AM.after);return}\n hash(p).then(",
'doLogin repaired');

/* ---------- B. helpM privacy action ---------- */
rep("mi(ic('lock'),'গোপনীয়তা নীতি','আপনার তথ্য কীভাবে ব্যবহার হয়',{a:'data-v=\"privacy\" onclick=\"closeM()\"'})",
    "mi(ic('lock'),'গোপনীয়তা নীতি','আপনার তথ্য কীভাবে ব্যবহার হয়',{a:'onclick=\"closeM();show(\\'privacy\\')\"'})",
    'helpM privacy action');

/* ---------- C. books require login ---------- */
rep("else if(v==='books')h=",
    "else if(v==='books'&&!U){h='<section><div class=\"w\"><h2>বই</h2><p class=\"sb\">বই দেখতে লগইন করুন।</p><button class=\"bt\" data-a=\"auth\">লগইন / অ্যাকাউন্ট খুলুন</button></div></section>'}else if(v==='books')h=",
    'books gate login');
rep("else if(v==='book'){var s=D[x];",
    "else if(v==='book'&&!U){h='<section><div class=\"w\"><h2>বই</h2><p class=\"sb\">বই দেখতে লগইন করুন।</p><button class=\"bt\" data-a=\"auth\">লগইন / অ্যাকাউন্ট খুলুন</button></div></section>'}else if(v==='book'){var s=D[x];",
    'book gate login');

/* ---------- D. learning report: progress card + leaderboard ---------- */
rep(
"return '<section><div class=\"w\"><div class=\"rph\"><button class=\"back\" data-a=\"go\" data-v=\"profile\" aria-label=\"পেছনে\">'+ic('left',24)+'</button><h2>লার্নিং এক্টিভিটি</h2></div><div class=\"rpg\" id=\"rpc\"></div></div></section>'}",
"return '<section><div class=\"w\"><div class=\"rph\"><button class=\"back\" data-a=\"go\" data-v=\"profile\" aria-label=\"পেছনে\">'+ic('left',24)+'</button><h2>লার্নিং এক্টিভিটি</h2></div><div class=\"pcd\" id=\"pcard\"></div><div class=\"rpg\" id=\"rpc\"></div><div class=\"ch\"><h3>🏆 এই মাসের লিডারবোর্ড</h3><div id=\"lb\">লোড হচ্ছে...</div><div id=\"mys\"></div><div id=\"mvb\"></div></div></div></section>'}",
'report adds progress+leaderboard');

/* fill them when the report view opens */
rep(
"if(v==='report'&&U){rpR();actLoad(rpR)}",
"if(v==='report'&&U){var pc0=$('pcard');if(pc0)pc0.innerHTML=progCard();loadLB();rpR();actLoad(rpR)}",
'report fills pcard+leaderboard');

fs.writeFileSync(p,s);
console.log(fails?('FAILURES='+fails):'PHASE2 DONE');
