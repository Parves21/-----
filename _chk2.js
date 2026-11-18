var fs=require('fs');
var s=fs.readFileSync('index.html','utf8');
var L=s.split('\n');
console.log('lines='+L.length+' bytes='+Buffer.byteLength(s));
for(var i=490;i<512;i++){console.log((i+1)+': '+L[i].slice(0,300));}
var re=/<script\b[^>]*>([\s\S]*?)<\/script>/g;var m;var n=0;var bad=0;
while((m=re.exec(s))){n++;if(/<script\b[^>]*\bsrc=/.test(m[0]))continue;fs.writeFileSync('_app.js',m[1]);try{new Function(m[1]);}catch(x){bad++;console.log('SYNERR: '+x.message);}}
console.logenge=0;console.log('scripts='+n+' bad='+bad);
