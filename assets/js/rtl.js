/**
 * GreenRoots Producer Company – RTL/LTR Direction Toggle Handler
 * Synchronizes text direction (ltr/rtl) and bootstrap stylesheets
 * Persists user preference via localStorage ('fpc-dir')
 */
(function () {
  var root = document.documentElement;

  function getDesktopBtn() {
    return document.getElementById('rtlToggle');
  }

  function getMobileBtn() {
    return document.getElementById('mobileRtlToggle');
  }

  function updateUi(d) {
    var dBtn = getDesktopBtn();
    var mBtn = getMobileBtn();

    if (dBtn) {
      dBtn.innerHTML = '<span>' + (d === 'rtl' ? 'LTR' : 'RTL') + '</span>';
      dBtn.setAttribute('title', d === 'rtl' ? 'Switch to Left-to-Right (LTR)' : 'Switch to Right-to-Left (RTL)');
      dBtn.setAttribute('aria-label', d === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
    }

    if (mBtn) {
      mBtn.innerHTML = d === 'rtl'
        ? '<i class="bi bi-translate me-1"></i> <span class="rtl-label">Switch to LTR</span>'
        : '<i class="bi bi-translate me-1"></i> <span class="rtl-label">Switch to RTL</span>';
      mBtn.setAttribute('aria-label', d === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
    }
  }

  function setDir(d) {
    root.setAttribute('dir', d);
    root.setAttribute('lang', d === 'rtl' ? 'ar' : 'en');
    try {
      localStorage.setItem('fpc-dir', d);
    } catch (e) {}

    var bsCss = document.getElementById('bs-css');
    if (bsCss) {
      var curHref = bsCss.getAttribute('href') || '';
      var newHref = curHref.replace(/bootstrap(\.rtl)?\.min\.css/, 'bootstrap' + (d === 'rtl' ? '.rtl' : '') + '.min.css');
      if (newHref !== curHref) {
        bsCss.setAttribute('href', newHref);
      }
    }
    updateUi(d);
  }

  function toggle() {
    var cur = (root.getAttribute('dir') || 'ltr').toLowerCase();
    setDir(cur === 'rtl' ? 'ltr' : 'rtl');
  }

  // Initialize from localStorage or attribute
  var saved = null;
  try {
    saved = localStorage.getItem('fpc-dir');
  } catch (e) {}

  var initial = saved || root.getAttribute('dir') || 'ltr';
  setDir(initial);

  var dBtn = getDesktopBtn();
  if (dBtn) dBtn.addEventListener('click', toggle);

  var mBtn = getMobileBtn();
  if (mBtn) mBtn.addEventListener('click', toggle);

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('#rtlToggle, #mobileRtlToggle, .rtl-toggle');
    if (btn && btn !== dBtn && btn !== mBtn) {
      toggle();
    }
  });
})();
