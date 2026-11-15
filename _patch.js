const fs=require('fs');
const p='index.html';
let h=fs.readFileSync(p,'utf8');
const orig=h;

const css=c=>fs.readFileSync(c,'utf8').replace(/\r\n/g,'\n').trim();
const js=c=>fs.readFileSync(c,'utf8').replace(/\r\n/g,'\n').trim();

// ১) CSS — style ব্লকের শেষে ঢোকানো
const cssBlock='\n'+css('_course.css')+'\n'+css('_prog.css')+'\n'+css('_footer.css')+'\n';
if(h.includes('_course.css')){console.log('SKIP css already');}
else{
  const anchor='\n</style>';
  const i=h.lastIndexOf(anchor);
  h=h.slice(0,i)+cssBlock+h.slice(i);
  console.log('CSS inserted');
}

// ২) পুরোনো ফুটার CSS ব্লক সরানো (নতুন প্যালেট দিয়ে বদলে)
const oldFooterStart=h.indexOf('.ft2{position:relative');
const oldFooterEnd=h.indexOf('/* ===== ধাপ ১: আইকন, লোগো, নোটিশ ===== */');
if(oldFooterStart>0&&oldFooterEnd>oldFooterStart){
  h=h.slice(0,oldFooterStart)+h.slice(oldFooterEnd);
  console.log('old footer CSS removed');
}

// ৩) নতুন আইকন যোগ
const newIcons=`check:'<path d="M20 6L9 17l-5-5"/>',download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',flag:'<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>',file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',`;
if(h.includes("check:'<path")){console.log('SKIP icons');}
else{
  const i=h.indexOf("var ICP={");
  const j=h.indexOf("'",i)+1; // প্রথম আইকনের শুরু
  h=h.slice(0,j)+newIcons+h.slice(j);
  console.log('icons added');
}

// ৪) কোর্স/প্রগ্রেস JS যোগ — </script> ট্যাগের ঠিক আগে
const jsBlock='\n'+js('_course.js')+'\n';
if(h.includes('function courseH()')){console.log('SKIP js');}
else{
  const anchor='\n</script>';
  const i=h.lastIndexOf(anchor);
  h=h.slice(0,i)+jsBlock+h.slice(i);
  console.log('JS inserted');
}

if(h!==orig){fs.writeFileSync(p,h,'utf8');console.log('written');}
else console.log('NO CHANGE');
