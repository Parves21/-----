var fs=require('fs');
var s=fs.readFileSync('index.html','utf8');
var L=s.split('\n');
console.log('bytes='+Buffer.byteLength(s)+' lines='+L.length);
var re=/<script\b[^>]*>([\s\S]*?)<\/script>/g;var m;var n=0;var bad=0;
while((m=re.exec(s))){n++;fs.writeFileSync('_app.js',m[1]);try{new Function(m[1]);}catch(x){bad++;console.log('SYNERR: '+x.message);}}
console.log('scripts='+n+' bad='+bad);
function has(c){return s.indexOf(c)>-1;}
console.log('helpInLoggedIn='+(s.split('data-m="help"').length-1));
console.log('footerBooks='+has('data-v="books">বই</button><button data-v="mcq"'));
console.log('ADM='+has("ADM={e:'nurislam42021@gmail.com'"));
console.log('adminH_FBguard='+has("+'+(FB?'<div class=\\\"ch\\\"><h3>পেমেন্ট যাচাই"));
console.log('saveSiteLocal='+has("if(!FB){try{localStorage.setItem('dtd_content'"));
console.log('report_pcard='+has('<div id="pcard"></div>'));
console.log('report_lb='+has('<div id="lb">লোড হচ্ছে...'));
console.logmes_ok=vh;
