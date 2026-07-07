/* =========================================================
   gallery.js
   Category filtering for the masonry grid, plus a
   lightbox modal with next/previous and keyboard support.
   ========================================================= */

(function () {
  'use strict';

  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

  /* -----------------------------------------------------
     Category filtering
     ----------------------------------------------------- */
  function applyFilter(category) {
    galleryItems.forEach((item) => {
      const matches = category === 'all' || item.dataset.category === category;
      item.classList.toggle('filtered-out', !matches);
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      applyFilter(btn.dataset.filter);
    });
  });

  /* -----------------------------------------------------
     Lightbox
     ----------------------------------------------------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  let currentIndex = 0;
  let lastFocusedElement = null;

  function visibleItems() {
    return galleryItems.filter((item) => !item.classList.contains('filtered-out'));
  }

  function openLightbox(index) {
    const items = visibleItems();
    if (!items.length) return;
    currentIndex = index;
    renderLightbox(items);

    lastFocusedElement = document.activeElement;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function renderLightbox(items) {
    const item = items[currentIndex];
    const img = item.querySelector('img');
    const name = item.querySelector('.gallery-name').textContent;
    const cat = item.querySelector('.gallery-cat').textContent;

    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCaption.textContent = `${cat} — ${name}`;
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  function showNext(direction) {
    const items = visibleItems();
    if (!items.length) return;
    currentIndex = (currentIndex + direction + items.length) % items.length;
    renderLightbox(items);
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      const items = visibleItems();
      const visibleIndex = items.indexOf(item);
      openLightbox(visibleIndex === -1 ? 0 : visibleIndex);
    });

    // Allow keyboard activation
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', 'Open image preview');
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const items = visibleItems();
        const visibleIndex = items.indexOf(item);
        openLightbox(visibleIndex === -1 ? 0 : visibleIndex);
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => showNext(-1));
  nextBtn.addEventListener('click', () => showNext(1));

  // Click outside the figure closes the modal
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation: Escape, Left, Right
  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showNext(-1);
    if (e.key === 'ArrowRight') showNext(1);
  });
})();
