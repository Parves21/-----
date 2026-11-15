const fs=require('fs');
const p='index.html';
let h=fs.readFileSync(p,'utf8');
const orig=h;

// ১) প্রোফাইলে প্রগ্রেস কার্ড বসানো
const anchor1=`<div id="mys"></div><div id="wk">`;
const new1=`<div id="mys">${''}</div><div class="pcd" style="margin-bottom:16px" id="pcard"></div><div id="wk">`;
if(h.includes(anchor1)&&!h.includes('id="pcard"')){h=h.replace(anchor1,new1);console.log('progress card slot added');}
else console.log('!! pcard slot issue');

// ২) profH-এ কার্ড ভরানো (render সময়)
const anchor2=`(U.loading?'':st)<div id="mys">`;
const new2=`(U.loading?'':st)<div id="mys">`;
if(h.includes(anchor2)){
  // পুরো প্রতিস্থাপন: st-এর পরে pcard যোগ
  const rep=`${anchor2}`;
  h=h.replace(rep,`(U.loading?'':st)+progCard()+<div id="mys">`);
  console.log('progCard() inserted into profH');
} else console.log('!! progCard insert issue');

// ৩) reportIssue() ফাংশন যোগ
const fnAnchor=`function progStats(){`;
const newFn=`function reportIssue(){ /* "সমস্যা জানান" — হোয়াটসঅ্যাপে লিংক */
 var msg='সমস্যা জানাতে চাই: ';
 if(FB&&U){modal('<h3>'+ic('flag',20)+' সমস্যা জানান</h3><p>আপনার সমস্যাটি লিখুন — আমরা যত দ্রুত সম্ভব ঠিক করব।</p><label>বিবরণ<textarea id="rp2" rows="4" placeholder="কী সমস্যা হয়েছে..."></textarea></label><div class="er" id="rp3"></div><div class="row"><button class="bt" id="rp4">হোয়াটসঅ্যাপে পাঠান</button><button class="bt g" onclick="closeM()">বাতিল</button></div>');
  $('rp4').onclick=function(){var t=$('rp2').value.trim(),m=$('rp3');if(t.length<5){m.textContent='কিছু লিখুন।';return}
   var u='https://wa.me/88'+CFG.wa+'?text='+encodeURIComponent(msg+t+'\\n\\nইমেইল: '+(U.email||''));
   window.open(u,'_blank','noopener');closeM();toast('হোয়াটসঅ্যাপে পাঠানো হলো')};
 } else {
  var u2='https://wa.me/88'+CFG.wa+'?text='+encodeURIComponent(msg);
  window.open(u2,'_blank','noopener');
 }
}
function progStats(){`;
if(h.includes(fnAnchor)&&!h.includes('function reportIssue()')){h=h.replace(fnAnchor,newFn);console.log('reportIssue added');}
else console.log('!! reportIssue issue');

// ৪) নেভিগেশনে "প্রগ্রেস" লিংক — প্রোফাইল মেনুতে
const menuAnchor=`<button data-v="report">'+ic('chart',18)+' লার্নিং রিপোর্ট</button>`;
const menuNew=`<button data-v="report">'+ic('chart',18)+' লার্নিং রিপোর্ট</button><button data-v="clsn">'+ic('course',18)+' ভিডিও ক্লাস</button>`;
if(h.includes(menuAnchor)&&!h.includes("লার্নিং রিপোর্ট</button><button data-v=\"clsn\"")){h=h.replace(menuAnchor,menuNew);console.log('menu item added');}
else console.log('!! menu issue');

if(h!==orig){fs.writeFileSync(p,h,'utf8');console.log('written');}
else console.log('NO CHANGE');
