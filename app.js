// ── Shared nav + footer ───────────────────────────────────────────────────
(function () {
  var isArt = window.location.pathname.indexOf('/art/') !== -1;
  var b     = isArt ? '../' : '';

  // ── Nav ──────────────────────────────────────────────────────────────────
  var navList = document.getElementById('nav-links');
  if (navList) {
    navList.innerHTML = [
      '<li><a href="' + b + 'index.html">Home</a></li>',
      '<li><a href="' + b + 'paintings.html">Original Paintings</a></li>',
      '<li><a href="' + b + 'prints-painterly.html">Prints Painterly</a></li>',
      '<li><a href="' + b + 'index.html#city-series">City Series</a></li>',
      '<li><a href="' + b + 'index.html#commissions">Commissions</a></li>',
      '<li><a href="' + b + 'index.html#process">Studio Process</a></li>',
      '<li><a href="' + b + 'about.html">About</a></li>',
      '<li><a href="' + b + 'index.html#contact" class="cta-btn">Enquire</a></li>'
    ].join('');
  }

  // ── Footer ───────────────────────────────────────────────────────────────
  var footer = document.querySelector('footer.site-footer');
  if (!footer) return;
  var year   = new Date().getFullYear();
  var igIcon = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>';
  var fbIcon = '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>';
  footer.innerHTML = [
    '<div class="container">',
    '  <div class="footer-content">',

    '    <div class="footer-brand">',
    '      <h3>Nicholas Girling Artist - Melbourne Australia</h3>',
    '      <p>Original Paintings · Paintspace · Printspace</p>',
    '      <p>self represented &amp; co-Founder of printspace</p>',
    '      <p>ABN 76 181 584 319</p>',
    '    </div>',

    '    <div class="footer-col">',
    '      <span class="footer-col-title">Navigate</span>',
    '      <nav class="footer-links">',
    '        <a href="' + b + 'index.html">Home</a>',
    '        <a href="' + b + 'index.html#commissions">Commissions</a>',
    '        <a href="' + b + 'about.html">About</a>',
    '        <a href="' + b + 'index.html#contact">Contact</a>',
    '        <a href="' + b + 'privacy.html">Privacy Policy</a>',
    '      </nav>',
    '    </div>',

    '    <div class="footer-col">',
    '      <span class="footer-col-title">Collection</span>',
    '      <nav class="footer-links">',
    '        <a href="' + b + 'paintings.html">Original Paintings</a>',
    '        <a href="' + b + 'prints-painterly.html">Prints Painterly</a>',
    '        <a href="' + b + 'prints-cities.html">Prints Cities</a>',
    '        <a href="' + b + 'prints-graphic.html">Prints Graphic</a>',
    '      </nav>',
    '    </div>',

    '    <div class="footer-col">',
    '      <span class="footer-col-title">Follow</span>',
    '      <div class="social-icons">',
    '        <a href="https://www.instagram.com/nicholasgirling" aria-label="Instagram — paintings" target="_blank" rel="noopener noreferrer">' + igIcon + '@nicholasgirling</a>',
    '        <a href="https://www.instagram.com/nicholasgirling_prints" aria-label="Instagram — prints" target="_blank" rel="noopener noreferrer">' + igIcon + '@nicholasgirling_prints</a>',
    '        <a href="https://www.instagram.com/printspace" aria-label="Instagram — shop" target="_blank" rel="noopener noreferrer">' + igIcon + '@printspace</a>',
    '        <a href="https://www.facebook.com/NicholasGirlingArt/" aria-label="Facebook" target="_blank" rel="noopener noreferrer">' + fbIcon + 'Facebook</a>',
    '      </div>',
    '    </div>',

    '  </div>',
    '  <div class="copyright">',
    '    <p>&copy; ' + year + ' Nicholas Girling. All images are copyright protected. All Rights Reserved.</p>',
    '  </div>',
    '</div>'
  ].join('\n');
}());

document.addEventListener('DOMContentLoaded', function () {

  // ── Pre-fill enquiry form from ?artwork= URL param ───────────────────────
  const artworkParam = new URLSearchParams(window.location.search).get('artwork');
  if (artworkParam) {
    const artworkField = document.getElementById('artwork-or-series');
    if (artworkField) artworkField.value = artworkParam;
  }

  // ── Nav: transparent → solid on scroll ─────────────────────────────────
  const header = document.getElementById('site-header');

  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ── Mobile menu ─────────────────────────────────────────────────────────
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks   = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      const open = navLinks.classList.toggle('active');
      menuToggle.classList.toggle('open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Smooth scroll ────────────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ── Scroll reveal ────────────────────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const delay = entry.target.dataset.delay || 0;
        entry.target.style.transitionDelay = delay + 'ms';
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -56px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

});
