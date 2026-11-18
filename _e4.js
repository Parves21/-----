const fs=require('fs');
const F='index.html';
let s=fs.readFileSync(F,'utf8');
const bad="</button>':'')"+"<button data-m=\"help\">'+ic('help',18)+'সহায়তা</button>"+"+'<button data-m=\"out\">";
const good="</button>':'')+'<button data-m=\"help\">'+ic('help',18)+'সহায়তা</button>"+"<button data-m=\"out\">";
if(s.split(bad).length-1!==1){console.log('FAIL count='+(s.split(bad).length-1));process.exit(1);}
s=s.split(bad).join(good);
fs.writeFileSync(F,s);
console.log('menu fixed');
