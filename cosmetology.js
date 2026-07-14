const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

const menu = $('#navMenu');
const toggle = $('.menu-toggle');
const navLinks = $$('.nav-menu a');
const loader = $('.loader');
const revealElements = $$('.reveal');
const backTop = $('.back-top');

const appointmentForm = $('#cosAppointmentForm');
const fullNameInput = $('#cos-name');
const phoneInput = $('#cos-phone');
const serviceSelect = $('#cos-department');
const preferredDateInput = $('#cos-date');
const messageInput = $('#cos-message');
const yearSpan = $('#year');

function setMinimumDate() {
  if (!preferredDateInput) return;
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
  preferredDateInput.min = localDate;
}

function toggleMenu() {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  document.body.classList.toggle('menu-open', open);
}

function closeMenu() {
  if (!menu.classList.contains('open')) return;
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}

function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  if (backTop) backTop.classList.toggle('show', scrollY > 600);
}

function revealOnScroll() {
  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < window.innerHeight - 70) {
      el.classList.add('visible');
    }
  });
}

function handleFaqToggle(event) {
  const button = event.currentTarget;
  const faqItem = button.closest('.cos-faq-item');
  faqItem.classList.toggle('open');
}

function sendWhatsAppMessage(event) {
  event.preventDefault();

  const fullName = fullNameInput.value.trim();
  const phone = phoneInput.value.trim();
  const service = serviceSelect.value;
  const preferredDate = preferredDateInput.value;
  const message = messageInput.value.trim();

  if (!fullName || !phone || !service || !preferredDate) {
    alert('Please complete all required fields before sending your appointment request.');
    return;
  }

  const whatsappNumber = '918668423088';
  const encodedMessage = encodeURIComponent(
    `*Alexis Hospital — Cosmetology Appointment Request*\n\n` +
    `Name: ${fullName}\n` +
    `Phone: ${phone}\n` +
    `Service: ${service}\n` +
    `Preferred Date: ${preferredDate}\n` +
    `Message: ${message || 'N/A'}\n\n` +
    `Please confirm the earliest available consultation slot.`
  );

  const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = url;
  } else {
    window.open(url, '_blank');
  }
}

function initPage() {
  window.addEventListener('load', () => {
    if (loader) loader.classList.add('hidden');
    setTimeout(() => { if (loader) loader.style.display = 'none'; }, 400);
  });

  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  setMinimumDate();
  revealOnScroll();
  window.addEventListener('scroll', () => {
    revealOnScroll();
    onScroll();
  }, { passive: true });

  if (toggle) toggle.addEventListener('click', toggleMenu);
  navLinks.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  const faqButtons = $$('.cos-faq-trigger');
  faqButtons.forEach(button => button.addEventListener('click', handleFaqToggle));

  if (backTop) {
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  if (appointmentForm) appointmentForm.addEventListener('submit', sendWhatsAppMessage);
}

initPage();
