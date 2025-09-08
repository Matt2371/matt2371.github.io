// assets/app.js — lightbox, reveal, list rendering, social icons in nav
import { SITE, RESEARCH, PROJECTS, NOTES } from './data.js';

/* =============================== *
 * Globals                         *
 * =============================== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* =============================== *
 * Social icons in the nav         *
 * =============================== */
const ICONS = {
  github: `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 .5A11.5 11.5 0 0 0 .5 12.3c0 5.23 3.4 9.66 8.13 11.23.6.12.82-.26.82-.58 0-.28-.01-1.03-.02-2.02-3.31.74-4.01-1.63-4.01-1.63-.55-1.42-1.35-1.8-1.35-1.8-1.1-.77.08-.76.08-.76 1.22.09 1.87 1.27 1.87 1.27 1.08 1.88 2.83 1.34 3.52 1.02.11-.79.43-1.34.78-1.65-2.64-.31-5.42-1.36-5.42-6.05 0-1.34.47-2.43 1.24-3.29-.13-.31-.54-1.56.12-3.25 0 0 1.01-.33 3.31 1.26.96-.27 1.98-.4 3-.41 1.02.01 2.04.14 3 .41 2.3-1.59 3.31-1.26 3.31-1.26.66 1.69.25 2.94.12 3.25.77.86 1.24 1.95 1.24 3.29 0 4.7-2.78 5.73-5.43 6.04.44.38.83 1.12.83 2.27 0 1.64-.02 2.96-.02 3.36 0 .32.22.71.83.59A11.5 11.5 0 0 0 23.5 12.3 11.5 11.5 0 0 0 12 .5z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.86-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.33V9h3.42v1.56h.05c.48-.9 1.65-1.86 3.4-1.86 3.64 0 4.31 2.4 4.31 5.51v6.24zM5.34 7.43A2.07 2.07 0 1 1 5.33 3.3a2.07 2.07 0 0 1 .01 4.14zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>`,
  email: `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"/></svg>`
};

function iconFor(label) {
  const k = (label || '').toLowerCase();
  if (k.includes('github')) return ICONS.github;
  if (k.includes('linkedin')) return ICONS.linkedin;
  if (k.includes('email') || k.includes('mail')) return ICONS.email;
  return '🔗';
}

function buildSocialIcons() {
  const wrap = document.querySelector('[data-social]');
  if (!wrap) return;

  // Non-email social links (GitHub, LinkedIn, etc.)
  const others = (Array.isArray(SITE?.social) ? SITE.social : []).filter(s => {
    const lbl = (s.label || "").toLowerCase();
    const isEmailLike = lbl.includes("email") || lbl.includes("mail") || (s.url || "").startsWith("mailto:");
    return !isEmailLike; // strip any email-like item
  });

  const linksHTML = others.map(s => {
    const sameTab = (s.url || '').startsWith('mailto:');
    return `<a class="icon-btn" href="${s.url}" ${sameTab ? '' : 'target="_blank" rel="noopener"'} aria-label="${s.label}">${iconFor(s.label)}</a>`;
  }).join('');

  // Always render email as a COPY button (if we have an address)
  const emailAddr = (SITE?.email || "").trim();
  const emailHTML = emailAddr
    ? `<span class="icon-wrap">
         <button class="icon-btn" type="button" data-copy-email="${emailAddr}" aria-label="Copy email">${ICONS.email}</button>
         <span class="copy-pop" role="status" aria-live="polite" hidden>Email address copied!</span>
       </span>`
    : '';

  wrap.innerHTML = emailHTML + linksHTML;
}


function setupCopyEmail() {
  const wrap = document.querySelector('[data-social]');
  if (!wrap) return;

  wrap.addEventListener('click', async (e) => {
    const btn = e.target.closest('button[data-copy-email]');
    if (!btn) return;

    const email = btn.getAttribute('data-copy-email');
    if (!email) return;

    // Copy to clipboard with fallback
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = email;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }

    // Show popup
    const wrapEl = btn.closest('.icon-wrap');
    const pop = wrapEl?.querySelector('.copy-pop');
    if (pop) {
      pop.hidden = false;
      pop.classList.add('show');
      setTimeout(() => { pop.classList.remove('show'); pop.hidden = true; }, 1400);
    }
  });
}


