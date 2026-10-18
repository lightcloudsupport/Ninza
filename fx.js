(() => {
  const $ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch = matchMedia('(hover: none)').matches;
  const add = (tag, id) => { const e = document.createElement(tag); e.id = id; document.body.prepend(e); return e; };
  const bar = add('div', 'fxBar'), glow = add('div', 'fxGlow'), bg = add('div', 'fxBg');

  // wrap hero illustration so it can rotate in 3D
  const art = document.querySelector('.hero-art');
  if (art) { const w = document.createElement('div'); w.className = 'hero-scene'; w.append(...art.childNodes); art.append(w); }
  const scene = document.querySelector('.hero-scene');

  // scroll reveal with stagger
  const groups = ['.section-title', '.grid', '.metrics', '.panel-preview > *', '.faqs', '.support', '.dns-note', '.domain-tool'];
  groups.forEach(sel => $(sel).forEach(g => {
    const kids = g.matches('.grid,.metrics,.faqs') ? [...g.children] : [g];
    kids.forEach((k, i) => { k.classList.add('reveal'); k.style.setProperty('--d', i * 0.12 + 's'); });
  }));
  $('.panel-preview > *')[0]?.classList.add('from-left'); $('.panel-preview > *')[1]?.classList.add('from-right');
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
  $('.reveal').forEach(el => io.observe(el));

  // 3D tilt + spotlight
  if (!touch && !reduce) $('.card,.plan,.feature').forEach(c => {
    c.classList.add('tilt');
    c.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.style.transform = `perspective(900px) rotateX(${(.5 - y) * 14}deg) rotateY(${(x - .5) * 14}deg) translateY(-6px) scale(1.02)`;
      c.style.setProperty('--mx', x * 100 + '%'); c.style.setProperty('--my', y * 100 + '%');
    });
    c.addEventListener('pointerleave', () => c.style.transform = '');
  });

  // hero mouse-driven 3D + cursor glow
  addEventListener('pointermove', e => {
    glow.style.opacity = 1; glow.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
    if (scene && !touch && !reduce) {
      const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
      scene.style.transform = `rotateY(${x * 22}deg) rotateX(${-y * 18}deg)`;
    }
  });
  document.addEventListener('pointerleave', () => glow.style.opacity = 0);

  // magnetic buttons
  if (!touch && !reduce) $('.button.primary').forEach(b => {
    b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .15}px,${(e.clientY - r.top - r.height / 2) * .25}px)`; });
    b.addEventListener('pointerleave', () => b.style.transform = '');
  });

  // scroll: progress bar, header, parallax, dashboard 3D, active nav
  const top = document.querySelector('.topbar'), win = document.querySelector('.panel-window');
  const links = $('.topbar nav a'), secs = links.map(a => { const h = a.getAttribute('href'); return h.startsWith('#') ? document.querySelector(h) : null; });
  let tick = false;
  const onScroll = () => {
    const h = document.documentElement, y = scrollY, p = y / Math.max(1, h.scrollHeight - innerHeight);
    bar.style.transform = `scaleX(${p})`;
    top.classList.toggle('scrolled', y > 30);
    if (!reduce) { bg.style.transform = `translateY(${y * -.08}px)`; if (art) art.style.translate = `0 ${Math.min(y, 600) * .12}px`; }
    if (win && !reduce) { const r = win.getBoundingClientRect(), t = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / innerHeight)); win.style.setProperty('--ry', -12 * t + 'deg'); win.style.setProperty('--rx', 10 * t + 'deg'); }
    let cur = -1; secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top < innerHeight * .4) cur = i; });
    links.forEach((a, i) => a.classList.toggle('active', i === cur));
    tick = false;
  };
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
})();
