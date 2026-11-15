/* ===== ধাপ ৪: কোর্স লার্নিং পেজ — ডেটা ও ফাংশন ===== */
/* কোর্সের অধ্যায়-ভিত্তিক ভিডিও ডেটা: অ্যাডমিন প্যানেল থেকে CFG.videos দিয়ে সেভ হয় */
var CV1={bk:0,ch:0,ls:0}; /* বর্তমান বই/অধ্যায়/লেসন সূচক */
function courseLessons(bi,ci){ /* নির্বাচিত অধ্যায়ের লেসন তালিকা বানায় */
 var b=D[bi];if(!b)return[];
 var c=b.ch[ci];if(!c)return[];
 var out=[];
 (c.v||[]).forEach(function(v,i){out.push({t:v[0]||('লেসন '+(i+1)),u:v[1]||'',d:'',dur:0})});
 if(!out.length){ /* ভিডিও না থাকলে অধ্যায়ের নোট/পরীক্ষা থেকে লেসন বানাও */
  out.push({t:c.t||'অধ্যায়',u:'',d:c.nt||'',dur:0,note:true});
 }
 return out;
}
function ytId(u){ /* ইউটিউব লিংক থেকে ভিডিও আইডি বের করে */
 if(!u)return'';
 var m=u.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
 return m?m[1]:'';
}
function ytEmb(u){ /* youtube-nocookie এমবেড ইউরল বানায় */
 var id=ytId(u);if(!id)return'';
 return 'https://www.youtube-nocookie.com/embed/'+id+'?rel=0&modestbranding=1';
}
function courseH(){ /* কোর্স লেসন পেজের HTML */
 if(!D.length)return'<section><div class="w"><h2>কোর্স</h2><p class="sb">এখনো কোনো অধ্যায় যোগ করা হয়নি।</p></div></section>';
 var bi=CV1.bk,ci=CV1.ch;
 if(bi>=D.length)bi=0; if(!D[bi].ch.length)bi=0;
 if(ci>=D[bi].ch.length)ci=0;
 var b=D[bi],ls=courseLessons(bi,ci),cur=CV1.ls;
 if(cur>=ls.length)cur=0;
 var L=ls[cur];
 var done=clDone();
 /* সিলেবাস: সব অধ্যায়ের লেসন */
 var groups=b.ch.map(function(c,j){var l=courseLessons(bi,j);return{t:c.t,n:l.length,idx:j,done:(done['b'+bi+'c'+j]||0)}});
 var totD=0;for(var k in done)totD++;
 var total=0;groups.forEach(function(g){total+=g.n});
 var pct=total?Math.round(totD/total*100):0;
 var h='<section><div class="w"><button class="back" data-a="go" data-v="course">'+ic('left',16)+' সব কোর্স</button>';
 h+='<h2>'+esc(b.n)+' · '+esc(b.ch[ci].t)+'</h2>';
 h+='<p class="sb">ভিডিও দেখুন, নোট পড়ুন এবং লেসন শেষ হলে সম্পন্ন হিসেবে চিহ্নিত করুন।</p>';
 h+='<div class="clp"><div>';
 /* ভিডিও প্লেয়ার */
 var emb=L.u?ytEmb(L.u):'';
 if(emb)h+='<div class="clv"><iframe src="'+esc(emb)+'" title="'+esc(L.t)+'" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>';
 else h+='<div class="clv"><div class="clvb">'+ic('course',44)+'<b>এই লেসনে ভিডিও নেই</b><span>নোট পড়ুন ও পরীক্ষা দিন, অথবা ইউটিউবে খুঁজুন।</span><a class="bt sm" target="_blank" rel="noopener" href="'+esc(CFG.yt)+'/search?query='+encodeURIComponent(L.t)+'">'+ic('play',16)+' ইউটিউবে খুঁজুন</a></div></div>';
 /* লেসনের বিবরণ ও অ্যাকশন */
 h+='<div class="clvd"><h3>'+bn(cur+1)+'. '+esc(L.t)+'</h3>';
 h+='<p>'+esc(L.d||b.ch[ci].nt||'এই লেসনের বিবরণ এখনো যোগ করা হয়নি।')+'</p>';
 h+='<div class="clvact">';
 h+='<button class="bt sm g" data-a="n" data-i="'+bi+'" data-c="'+ci+'">'+ic('download',16)+' নোট ডাউনলোড</button>';
 h+='<button class="bt sm g" data-a="e" data-i="'+bi+'" data-c="'+ci+'" data-t="m">'+ic('mcq',16)+' এমসিকিউ</button>';
 h+='<button class="bt sm g" data-a="e" data-i="'+bi+'" data-c="'+ci+'" data-t="c">'+ic('cq',16)+' সিকিউ</button>';
 h+='<button class="bt sm g" data-a="rpt">'+ic('flag',16)+' সমস্যা জানান</button>';
 h+='</div></div>';
 /* শেষ/পরের লেসন */
 h+='<div class="clnav">';
 h+='<button class="bt g" data-a="cls" data-d="-1"'+(cur>0?'':' disabled style="opacity:.45"')+'>'+ic('left',16)+' আগের লেসন</button>';
 h+='<button class="bt" data-a="clc" data-b="'+bi+'" data-c="'+ci+'" data-l="'+cur+'">'+ic('check',16)+' সম্পন্ন হিসেবে চিহ্নিত করুন</button>';
 h+='<button class="bt g" data-a="cls" data-d="1"'+(cur<ls.length-1?'':' disabled style="opacity:.45"')+'>পরের লেসন '+ic('right',16)+'</button>';
 h+='</div></div>';
 /* সিলেবাস সাইডবার */
 h+='<aside class="cly"><div class="clyh"><h3>কোর্স সিলেবাস</h3><p>'+esc(b.n)+' · অধ্যায় ধরে ভিডিও</p>';
 h+='<div class="clyp"><span>সম্পন্ন</span><b>'+bn(pct)+'%</b></div><div class="clpg"><i style="width:'+pct+'%"></i></div></div>';
 h+='<div class="clyl">';
 groups.forEach(function(g,j){
  var open=j===ci;
  h+='<div class="clgrp'+(open?' open':'')+'">';
  h+='<button class="clgt" data-a="clg" data-b="'+bi+'" data-c="'+j+'" aria-expanded="'+(open?'true':'false')+'"><b>'+bn(j+1)+'. '+esc(g.t)+'</b><em>'+bn(g.done)+'/'+bn(g.n)+'</em><span class="car">'+ic('right',16)+'</span></button>';
  h+='<div class="clgl">';
  if(g.n){courseLessons(bi,j).forEach(function(l,k){
   var kk='b'+bi+'c'+j+'l'+k,dn=done[kk]?1:0,sel=(j===ci&&k===cur);
   h+='<button class="clli'+(sel?' on':'')+(dn?' done':'')+'" data-a="cll" data-b="'+bi+'" data-c="'+j+'" data-l="'+k+'">';
   h+='<span class="clst">'+ic(dn?'check':'play',13)+'</span><b>'+esc(l.t)+'</b>';
   h+='<span class="cllk">'+ic('clock',13)+'</span></button>';
  })}
  else h+='<div style="padding:8px 14px;color:var(--mu);font-size:14px">এই অধ্যায়ে এখনো লেসন যোগ হয়নি।</div>';
  h+='</div></div>';
 });
 h+='</div></aside></div></div></section>';
 return h;
}
/* লেসন সম্পন্নের অবস্থা (লোকাল + ফায়ারবেস) */
function clKey(){return 'dtd_cl_'+(U?U.id:'anon')}
function clDone(){var s=ld(clKey());return s||{}}
function clSet(k,v){var s=clDone();s[k]=v?1:0;sv(clKey(),s);if(FB&&U){FB.d.collection('users').doc(U.id).set({courseDone:s,at:Date.now()},{merge:true}).catch(function(){})}}
function clToggle(bi,ci,li){var k='b'+bi+'c'+ci+'l'+li;var s=clDone();s[k]=s[k]?0:1;sv(clKey(),s);if(FB&&U){FB.d.collection('users').doc(U.id).set({courseDone:s,at:Date.now()},{merge:true}).catch(function(){})}return!!s[k]}
/* ===== ধাপ ৫: প্রগ্রেস কার্ড ===== */
function progStats(){ /* ডেটা থেকে প্রগ্রেস হিসাব */
 var nb=D.length,nc=0,nq=0,nm=0;
 D.forEach(function(b){nc+=b.ch.length;b.ch.forEach(function(c){nm+=(c.mc||[]).length;nq+=(c.cq||[]).length})});
 var h=ld('dtd_h_'+(U?U.id:''))||[],solved=0,total=0;
 h.forEach(function(x){solved+=x.s||0;total+=x.n||0});
 var acc=total?Math.round(solved/total*100):0;
 return{nb:nb,nc:nc,nm:nm,nq:nq,solved:solved,total:total,acc:acc,exams:h.length};
}
function progCard(){ /* প্রগ্রেস কার্ডের HTML */
 var s=progStats();
 var ringPct=Math.min(100,s.acc);
 var C=2*Math.PI*52,off=C*(1-ringPct/100);
 var h='<div class="pcd"><div class="pring"><svg viewBox="0 0 120 120" aria-hidden="true">';
 h+='<circle class="bg" cx="60" cy="60" r="52"></circle>';
 h+='<circle class="fg" cx="60" cy="60" r="52" stroke-dasharray="'+C.toFixed(1)+'" stroke-dashoffset="'+off.toFixed(1)+'"></circle>';
 h+='</svg><div class="mid"><div><b>'+bn(ringPct)+'%</b><span>সিলেবাস সম্পন্ন</span></div></div></div>';
 h+='<div class="pcl"><h3>আমার অগ্রগতি</h3><p>আপনার পড়া ও পরীক্ষার অগ্রগতি এক নজরে।</p>';
 h+='<div class="plst">';
 h+='<div><b>'+bn(s.nb)+'</b><span>মোট বিষয়</span></div>';
 h+='<div><b>'+bn(s.nc)+'</b><span>অধ্যায়</span></div>';
 h+='<div><b>'+bn(s.solved)+'/'+bn(s.total)+'</b><span>প্রশ্ন (সমাধান/মোট)</span></div>';
 h+='<div><b>'+bn(s.total-s.solved)+'</b><span>বাকি আছে</span></div>';
 h+='<div><b>'+bn(s.acc)+'%</b><span>সঠিক উত্তরের হার</span></div>';
 h+='<div><b>'+bn(s.exams)+'</b><span>পরীক্ষা দিয়েছেন</span></div>';
 h+='</div>';
 /* কন্টিনিউ বাটন — শেষ অসম্পূর্ণ অধ্যায় */
 var target=findNextCh();
 if(target)h+='<button class="bt" data-a="go" data-v="book" data-i="'+target[0]+'">'+ic('right',16)+' কন্টিনিউ করো — '+esc(target[1])+'</button>';
 else h+='<p style="margin:0;color:var(--mu)">চমৎকার! সব অধ্যায় শেষ করেছেন।</p>';
 h+='</div></div>';
 return h;
}
function findNextCh(){ /* সবচেয়ে কম অনুশীলিত অধ্যায় খুঁজে বের করে */
 var h=ld('dtd_h_'+(U?U.id:''))||[],m={};
 h.forEach(function(x){m[x.b+'·'+x.c]=true});
 var best=null,bn2=1e9;
 D.forEach(function(b,i){b.ch.forEach(function(c,j){var k=b.n+'·'+c.t;if(!m[k]&&c.mc.length+c.cq.length<bn2){bn2=c.mc.length+c.cq.length;best=[i,b.n+' · '+c.t]}})});
 return best;
}
