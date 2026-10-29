/**
 * SAVE THE SAHYADRI — NATURE ANIMATIONS & MICRO-INTERACTIONS
 * 
 * Hardware-accelerated, lightweight, zero-dependency animation controller.
 * Features:
 * 1. Tree Counter: Animates 32,490 count-up once when the section first enters viewport.
 * 2. Scroll Reveals: Single IntersectionObserver for .reveal-on-scroll elements.
 * 3. Accessibility: Strictly respects prefers-reduced-motion.
 */

/**
 * Animate the 32,490 Trees at Risk counter once upon scroll into view.
 */
export function initTreeCounter() {
  if (typeof document === 'undefined') return;

  const counterEl = document.getElementById('issue-tree-counter');
  if (!counterEl) return;

  const target = 32490;
  let hasAnimated = false;

  // Check prefers-reduced-motion
  const prefersReduced = typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    counterEl.textContent = '32,490';
    return;
  }

  // Ensure IntersectionObserver is supported
  if (typeof IntersectionObserver === 'undefined') {
    counterEl.textContent = '32,490';
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          observer.unobserve(entry.target);

          // Animate counting up once from 0 to 32,490 over ~1.6s
          const duration = 1600;
          const startTime = performance.now();

          function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic: 1 - (1 - t)^3
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeProgress * target);

            counterEl.textContent = current.toLocaleString('en-IN');

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              counterEl.textContent = target.toLocaleString('en-IN');
            }
          }

          requestAnimationFrame(step);
        }
      });
    },
    { threshold: 0.15 }
  );

  observer.observe(counterEl);
}

/**
 * Subtle upward fade reveals for section headers and cards.
 * Triggers each section/card once; never replays on subsequent scrolls.
 */
export function initScrollReveals() {
  if (typeof document === 'undefined') return;

  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const prefersReduced = typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced || typeof IntersectionObserver === 'undefined') {
    elements.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target); // Trigger once only!
        }
      });
    },
    {
      rootMargin: '0px 0px -6% 0px',
      threshold: 0.08
    }
  );

  elements.forEach((el) => observer.observe(el));
}

/**
 * Initialize all nature animation controllers.
 */
export function initNatureAnimations() {
  initTreeCounter();
  initScrollReveals();
}
