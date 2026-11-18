const fs=require('fs');
const F='index.html';
let s=fs.readFileSync(F,'utf8');
let fails=0;
function rep(oldSub,newSub,label){
  const c=s.split(oldSub).length-1;
  if(c!==1){console.log('FAIL '+label+': count='+c);fails++;return;}
  s=s.replace(oldSub,()=>newSub);console.log('OK '+label);
}

/* A. footer: drop public Books link */
rep('<button data-v="books">বই</button><button data-v="mcq">','<button data-v="mcq">','footer books link');

/* B. admin panel: hide Firebase-only cards in local mode */
rep(
"/><div class=\"ch\"><h3>পেমেন্ট যাচাই</h3><div id=\"pl2\">লোড হচ্ছে...</div></div><div class=\"ch\"><h3>নতুন অ্যাকাউন্টের অনুমোদন</h3>",
"/>'+(FB?'<div class=\"ch\"><h3>পেমেন্ট যাচাই</h3><div id=\"pl2\">লোড হচ্ছে...</div></div><div class=\"ch\"><h3>নতুন অ্যাকাউন্টের অনুমোদন</h3>",
'admin pay card open');

/* the rest of that concatenation closes before usersCard/resetCard */
rep(
"<div id=\"rq\">লোড হচ্ছে...</div></div>'+(isAdmin()?usersCard():'')+resetCard()+",
"<div id=\"rq\">লোড হচ্ছে...</div></div>':'')+(isAdmin()&&FB?usersCard():'')+(FB?resetCard():'')+",
'admin cards close');

/* C. after admin login open the admin panel */
rep(
"busy(false);setU(a);closeM();toast('অ্যাডমিন লগইন সফল');if(AM.after)need(AM.after);return}",
"busy(false);setU(a);closeM();show('admin');toast('অ্যাডমিন লগইন সফল');return}",
'admin login -> panel');

fs.writeFileSync(F,s);
console.log(fails?('FAILURES='+fails):'PHASE7 DONE');
