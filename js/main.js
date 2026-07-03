document.addEventListener('DOMContentLoaded', function () {
  // mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    document.addEventListener('click', function(e) {
      if (!toggle.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove('open');
      }
    });
  }

  // theme toggle
  var root = document.documentElement;
  var themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    var saved = localStorage.getItem('abm-theme') || 'dark';
    root.setAttribute('data-theme', saved);
    themeBtn.textContent = saved === 'light' ? '🌙' : '☀️';
    themeBtn.addEventListener('click', function () {
      var current = root.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('abm-theme', next);
      themeBtn.textContent = next === 'light' ? '🌙' : '☀️';
    });
  }

  // apply saved theme immediately to avoid flash
  var earlyTheme = localStorage.getItem('abm-theme') || 'dark';
  root.setAttribute('data-theme', earlyTheme);

  // fade-in on load
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.35s ease';
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      document.body.style.opacity = '1';
    });
  });

  // fade-out on internal navigation
  document.querySelectorAll('a[href]').forEach(function(a) {
    var href = a.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('#')) return;
    a.addEventListener('click', function(e) {
      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(function() { window.location.href = href; }, 300);
    });
  });
});
