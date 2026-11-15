const fs=require('fs');
const p='index.html';
let h=fs.readFileSync(p,'utf8');
const orig=h;

const old=`<h4 style="margin-top:26px">অ্যাপ নিন</h4><button class="appb" id="fi">📲 ফোনের হোম স্ক্রিনে ইনস্টল করুন</button></div>`;

const pgSvg='<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a2.1 2.1 0 0 1-.03-.18V2c0 .061.012.121.03.18zm12.775 8.72L5.322 3.466l9.44 6.356 1.622 1.113zm.702 2.34l-1.622-1.113-9.44-6.356 11.062 7.47zm3.986-2.62a1.5 1.5 0 0 1 0-2.19l-1.72-1.16-2.203 1.502 2.203 1.502 1.72-1.16zM16.36 20.008l-11.038-7.47 9.44-6.355 1.598 1.073-9.44 6.356 9.44 6.396z"/></svg>';
const apSvg='<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M17.05 12.536c-.03-2.86 2.33-4.24 2.44-4.31-1.33-1.95-3.4-2.22-4.14-2.25-1.76-.18-3.44 1.04-4.33 1.04-.9 0-2.27-1.02-3.74-1-1.92.03-3.7 1.12-4.69 2.84-2 3.47-.51 8.6 1.44 11.41.95 1.38 2.09 2.93 3.59 2.87 1.44-.06 1.99-.93 3.73-.93s2.23.93 3.76.9c1.55-.03 2.53-1.4 3.47-2.79 1.09-1.6 1.54-3.15 1.56-3.23-.03-.02-3-1.15-3.03-4.55zM14.28 4.06c.79-.96 1.33-2.3 1.18-3.63-1.14.05-2.53.76-3.35 1.72-.73.85-1.38 2.21-1.2 3.52 1.27.1 2.57-.65 3.37-1.61z"/></svg>';
const msSvg='<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M1 1h10v22H1zM13 1h8.7v11.1H13zM13 13.9h8.7V23H13zM1 13.9h10V23H1z"/></svg>';

const newBlock=`<h4 style="margin-top:26px">অ্যাপ নিন</h4>
<div class="strow">
<a class="stbtn" id="apG" target="_blank" rel="noopener" aria-label="Google Play Store-তে পাওয়া যাবে">${pgSvg}<span><b>GET IT ON</b><span>Google Play</span></span></a>
<a class="stbtn" id="apA" target="_blank" rel="noopener" aria-label="App Store-এ পাওয়া যাবে">${apSvg}<span><b>Download on the</b><span>App Store</span></span></a>
<a class="stbtn" id="apM" target="_blank" rel="noopener" aria-label="Microsoft Store-এ পাওয়া যাবে">${msSvg}<span><b>Get it from</b><span>Microsoft</span></span></a>
</div>
<button class="appb" id="fi" style="margin-top:12px">📲 ফোনের হোম স্ক্রিনে ইনস্টল করুন</button></div>`;

if(h.includes(old)){h=h.replace(old,newBlock);console.log('app store buttons added');}
else console.log('!! app store anchor NOT found');

// ফুটারে মেশের স্ট্রোক রং বদলে (বেগুনি -> সোনালি-সাদা)
const oldStroke='stroke="#b44fe0"';
const newStroke='stroke="rgba(242,194,48,.55)"';
if(h.includes(oldStroke)){h=h.replace(oldStroke,newStroke);console.log('mesh stroke recolored');}
else console.log('!! mesh stroke not found');

if(h!==orig){fs.writeFileSync(p,h,'utf8');console.log('written');}
else console.log('NO CHANGE');
