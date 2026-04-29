/* ═══════════════════════════════════════════════════════
   TECHWORLD - Main JavaScript
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  initMobileMenu();
  initScrollEffects();
  initScrollReveal();
  initCurrentYear();
  initFormValidation();
});

/* ── MOBILE MENU ── */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileClose = document.getElementById('mobileClose');

  if (!hamburger || !mobileMenu) return;

  function open() {
    mobileMenu.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    mobileMenu.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', open);
  if (mobileClose) mobileClose.addEventListener('click', close);
  if (mobileOverlay) mobileOverlay.addEventListener('click', close);

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', close);
  });
}

/* ── SCROLL EFFECTS ── */
function initScrollEffects() {
  var header = document.querySelector('.header');
  var scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', function () {
    var scrolled = window.scrollY > 50;
    if (header) header.classList.toggle('is-scrolled', scrolled);
    if (scrollTopBtn) scrollTopBtn.classList.toggle('show', window.scrollY > 400);
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ── SCROLL REVEAL ── */
function initScrollReveal() {
  var revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(function (el) { observer.observe(el); });
}

/* ── CURRENT YEAR ── */
function initCurrentYear() {
  var els = document.querySelectorAll('.currentYear');
  var year = new Date().getFullYear();
  els.forEach(function (el) { el.textContent = year; });
}

/* ── FORM VALIDATION ── */
function initFormValidation() {
  var form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = true;
    var required = form.querySelectorAll('[required]');

    required.forEach(function (input) {
      if (!input.value.trim()) {
        valid = false;
        input.style.borderColor = '#ff6b6b';
      } else {
        input.style.borderColor = '';
      }
    });

    var email = form.querySelector('input[type="email"]');
    if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      valid = false;
      email.style.borderColor = '#ff6b6b';
    }

    if (valid) {
      var btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'Enviado correctamente';
        btn.disabled = true;
        btn.style.background = '#2ecc71';
      }
      form.reset();
      setTimeout(function () {
        if (btn) {
          btn.textContent = 'Enviar Mensaje';
          btn.disabled = false;
          btn.style.background = '';
        }
      }, 3000);
    }
  });
}
