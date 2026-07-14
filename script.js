const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];

window.addEventListener('load',()=>setTimeout(()=>$('.loader').classList.add('hidden'),350));
$('#year').textContent=new Date().getFullYear();

const menu=$('#navMenu'), toggle=$('.menu-toggle');
toggle.addEventListener('click',()=>{
  const open=menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded',open);
  document.body.classList.toggle('menu-open',open);
});
$$('.nav-menu a').forEach(a=>a.addEventListener('click',()=>{
  menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');
}));

const progress=$('.scroll-progress'), backTop=$('.back-top');
function onScroll(){
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=`${max?scrollY/max*100:0}%`;
  backTop.classList.toggle('show',scrollY>600);
  const sections=$$('main section[id]');
  let current='home';
  sections.forEach(s=>{if(scrollY>=s.offsetTop-180)current=s.id});
  $$('.nav-menu a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${current}`));
}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
backTop.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target)}});
},{threshold:.12});
$$('.reveal').forEach(el=>revealObserver.observe(el));

let counted=false;
const statObserver=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting&&!counted){
    counted=true;
    $$('.counter').forEach(counter=>{
      const target=+counter.dataset.target,duration=1400,start=performance.now();
      const step=now=>{
        const p=Math.min((now-start)/duration,1);
        counter.textContent=Math.floor(target*(1-Math.pow(1-p,3))).toLocaleString('en-IN');
        if(p<1)requestAnimationFrame(step);
      };requestAnimationFrame(step);
    });
  }
},{threshold:.4});
statObserver.observe($('.stats-grid'));

const track=$('.testimonial-track'), slides=$$('.testimonial'), dots=$('.slider-dots');
let slide=0,auto;
slides.forEach((_,i)=>{
  const b=document.createElement('button');
  b.setAttribute('aria-label',`Show review ${i+1}`);
  b.addEventListener('click',()=>go(i));
  dots.appendChild(b);
});
  const INTERVAL_MS = 8000;
  function go(i){
    slide = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${slide * 100}%)`;
    $$('.slider-dots button').forEach((d, n) => d.classList.toggle('active', n === slide));
    slides.forEach((s, n) => s.classList.toggle('active', n === slide));
    clearInterval(auto);
    auto = setInterval(() => go(slide + 1), INTERVAL_MS);
  }
  // Pause/resume on hover over the testimonial viewport
  const viewport = document.querySelector('.testimonial-viewport') || document.querySelector('.testimonial-shell');
  if (viewport) {
    viewport.addEventListener('mouseenter', () => { if (auto) clearInterval(auto); });
    viewport.addEventListener('mouseleave', () => { if (auto) clearInterval(auto); auto = setInterval(() => go(slide + 1), INTERVAL_MS); });
}
$('.slider-btn.prev').addEventListener('click',()=>go(slide-1));
$('.slider-btn.next').addEventListener('click',()=>go(slide+1));
go(0);

const dateInput=$('input[type="date"]');
dateInput.min=new Date().toISOString().split('T')[0];

const WHATSAPP_NUMBER = "918668423088";

$('#appointmentForm').addEventListener('submit',e=>{
  e.preventDefault();
  const form = e.target;
  
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  
  const btn=$('.submit-btn'), original=btn.innerHTML;
  btn.disabled=true;

  const formData = new FormData(form);
  const name = formData.get('name') ? formData.get('name').trim() : '';
  const phone = formData.get('phone') ? formData.get('phone').trim() : '';
  const department = formData.get('department') ? formData.get('department').trim() : '';
  const date = formData.get('date') ? formData.get('date').trim() : '';
  const message = formData.get('message') ? formData.get('message').trim() : '';

  let whatsappText = `*🏥 New Appointment Request*\n\n`;
  whatsappText += `👤 Full Name: ${name}\n`;
  whatsappText += `📞 Mobile Number: ${phone}\n`;
  if (department) whatsappText += `🏥 Department: ${department}\n`;
  if (date) whatsappText += `📅 Preferred Date: ${date}\n`;
  if (message) whatsappText += `\n📝 Message:\n${message}\n`;
  whatsappText += `\nSubmitted from Alexis Hospital Website`;

  const encodedMessage = encodeURIComponent(whatsappText);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  try {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = whatsappUrl;
    } else {
      window.open(whatsappUrl, '_blank');
    }
    
    $('.toast').classList.add('show');
    setTimeout(()=>{
      $('.toast').classList.remove('show');
      btn.disabled=false;
      form.reset();
      dateInput.min=new Date().toISOString().split('T')[0];
    },3500);
  } catch (err) {
    alert("Unable to open WhatsApp. Please try again or contact us directly.");
    btn.disabled=false;
  }
});

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&menu.classList.contains('open')){
    menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');
  }
});
