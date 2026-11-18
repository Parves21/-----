const fs=require('fs');
const s=fs.readFileSync('index.html','utf8');
const L=s.split('\n');
const bad=/[Ѐ-ӿ؀-ۿऀ-ॿ਀-੿஀-௿一-鿿가-힯฀-๿֐-׿]/;
let n=0;
L.forEach((l,i)=>{if(bad.test(l)){n++;console.log(i+1+':'+JSON.stringify(l.slice(0,160)));}});
console.log('foreign-lines='+n);
const re=/<script\b[^>]*>([\s\S]*?)<\/script>/g;let m,c=0,e=0;
while((m=re.exec(s))){c++;if(m[0].includes('src='))continue;try{new Function(m[1]);}catch(x){e++;console.log('SYNTAX '+x.message);}}
console.log('scripts='+c+' errors='+e);
