(function () {
  'use strict';

  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Header scroll state
  var header = document.querySelector('.site-header');
  if (header) {
    var checkScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  // Animated number counter
  function countUp(el) {
    var target = +el.dataset.count;
    var duration = rm ? 0 : 1600;
    var start = null;

    function frame(timestamp) {
      if (!start) start = timestamp;
      var progress = duration ? Math.min((timestamp - start) / duration, 1) : 1;
      var easeOutQuad = 1 - (1 - progress) * (1 - progress);
      el.textContent = Math.floor(target * easeOutQuad).toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = target.toLocaleString();
      }
    }
    requestAnimationFrame(frame);
  }

  // IntersectionObserver for elements revealing on scroll
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        entry.target.querySelectorAll('[data-count]').forEach(countUp);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  window.observeReveal = function (root) {
    (root || document).querySelectorAll('.reveal:not(.in)').forEach(function (el) {
      io.observe(el);
    });
  };
  observeReveal();

  // Scroll to Top button
  var tt = document.getElementById('toTop');
  if (tt) {
    window.addEventListener('scroll', function () {
      tt.classList.toggle('show', window.scrollY > 450);
    }, { passive: true });
    tt.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: rm ? 'auto' : 'smooth' });
    });
  }

  // Testimonials Slider Controls
  document.querySelectorAll('[data-slide]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var slider = document.getElementById('slider');
      if (!slider) return;
      var isRTL = document.documentElement.dir === 'rtl';
      var dir = (isRTL ? -1 : 1) * (+btn.dataset.slide);
      var cardWidth = slider.firstElementChild ? slider.firstElementChild.offsetWidth + 24 : 350;
      slider.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
    });
  });

  // Auto scroll testimonials gently
  var sl = document.getElementById('slider');
  if (sl && !rm) {
    var timer = setInterval(function () {
      if (sl.matches(':hover, :focus-within')) return;
      var isRTL = document.documentElement.dir === 'rtl';
      var cardWidth = sl.firstElementChild ? sl.firstElementChild.offsetWidth + 24 : 350;
      var end = Math.abs(sl.scrollLeft) + sl.clientWidth >= sl.scrollWidth - 10;
      if (end) {
        sl.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        sl.scrollBy({ left: (isRTL ? -1 : 1) * cardWidth, behavior: 'smooth' });
      }
    }, 6000);
  }

  // Countdown for Coming Soon
  var cd = document.getElementById('cd');
  if (cd) {
    var targetDate = new Date(cd.dataset.date || Date.now() + 30 * 864e5).getTime();
    function tick() {
      var diff = Math.max(0, targetDate - Date.now());
      var pad = function (n) { return String(n).padStart(2, '0'); };
      var cdD = document.getElementById('cdD');
      var cdH = document.getElementById('cdH');
      var cdM = document.getElementById('cdM');
      var cdS = document.getElementById('cdS');
      if (cdD) cdD.textContent = pad(Math.floor(diff / 864e5));
      if (cdH) cdH.textContent = pad(Math.floor(diff / 36e5) % 24);
      if (cdM) cdM.textContent = pad(Math.floor(diff / 6e4) % 60);
      if (cdS) cdS.textContent = pad(Math.floor(diff / 1e3) % 60);
    }
    tick();
    setInterval(tick, 1000);
  }

  // Image fallback handler
  document.addEventListener('error', function (e) {
    var t = e.target;
    if (t.tagName === 'IMG' && !t.dataset.fb) {
      t.dataset.fb = '1';
      t.src = 'assets/img/fallback.svg';
    }
  }, true);

  // Video error handler
  document.querySelectorAll('video').forEach(function (v) {
    v.addEventListener('error', function () {
      // Keep poster visible if video cannot play
      v.style.display = 'none';
    }, true);
    if (rm) {
      v.removeAttribute('autoplay');
      v.pause();
    }
  });

  // Mobile menu close on item click
  document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)').forEach(function (link) {
    link.addEventListener('click', function () {
      var navCollapse = document.getElementById('mainNav');
      if (navCollapse && navCollapse.classList.contains('show')) {
        var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

})();
