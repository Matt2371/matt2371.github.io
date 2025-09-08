// assets/app.js
// Theme toggle, reveal-on-scroll, lightbox, and render helpers.

import { SITE, RESEARCH, PROJECTS, NOTES } from './data.js';

// ===== Theme toggle =====
const root = document.documentElement; // <html>
const themeBtn = document.querySelector('[data-theme-toggle]');
const saved = localStorage.getItem('theme');
if (saved) root.classList.toggle('dark', saved === 'dark'); else root.classList.add('dark');
if (themeBtn) themeBtn.addEventListener('click', () => {
  root.classList.toggle('dark');
  localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
});

// ===== Fill global site bits =====
function fillGlobals() {
  document.querySelectorAll('[data-site-name]').forEach(el => el.textContent = SITE.name);
  document.querySelectorAll('[data-site-role]').forEach(el => el.textContent = SITE.role);
  document.querySelectorAll('[data-site-location]').forEach(el => el.textContent = SITE.location);
  if (SITE.email) document.querySelectorAll('[data-site-email]').forEach(el => el.href = `mailto:${SITE.email}`);
  const socialWrap = document.querySelector('[data-social]');
  if (socialWrap && SITE.social?.length) {
    socialWrap.innerHTML = SITE.social.map(s => `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`).join(' · ');
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

// ===== Render helpers =====
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