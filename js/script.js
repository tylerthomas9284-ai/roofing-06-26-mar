/* Summit Roofing Group — script.js */
(function () {
  'use strict';

  // --- Nav scroll ---
  const nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // --- Active nav link ---
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link[data-page]').forEach(link => {
    if (link.dataset.page === page) link.classList.add('active');
  });

  // --- Mobile nav ---
  const burger = document.getElementById('navBurger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileClose');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => mobileNav.classList.add('open'));
    mobileClose?.addEventListener('click', () => mobileNav.classList.remove('open'));
    mobileNav.querySelectorAll('.nav__link').forEach(l => l.addEventListener('click', () => mobileNav.classList.remove('open')));
  }

  // --- Lead modal ---
  const overlay = document.getElementById('leadModal');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  if (overlay) {
    document.querySelectorAll('[data-modal="lead"]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (modalTitle && btn.dataset.context) modalTitle.textContent = btn.dataset.context;
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    const closeModal = () => { overlay.classList.remove('open'); document.body.style.overflow = ''; };
    modalClose?.addEventListener('click', closeModal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }

  // --- Lead form ---
  const form = document.getElementById('leadForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('formName')?.value.trim();
      const email = document.getElementById('formEmail')?.value.trim();
      const phone = document.getElementById('formPhone')?.value.trim();
      const consent = document.getElementById('formConsent')?.checked;
      if (!name || !email || !phone || !consent) {
        alert('Please fill in all required fields and accept the terms.');
        return;
      }
      document.getElementById('formContent')?.style.setProperty('display', 'none');
      const success = document.getElementById('successMessage');
      if (success) { success.style.display = 'block'; }
    });
  }

  // --- Contact form ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const success = document.getElementById('contactSuccess');
      if (success) { contactForm.style.display = 'none'; success.style.display = 'block'; }
    });
  }

  // --- FAQ accordion ---
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // --- Cookie banner ---
  const banner = document.getElementById('cookieBanner');
  const COOKIE_KEY = 'sr_cookie_consent';
  if (banner && !localStorage.getItem(COOKIE_KEY)) {
    setTimeout(() => banner.classList.add('show'), 900);
    document.getElementById('cookieAccept')?.addEventListener('click', () => {
      localStorage.setItem(COOKIE_KEY, 'accepted');
      banner.classList.remove('show');
    });
    document.getElementById('cookieDecline')?.addEventListener('click', () => {
      localStorage.setItem(COOKIE_KEY, 'declined');
      banner.classList.remove('show');
    });
  }

  // --- Scroll animations ---
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

})();
