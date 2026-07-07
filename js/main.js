/* =========================================================
   main.js
   Scroll-triggered reveal animations, footer year, and
   the (front-end only) contact form submit handler.
   ========================================================= */

(function () {
  'use strict';

  /* -----------------------------------------------------
     Footer year
     ----------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -----------------------------------------------------
     Scroll reveal (fade in / slide up)
     Staggers elements within the same section slightly.
     ----------------------------------------------------- */
  const reveals = document.querySelectorAll('.reveal');

  reveals.forEach((el, i) => {
    el.style.setProperty('--d', (i % 8) * 0.06 + 's');
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in-view'));
  }

  /* -----------------------------------------------------
     Contact form: lightweight client-side handling
     (No backend wired up — connect your own endpoint here.)
     ----------------------------------------------------- */
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        msg.textContent = 'Please fill in your name and email.';
        msg.classList.add('show');
        return;
      }

      msg.textContent = "Got it — we'll get back to you within one business day.";
      msg.classList.add('show');
      form.reset();
    });
  }
})();
