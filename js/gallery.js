/* =========================================================
   gallery.js
   Lightbox preview for the contact-sheet frames, with
   next / previous controls and keyboard navigation.
   ========================================================= */

(function () {
  'use strict';

  const frames = Array.from(document.querySelectorAll('.frame'));
  const lightbox = document.getElementById('lightbox');
  if (!frames.length || !lightbox) return;

  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  let currentIndex = 0;
  let lastFocusedElement = null;

  function render() {
    const frame = frames[currentIndex];
    const img = frame.querySelector('img');
    const cap = frame.querySelector('.cap');

    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCaption.textContent = cap ? cap.textContent : '';
  }

  function open(index) {
    currentIndex = index;
    render();
    lastFocusedElement = document.activeElement;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  function step(direction) {
    currentIndex = (currentIndex + direction + frames.length) % frames.length;
    render();
  }

  frames.forEach((frame, index) => {
    frame.setAttribute('tabindex', '0');
    frame.setAttribute('role', 'button');
    frame.setAttribute('aria-label', 'Open image preview');

    frame.addEventListener('click', () => open(index));
    frame.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(index);
      }
    });
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
})();
