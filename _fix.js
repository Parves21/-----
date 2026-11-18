var fs=require('fs');
var bk=fs.readFileSync('_backup_index2.html','utf8');
var app=fs.readFileSync('_app.js','utf8');
var open='<script>';
var i=bk.indexOf(open);
var j=bk.indexOf('</script>',i);
if(i<0||j<0){console.log('FAIL script markers '+i+' '+j);process.exit(1);}
var head=bk.slice(0,i+open.length);
var tail=bk.slice(j);
var out=head+app+tail;
fs.writeFileSync('index.html',out,'utf8');
console.log('restored bytes='+Buffer.byteLength(out)+' head='+head.length+' tail='+tail.length);
