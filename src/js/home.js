/* HausPower homepage: full GSAP treatment. */
(function () {
  var doc = document.documentElement;

  /* Disciplines: sync the sticky image with the active row (works without GSAP) */
  var rows = document.querySelectorAll('[data-disc]');
  var imgs = document.querySelectorAll('[data-disc-img]');
  var caption = document.querySelector('[data-disc-caption]');
  var activate = function (key) {
    rows.forEach(function (r) { r.classList.toggle('is-active', r.getAttribute('data-disc') === key); });
    imgs.forEach(function (i) { i.classList.toggle('is-active', i.getAttribute('data-disc-img') === key); });
    var row = document.querySelector('[data-disc="' + key + '"] h3');
    if (caption && row) caption.textContent = row.textContent;
  };
  if ('IntersectionObserver' in window && rows.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) activate(e.target.getAttribute('data-disc')); });
    }, { rootMargin: '-45% 0px -45% 0px' });
    rows.forEach(function (r) {
      io.observe(r);
      r.addEventListener('mouseenter', function () { activate(r.getAttribute('data-disc')); });
    });
  }

  if (!doc.classList.contains('js') || !window.gsap || !window.ScrollTrigger) return;
  var gsap = window.gsap;
  var ST = window.ScrollTrigger;
  var mm = gsap.matchMedia();

  /* Hero: word entrance on load */
  var words = document.querySelectorAll('.hero-word');
  var heroTl = gsap.timeline({ delay: 0.15 });
  heroTl.to(words, { opacity: 1, y: 0, duration: 1.1, stagger: 0.07, ease: 'expo.out' })
        .from('.hero-media img', { scale: 1.12, duration: 2.2, ease: 'power2.out' }, 0);

  /* Hero: scroll recede (scrubbed) */
  gsap.to('.hero-media img', {
    yPercent: 12, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
  });
  gsap.to('.hero-inner', {
    y: -60, opacity: 0.2, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: '40% top', end: 'bottom top', scrub: 1 }
  });

  /* Manifesto: word-by-word dim to bright (starts at 0.15 so the sentence shape is visible) */
  var mText = document.querySelector('[data-manifesto]');
  if (mText) {
    var nodes = Array.prototype.slice.call(mText.childNodes);
    mText.textContent = '';
    nodes.forEach(function (n) {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { mText.appendChild(document.createTextNode(part)); return; }
          var s = document.createElement('span'); s.className = 'w'; s.textContent = part; mText.appendChild(s);
        });
      } else {
        n.classList && n.classList.add('w');
        mText.appendChild(n);
      }
    });
    var ws = mText.querySelectorAll('.w');
    gsap.set(ws, { opacity: 0.15 });
    gsap.to(ws, {
      opacity: 1, stagger: 0.08, ease: 'none',
      scrollTrigger: { trigger: mText, start: 'top 80%', end: 'bottom 45%', scrub: 1 }
    });
  }
  gsap.fromTo('.manifesto-ring', { rotate: -30 }, {
    rotate: 60, ease: 'none',
    scrollTrigger: { trigger: '.manifesto', start: 'top bottom', end: 'bottom top', scrub: 1 }
  });

  /* Hairlines draw */
  gsap.utils.toArray('.hairline').forEach(function (h) {
    gsap.fromTo(h, { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 92%', once: true } });
  });

  /* Image clip reveals */
  gsap.utils.toArray('.img-reveal').forEach(function (el) {
    var img = el.querySelector('img');
    var tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    tl.to(el, { clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'expo.inOut' });
    if (img) tl.fromTo(img, { scale: 1.1 }, { scale: 1, duration: 1.6, ease: 'power2.out' }, 0);
  });

  /* Process: stacked cards recede as the next arrives (desktop) */
  mm.add('(min-width: 901px)', function () {
    var steps = gsap.utils.toArray('.step');
    steps.forEach(function (step, i) {
      var next = steps[i + 1];
      if (!next) return;
      gsap.to(step, {
        scale: 0.95, opacity: 0.55, ease: 'none',
        scrollTrigger: { trigger: next, start: 'top 85%', end: 'top 30%', scrub: 1 }
      });
    });
  });

  /* Partners: inset parallax */
  gsap.fromTo('.partners-media .inset', { yPercent: 12 }, {
    yPercent: -12, ease: 'none',
    scrollTrigger: { trigger: '.partners', start: 'top bottom', end: 'bottom top', scrub: 1 }
  });

  /* Voices: pinned horizontal track on desktop */
  mm.add('(min-width: 1024px)', function () {
    var track = document.querySelector('.voices-track');
    var section = document.querySelector('.voices');
    if (!track || !section) return;
    var dist = function () { return Math.max(0, track.scrollWidth - document.querySelector('.voices .wrap').clientWidth); };
    gsap.to(track, {
      x: function () { return -dist(); }, ease: 'none',
      scrollTrigger: {
        trigger: section, start: 'top top', end: function () { return '+=' + dist(); },
        pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1
      }
    });
  });

  /* Magnetic primary buttons (pointer devices only) */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.btn-primary').forEach(function (b) {
      var xTo = gsap.quickTo(b, 'x', { duration: 0.4, ease: 'power3.out' });
      var yTo = gsap.quickTo(b, 'y', { duration: 0.4, ease: 'power3.out' });
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.12);
        yTo((e.clientY - r.top - r.height / 2) * 0.2);
      });
      b.addEventListener('mouseleave', function () { xTo(0); yTo(0); });
    });
  }

  window.addEventListener('load', function () { ST.refresh(); });
})();
