const fs=require('fs');
const F='index.html';
let A=fs.readFileSync(F,'utf8').split('\n');
for(let i=0;i<A.length;i++){
  if(A[i].includes('id="hmc"')&&A[i].includes('</button>')&&A[i].includes("h+='</div>")){
    A[i]="h+='</div><div class=\"row\"><button class=\"bt g\" id=\"hmc\">বন্ধ করুন</button></div>';";
    console.log('fixed hmc @'+(i+1));
  }
}
let i=-1,j=-1;
for(let k=0;k<A.length;k++){
  if(A[k].startsWith("else if(v==='course')"))i=k;
  if(A[k].startsWith("else if(v==='clsn')"))j=k;
}
if(i<0||j<0){console.logad('FAIL merge i='+i+' j='+j);}
else{
  A[i]="else if(v==='course'||v==='clsn'){h=courseH()}";
  A.splice(j,1);
  console.log('merged course/clsn @'+(i+1)+','+(j+1));
}
fs.writeFileSync(F,A.join('\n'));
console.log('written');
