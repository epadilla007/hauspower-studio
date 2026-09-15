/* HausPower shared script: header, menu, active nav, light GSAP patterns. */
(function () {
  var doc = document.documentElement;

  /* Header state */
  var header = document.querySelector('[data-header]');
  var onScroll = function () {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile menu */
  var toggle = document.querySelector('[data-menu-toggle]');
  var nav = document.querySelector('.primary-nav');
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  }

  /* Active page indicator */
  var path = location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-list a[href^="/"]').forEach(function (a) {
    var href = a.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === path) a.setAttribute('aria-current', 'page');
  });

  /* Copyright year */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* Motion. Content stays visible if GSAP is missing or motion is reduced. */
  if (!doc.classList.contains('js')) return;
  if (!window.gsap || !window.ScrollTrigger) { doc.classList.remove('js'); return; }
  window.__hpAnim = true;
  var gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);
  gsap.defaults({ ease: 'power3.out', duration: 0.8 });

  /* Pattern 1: fade-up on entry (batched) */
  window.ScrollTrigger.batch('.reveal, .fade-up', {
    start: 'top 88%',
    once: true,
    onEnter: function (els) {
      gsap.to(els, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, overwrite: true });
    }
  });

  /* Pattern 2: staggered card groups */
  gsap.utils.toArray('[data-stagger]').forEach(function (group) {
    var items = group.children;
    gsap.set(items, { opacity: 0, y: 28 });
    gsap.to(items, {
      opacity: 1, y: 0, duration: 0.8, stagger: 0.12,
      scrollTrigger: { trigger: group, start: 'top 85%', once: true }
    });
  });

  /* Pattern 3: image scale-in inside overflow-hidden frames */
  gsap.utils.toArray('.img-scale img').forEach(function (img) {
    gsap.fromTo(img, { scale: 1.08 }, {
      scale: 1, duration: 1.2, ease: 'power2.out',
      scrollTrigger: { trigger: img.parentElement, start: 'top 90%', once: true }
    });
  });

  /* Pattern 4: section label slide */
  gsap.utils.toArray('.label.slide').forEach(function (el) {
    gsap.to(el, { opacity: 1, x: 0, duration: 0.7, delay: 0.1, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  });

  /* Page hero intro (content pages) */
  var intro = document.querySelectorAll('[data-intro] > *');
  if (intro.length) {
    gsap.fromTo(intro, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12, delay: 0.1 });
  }

  window.addEventListener('load', function () { window.ScrollTrigger.refresh(); });
})();
