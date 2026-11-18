const fs=require('fs');
let s=fs.readFileSync('index.html','utf8');
const old=" else h+='<button data-m=\"login\">'+ic('in',18)+' লগইন</button><button data-m=\"reg\">'+ic('plus',18)+' অ্যাকাউন্ট খুলুন</button>';";
if(s.split(old).length-1!==1){console.log('FAIL find '+ (s.split(old).length-1));process.exit(1);}
const neu=" else h+='<button data-m=\"login\">'+ic('in',18)+' লগইন</button><button data-m=\"reg\">'+ic('plus',18)+' অ্যাকাউন্ট খুলুন</button><button data-m=\"help\">'+ic('help',18)+'সহায়তা</button>';";
s=s.split(old).join(neu);
fs.writeFileSync('index.html',sPopular='');
console.log('OK logged-out help');
