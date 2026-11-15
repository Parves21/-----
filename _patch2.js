const fs=require('fs');
const p='index.html';
let h=fs.readFileSync(p,'utf8');
const orig=h;

// ১) কোর্স রুট: কোর্স লেসন পেজে যাওয়ার বাটন যোগ
const oldCourse=`else if(v==='course')h='<section><div class="w"><h2>কোর্স</h2><p class="sb">ভিডিও কোর্স ও ক্লাসের লিংক।</p><div class="gd">'+CFG.courses.map(function(c){return '<a class="sc rv" style="text-decoration:none" target="_blank" rel="noopener" href="'+esc(c[1])+'"><b>'+esc(c[0])+'</b><span>'+esc(c[2]||'')+' ▶</span></a>'}).join('')+D.map(function(s){return '<a class="sc rv" style="text-decoration:none" target="_blank" rel="noopener" href="'+esc(CFG.yt)+'/search?query='+encodeURIComponent(s.n)+'"><b>'+esc(s.n)+'</b><span>চ্যানেলের ভিডিও খুঁজুন ▶</span></a>'}).join('')+'</div></div></section>';`;

const newCourse=`else if(v==='course')h='<section><div class="w"><h2>কোর্স</h2><p class="sb">ভিডিও কোর্স ও ক্লাসের লিংক। অধ্যায় ধরে ভিডিও দেখতে নিচের "ভিডিও ক্লাস শুরু করুন" চাপুন।</p><div class="gd"><button class="sc rv" data-a="cls" data-b="0" data-c="0" style="grid-column:1/-1;max-width:520px"><b>🎬 ভিডিও ক্লাস শুরু করুন</b><span>অধ্যায় ধরে ভিডিও, সিলেবাস ও প্রগ্রেস</span></button>'+CFG.courses.map(function(c){return '<a class="sc rv" style="text-decoration:none" target="_blank" rel="noopener" href="'+esc(c[1])+'"><b>'+esc(c[0])+'</b><span>'+esc(c[2]||'')+' ▶</span></a>'}).join('')+D.map(function(s){return '<a class="sc rv" style="text-decoration:none" target="_blank" rel="noopener" href="'+esc(CFG.yt)+'/search?query='+encodeURIComponent(s.n)+'"><b>'+esc(s.n)+'</b><span>চ্যানেলের ভিডিও খুঁজুন ▶</span></a>'}).join('')+'</div></div></section>';`;

if(h.includes(oldCourse)){h=h.replace(oldCourse,newCourse);console.log('course route patched');}
else console.log('!! course route NOT found');

// ২) নতুন ভিউ: clsn (কোর্স লেসন পেজ) যোগ
const profAnchor=`else if(v==='profile'){h=profH()}`;
const profNew=`else if(v==='clsn'){h=courseH()}
else if(v==='profile'){h=profH()}`;
if(h.includes(profAnchor)&&!h.includes("v==='clsn'")){h=h.replace(profAnchor,profNew);console.log('clsn route added');}
else console.log('!! clsn route issue');

// ৩) ক্লিক হ্যান্ডলারে নতুন অ্যাকশন যোগ
const actAnchor=`else if(a==='j'){`;
const actNew=`else if(a==='cls'){CV1.bk=+b.dataset.b||0;CV1.ch=+b.dataset.c||0;CV1.ls=+b.dataset.l||0;show('clsn')}
else if(a==='clg'){var bi2=+b.dataset.b,ci2=+b.dataset.c;var g=b.closest('.clgrp');if(g&&g.classList.contains('open')&&ci2===CV1.ch&&bi2===CV1.bk){g.classList.remove('open');b.setAttribute('aria-expanded','false')}else{CV1.bk=bi2;CV1.ch=ci2;CV1.ls=0;show('clsn')}}
else if(a==='clc'){var bk2=+b.dataset.b,cj2=+b.dataset.c,lk2=+b.dataset.l;var okd=clToggle(bk2,cj2,lk2);toast(okd?'লেসন সম্পন্ন হিসেবে চিহ্নিত হয়েছে':'চিহ্ন সরানো হয়েছে');show('clsn')}
else if(a==='rpt'){need(function(){reportIssue()})}
else if(a==='j'){`;
if(h.includes(actAnchor)&&!h.includes("a==='cls'")){h=h.replace(actAnchor,actNew);console.log('click handlers added');}
else console.log('!! click handler issue');

if(h!==orig){fs.writeFileSync(p,h,'utf8');console.log('written');}
else console.log('NO CHANGE');
