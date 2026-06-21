/* ===================================================================
   Absolom Orianga — Portfolio interactions
   =================================================================== */
(function () {
  'use strict';

  const navbar   = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const links    = Array.from(document.querySelectorAll('.nav-link'));
  const sections = links
    .map((l) => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);

  /* ---- Navbar background on scroll ---- */
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    activateCurrentSection();
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Mobile menu ---- */
  const closeMenu = () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  };
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
  });
  navLinks.addEventListener('click', (e) => {
    if (e.target.closest('a')) closeMenu();
  });

  /* ---- Active link based on scroll position (scroll-spy) ---- */
  function activateCurrentSection() {
    const pos = window.scrollY + 120;
    let current = sections[0]?.id;
    for (const sec of sections) {
      if (sec.offsetTop <= pos) current = sec.id;
    }
    links.forEach((l) =>
      l.classList.toggle('active', l.getAttribute('href') === '#' + current)
    );
  }

  /* ---- Reveal on scroll ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = (i % 4) * 80 + 'ms';
            entry.target.classList.add('in');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* ---- Animated stat counters ---- */
  const counters = document.querySelectorAll('.stat-num');
  const runCounter = (el) => {
    const target = +el.dataset.count;
    const dur = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const statIO = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((c) => statIO.observe(c));
  } else {
    counters.forEach((c) => (c.textContent = c.dataset.count));
  }

  /* ---- Contact form (client-side; opens mail client) ---- */
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !emailOk || !message) {
        showNote('Please fill in all fields with a valid email.', 'err');
        return;
      }

      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href =
        `mailto:support@logoscloudservices.com?subject=${subject}&body=${body}`;

      showNote('Thanks! Your email client should now open. 🎉', 'ok');
      form.reset();
    });
  }
  function showNote(msg, type) {
    note.textContent = msg;
    note.className = 'form-note ' + type;
    note.hidden = false;
  }

  /* ---- Resume: force a real download instead of opening the PDF ---- */
  const resumeBtn = document.getElementById('resumeBtn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', async (e) => {
      const url = resumeBtn.getAttribute('href');
      const filename = resumeBtn.getAttribute('download') || 'Resume.pdf';
      try {
        e.preventDefault();
        const res = await fetch(url);
        if (!res.ok) throw new Error('fetch failed');
        const blob = await res.blob();
        const objUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = objUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(objUrl);
      } catch (err) {
        /* Fallback (e.g. opened via file://): let the browser's download attr handle it */
        window.location.href = url;
      }
    });
  }

  /* ---- Footer year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Init ---- */
  onScroll();
})();
