document.addEventListener('DOMContentLoaded', function handleDomReady() {
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  var reduceMotion = false;
  try {
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (_) {
    reduceMotion = false;
  }

  var revealEls = document.querySelectorAll('.reveal');
  if (!revealEls || revealEls.length === 0) return;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function(el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(function(el) { observer.observe(el); });
});