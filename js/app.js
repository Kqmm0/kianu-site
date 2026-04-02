/**
 * Киану Итамеши — Main App
 */
import { initHeader } from './header.js';
import {
  initReveal,
  initHero,
  initTextSplit,
  initParallax,
  initReviewsSlider,
  initSmoothScroll,
} from './animations.js';

/* === Page Loader === */
function initLoader() {
  const loader = document.querySelector('.loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('is-hidden');
      document.body.classList.add('is-loaded');
    }, 800);
  });
}

/* === Init All === */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initHeader();
  initTextSplit();
  initReveal();
  initHero();
  initParallax();
  initReviewsSlider();
  initSmoothScroll();
});
