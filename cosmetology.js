(() => {
const cosQuery = (selector, context = document) => context.querySelector(selector);
const cosQueryAll = (selector, context = document) => [...context.querySelectorAll(selector)];

const menu = cosQuery('#navMenu');
const toggle = cosQuery('.menu-toggle');
const navLinks = cosQueryAll('.nav-menu a');
const loader = cosQuery('.loader');
const revealElements = cosQueryAll('.reveal');
const backTop = cosQuery('.back-top');

const appointmentForm = cosQuery('#cosAppointmentForm');
const fullNameInput = cosQuery('#cos-name');
const phoneInput = cosQuery('#cos-phone');
const serviceSelect = cosQuery('#cos-department');
const preferredDateInput = cosQuery('#cos-date');
const messageInput = cosQuery('#cos-message');
const yearSpan = cosQuery('#year');

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

function initPatientStories() {
  const modal = cosQuery('#patientVideoModal');
  if (!modal) return;

  const modalTitle = cosQuery('#patientVideoModalTitle');
  const modalBody = cosQuery('#patientVideoModalBody');
  const closeButton = cosQuery('.patient-video-modal__close', modal);
  let trigger;
  let instagramScriptPromise;

  function loadInstagramEmbed() {
    if (window.instgrm) return Promise.resolve(window.instgrm);
    if (instagramScriptPromise) return instagramScriptPromise;

    instagramScriptPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector('script[src="https://www.instagram.com/embed.js"]');
      const script = existingScript || document.createElement('script');
      script.onload = () => window.instgrm
        ? resolve(window.instgrm)
        : reject(new Error('Instagram embed unavailable'));
      script.onerror = () => reject(new Error('Instagram embed failed to load'));
      if (!existingScript) {
        script.src = 'https://www.instagram.com/embed.js';
        script.async = true;
        document.head.appendChild(script);
      }
    });
    return instagramScriptPromise;
  }

  function showFallback(url) {
    modalBody.replaceChildren();
    const fallback = document.createElement('div');
    fallback.className = 'patient-video-modal__fallback';
    fallback.innerHTML = '<i class="fa-brands fa-instagram" aria-hidden="true"></i><h3>Watch this patient story on Instagram</h3><p>Instagram could not load this story here. You can continue watching it on Instagram.</p>';
    const link = document.createElement('a');
    link.className = 'btn btn-primary';
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.innerHTML = '<i class="fa-brands fa-instagram"></i> Open on Instagram';
    fallback.appendChild(link);
    modalBody.appendChild(fallback);
  }

  function closeModal() {
    modalBody.replaceChildren();
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('video-modal-open');
    if (trigger) trigger.focus();
  }

  function openModal(frame) {
    const card = frame.closest('.patient-video-card');
    const url = frame.dataset.instagramUrl;
    trigger = frame;
    modalTitle.textContent = card.querySelector('h3').textContent;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('video-modal-open');
    closeButton.focus();

    const embed = document.createElement('blockquote');
    embed.className = 'instagram-media';
    embed.dataset.instgrmPermalink = url;
    embed.dataset.instgrmVersion = '14';
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Watch this patient story on Instagram';
    embed.appendChild(link);
    modalBody.replaceChildren(embed);

    loadInstagramEmbed()
      .then((instagram) => {
        if (modal.classList.contains('is-open') && modalBody.contains(embed)) {
          instagram.Embeds.process();
        }
      })
      .catch(() => {
        if (modal.classList.contains('is-open')) showFallback(url);
      });
  }

  cosQueryAll('.patient-video-frame[data-instagram-url]').forEach((frame) => {
    frame.addEventListener('click', () => openModal(frame));
    frame.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(frame);
      }
    });
  });
  cosQueryAll('[data-modal-close]', modal).forEach((control) => control.addEventListener('click', closeModal));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
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

  const whatsappNumber = '918080697661';
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

  const faqButtons = cosQueryAll('.cos-faq-trigger');
  faqButtons.forEach(button => button.addEventListener('click', handleFaqToggle));

  if (backTop) {
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  if (appointmentForm) appointmentForm.addEventListener('submit', sendWhatsAppMessage);
  initPatientStories();
}

initPage();
})();
