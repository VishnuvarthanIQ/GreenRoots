/**
 * GreenRoots Producer Company – Theme Toggle Handler
 * Synchronizes light and dark themes across desktop and mobile controls
 * Persists user preference via localStorage ('fpc-theme')
 */
(function () {
  var root = document.documentElement;

  function getDesktopBtn() {
    return document.getElementById('themeToggle');
  }

  function getMobileBtn() {
    return document.getElementById('mobileThemeToggle');
  }

  function updateUi(t) {
    var dBtn = getDesktopBtn();
    var mBtn = getMobileBtn();

    if (dBtn) {
      dBtn.innerHTML = t === 'dark' ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
      dBtn.setAttribute('title', t === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      dBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    }

    if (mBtn) {
      mBtn.innerHTML = t === 'dark'
        ? '<i class="bi bi-sun me-1"></i> <span class="theme-label">Light Mode</span>'
        : '<i class="bi bi-moon-stars me-1"></i> <span class="theme-label">Dark Mode</span>';
      mBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    }
  }

  function setTheme(t) {
    root.setAttribute('data-theme', t);
    try {
      localStorage.setItem('fpc-theme', t);
    } catch (e) {}
    updateUi(t);
  }

  function toggle() {
    var current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  // Initialize from localStorage or attribute
  var saved = null;
  try {
    saved = localStorage.getItem('fpc-theme');
  } catch (e) {}

  var initial = saved || root.getAttribute('data-theme') || 'light';
  setTheme(initial);

  // Attach direct click listeners if available immediately
  var dBtn = getDesktopBtn();
  if (dBtn) dBtn.addEventListener('click', toggle);

  var mBtn = getMobileBtn();
  if (mBtn) mBtn.addEventListener('click', toggle);

  // Delegated fallback for dynamically inserted elements
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('#themeToggle, #mobileThemeToggle, .theme-toggle');
    if (btn && btn !== dBtn && btn !== mBtn) {
      toggle();
    }
  });
})();
