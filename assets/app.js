// assets/app.js — lightbox, reveal, list rendering, social icons in nav (dark only)
import { SITE, RESEARCH, PROJECTS, NOTES } from './data.js';

// Force dark mode class
document.documentElement.classList.add('dark');

// ===== Fill global site bits =====
function fillGlobals() {
  document.querySelectorAll('[data-site-name]').forEach(el => el.textContent = SITE.name);
  document.querySelectorAll('[data-site-role]').forEach(el => el.textContent = SITE.role);

  // Social icons (email, GitHub, LinkedIn) — render into nav
  const socialWrap = document.querySelector('[data-social]');
  if (socialWrap) {
    const items = [];
    if (SITE.email) items.push({ label: 'Email', url: `mailto:${SITE.email}` });
    if (Array.isArray(SITE.social)) items.push(...SITE.social);
    const icon = (label) => {
      const k = label.toLowerCase();
      if (k.includes('github')) return `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 .5A11.5 11.5 0 0 0 .5 12.3c0 5.23 3.4 9.66 8.13 11.23.6.12.82-.26.82-.58 0-.28-.01-1.03-.02-2.02-3.31.74-4.01-1.63-4.01-1.63-.55-1.42-1.35-1.8-1.35-1.8-1.1-.77.08-.76.08-.76 1.22.09 1.87 1.27 1.87 1.27 1.08 1.88 2.83 1.34 3.52 1.02.11-.79.43-1.34.78-1.65-2.64-.31-5.42-1.36-5.42-6.05 0-1.34.47-2.43 1.24-3.29-.13-.31-.54-1.56.12-3.25 0 0 1.01-.33 3.31 1.26.96-.27 1.98-.4 3-.41 1.02.01 2.04.14 3 .41 2.3-1.59 3.31-1.26 3.31-1.26.66 1.69.25 2.94.12 3.25.77.86 1.24 1.95 1.24 3.29 0 4.7-2.78 5.73-5.43 6.04.44.38.83 1.12.83 2.27 0 1.64-.02 2.96-.02 3.36 0 .32.22.71.83.59A11.5 11.5 0 0 0 23.5 12.3 11.5 11.5 0 0 0 12 .5z"/></svg>`;
      if (k.includes('linkedin')) return `<svg viewBox= "0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.86-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.33V9h3.42v1.56h.05c.48-.9 1.65-1.86 3.4-1.86 3.64 0 4.31 2.4 4.31 5.51v6.24zM5.34 7.43A2.07 2.07 0 1 1 5.33 3.3a2.07 2.07 0 0 1 .01 4.14zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>`;
      // generic email envelope
      if (k.includes('email') || k.includes('mail')) return `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"/></svg>`;
      return '🔗';
    };
    socialWrap.innerHTML = items.map(s => {
      const sameTab = s.url.startsWith('mailto:');
      return `<a class="icon-btn" href="${s.url}" ${sameTab ? '' : 'target="_blank" rel="noopener"'} aria-label="${s.label}">${icon(s.label)}</a>`;
    }).join('');
  }
}
fillGlobals();

// ===== Hero banner & headshot on Home =====
const hero = document.querySelector('.hero');
if (hero) {
  hero.style.setProperty('--banner', `url('${SITE.banner}')`);
  const headshot = document.querySelector('.headshot');
  if (headshot) headshot.src = SITE.headshot;
}

// ===== Reveal on scroll =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ===== Lightbox =====
const lb = document.querySelector('#lightbox');
const lbImg = document.querySelector('#lightboxImg');
if (lb && lbImg) {
  document.addEventListener('click', (e) => {
    const img = e.target.closest('.js-lightbox');
    if (img) { lbImg.src = img.src; lb.classList.add('show'); }
    if (e.target === lb) lb.classList.remove('show');
  });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') lb.classList.remove('show'); });
}

// ===== Render helpers — strict list layout =====
function cardHTML({ title, image, url, pdf, summary }, type='research') {
  const titleHTML = type === 'notes'
    ? `<a class="title" href="${pdf}" download>${title}</a>`
    : (url ? `<a class="title" href="${url}" target="_blank" rel="noopener">${title}</a>` : `<span class="title">${title}</span>`);
  return `
  <article class="card reveal">
    <div class="item">
      <img class="thumb js-lightbox" src="${image}" alt="${title}" loading="lazy"/>
      <div>
        <h3>${titleHTML}</h3>
        <p>${summary}</p>
      </div>
    </div>
  </article>`;
}

function renderList(whereSelector, dataset, type) {
  const el = document.querySelector(whereSelector);
  if (!el) return;
  el.classList.add('list'); // enforce list layout even if class missing in HTML
  el.innerHTML = dataset.items.map(item => cardHTML(item, type)).join('');
  el.querySelectorAll('.reveal').forEach(n => io.observe(n));
}

// Page routers
const page = document.body.dataset.page;
if (page === 'research') {
  const overview = document.querySelector('[data-overview]');
  if (overview) overview.textContent = RESEARCH.overview;
  renderList('[data-list]', RESEARCH, 'research');
}
if (page === 'projects') {
  const overview = document.querySelector('[data-overview]');
  if (overview) overview.textContent = PROJECTS.overview;
  renderList('[data-list]', PROJECTS, 'projects');
}
if (page === 'notes') {
  const overview = document.querySelector('[data-overview]');
  if (overview) overview.textContent = NOTES.overview;
  renderList('[data-list]', NOTES, 'notes');
}