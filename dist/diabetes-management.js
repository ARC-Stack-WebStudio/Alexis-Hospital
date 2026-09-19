/* ===================================================
   Diabetes Management — Page Script
   Handles loader, navbar, form validation, WhatsApp
   submission, scroll progress, reveal animations,
   and back-to-top.
   =================================================== */

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ---------- INFORMATION CARD LAYOUT ---------- */
const cardGrid = $('.dm-card-grid');
if (cardGrid) {
  ['.dm-why-choose', '.dm-symptoms', '.dm-treatment', '.dm-consult'].forEach(selector => {
    const card = $(selector);
    if (card) cardGrid.appendChild(card);
  });
}

/* ---------- LOADER ---------- */
window.addEventListener('load', () => setTimeout(() => $('.loader').classList.add('hidden'), 350));

/* ---------- YEAR ---------- */
$('#year').textContent = new Date().getFullYear();

/* ---------- MOBILE MENU ---------- */
const menu = $('#navMenu'), toggle = $('.menu-toggle');
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  document.body.classList.toggle('menu-open', open);
});
$$('.nav-menu a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}));

/* ---------- SCROLL PROGRESS & BACK-TO-TOP ---------- */
const progress = $('.scroll-progress'), backTop = $('.back-top');
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${max ? scrollY / max * 100 : 0}%`;
  backTop.classList.toggle('show', scrollY > 600);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
backTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- REVEAL ON SCROLL ---------- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: .12 });
$$('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- DATE INPUT MIN ---------- */
const dateInput = $('#dm-date');
function setMinimumDate() {
  if (!dateInput) return;

  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
  dateInput.min = localDate;
}
setMinimumDate();

/* ---------- ESCAPE KEY CLOSES MENU ---------- */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menu.classList.contains('open')) {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }
});

/* ---------- WHATSAPP FORM SUBMISSION ---------- */
const WHATSAPP_NUMBER = "918668423088";

$('#dmAppointmentForm').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;

  // Clear previous error styles
  $$('.dm-field-error', form).forEach(el => el.classList.remove('dm-field-error'));
  $$('.dm-error-text', form).forEach(el => el.remove());

  // Required field definitions
  const required = [
    { id: 'dm-name', label: 'Patient Full Name' },
    { id: 'dm-phone', label: 'Mobile Number' },
    { id: 'dm-age', label: 'Age' },
    { id: 'dm-department', label: 'Department' },
    { id: 'dm-date', label: 'Preferred Appointment Date' },
  ];

  let firstError = null;
  let valid = true;

  required.forEach(({ id, label }) => {
    const field = $(`#${id}`);
    if (!field) return;
    const val = field.value.trim();
    if (!val) {
      valid = false;
      field.classList.add('dm-field-error');
      const err = document.createElement('span');
      err.className = 'dm-error-text';
      err.textContent = `${label} is required`;
      field.parentElement.appendChild(err);
      if (!firstError) firstError = field;
    }
  });

  // Phone pattern validation
  const phoneField = $('#dm-phone');
  if (phoneField && phoneField.value.trim()) {
    const phonePattern = /^[0-9+() -]{10,}$/;
    if (!phonePattern.test(phoneField.value.trim())) {
      valid = false;
      phoneField.classList.add('dm-field-error');
      if (!phoneField.parentElement.querySelector('.dm-error-text')) {
        const err = document.createElement('span');
        err.className = 'dm-error-text';
        err.textContent = 'Enter a valid phone number';
        phoneField.parentElement.appendChild(err);
        if (!firstError) firstError = phoneField;
      }
    }
  }

  if (!valid) {
    if (firstError) firstError.focus();
    return;
  }

  // Retain browser validation for field constraints such as age range and date minimum.
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Gather values
  const fd = new FormData(form);
  const g = key => (fd.get(key) || '').trim();

  // Build WhatsApp message
  let msg = `*🏥 Diabetes Management — Appointment Request*\n\n`;
  msg += `👤 Patient Name: ${g('name')}\n`;
  msg += `📱 Mobile: ${g('phone')}\n`;
  if (g('email')) msg += `📧 Email: ${g('email')}\n`;
  msg += `🎂 Age: ${g('age')}\n`;
  msg += `⚧ Gender: ${g('gender')}\n`;
  msg += `🏥 Department: ${g('department')}\n`;
  if (g('doctor')) msg += `👨‍⚕️ Doctor Preference: ${g('doctor')}\n`;
  msg += `📅 Preferred Date: ${g('date')}\n`;
  msg += `🕐 Preferred Time: ${g('time')}\n`;
  if (g('diagnosed')) msg += `🩺 Already Diagnosed: ${g('diagnosed')}\n`;
  if (g('source')) msg += `\n📣 Heard About Us: ${g('source')}\n`;
  msg += `\nSubmitted from Alexis Hospital — Diabetes Management Page`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  const btn = $('#dm-submit');
  btn.disabled = true;

  try {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = url;
    } else {
      window.open(url, '_blank');
    }

    $('.toast').classList.add('show');
    setTimeout(() => {
      $('.toast').classList.remove('show');
      btn.disabled = false;
      form.reset();
      // Re-set readonly department
      $('#dm-department').value = 'Diabetes Management';
      setMinimumDate();
    }, 3500);
  } catch (err) {
    alert("Unable to open WhatsApp. Please try again or contact us directly.");
    btn.disabled = false;
  }
});

/* ---------- CLEAR ERROR ON INPUT ---------- */
$$('#dmAppointmentForm input, #dmAppointmentForm select, #dmAppointmentForm textarea').forEach(field => {
  field.addEventListener('input', () => {
    field.classList.remove('dm-field-error');
    const errEl = field.parentElement.querySelector('.dm-error-text');
    if (errEl) errEl.remove();
  });
});
