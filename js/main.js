/* =========================================================
   main.js
   Scroll-triggered reveal animations, animated stat
   counters, hero parallax, button ripple, contact form,
   and misc. page setup.
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
     Applies to every element carrying the `.reveal` class.
     ----------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* -----------------------------------------------------
     Animated stat counters (About section)
     ----------------------------------------------------- */
  const counters = document.querySelectorAll('.stat-number');

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1600;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      // Ease-out for a natural deceleration toward the target
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((el) => counterObserver.observe(el));

  /* -----------------------------------------------------
     Hero parallax on scroll
     ----------------------------------------------------- */
  const parallaxEls = document.querySelectorAll('.parallax');

  function updateParallax() {
    const scrollY = window.scrollY;
    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.dataset.speed) || 0.3;
      el.style.transform = `translate3d(0, ${scrollY * speed * 0.15}px, 0)`;
    });
  }

  window.addEventListener('scroll', updateParallax, { passive: true });

  /* -----------------------------------------------------
     Scroll cue button: jump to gallery
     ----------------------------------------------------- */
  const scrollCue = document.getElementById('scroll-cue');
  if (scrollCue) {
    scrollCue.addEventListener('click', () => {
      const gallery = document.getElementById('gallery');
      if (gallery) gallery.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* -----------------------------------------------------
     Button ripple effect
     ----------------------------------------------------- */
  document.querySelectorAll('.ripple').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const circle = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      circle.className = 'ripple-circle';
      circle.style.width = circle.style.height = `${size}px`;
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;

      btn.appendChild(circle);
      circle.addEventListener('animationend', () => circle.remove());
    });
  });

  /* -----------------------------------------------------
     Contact form: lightweight client-side handling
     (No backend wired up — this simply confirms receipt.)
     ----------------------------------------------------- */
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        status.textContent = 'Please fill in all required fields.';
        return;
      }

      status.textContent = 'Thank you — your message has been sent.';
      form.reset();
    });
  }
})();
