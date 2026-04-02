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
  const track = document.querySelector('.reviews__track');
  const prevBtn = document.querySelector('.reviews__nav-btn--prev');
  const nextBtn = document.querySelector('.reviews__nav-btn--next');
  if (!track || !prevBtn || !nextBtn) return;

  let current = 0;
  const cards = track.querySelectorAll('.review-card');
  const gap = parseInt(getComputedStyle(track).gap) || 32;

  function getVisibleCount() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function slide(dir) {
    const visible = getVisibleCount();
    const max = Math.max(0, cards.length - visible);
    current = Math.min(Math.max(current + dir, 0), max);
    const cardWidth = cards[0].offsetWidth;
    track.style.transform = `translateX(-${current * (cardWidth + gap)}px)`;
  }

  prevBtn.addEventListener('click', () => slide(-1));
  nextBtn.addEventListener('click', () => slide(1));

  window.addEventListener('resize', () => slide(0));
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
