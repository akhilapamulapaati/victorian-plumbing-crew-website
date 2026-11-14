(function(){
var $=function(s,c){return(c||document).querySelector(s)},$$=function(s,c){return[].slice.call((c||document).querySelectorAll(s))};
var b=$('#burger'),n=$('#nav'),ov=$('#ov'),fab=$('.fab'),hero=$('#home');
function closeDD(){$$('.dd.open').forEach(function(d){d.classList.remove('open');$('.chev',d).setAttribute('aria-expanded','false')})}
function setMenu(o,focus){n.classList.toggle('open',o);ov.classList.toggle('on',o);document.body.classList.toggle('lock',o);
 b.setAttribute('aria-expanded',o);b.textContent=o?'✕':'☰';b.setAttribute('aria-label',o?'Close menu':'Open menu');
 if(o){var f=$('a.lk',n);if(f)setTimeout(function(){f.focus()},50)}else{closeDD();if(focus)b.focus()}}
b.onclick=function(){setMenu(!n.classList.contains('open'))};
ov.onclick=function(){setMenu(false)};
document.addEventListener('keydown',function(e){if(e.key==='Escape'){var o=n.classList.contains('open');setMenu(false,o);closeDD()}});
n.addEventListener('click',function(e){var a=e.target.closest('a');if(a){setMenu(false);closeDD();a.blur()}});
$$('.chev').forEach(function(c){c.onclick=function(){var d=c.parentNode,o=!d.classList.contains('open');closeDD();d.classList.toggle('open',o);c.setAttribute('aria-expanded',o)}});
document.addEventListener('click',function(e){if(!e.target.closest('.dd'))closeDD()});
window.addEventListener('resize',function(){if(innerWidth>1179)setMenu(false)});

/* service cards: pre-select the matching service in the quote form */
var sel=$('#qf select');
$$('.card .more').forEach(function(a){a.addEventListener('click',function(){var t=$('h3',a.closest('.card')).textContent.trim();
 $$('option',sel).forEach(function(o){if(o.text===t)sel.value=o.value||o.text})})});

/* reviews buttons (no Google URL has been supplied) */
var gb=$('#gbtn'),gm=$('#rvmsg');
if(gb)gb.onclick=function(){gm.textContent='Our Google Reviews link is being added. In the meantime, call 0401 068 567 or request a quote below.'};

/* quote form: client-side validation, demo confirmation only */
var f=$('#qf'),ok=$('#ok');
function chk(el){var v=el.value.trim(),g=true,nm=el.name;
 if(nm==='p')g=/^(\+?61|0)[\s-]?\d([\s-]?\d){7,9}$/.test(v);
 else if(nm==='e')g=f.m.value!=='Email'||/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
 else if(el.required)g=v!=='';
 el.closest('label').classList.toggle('bad',!g);el.setAttribute('aria-invalid',String(!g));return g}
var els=$$('input:not([type=radio]),select,textarea',f);
els.forEach(function(el){el.addEventListener('blur',function(){chk(el)});el.addEventListener('input',function(){if(el.closest('label').classList.contains('bad'))chk(el)})});
var em=$('#emlab');f.addEventListener('change',function(e){if(e.target.name==='m'){em.hidden=f.m.value!=='Email';if(em.hidden)em.classList.remove('bad')}});
f.addEventListener('focusin',function(){document.body.classList.add('typing')});f.addEventListener('focusout',function(){document.body.classList.remove('typing')});
f.onsubmit=function(e){e.preventDefault();ok.style.display='none';
 var bad=els.filter(function(el){return!el.closest('label').hidden&&!chk(el)});
 if(bad.length){bad[0].focus();return}
 ok.innerHTML='<strong>Form check passed.</strong> This is a front-end demonstration only, so your request has <u>not</u> been sent. To reach us now, call <a href="tel:+61401068567"><b>0401 068 567</b></a>.';
 ok.style.display='block';ok.setAttribute('tabindex','-1');ok.focus()};

/* active nav link + floating call button */
var links=$$('nav a.lk'),ids=links.map(function(a){return a.getAttribute('href').slice(1)}),tick=false;
function hit(s){var e=$(s);if(!e)return false;var r=e.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0}
function upd(){tick=false;var y=scrollY+130,cur=0,best=-1;
 ids.forEach(function(id,i){var e=document.getElementById(id);if(e&&e.offsetTop<=y&&e.offsetTop>best){best=e.offsetTop;cur=i}});
 if(innerHeight+scrollY>=document.body.scrollHeight-4)cur=ids.length-1;
 links.forEach(function(a,i){a.classList.toggle('act',i===cur)});
 fab.classList.toggle('show',scrollY>hero.offsetHeight*.7&&!hit('.emerg .box')&&!hit('#quote')&&!hit('footer'))}
function req(){if(!tick){tick=true;requestAnimationFrame(upd)}}
addEventListener('scroll',req,{passive:true});addEventListener('resize',req);upd();
})();