/* =============================== *
 * Hero setup (banner & headshot)  *
 * =============================== */
function setupHero() {
  const hero = $('.hero');
  if (!hero) return;
  hero.style.setProperty('--banner', `url('${SITE?.banner || '/assets/images/banner.jpg'}')`);
  const headshot = $('.headshot');
  if (headshot && SITE?.headshot) headshot.src = SITE.headshot;
}

/* =============================== *
 * Reveal on scroll (reduced motion)
 * =============================== */
function setupReveal() {
  const nodes = $$('.reveal');
  if (!nodes.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    nodes.forEach(n => n.classList.add('show'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
  }, { threshold: 0.08 });

  nodes.forEach(n => io.observe(n));
}

/* =============================== *
 * Lightbox for images             *
 * =============================== */
function setupLightbox() {
  const lb = $('#lightbox');
  const lbImg = $('#lightboxImg');
  if (!lb || !lbImg) return;

  document.addEventListener('click', (e) => {
    const img = e.target.closest('.js-lightbox');
    if (img) { lbImg.src = img.getAttribute('src'); lb.classList.add('show'); }
    if (e.target === lb) lb.classList.remove('show');
  });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') lb.classList.remove('show'); });
}

/* =============================== *
 * List rendering (Research/Notes/Projects)
 * =============================== */
function cardHTML({ title, image, url, pdf, summary }, type = 'research') {
  const safeTitle = title || '';
  const imgSrc = image || '/assets/images/placeholder.jpg';
  const titleHTML = type === 'notes'
    ? `<a class="title" href="${pdf}" download>${safeTitle}</a>`
    : (url ? `<a class="title" href="${url}" target="_blank" rel="noopener">${safeTitle}</a>` : `<span class="title">${safeTitle}</span>`);
  return `
  <article class="card reveal">
    <div class="item">
      <img class="thumb js-lightbox" src="${imgSrc}" alt="${safeTitle}" loading="lazy"/>
      <div>
        <h3>${titleHTML}</h3>
        <p>${summary || ''}</p>
      </div>
    </div>
  </article>`;
}

function renderList(whereSelector, dataset, type) {
  const el = $(whereSelector);
  if (!el || !dataset?.items?.length) return;
  el.classList.add('list'); // ensure list layout even if class missing in HTML
  el.innerHTML = dataset.items.map(item => cardHTML(item, type)).join('');
  // re-bind reveal on injected nodes
  $$('.reveal', el).forEach(n => n.classList.add('show')); // show immediately; setupReveal handles others
}

/* =============================== *
 * Page router                     *
 * =============================== */
function route() {
  const page = document.body.dataset.page;
  if (page === 'research') {
    const overview = $('[data-overview]');
    if (overview) overview.textContent = RESEARCH?.overview || '';
    renderList('[data-list]', RESEARCH, 'research');
  }
  if (page === 'projects') {
    const overview = $('[data-overview]');
    if (overview) overview.textContent = PROJECTS?.overview || '';
    renderList('[data-list]', PROJECTS, 'projects');
  }
  if (page === 'notes') {
    const overview = $('[data-overview]');
    if (overview) overview.textContent = NOTES?.overview || '';
    renderList('[data-list]', NOTES, 'notes');
  }
}

/* =============================== *
 * Mobile nav toggle               *
 * =============================== */
function setupMobileNav() {
  const navToggle = $('.nav-toggle');
  const mobileMenu = $('#mobileMenu');
  if (!navToggle || !mobileMenu) return;

  const close = () => {
    mobileMenu.classList.remove('show');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = mobileMenu.classList.toggle('show');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  mobileMenu.addEventListener('click', (e) => {
    if (e.target.matches('a')) close();
  });

  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !e.target.closest('.nav-toggle')) close();
  });

  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

/* =============================== *
 * Boot                            *
 * =============================== */
function boot() {
  // Fill shared UI bits
  $$
    ('[data-site-name]')
    .forEach(el => el.textContent = SITE?.name || '');
  $$
    ('[data-site-role]')
    .forEach(el => el.textContent = SITE?.role || '');

  buildSocialIcons();
  setupCopyEmail();
  setupHero();
  setupLightbox();
  setupReveal();
  route();
  setupMobileNav();
}

// Modules run after HTML parse; still, run after next tick to be safe
queueMicrotask(boot);
