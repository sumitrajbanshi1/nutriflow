(function () {
  'use strict';
  const savedTheme  = localStorage.getItem('nutriFlowTheme')  || 'dark';
  const savedAccent = localStorage.getItem('nutriFlowAccent') || 'gold';
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.documentElement.setAttribute('data-accent', savedAccent);
  const accentBtn = document.getElementById('accentBtn');
  if (accentBtn) accentBtn.value = savedAccent;
  function updateThemeUI(theme) {
    const icon  = document.getElementById('themeIcon');
    const label = document.getElementById('themeLabel');
    if (icon)  icon.textContent  = theme === 'dark' ? '🌙' : '☀️';
    if (label) label.textContent = theme === 'dark' ? 'Dark' : 'Light';
  }
  updateThemeUI(savedTheme);
  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('nutriFlowTheme', next);
      updateThemeUI(next);
      window.dispatchEvent(new CustomEvent('nutriThemeChange'));
    });
  }
  if (accentBtn) {
    accentBtn.addEventListener('change', (e) => {
      const accent = e.target.value;
      document.documentElement.setAttribute('data-accent', accent);
      localStorage.setItem('nutriFlowAccent', accent);
      window.dispatchEvent(new CustomEvent('nutriThemeChange'));
    });
  }
  const menuBtn  = document.getElementById('menuBtn');
  const navPanel = document.getElementById('navPanel');
  const overlay  = document.getElementById('navOverlay');
  function setNavOpen(open) {
    if (!menuBtn || !navPanel || !overlay) return;
    menuBtn.classList.toggle('open', open);
    navPanel.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      setNavOpen(!navPanel.classList.contains('open'));
    });
  }
  if (overlay) {
    overlay.addEventListener('click', () => setNavOpen(false));
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setNavOpen(false);
  });
  window.closeNavPanel = () => setNavOpen(false);
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    function observeReveals() {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        revealObserver.observe(el);
      });
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', observeReveals);
    } else {
      observeReveals();
    }
    setTimeout(observeReveals, 300);
    window.nutriObserveReveals = observeReveals;
  }
})();