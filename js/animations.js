/**
 * Scroll-reveal, parallax, text-split, reviews slider
 */

/* === Scroll Reveal === */
export function initReveal() {
  const elements = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* === Hero entrance === */
export function initHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  requestAnimationFrame(() => {
    setTimeout(() => hero.classList.add('is-visible'), 200);
  });
}

/* === Text Split === */
export function initTextSplit() {
  document.querySelectorAll('.split-text').forEach(el => {
    const text = el.textContent.trim();
    el.innerHTML = text.split(' ').map(word =>
      `<span class="word"><span class="word-inner">${word}</span></span>`
    ).join(' ');
  });
}

/* === Parallax on scroll === */
export function initParallax() {
  const items = document.querySelectorAll('[data-parallax]');
  if (!items.length) return;

  let ticking = false;
  const update = () => {
    const scrollY = window.scrollY;
    items.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.1;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = (center - window.innerHeight / 2) * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

/* === Reviews Slider === */
export function initReviewsSlider() {
  const wrapper = document.querySelector('.reviews__track-wrapper');
  const track = document.querySelector('.reviews__track');
  const prevBtn = document.querySelector('.reviews__nav-btn--prev');
  const nextBtn = document.querySelector('.reviews__nav-btn--next');
  const dots = document.querySelectorAll('.reviews__dot');
  if (!track || !prevBtn || !nextBtn) return;

  let current = 0;
  const cards = track.querySelectorAll('.review-card');

  function isMobile() {
    return window.innerWidth < 768;
  }

  function getVisibleCount() {
    if (isMobile()) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function getGap() {
    return parseInt(getComputedStyle(track).gap) || 0;
  }

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
    });
  }

  function slide(dir) {
    const visible = getVisibleCount();
    const max = Math.max(0, cards.length - visible);
    current = Math.min(Math.max(current + dir, 0), max);
    const cardWidth = cards[0].offsetWidth;
    const gap = getGap();

    if (isMobile() && wrapper) {
      /* Mobile — native scroll with snap */
      track.style.transform = '';
      wrapper.scrollTo({
        left: current * (cardWidth + gap),
        behavior: 'smooth'
      });
    } else {
      /* Desktop — translateX on track */
      if (wrapper) wrapper.scrollLeft = 0;
      track.style.transform = current === 0
        ? 'translateX(0)'
        : `translateX(-${current * (cardWidth + gap)}px)`;
    }
    updateDots();
  }

  prevBtn.addEventListener('click', () => slide(-1));
  nextBtn.addEventListener('click', () => slide(1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      current = i;
      slide(0);
    });
  });

  /* Sync dots on manual swipe (mobile) */
  if (wrapper) {
    let scrollTimeout;
    wrapper.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (!isMobile()) return;
        const cardWidth = cards[0].offsetWidth;
        const gap = getGap();
        const step = cardWidth + gap;
        if (step === 0) return;
        const newCurrent = Math.round(wrapper.scrollLeft / step);
        if (newCurrent !== current && newCurrent >= 0 && newCurrent < cards.length) {
          current = newCurrent;
          updateDots();
        }
      }, 100);
    }, { passive: true });
  }

  /* Reset on resize — clear stale state when switching modes */
  let wasMobile = isMobile();
  window.addEventListener('resize', () => {
    const nowMobile = isMobile();
    if (nowMobile !== wasMobile) {
      current = 0;
      wasMobile = nowMobile;
    }
    slide(0);
  });
}

/* === Full Menu Tabs === */
export function initFullMenuTabs() {
  const tabs = document.querySelectorAll('.full-menu__tab');
  const panels = document.querySelectorAll('.full-menu__panel');
  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('is-active'));
      panels.forEach(p => p.classList.remove('is-active'));
      tab.classList.add('is-active');
      const panel = document.querySelector(`.full-menu__panel[data-panel="${target}"]`);
      if (panel) panel.classList.add('is-active');
    });
  });
}

/* === Atmosphere image fade-in on load === */
export function initImageLoad() {
  const photos = document.querySelectorAll('.atmosphere__photo img');
  photos.forEach(img => {
    if (img.complete && img.naturalWidth > 0) {
      img.classList.add('is-loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('is-loaded'));
    }
  });
}

/* === Smooth anchor links === */
export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
}
