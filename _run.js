const fs=require('fs');
let t=fs.readFileSync('_t.js','utf8');
t=t.replace(/const ev=async\(expr\)=>\{[^\n]*\n[^\n]*\n/,
 "const ev=async(expr)=>{const r=await send('Runtime.evaluate',{expression:'(function(){'+expr+'})()',returnByValue:true,awaitPromise:true});if(r.exceptionDetails)return 'EXC:'+(r.exceptionDetails.exception&&r.exceptionDetails.exception.description||r.exceptionDetails.text);return r.result&&r.result.value;};\n");
t=t.replace("await ev(\"$('pb').click()\");",
 "await ev(\"$('pb').click();authM(false);return 'ok'\");\n  await sleep(300);");
t=t.replace("$('as').click();'clicked'\",","$('as').click();return 'clicked'\",");
t=t.split("out('viewAdmin'").join("out('viewAdmin'");
fs.writeFileSync('_t.js',tifying='');
console.log('patched');
