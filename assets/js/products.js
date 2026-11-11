(function () {
  'use strict';

  var F = window.FPC || {};
  var D = F.products || [];
  var g = document.getElementById('pGrid');
  if (!g) return;

  var cat = 'all';
  var pSearch = document.getElementById('pSearch');
  var pSort = document.getElementById('pSort');
  var pChips = document.getElementById('pChips');
  var pEmpty = document.getElementById('pEmpty');
  var eProd = document.getElementById('eProd');
  var enqModalEl = document.getElementById('enqModal');

  function render() {
    var query = (pSearch ? pSearch.value : '').toLowerCase().trim();
    var sortVal = pSort ? pSort.value : 'az';

    var filtered = D.filter(function (p) {
      var matchCat = (cat === 'all' || p.cat === cat);
      var matchQuery = (p.name + ' ' + p.cat + ' ' + p.desc + ' ' + (p.origin || '')).toLowerCase().indexOf(query) > -1;
      return matchCat && matchQuery;
    });

    filtered.sort(function (a, b) {
      if (sortVal === 'za') return b.name.localeCompare(a.name);
      if (sortVal === 'qty') return b.qty - a.qty;
      return a.name.localeCompare(b.name);
    });

    if (filtered.length === 0) {
      g.innerHTML = '';
      if (pEmpty) pEmpty.classList.remove('d-none');
      return;
    }

    if (pEmpty) pEmpty.classList.add('d-none');

    g.innerHTML = filtered.map(function (p) {
      return (
        '<div class="fcard-col reveal in">' +
          '<article class="fcard prod-card h-100">' +
            '<div class="thumb">' +
              '<img loading="lazy" src="' + p.img + '" alt="' + p.name + ' – ' + p.cat + '">' +
            '</div>' +
            '<div class="body">' +
              '<div class="prod-meta">' +
                '<span class="chip mb-0">' + p.cat + '</span>' +
                '<small class="prod-origin text-muted"><i class="bi bi-geo-alt" aria-hidden="true"></i> ' + (p.origin || 'Farm Direct') + '</small>' +
              '</div>' +
              '<h3>' + p.name + '</h3>' +
              '<p class="small text-muted mb-0">' + p.desc + '</p>' +
              '<div class="d-flex justify-content-between align-items-center mb-1 pt-2 border-top">' +
                '<span class="small font-semibold"><i class="bi bi-patch-check text-success" aria-hidden="true"></i> ' + p.quality + '</span>' +
                '<span class="small text-muted"><i class="bi bi-box-seam" aria-hidden="true"></i> ' + p.qty.toLocaleString() + ' kg</span>' +
              '</div>' +
              '<button class="btn btn-fpc btn-sm w-100" data-enq="' + p.name + '">' +
                '<i class="bi bi-envelope" aria-hidden="true"></i> Enquire Now' +
              '</button>' +
            '</div>' +
          '</article>' +
        '</div>'
      );
    }).join('');

    if (window.observeReveal) {
      window.observeReveal(g);
    }
  }

  if (pSearch) pSearch.addEventListener('input', render);
  if (pSort) pSort.addEventListener('change', render);

  if (pChips) {
    pChips.addEventListener('click', function (e) {
      var btn = e.target.closest('.chip-btn');
      if (!btn) return;
      cat = btn.dataset.cat;
      pChips.querySelectorAll('.chip-btn').forEach(function (b) {
        b.classList.toggle('active', b === btn);
      });
      render();
    });
  }

  g.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-enq]');
    if (!btn) return;
    if (eProd) eProd.value = btn.dataset.enq;
    if (enqModalEl && window.bootstrap) {
      bootstrap.Modal.getOrCreateInstance(enqModalEl).show();
    }
  });

  render();
})();
