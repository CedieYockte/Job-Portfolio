# Elena Voss Photography — Portfolio Website

A premium, cinematic photography portfolio built with **plain HTML, CSS, and vanilla JavaScript** — no frameworks, no build step. Open `index.html` in a browser, or serve the folder with any static file server.

## Project Structure

```
PhotographyPortfolio/
│
├── index.html
├── css/
│   ├── style.css          → design tokens, layout, and components
│   ├── responsive.css     → breakpoints (laptop / tablet / mobile)
│   └── animations.css     → keyframes, reveal transitions, reduced-motion rules
│
├── js/
│   ├── main.js             → scroll reveals, stat counters, parallax, ripple, form
│   ├── gallery.js          → category filtering + lightbox with keyboard nav
│   └── navigation.js       → sticky navbar, mobile menu, active link, smooth scroll
│
├── images/
│   ├── hero/               → full-screen hero background
│   ├── gallery/             → portfolio thumbnails (landscape, portrait, wedding, nature, street)
│   ├── about/                → photographer profile image
│   └── icons/                → social icons (Instagram, Facebook, Pinterest — included as SVG)
│
└── README.md
```

## Replacing the Placeholder Images

Every image is referenced by a predictable path so you can drop in real photography without touching the code:

| Path                                | Used for                              |
|--------------------------------------|----------------------------------------|
| `images/hero/hero.jpg`               | Full-screen hero background            |
| `images/gallery/landscape-01.jpg` … `03.jpg` | Landscape gallery items         |
| `images/gallery/portrait-01.jpg` … `03.jpg`  | Portrait gallery items          |
| `images/gallery/wedding-01.jpg` … `02.jpg`   | Wedding gallery items           |
| `images/gallery/nature-01.jpg` … `02.jpg`    | Nature gallery items            |
| `images/gallery/street-01.jpg` … `02.jpg`    | Street gallery items            |
| `images/about/profile.jpg`           | Photographer portrait in the About section |

Recommended sizes: hero image at least 1920×1080; gallery images at least 1200px on the long edge (mixed orientations look best in the masonry layout).

## Design System

- **Colors** — near-black `#0f0f0f` background, warm off-white text, muted gray for secondary copy, and a single gold accent `#D4AF37` used sparingly for emphasis (eyebrows, dividers, hover states).
- **Type** — `Fraunces` (serif, italics used for warmth) for headlines, `Inter` for body copy, and `Space Mono` for small utility labels (categories, stats, eyebrows) — a nod to camera-data readouts.
- **Motion** — a slow Ken Burns zoom on the hero image, scroll-triggered fade/slide reveals, animated counters in the About section, and a button ripple effect. All motion respects `prefers-reduced-motion`.

## Features

- Sticky navbar that turns from transparent to solid on scroll, with active-link highlighting and a mobile hamburger menu.
- Masonry gallery with live category filtering (Landscape, Portrait, Wedding, Nature, Street).
- Lightbox modal with next/previous controls, keyboard navigation (←, →, Esc), and focus handling.
- Animated statistics counters, parallax hero, and scroll-reveal transitions.
- Fully responsive: desktop, laptop, tablet, and mobile (with a dedicated mobile navigation pattern).
- Semantic HTML, ARIA labels on interactive controls, visible keyboard focus states, and lazy-loaded images.
- Client-side contact form validation with a status message (no backend included — wire up your own endpoint in `main.js`).

## Browser Support

Built with modern, widely-supported CSS (Grid, `column-count` masonry, `aspect-ratio`, `backdrop-filter`) and vanilla JS (`IntersectionObserver`). Works in all current versions of Chrome, Firefox, Safari, and Edge.

## Customization Notes

- All design tokens (colors, spacing, fonts, easing) live at the top of `css/style.css` as CSS custom properties — change them once and they cascade everywhere.
- Gallery items are plain `<figure>` elements with a `data-category` attribute; add more by copying an existing block in `index.html` and dropping in a matching image.
- Social links in the footer point to placeholder URLs — update the `href` values in `index.html`.
