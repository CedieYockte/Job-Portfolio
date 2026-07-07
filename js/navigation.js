/* =========================================================
   navigation.js
   Sticky navbar state, mobile menu toggle, active-link
   highlighting, and smooth scrolling for in-page anchors.
   ========================================================= */

(function () {
  'use strict';

  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksEl = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('[data-nav]');
  const sections = document.querySelectorAll('main section[id]');

  /* -----------------------------------------------------
     Sticky navbar: transparent at top, solid after scroll
     ----------------------------------------------------- */
  function updateHeaderState() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeaderState, { passive: true });
  updateHeaderState();

  /* -----------------------------------------------------
     Mobile hamburger menu
     ----------------------------------------------------- */
  function closeMobileMenu() {
    navLinksEl.classList.remove('mobile-open');
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  }

  function toggleMobileMenu() {
    const isOpen = navLinksEl.classList.toggle('mobile-open');
    menuToggle.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  }

  menuToggle.addEventListener('click', toggleMobileMenu);

  // Close mobile menu after a link is tapped
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navLinksEl.classList.contains('mobile-open')) closeMobileMenu();
    });
  });

  /* -----------------------------------------------------
     Smooth scrolling for in-page anchor links
     (native CSS `scroll-behavior: smooth` handles most of
     this; this listener adds an offset for the fixed header)
     ----------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerOffset = document.getElementById('site-header').offsetHeight;
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* -----------------------------------------------------
     Active navigation link, based on scroll position
     ----------------------------------------------------- */
  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const isMatch = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('active-link', isMatch);
        });
      });
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
  );

  sections.forEach((section) => activeObserver.observe(section));
})();
