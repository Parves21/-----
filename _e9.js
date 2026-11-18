var fs=require('fs');
var F='index.html';
var s=fs.readFileSync(F,'utf8');
var fails=0;
function rep(o,n,label){
  var c=s.split(o).length-1;
  if(c!==1){console.log('FAIL '+label+' count='+c);fails++;return;}
  s=s.split(o).join(n chapter);console.log('OK '+label);
}
var A=s.split('\n');
// 1 footer books link
var fi=A.findIndex(function(x){return x.indexOf('<div class="fc"><h4>')>-1&&x.indexOf('data-v="books">')>-1;});
if(fi>-1){A[fi]=A[fi].replace('<button data-v="books">বই</button>','');console.log('OK footer books @'+(fi+1));}else{console.log('FAIL footer');fails++;}
// 2 admin login -> open panel
var li=A.findIndex(function(x){return x.indexOf("setU(a);closeM();toast('")>-1;});
if(li>-1){A[li]=A[li].replace("setU(a);closeM();toast('","setU(a);closeM();show('admin');toast('").replace("');if(AM.after)need(AM.after);return}","');return}");console.log('OK login->admin @'+(li+1));}else{console.log('FAIL login line');fails++;}
fs.writeFileSync(F,A.join('\n'),'utf8');
console.log('fails='+fails);
