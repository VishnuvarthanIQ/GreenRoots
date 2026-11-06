(function () {
  'use strict';

  var q = new URLSearchParams(location.search);
  var F = window.FPC || {};
  var pg = document.body.dataset.page;
  var $ = function (i) { return document.getElementById(i); };

  var rel = function () {
    if (window.observeReveal) window.observeReveal();
  };

  function pcard(p) {
    return (
      '<div class="col-md-6 col-lg-4 reveal in">' +
        '<article class="fcard h-100">' +
          '<div class="thumb">' +
            '<a href="blog-details.html?p=' + p.slug + '" class="d-block w-100 h-100" aria-label="' + p.title + '">' +
              '<img loading="lazy" src="' + p.img + '" alt="' + p.title + '">' +
            '</a>' +
          '</div>' +
          '<div class="body">' +
            '<span class="chip">' + p.cat + '</span>' +
            '<p class="small muted mb-1"><i class="bi bi-calendar3"></i> ' + p.date + '</p>' +
            '<h3><a href="blog-details.html?p=' + p.slug + '" class="text-decoration-none text-reset">' + p.title + '</a></h3>' +
            '<p class="small muted flex-grow-1">' + p.excerpt + '</p>' +
            '<a class="link-arrow mt-2" href="blog-details.html?p=' + p.slug + '">Read Article <i class="bi bi-arrow-right flip"></i></a>' +
          '</div>' +
        '</article>' +
      '</div>'
    );
  }

  // Services Page logic (Interactive Category Filters with Applicable Image Showcase)
  if (pg === 'services') {
    var sChips = $('sChips');
    var sGrid = $('serviceGrid');
    var spImg = $('serviceSpotlightImg');
    var spTitle = $('serviceSpotlightTitle');
    var spBadge = $('serviceSpotlightBadge');
    var spMeta = $('serviceSpotlightMeta');
    var spDesc = $('serviceSpotlightDesc');
    var spPoints = $('serviceSpotlightPoints');
    var spLink = $('serviceSpotlightLink');

    var spotlightData = {
      all: {
        img: 'assets/img/services/services-hero.jpg',
        badge: 'Full Ecosystem',
        meta: '<i class="bi bi-shield-check me-1"></i> FSSAI & APEDA Aligned',
        title: 'End-to-End Farm-to-Market Services',
        desc: 'Empowering farmers with fair doorstep collection, transparent electronic weighing, certified laboratory testing, agronomic training, and direct institutional buyer contracts.',
        points: [
          'Calibrated digital platform scales',
          '100% DBT bank settlement (24–48h)',
          'Batch moisture & purity testing',
          'Zero commission agent deductions'
        ],
        link: 'contact.html',
        btnText: 'Request Service Consultation'
      },
      collection: {
        img: 'assets/img/services/service-collection.jpg',
        badge: 'Farm-Gate Aggregation',
        meta: '<i class="bi bi-truck me-1"></i> Doorstep Pickup Fleet',
        title: 'Transparent Doorstep Collection & Cold Logistics',
        desc: 'Scheduled village procurement with digital platform scales, instant SMS receipts, moisture grading, and hygienic climate-controlled transportation to central processing hubs.',
        points: [
          'Scheduled village-level procurement pickups',
          'Encrypted QR barcode bag tagging',
          'Moisture & foreign matter field assays',
          'Direct delivery to temperature-controlled storage'
        ],
        link: 'service-details.html?s=product-collection',
        btnText: 'Explore Collection Service'
      },
      quality: {
        img: 'assets/img/services/service-quality.jpg',
        badge: 'Certified Laboratory',
        meta: '<i class="bi bi-patch-check me-1"></i> NABL & FSSAI Aligned',
        title: 'Quality Testing, Moisture Analysis & Official COA',
        desc: 'Certified laboratory assays screening grain moisture, seed purity, foreign matter, and pesticide residues. Every lot receives an official Certificate of Analysis.',
        points: [
          'Automated NIR moisture meters (12–14% target)',
          'Pesticide & aflatoxin chemical screening',
          'Seed viability & germination percentage testing',
          'Lot-wise Certificate of Analysis (COA) issued'
        ],
        link: 'service-details.html?s=quality-inspection',
        btnText: 'Explore Quality Testing'
      },
      market: {
        img: 'assets/img/services/service-market.jpg',
        badge: 'Institutional Trade',
        meta: '<i class="bi bi-shop me-1"></i> Direct Mill & Trade Access',
        title: 'Direct Market Linkage & Multi-Ton Wholesale Supply',
        desc: 'Direct supply channels connecting grower producer groups with modern food processors, retail chains, and exporters without intermediary markups.',
        points: [
          'Multi-ton supply contracts for paddy, millets & pulses',
          'Elimination of multi-tier mandi commission cuts',
          '18–25% higher net farm-gate price realization',
          'Tailored private labeling & food-grade packaging'
        ],
        link: 'service-details.html?s=market-linkage',
        btnText: 'Explore Market Linkage'
      },
      training: {
        img: 'assets/img/services/service-training.jpg',
        badge: 'Grower Empowerment',
        meta: '<i class="bi bi-mortarboard me-1"></i> Field Extension Schools',
        title: 'Farmer Shareholding & Agronomy Field Extension',
        desc: 'Onboarding smallholders into cooperative shareholding, annual profit dividends, subsidized inputs, and hands-on field schools in biological pest control.',
        points: [
          'Lifelong voting equity & annual patronage dividends',
          'Up to 30% group discounts on certified seeds & bio-inputs',
          'On-site farmer field schools & pest clinics',
          'Emergency low-interest cooperative credit linkages'
        ],
        link: 'service-details.html?s=membership-support',
        btnText: 'Explore Farmer Support'
      }
    };

    if (sChips && sGrid) {
      sChips.addEventListener('click', function (e) {
        var btn = e.target.closest('.chip-btn');
        if (!btn) return;
        var cat = btn.dataset.cat || 'all';

        sChips.querySelectorAll('.chip-btn').forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });

        // Update dynamic spotlight showcase with applicable image & info
        var d = spotlightData[cat] || spotlightData.all;
        if (spImg) {
          spImg.style.opacity = '0.25';
          spImg.style.transform = 'scale(0.97)';
          setTimeout(function () {
            spImg.src = d.img;
            spImg.alt = d.title;
            spImg.style.opacity = '1';
            spImg.style.transform = 'scale(1)';
          }, 180);
        }
        if (spTitle) spTitle.textContent = d.title;
        if (spBadge) spBadge.textContent = d.badge;
        if (spMeta) spMeta.innerHTML = d.meta;
        if (spDesc) spDesc.textContent = d.desc;
        if (spLink) {
          spLink.href = d.link;
          spLink.innerHTML = (d.btnText || 'Explore Service') + ' <i class="bi bi-arrow-right ms-1"></i>';
        }
        if (spPoints && d.points) {
          spPoints.innerHTML = d.points.map(function (p) {
            return '<div class="col-sm-6"><i class="bi bi-check-circle-fill text-success me-2"></i>' + p + '</div>';
          }).join('');
        }

        // Filter cards in grid
        var cards = sGrid.querySelectorAll('[data-service-cat]');
        cards.forEach(function (col) {
          var match = (cat === 'all' || col.dataset.serviceCat === cat);
          if (match) {
            col.classList.remove('d-none');
            col.classList.add('in');
          } else {
            col.classList.add('d-none');
          }
        });

        rel();
      });
    }
  }  // Service Details Page logic
  if (pg === 'service-details') {
    var services = F.services || [];
    var s = services.find(function (x) { return x.slug === q.get('s'); }) || services[0];
    document.title = s.title + ' | GreenRoots Producer Company';

    var svTitle = $('svTitle');
    var crumbCur = $('crumbCur');
    var svIntro = $('svIntro');
    var svImg = $('svImg');
    var svBen = $('svBen');
    var svSteps = $('svSteps');
    var svFaq = $('svFaq');
    var svRel = $('svRel');

    if (svTitle) svTitle.textContent = s.title;
    if (crumbCur) crumbCur.textContent = s.title;
    if (svIntro) {
      if (s.slug === 'training-programs') {
        svIntro.textContent = 'Our participatory farmer field schools empower smallholders and rural youth with practical skills in natural pest management, on-farm biological input production (Jeevamrit, Panchagavya), precision drip irrigation, and post-harvest quality certification in direct partnership with state agricultural universities and Krishi Vigyan Kendras (KVK).';
      } else {
        svIntro.textContent = s.desc || (s.short + ' Our field extension team works directly with member clusters and verified trade partners to execute this service with digital transparency and guaranteed quality.');
      }
    }
    if (svImg) {
      svImg.src = s.img;
      svImg.alt = s.title;
    }

    var pg0 = document.querySelector('.page-hero');
    if (pg0) { pg0.style.setProperty('--hero', "url('" + (s.hero || s.img) + "')"); pg0.style.backgroundImage = "url('" + (s.hero || s.img) + "')"; }

    if (svBen) {
      var benefits = [];
      if (s.slug === 'training-programs') {
        benefits = [
          '100% free hands-on field school sessions right on village cluster demonstration plots',
          'Practical formulation masterclasses for Jeevamrit, Panchagavya, and neem botanical sprays',
          'Micro-irrigation calibration and solar water pump scheduling for drought-resilient farming',
          'Ecological pest scouting clinics to identify predatory beneficial insects versus pests',
          'Standardized grain moisture testing and hermetic bag storage to prevent weevil losses',
          'State agriculture university participation certificate and input subsidy facilitation'
        ];
      } else {
        benefits = [
          'Direct farm-gate aggregation with transparent digital weighment',
          'Elimination of multi-tier commission agent charges',
          'Standardized moisture and seed purity laboratory testing',
          'Direct RTGS/UPI electronic payment disbursement into farmer accounts',
          'Batch traceability matching FSSAI food safety regulations',
          'Subsidized transport linkage to regional wholesale hubs and processing units'
        ];
      }
      svBen.innerHTML = benefits.map(function (b) { return '<li>' + b + '</li>'; }).join('');
    }

    if (svSteps) {
      var steps = [];
      if (s.slug === 'training-programs') {
        steps = [
          ['Village Cluster Enrollment', 'Panchayat farmer groups register their training needs with the local cluster field coordinator.'],
          ['Soil & Water Diagnostic Day', 'On-site soil pH, organic carbon, and borehole water salinity tests conducted at the demonstration plot.'],
          ['Hands-On Field Masterclass', 'Farmers brew biological fertilizers, calibrate drip emitters, and practice bio-seed inoculation.'],
          ['Mid-Season Pest Scouting Walk', 'Guided field inspection identifying beneficial spiders and natural pest thresholds before spraying.'],
          ['Harvest & Certification Issuance', 'Quality grading protocol training, moisture testing certification, and member reward distribution.']
        ];
      } else {
        steps = [
          ['Harvest Scheduling', 'Village farmer groups notify the regional collection coordinator 48 hours prior to harvesting.'],
          ['Farm-Gate Verification', 'Certified field officers conduct on-site moisture analysis and grade testing using calibrated meters.'],
          ['Weighment & Receipt', 'Produce is weighed on digital platform scales and immediate digital SMS receipts are generated.'],
          ['Logistics & Storage', 'Clean jute bags are loaded onto scheduled freight transport for climate-controlled warehousing.'],
          ['Disbursement & Settlement', 'Direct account settlement is executed within 3 business days at agreed fair benchmark rates.']
        ];
      }
      svSteps.innerHTML = steps.map(function (x, i) {
        return (
          '<div class="col-md-6 col-lg reveal in">' +
            '<div class="fcard icard h-100 text-center">' +
              '<span class="step-num mx-auto">' + (i + 1) + '</span>' +
              '<h3>' + x[0] + '</h3>' +
              '<p class="small muted mb-0">' + x[1] + '</p>' +
            '</div>' +
          '</div>'
        );
      }).join('');
    }

    var fq = [];
    if (s.slug === 'training-programs') {
      fq = [
        ['Who can attend the GreenRoots Agricultural Training Programs?', 'All registered member farmers, farm women, rural youth, and agricultural labourers can attend completely free of charge. No formal educational prerequisites are required.'],
        ['Where and when are these training field schools held?', 'Sessions are scheduled every Saturday morning on rotating member demonstration plots within a 5 km cluster radius, ensuring accessible walking distance for village growers.'],
        ['Do participants receive certificates or government subsidies?', 'Yes, graduates receive an accredited Training Attendance Certificate that qualifies them for state bio-fertilizer and micro-irrigation subsidies.'],
        ['Can farmer groups request a specific crop clinic?', 'Yes, village groups can request tailored sessions for paddy, millets, vegetables, groundnut, or turmeric through their district coordinator.']
      ];
    } else {
      fq = [
        ['Who is eligible to participate in this service?', 'All registered GreenRoots member farmers and verified agricultural bulk buyers are eligible. New growers can enrol with their landholding passbook.'],
        ['How is pricing determined for collection?', 'Prices are benchmarked weekly against regional APMC mandi rates, offering a premium for clean, dry, and graded produce.'],
        ['What are the quality testing parameters?', 'Moisture content (max 12–14% for grains), foreign matter (< 1%), seed viability, and chemical residue compliance.'],
        ['How can institutional buyers initiate bulk supply orders?', 'Buyers can submit a procurement enquiry form or contact our trade desk with monthly tonnage requirements.']
      ];
    }

    if (svFaq) {
      svFaq.innerHTML = '<div class="accordion fpc-acc reveal in" id="sf">' + fq.map(function (x, i) {
        return (
          '<div class="accordion-item">' +
            '<h3 class="accordion-header">' +
              '<button class="accordion-button ' + (i ? 'collapsed' : '') + '" type="button" data-bs-toggle="collapse" data-bs-target="#sf' + i + '">' +
                x[0] +
              '</button>' +
            '</h3>' +
            '<div id="sf' + i + '" class="accordion-collapse collapse ' + (i ? '' : 'show') + '" data-bs-parent="#sf">' +
              '<div class="accordion-body">' + x[1] + '</div>' +
            '</div>' +
          '</div>'
        );
      }).join('') + '</div>';
    }

    
    var svCurriculum = $('svCurriculum');
    if (svCurriculum) {
      if (s.slug === 'training-programs') {
        svCurriculum.innerHTML = (
          '<div class="reveal mt-5">' +
            '<h3>Practical Training Curriculum &amp; Field Modules</h3>' +
            '<p class="text-muted">Structured 5-module intensive curriculum developed jointly with Tamil Nadu Agricultural University (TNAU) and local Krishi Vigyan Kendras (KVK).</p>' +
            '<div class="row g-3 mb-4">' +
              '<div class="col-md-6">' +
                '<div class="p-3 rounded-3 border bg-light h-100">' +
                  '<h5 class="text-primary mb-1"><i class="bi bi-flower1 me-2"></i>Module 1: On-Farm Bio-Inputs</h5>' +
                  '<p class="small text-muted mb-0">Master formulation of Jeevamrit, Beejamrit seed inoculants, Panchagavya, and waste decomposer solutions to replace 100% synthetic inputs.</p>' +
                '</div>' +
              '</div>' +
              '<div class="col-md-6">' +
                '<div class="p-3 rounded-3 border bg-light h-100">' +
                  '<h5 class="text-primary mb-1"><i class="bi bi-droplet-half me-2"></i>Module 2: Micro-Irrigation &amp; Water</h5>' +
                  '<p class="small text-muted mb-0">Sub-surface drip design, emitter acid wash cleaning, solar pump timer integration, and tensiometer soil moisture tracking.</p>' +
                '</div>' +
              '</div>' +
              '<div class="col-md-6">' +
                '<div class="p-3 rounded-3 border bg-light h-100">' +
                  '<h5 class="text-primary mb-1"><i class="bi bi-bug me-2"></i>Module 3: Ecological Pest Management</h5>' +
                  '<p class="small text-muted mb-0">Installing delta pheromone traps, border trap cropping with marigold/castor, release of trichogramma cards, and botanical neem kashayam.</p>' +
                '</div>' +
              '</div>' +
              '<div class="col-md-6">' +
                '<div class="p-3 rounded-3 border bg-light h-100">' +
                  '<h5 class="text-primary mb-1"><i class="bi bi-box-seam me-2"></i>Module 4: Post-Harvest &amp; Storage</h5>' +
                  '<p class="small text-muted mb-0">Tarpaulin bubble solar drying, digital moisture verification below 12%, and multi-layer hermetic bag storage for 12+ month grain viability.</p>' +
                '</div>' +
              '</div>' +
              '<div class="col-12">' +
                '<div class="p-3 rounded-3 border bg-light">' +
                  '<h5 class="text-primary mb-1"><i class="bi bi-cash-coin me-2"></i>Module 5: Farm Accounting &amp; Direct Sourcing</h5>' +
                  '<p class="small text-muted mb-0">Electronic farm-gate weighment, digital DBT payments, FSSAI grading standards, and understanding MSP+ cooperative premiums.</p>' +
                '</div>' +
              '</div>' +
            '</div>' +

            '<h3>Upcoming Field Demonstration Days (Winter 2026 Batch)</h3>' +
            '<p class="text-muted">Interactive 4-hour morning field school sessions conducted on working member demonstration farms. Walk-ins welcome for registered growers.</p>' +
            '<div class="table-responsive rounded-4 border shadow-sm mb-4">' +
              '<table class="table table-striped align-middle mb-0">' +
                '<thead class="table-light">' +
                  '<tr>' +
                    '<th class="py-3 px-3">Date &amp; Time</th>' +
                    '<th class="py-3 px-3">Village Demonstration Plot</th>' +
                    '<th class="py-3 px-3">Curriculum Focus</th>' +
                    '<th class="py-3 px-3">Lead Agronomist</th>' +
                    '<th class="py-3 px-3">Open Seats</th>' +
                  '</tr>' +
                '</thead>' +
                '<tbody>' +
                  '<tr>' +
                    '<td class="py-3 px-3 fw-semibold">12 Nov &bull; 8:00 AM</td>' +
                    '<td class="py-3 px-3">Thiruvaiyaru Cluster Farm</td>' +
                    '<td class="py-3 px-3">Bio-Input Brewing Masterclass</td>' +
                    '<td class="py-3 px-3 small text-muted">Dr. R. Sundaram</td>' +
                    '<td class="py-3 px-3"><span class="badge bg-success-subtle text-success">25 Seats Open</span></td>' +
                  '</tr>' +
                  '<tr>' +
                    '<td class="py-3 px-3 fw-semibold">19 Nov &bull; 8:00 AM</td>' +
                    '<td class="py-3 px-3">Ammapettai Drip Plot</td>' +
                    '<td class="py-3 px-3">Micro-Irrigation &amp; Fertigation</td>' +
                    '<td class="py-3 px-3 small text-muted">Er. K. Mohan</td>' +
                    '<td class="py-3 px-3"><span class="badge bg-success-subtle text-success">30 Seats Open</span></td>' +
                  '</tr>' +
                  '<tr>' +
                    '<td class="py-3 px-3 fw-semibold">26 Nov &bull; 8:00 AM</td>' +
                    '<td class="py-3 px-3">Orathanadu Organic Field</td>' +
                    '<td class="py-3 px-3">Pest Scouting &amp; Trap Cropping</td>' +
                    '<td class="py-3 px-3 small text-muted">P. Muthuraman</td>' +
                    '<td class="py-3 px-3"><span class="badge bg-success-subtle text-success">20 Seats Open</span></td>' +
                  '</tr>' +
                  '<tr>' +
                    '<td class="py-3 px-3 fw-semibold">03 Dec &bull; 8:00 AM</td>' +
                    '<td class="py-3 px-3">Thanjavur Central Depot</td>' +
                    '<td class="py-3 px-3">Post-Harvest Grading &amp; Storage</td>' +
                    '<td class="py-3 px-3 small text-muted">Quality Testing Team</td>' +
                    '<td class="py-3 px-3"><span class="badge bg-success-subtle text-success">35 Seats Open</span></td>' +
                  '</tr>' +
                '</tbody>' +
              '</table>' +
            '</div>' +

            '<div class="p-4 rounded-4 bg-primary-subtle border border-primary-subtle mb-4">' +
              '<h4 class="text-primary mb-2"><i class="bi bi-award me-2"></i>Accredited Learning Certification</h4>' +
              '<p class="mb-0 text-muted">All farmers completing the 5 modules receive an official <strong>GreenRoots &amp; KVK Agri-Extension Certificate</strong>. This credential qualifies growers for priority allocation in state-subsidized micro-irrigation kits, solar pump grants, and certified seed allocations.</p>' +
            '</div>' +
          '</div>'
        );
      } else {
        svCurriculum.innerHTML = '';
      }
    }

    if (svRel) {
      svRel.innerHTML = services.filter(function (x) { return x.slug !== s.slug; }).slice(0, 3).map(function (x) {
        return (
          '<div class="col-md-4 reveal in">' +
            '<a href="service-details.html?s=' + x.slug + '" class="fcard icard d-block h-100 text-decoration-none text-reset">' +
              '<i class="bi ' + x.icon + '"></i>' +
              '<h3>' + x.title + '</h3>' +
              '<p class="small muted mb-2">' + x.short + '</p>' +
              '<span class="link-arrow">Learn More <i class="bi bi-arrow-right flip"></i></span>' +
            '</a>' +
          '</div>'
        );
      }).join('');
    }

    rel();
  }

  // Blog Listing Page logic
  if (pg === 'blog') {
    var posts = F.posts || [];
    var cat = 'all';
    var bChips = $('bChips');
    var bFeat = $('bFeat');
    var bSearch = $('bSearch');
    var bGrid = $('bGrid');
    var bEmpty = $('bEmpty');
    var bPager = $('bPager');

    var cats = ['all'].concat(Array.from(new Set(posts.map(function (p) { return p.cat; }))));
    if (bChips) {
      bChips.innerHTML = cats.map(function (c, i) {
        return '<button class="chip-btn' + (i ? '' : ' active') + '" data-c="' + c + '">' + (c === 'all' ? 'All Articles' : c) + '</button>';
      }).join('');
    }

    var f = posts[0];
    if (bFeat && f) {
      bFeat.innerHTML = (
        '<div class="feat reveal in">' +
          '<a href="blog-details.html?p=' + f.slug + '" class="d-block flex-shrink-0" aria-label="' + f.title + '">' +
            '<img src="' + f.img + '" alt="' + f.title + '">' +
          '</a>' +
          '<div>' +
            '<span class="chip">Featured Article · ' + f.cat + '</span>' +
            '<h2><a href="blog-details.html?p=' + f.slug + '" class="text-decoration-none text-reset">' + f.title + '</a></h2>' +
            '<p class="muted">' + f.excerpt + '</p>' +
            '<div class="d-flex align-items-center gap-3 mt-3">' +
              '<span class="small muted"><i class="bi bi-calendar3"></i> ' + f.date + '</span>' +
              '<a class="btn btn-fpc" href="blog-details.html?p=' + f.slug + '">Read Complete Guide</a>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }

    if (bSearch && q.get('q')) bSearch.value = q.get('q');

    function draw() {
      var query = bSearch ? bSearch.value.toLowerCase().trim() : '';
      var list = posts.filter(function (p) {
        var matchCat = (cat === 'all' || p.cat === cat);
        var matchQuery = (p.title + ' ' + p.excerpt + ' ' + (p.cat || '')).toLowerCase().indexOf(query) > -1;
        return matchCat && matchQuery;
      });

      if (bGrid) {
        bGrid.innerHTML = list.map(pcard).join('');
      }

      if (bEmpty) {
        bEmpty.classList.toggle('d-none', list.length > 0);
      }

      if (bPager) {
        bPager.innerHTML = '';
      }

      rel();
    }

    if (bSearch) bSearch.addEventListener('input', function () { draw(); });

    if (bChips) {
      bChips.addEventListener('click', function (e) {
        var b = e.target.closest('.chip-btn');
        if (!b) return;
        cat = b.dataset.c;
        bChips.querySelectorAll('.chip-btn').forEach(function (x) {
          x.classList.toggle('active', x === b);
        });
        draw();
      });
    }

    draw();
  }  if (pg === 'blog-details') {
    var allPosts = F.posts || [];
    var curSlug = q.get('p') || (allPosts[0] ? allPosts[0].slug : '');
    var p = allPosts.find(function (x) { return x.slug === curSlug; }) || allPosts[0];

    document.title = p.title + ' | GreenRoots Producer Company';

    var bdTitle = $('bdTitle');
    var crumbCur = $('crumbCur');
    var bdCat = $('bdCat');
    var bdDate = $('bdDate');
    var bdAuthor = $('bdAuthor');
    var bdImg = $('bdImg');
    var bdBody = $('bdBody');
    var bdToc = $('bdToc');
    var bdRecent = $('bdRecent');
    var bdRel = $('bdRel');

    if (bdTitle) bdTitle.textContent = p.title;
    if (crumbCur) crumbCur.textContent = p.title;
    if (bdCat) bdCat.textContent = p.cat;
    if (bdDate) bdDate.textContent = p.date;
    if (bdAuthor) bdAuthor.textContent = p.author || 'GreenRoots Agronomy Desk';
    if (bdImg) {
      bdImg.src = p.img;
      bdImg.alt = p.title;
    }

    var heroEl = document.querySelector('.page-hero');
    if (heroEl) {
      heroEl.style.setProperty('--hero', "url('" + p.img + "')");
      heroEl.style.backgroundImage = "url('" + p.img + "')";
    }

    var customArticles = {
      "seasonal-crop-planning": {
            "lead": "Agricultural river basins demand tight synchronization between monsoon inflows, seasonal temperatures, and harvest cycles. By strategically staggering Kuruvai and Thaladi paddy sowings with short-duration pulse rotations, smallholders can eliminate fallow field weed competition, conserve residual sub-soil moisture, and increase total annual farm revenue by over 30%.",
            "sections": [
                  {
                        "heading": "Understanding River Basin Agro-Climatic Calendars",
                        "body": "The traditional agricultural calendar of the Cauvery delta hinges on three distinct cropping windows: Kuruvai (June to September short-duration crop), Thaladi/Samba (September to January medium-to-long duration crop), and the post-harvest pulse window (January to April). Miscalculating sowing dates exposes crops to either peak summer nursery water stress or late monsoon harvest flooding. GreenRoots agronomists deliver hyper-local weather telemetry advising farmers on exact seed soaking and transplanting dates.",
                        "tip": "Stagger nursery sowing across 3 consecutive batches 5 days apart to guard against unpredictable canal water opening dates."
                  },
                  {
                        "heading": "The Regenerative Value of Relay Pulse Cropping",
                        "body": "Immediately 7 to 10 days before harvesting the Samba paddy crop, while the soil remains moist and pliable, seeds of black gram (VBN 8) or green gram (VBN 4) are broadcast directly into the standing crop as relay pulse seeds. As the paddy is reaped, the sprouted pulse seedlings establish rapid roots without any costly tillage expenses. These legumes fix up to 40 kg of atmospheric nitrogen per acre, enriching soil organic matter for the subsequent season.",
                        "tip": "Coat relay pulse seeds with Rhizobium and Phosphobacteria bio-inoculants (500g/acre) to double nitrogen nodulation efficiency."
                  },
                  {
                        "heading": "Managing Summer Dry-Fallow with Climate-Smart Millets",
                        "body": "Rather than leaving fields completely bare during the scorching months of April and May, member farmers are guided to drill drought-hardy millets like pearl millet (cumbu) or finger millet (ragi). Requiring only one or two supplemental sprinkler irrigations, these crops generate nutritious fodder for farm cattle and yield high-value grains that command premium prices in urban health food markets.",
                        "tip": "Use straw mulching between millet rows to reduce surface evaporation by up to 45% during intense 38°C summer days."
                  },
                  {
                        "heading": "Financial Modeling & Cooperative Buy-Back Security",
                        "body": "Under the GreenRoots multi-season crop planning matrix, participating growers receive guaranteed minimum benchmark prices announced before each sowing season. By guaranteeing purchase of both primary cereals and rotation pulses, our producer company provides smallholders with year-round cash flow predictability, eliminating reliance on local private money lenders.",
                        "tip": "Enroll in the GreenRoots Pre-Season Sowing Contract to secure subsidized inputs and pre-scheduled harvest collection transport."
                  }
            ],
            "table": {
                  "title": "Cauvery River Basin Multi-Season Cropping Calendar & Water Budget",
                  "headers": [
                        "Season Window",
                        "Primary / Relay Crop",
                        "Recommended Varieties",
                        "Sowing Window",
                        "Water Budget (mm)",
                        "Net Return / Acre"
                  ],
                  "rows": [
                        [
                              "Kuruvai (Short Season)",
                              "Direct-Seeded Paddy",
                              "ADT 43, TPS 5, CO 51",
                              "June 15 – July 10",
                              "950 – 1,100 mm",
                              "₹32,500 – ₹38,000"
                        ],
                        [
                              "Thaladi / Samba (Main)",
                              "Medium-Duration Paddy",
                              "BPT 5204, CR 1009, CO 52",
                              "Sept 01 – Sept 30",
                              "1,200 – 1,350 mm",
                              "₹42,000 – ₹49,000"
                        ],
                        [
                              "Post-Samba Relay",
                              "Black Gram / Green Gram",
                              "VBN 8, VBN 4, CO 6",
                              "Jan 10 – Jan 25",
                              "120 – 180 mm (Residual)",
                              "₹18,500 – ₹24,000"
                        ],
                        [
                              "Summer Catch Crop",
                              "Finger Millet / Sesame",
                              "Ragi GPU 28, TMV 7",
                              "March 15 – April 10",
                              "250 – 320 mm",
                              "₹16,000 – ₹21,000"
                        ]
                  ]
            },
            "takeaways": [
                  "Synchronize nursery preparation strictly with canal discharge and telemetry forecasts to prevent seedling drying.",
                  "Always sow relay pulses into moist standing paddy 7-10 days before harvest to eliminate mechanical land preparation costs.",
                  "Treat all legume seeds with dual bio-fertilizers (Rhizobium + PSB) to add 35-40 kg free organic nitrogen per acre.",
                  "Rotate high-water paddy with low-water millets and sesame to break stubborn weed and stem-borer pest cycles.",
                  "Pre-register harvest schedules with your local GreenRoots collection depot for direct weighbridge procurement."
            ],
            "faqs": [
                  {
                        "q": "What is the optimal soil moisture level for broadcasting relay pulse seeds?",
                        "a": "The ideal condition is 'waxy moist' — when stepping into the paddy field leaves a distinct footprint impression without water pooling around the shoe. Broadcasting 7 to 10 days before harvest allows seeds to absorb moisture and germinate before the combine harvester enters."
                  },
                  {
                        "q": "How does GreenRoots guarantee the buy-back price for rotation pulses?",
                        "a": "Before sowing begins, GreenRoots locks forward institutional supply contracts with certified dal mills and retail buyers. Based on these contracts, we announce a guaranteed floor price that is 10-15% above traditional mandi distress rates."
                  },
                  {
                        "q": "Can saline delta soils support summer millet cultivation?",
                        "a": "In soils with mild salinity (EC 2 to 4 dS/m), Pearl Millet (Cumbu) and Finger Millet (Ragi variety CO 15) perform exceptionally well when gypsum is applied during pre-sowing showers."
                  }
            ]
      },
      "soil-fertility-microbiome": {
            "lead": "Continuous synthetic NPK dosing strips topsoils of beneficial fungal mycorrhizae and beneficial bacterial colonies, locking nutrients into insoluble mineral complexes. Reintroducing Indigenous Microorganisms (IMO), fortified farmyard manure, and multi-strain bio-ferments restores enzymatic activity, softens compacted hardpans, and accelerates organic carbon assimilation.",
            "sections": [
                  {
                        "heading": "The Anatomy of a Living Soil Food Web",
                        "body": "Healthy fertile topsoil is not merely a dirt medium; a single gram contains up to 10 billion bacterial cells and several kilometres of fungal hyphae. Chemical salting via excessive urea and muriate of potash disrupts this symbiotic root rhizosphere. GreenRoots promotes biological inoculations that digest trapped phosphorus and potassium, transforming dormant minerals into plant-accessible ions.",
                        "tip": "Check soil carbon percentage every season: soils above 0.8% organic carbon require 40% less synthetic nitrogen."
                  },
                  {
                        "heading": "Standardized Preparation of Jeevamrutham Bio-Ferment",
                        "body": "Our field schools teach smallholders standardized Jeevamrutham fermentation: 10 kg fresh indigenous cow dung, 10 litres cow urine, 2 kg jaggery, 2 kg pulse flour, and a handful of pristine virgin forest or ant-hill soil mixed in 200 litres of water. Fermented for 48 to 72 hours under shaded conditions with twice-daily aeration, this microbial culture produces trillions of beneficial microbes ready for field application.",
                        "tip": "Apply Jeevamrutham through drip irrigation or flooding during late evening hours to protect living bacteria from harsh ultraviolet sun rays."
                  },
                  {
                        "heading": "Green Manuring with Sunnhemp and Daincha",
                        "body": "Between major cultivation cycles, sowing fast-growing leguminous green manures such as Sesbania aculeata (Daincha) or Crotalaria juncea (Sunnhemp) for 45 days followed by in-situ rotary plow incorporation adds 15 to 22 tons of succulent green biomass per hectare. This rapid decomposition generates humic and fulvic acids that loosen clay soils and improve sandy loam moisture retention.",
                        "tip": "Incorporate green manure crops exactly at the 50% flowering stage when stem cellulose is soft and nitrogen content peaks."
                  },
                  {
                        "heading": "Long-Term Soil Organic Carbon (SOC) Trajectory",
                        "body": "Over a three-year structured transition, GreenRoots cluster member plots have demonstrated an average soil organic carbon increase from 0.38% to 0.84%. This restored biological sponge effect allows fields to withstand extended dry spells of up to 18 days without showing visible crop wilting symptoms.",
                        "tip": "Submit composite soil core samples every March to the GreenRoots cooperative laboratory for free trace-mineral profiling."
                  }
            ],
            "table": {
                  "title": "Bio-Fertilizer Inoculation Dosages, Microbe Strains & Soil Carbon Targets",
                  "headers": [
                        "Bio-Formulation",
                        "Key Microbial Strains",
                        "Recommended Dosage / Acre",
                        "Application Timing",
                        "Agronomic Benefit"
                  ],
                  "rows": [
                        [
                              "Liquid Jeevamrutham",
                              "Bacillus, Lactobacillus, Yeast",
                              "200 Litres / Acre",
                              "Every 15–21 days with irrigation",
                              "Accelerates microbial biomass & enzyme activity"
                        ],
                        [
                              "Phosphobacteria (PSB)",
                              "Pseudomonas striata",
                              "500 ml / Acre (Liquid)",
                              "Basal root drenching / seed treat",
                              "Solubilizes 25–30 kg fixed soil phosphate"
                        ],
                        [
                              "Azospirillum / Azotobacter",
                              "Azospirillum brasilense",
                              "500 ml / Acre (Liquid)",
                              "At nursery sowing / transplant",
                              "Fixes 20–25 kg atmospheric nitrogen"
                        ],
                        [
                              "VAM Fungi (Mycorrhiza)",
                              "Glomus intraradices",
                              "4 kg / Acre (Granular)",
                              "Basal soil application at planting",
                              "Expands root absorption surface area by 300%"
                        ],
                        [
                              "Trichoderma viride",
                              "Trichoderma viride 1.5% WP",
                              "1 kg in 100 kg FYM / Acre",
                              "Pre-sowing basal broadcasting",
                              "Suppresses soil-borne Pythium, Fusarium wilt"
                        ]
                  ]
            },
            "takeaways": [
                  "Brew liquid Jeevamrutham fresh and apply within 7 days of fermentation for maximum microbial counts.",
                  "Plough in green manure crops at 45 days (flowering stage) to maximize nitrogen fixation and biomass soft decomposition.",
                  "Eliminate chemical stubble burning completely; shred post-harvest straw and treat with fungal decomposers.",
                  "Inoculate nursery beds with VAM mycorrhizae to build dense root networks that resist moisture stress.",
                  "Maintain active organic mulches on bed surfaces to shield temperature-sensitive soil bacteria from summer heat."
            ],
            "faqs": [
                  {
                        "q": "Can Jeevamrutham be filtered and applied through drip irrigation systems?",
                        "a": "Yes. Filter the fermented liquid twice through a double-layered 100-mesh nylon cloth before pouring into the fertigation Venturi tank. Always flush the drip laterals with clean water for 10 minutes following application to prevent emitter clogging."
                  },
                  {
                        "q": "How long does it take to rebuild soil organic carbon from 0.4% to 0.8%?",
                        "a": "With consistent green manuring, application of 5 tons enriched FYM per year, and zero stubble burning, GreenRoots cluster plots typically reach 0.8% organic carbon within 24 to 36 months."
                  },
                  {
                        "q": "Does Trichoderma kill beneficial earthworms?",
                        "a": "No. Trichoderma viride is an antagonistic fungus that exclusively targets pathogenic fungi (such as Rhizoctonia and Fusarium). It is completely harmless to earthworms and beneficial soil bacteria."
                  }
            ]
      },
      "drone-bio-spraying": {
            "lead": "Deploying unmanned aerial vehicles (UAVs) equipped with centrifugal atomizers enables smallholders to apply bio-pesticides and micro-nutrient foliar sprays with pinpoint accuracy. Cooperative drone fleets cut liquid water consumption by 90%, eliminate farm-hand chemical exposure, and complete an entire acre of protective coverage in under seven minutes.",
            "sections": [
                  {
                        "heading": "Ultra-Low Volume (ULV) Droplet Dynamics",
                        "body": "Traditional manual knapsack sprayers discharge large, coarse water droplets (300 to 500 microns) that bounce off waxy leaf surfaces and pool uselessly onto the dirt. Agricultural spray drones generate calibrated micro-droplets (80 to 150 microns). The high-velocity downwash generated by quadcopter propellers creates strong air turbulence that lifts crop leaves, ensuring thorough droplet coating on both upper and lower leaf surfaces where insect pests hide.",
                        "tip": "Calibrate drone flight altitude strictly to 1.8 to 2.2 metres above the crop canopy to optimize spray swath width."
                  },
                  {
                        "heading": "Standardized Biological Spray Recipes",
                        "body": "Spraying biological solutions such as Bacillus thuringiensis (Bt), Beauveria bassiana, or micro-filtered Neem Seed Kernel Extract (NSKE 5%) requires strict filtration protocols. Particulates exceeding 100 microns can clog delicate centrifugal nozzles. GreenRoots field squads prepare pre-filtered stock concentrates in stainless-steel mixing tanks, testing dynamic surface tension before loading drone payloads.",
                        "tip": "Add natural soap-nut (shikakai) extract or agricultural wetting agent at 0.5 ml/L to reduce droplet surface tension."
                  },
                  {
                        "heading": "Cooperative Rental Economics for Smallholders",
                        "body": "Purchasing a commercial DGCA-certified agricultural drone requires substantial capital beyond individual smallholder budgets. Through GreenRoots Machinery Banks, member farmers hire certified drone pilots for just ₹350 to ₹400 per acre, including battery charging, flight telemetry, and real-time mapping. A two-acre plot that once required two full days of arduous manual backpack spraying is completed in 15 minutes.",
                        "tip": "Book drone slots cooperatively with 3 to 4 neighbouring farmers along a contiguous field block to receive group dispatch discounts."
                  },
                  {
                        "heading": "Safety Protocols & Environmental Benefits",
                        "body": "Manual spraying exposes farm workers to dangerous inhalants and direct dermal contact, frequently leading to acute respiratory ailments. Drone automation removes human operators from the spray zone entirely. Furthermore, because spray drift is precisely constrained by geo-fenced GPS boundaries, non-target beneficial insect habitats and water bodies are shielded from accidental overspray.",
                        "tip": "Never operate agricultural spray drones when field wind speeds exceed 12 km/h to avoid lateral drift."
                  }
            ],
            "table": {
                  "title": "Drone Precision Spraying vs. Manual Knapsack Field Comparison",
                  "headers": [
                        "Operational Parameter",
                        "Manual Knapsack Sprayer",
                        "Tractor-Mounted Boom",
                        "GreenRoots Agricultural Drone",
                        "Farmer Advantage"
                  ],
                  "rows": [
                        [
                              "Water Requirement / Acre",
                              "180 – 220 Litres",
                              "350 – 450 Litres",
                              "10 – 16 Litres",
                              "92% Water Saved"
                        ],
                        [
                              "Application Time / Acre",
                              "3.5 – 5.0 Hours",
                              "45 – 60 Minutes",
                              "6 – 8 Minutes",
                              "97% Faster Turnaround"
                        ],
                        [
                              "Canopy Underleaf Coverage",
                              "15% – 25% (Poor)",
                              "35% – 45% (Moderate)",
                              "75% – 88% (Propeller Downwash)",
                              "3.5x Better Pest Contact"
                        ],
                        [
                              "Operator Chemical Exposure",
                              "High Dermal & Inhalation",
                              "Moderate Exposure",
                              "Zero Direct Contact",
                              "100% Worker Safety"
                        ],
                        [
                              "Cost per Acre (Service)",
                              "₹650 – ₹800 (Labor)",
                              "₹900 – ₹1,200 (Fuel/Rent)",
                              "₹350 – ₹420 (Co-op Rate)",
                              "Up to 50% Cheaper"
                        ]
                  ]
            },
            "takeaways": [
                  "Use ultra-low volume (ULV) nozzles calibrated to 10-15 litres per acre to maximize canopy penetration.",
                  "Ensure all bio-pesticides and herbal decoctions are filtered through a 120-mesh strainer before loading drone tanks.",
                  "Schedule drone flights between 6:30 AM – 9:30 AM or 4:00 PM – 6:30 PM when wind speeds are calm (<10 km/h).",
                  "Cooperate with neighbouring cluster farmers to aggregate contiguous 10-acre flight blocks for priority drone dispatch.",
                  "Review pre-flight obstacle telemetry for overhead high-tension electric wires, boundary palms, and farm structures."
            ],
            "faqs": [
                  {
                        "q": "Can thick bio-formulations like Panchagavya be sprayed using agricultural drones?",
                        "a": "Yes, but Panchagavya must be triple-filtered through fine nylon mesh and diluted at a 3% concentration (300 ml in 10 litres water). Drones equipped with rotary atomizers handle biological slurries significantly better than standard hydraulic pressure nozzles."
                  },
                  {
                        "q": "Is drone spraying legally permitted for smallholder farmers?",
                        "a": "Yes. All GreenRoots drone pilots hold official Directorate General of Civil Aviation (DGCA) Remote Pilot Certificates, and our drones operate in compliance with Government of India Agricultural Drone SOPs."
                  },
                  {
                        "q": "What happens if a sudden rain shower occurs right after drone spraying?",
                        "a": "Because drone applications use micro-droplet concentrates with natural non-ionic spreaders, absorption into leaf stomata occurs within 30 to 45 minutes, rendering the application significantly more rain-fast than drenched knapsack sprays."
                  }
            ]
      },
      "natural-pest-control": {
            "lead": "Indiscriminate chemical pesticide applications trigger resurgence of secondary pests, exterminate beneficial pollinators, and leave toxic chemical residues on consumable food crops. Integrated Bio-Pest Management (IBPM) combines border trap crops, pheromone traps, botanical extracts, and parasitoid wasps to keep pest populations below economic injury thresholds.",
            "sections": [
                  {
                        "heading": "Ecological Border Engineering with Trap Crops",
                        "body": "Pests can be intercepted before they ever reach main cash crops by planting attractive botanical barriers along field perimeters. Planting two rows of bright African marigolds (Tagetes erecta) around tomato or chili plots lures fruit borers (Helicoverpa armigera) and reduces plant-parasitic root-knot nematode populations through natural alpha-terthienyl root exudates. Similarly, planting castor lines around cotton attracts armyworms, concentrating pests for localized mechanical elimination.",
                        "tip": "Plant border marigold trap crops 15 days before transplanting chili or tomato seedlings so flowers bloom early."
                  },
                  {
                        "heading": "Standardized Neem Seed Kernel Extract (NSKE 5%) Formulation",
                        "body": "Neem contains azadirachtin, a potent tetranortriterpenoid that disrupts insect juvenile hormone regulation, inhibiting larval feeding and moulting. Preparation requires 50 kg clean dried neem seed kernels for 1,000 litres of water (5% concentration). Kernels are pounded gently, soaked overnight in water, filtered through muslin cloth, and combined with 1 kg of neutral washing soap powder as an emulsifier.",
                        "tip": "Always prepare NSKE fresh; exposed aqueous extracts degrade under sunlight and lose 60% potency after 48 hours."
                  },
                  {
                        "heading": "Biological Augmentation with Parasitoid Trichocards",
                        "body": "Egg parasitoid micro-wasps (Trichogramma chilonis and Trichogramma japonicum) naturally parasitize eggs of destructive stem borers, leaf folders, and bollworms. GreenRoots distributes laboratory-reared Trichocards containing approximately 20,000 parasitized eggs per card. Stapling five card strips per acre at 10-day intervals during early tillering releases thousands of adult female wasps that hunt down and destroy pest eggs before caterpillars emerge.",
                        "tip": "Staple Trichocard bits underneath leaves early in the morning to prevent predatory black ants from carrying off eggs."
                  },
                  {
                        "heading": "Pheromone & Light Trapping Protocols",
                        "body": "Installing automated sleeve traps with species-specific female sex pheromone lures (e.g. Scirpophaga incertulas for yellow stem borer, Spodoptera litura for cutworm) serves a dual purpose: mass male moth trapping and early-warning infestation monitoring. When trap catches exceed 4 to 5 moths per trap for three consecutive nights, member farmers immediately initiate targeted botanical sprays.",
                        "tip": "Replace pheromone rubber septa lures every 25 to 30 days as volatile attractant compounds evaporate."
                  }
            ],
            "table": {
                  "title": "Integrated Bio-Pest Management Matrix: Crop, Pest, Bio-Control & Timing",
                  "headers": [
                        "Crop Group",
                        "Primary Pest Threat",
                        "Bio-Control Agent / Trap",
                        "Application Dosage & Method",
                        "Economic Savings / Acre"
                  ],
                  "rows": [
                        [
                              "Paddy / Rice",
                              "Yellow Stem Borer",
                              "Trichogramma japonicum + Pheromone Lure",
                              "5 Trichocards/acre + 4 sleeve traps",
                              "₹1,800 saved in synthetic sprays"
                        ],
                        [
                              "Cotton & Pulses",
                              "Helicoverpa / Pod Borer",
                              "HaNPV Virus + Border Castor Lines",
                              "100 LE/acre foliar spray in evening",
                              "₹2,200 saved in chemical bollworm sprays"
                        ],
                        [
                              "Chilies & Tomatoes",
                              "Thrips, Mites & Fruit Borer",
                              "Yellow/Blue Sticky Traps + NSKE 5%",
                              "15 sticky traps/acre + 5% kernel extract",
                              "₹2,600 saved; zero toxic harvest residue"
                        ],
                        [
                              "Brinjal / Eggplant",
                              "Shoot & Fruit Borer",
                              "Lucinodes Pheromone Traps + Beauveria",
                              "8 lures/acre + 1 kg Beauveria bassiana drench",
                              "₹3,100 saved; 95% borer damage reduction"
                        ],
                        [
                              "Vegetable Brassicas",
                              "Diamondback Moth (DBM)",
                              "Bacillus thuringiensis (Bt var. kurstaki)",
                              "1 kg/acre wettable powder at evening",
                              "₹1,950 saved in repeated organophosphate sprays"
                        ]
                  ]
            },
            "takeaways": [
                  "Install yellow and blue sticky traps (15 per acre) early at crop emergence to trap sucking thrips, aphids, and whiteflies.",
                  "Staple Trichocards to underside of leaf blades at 5 spots per acre to wipe out stem borer eggs before hatching.",
                  "Spray 5% Neem Seed Kernel Extract (NSKE) at the first visual sign of vegetative leaf-eating caterpillars.",
                  "Never mix biological fungal agents (Beauveria or Trichoderma) with copper fungicides or chemical bactericides.",
                  "Inspect pheromone trap counts twice weekly to pinpoint exact peak moth flights for precision spray timing."
            ],
            "faqs": [
                  {
                        "q": "Will botanical neem sprays harm beneficial honeybees in the field?",
                        "a": "No. Azadirachtin must be ingested by chewing or sucking insects to take effect. Foraging honeybees and adult pollinators that do not feed on leaf tissue are unaffected, particularly when sprays are conducted after 4:30 PM."
                  },
                  {
                        "q": "How can I tell if Trichocards are viable and hatching?",
                        "a": "Place a small cut corner of the Trichocard into a clean clear glass jar with a lid. Within 24 hours at room temperature, you should observe hundreds of tiny speck-like micro-wasps flying inside the container."
                  },
                  {
                        "q": "What should I do if torrential rains wash off my NSKE spray?",
                        "a": "If heavy rain occurs within 4 hours of spraying, re-application is necessary. Always add a natural agricultural surfactant (such as soap-nut extract) to accelerate cuticle penetration."
                  }
            ]
      },
      "water-saving-drip": {
            "lead": "With depleting groundwater aquifers and rising pumping energy tariffs, transition to pressurized micro-irrigation is essential for smallholder resilience. Drip systems deliver water and water-soluble plant nutrients directly to the root zone at low pressure, conserving 40% to 60% water while increasing marketable harvest yields by up to 35%.",
            "sections": [
                  {
                        "heading": "Hydraulic Design & Pressure Balancing",
                        "body": "A dependable micro-irrigation layout requires balanced pipe friction calculations. The system starts at the primary filtration head assembly (screen or disc filter), passes through PVC sub-mains, and feeds inline or online lateral drip tubes. Pressure-compensating (PC) drippers maintain a steady discharge (typically 2.0 to 4.0 litres per hour) even along undulating slopes or long 100-metre lateral runs.",
                        "tip": "Flush sub-main flush valves for 60 seconds every week to expel accumulated silt and prevent lateral back-pressure."
                  },
                  {
                        "heading": "Venturi Fertigation & Precise Nutrient Dosing",
                        "body": "Rather than broadcasting solid fertilizer bags onto dry soil where up to 50% volatilizes or leaches into groundwater, Venturi injectors draw dissolved bio-ferments and water-soluble nutrients directly into the irrigation stream. Nutrients are delivered in split micro-doses directly to active feeder root hairs, dramatically increasing nutrient uptake efficiency from 30% to over 85%.",
                        "tip": "Always inject nutrients during the middle third of your irrigation cycle, followed by clean water line flushing."
                  },
                  {
                        "heading": "Preventing Microbial and Carbonate Clogging",
                        "body": "Borewell waters with high calcium and magnesium hardness precipitate inside tiny emitter labyrinths over time. GreenRoots trains farmers in periodic biological maintenance: injecting certified organic citric acid or mild food-grade phosphoric acid (pH 4.5 flushing for 30 minutes) once every two months to dissolve mineral scales and flush biological biofilms.",
                        "tip": "Check emitter discharge uniformity by placing measuring cups under 10 random drippers across the field."
                  },
                  {
                        "heading": "Government Subsidy Navigation & Capital Payback",
                        "body": "Under the Pradhan Mantri Krishi Sinchayee Yojana (PMKSY), small and marginal farmers are eligible for 70% to 100% financial subsidies on micro-irrigation kits. GreenRoots technical facilitators handle land documentation, geo-tagged survey drawings, and department filings on behalf of member farmers, reducing turnaround time from six months to under 45 days.",
                        "tip": "Ensure your land patta and Aadhaar details match perfectly before submitting your PMKSY application dossier."
                  }
            ],
            "table": {
                  "title": "Drip Micro-Irrigation vs. Conventional Flood Irrigation Field Audit",
                  "headers": [
                        "Crop Variety",
                        "Conventional Flood Water (L/Acre)",
                        "Drip Irrigation Water (L/Acre)",
                        "Water Saved (%)",
                        "Yield Increase (%)"
                  ],
                  "rows": [
                        [
                              "Sugarcane (Co 86032)",
                              "2,400,000 Litres",
                              "1,150,000 Litres",
                              "52% Saved",
                              "+38% Tonnage Gain"
                        ],
                        [
                              "Banana (Grand Naine)",
                              "1,950,000 Litres",
                              "920,000 Litres",
                              "53% Saved",
                              "+32% Bunch Weight Gain"
                        ],
                        [
                              "Tomato (Hybrid Shivam)",
                              "850,000 Litres",
                              "440,000 Litres",
                              "48% Saved",
                              "+42% Marketable Fruit"
                        ],
                        [
                              "Turmeric (Salem Local)",
                              "1,400,000 Litres",
                              "720,000 Litres",
                              "49% Saved",
                              "+28% Rhizome Yield"
                        ],
                        [
                              "Cotton (Bt Hybrid)",
                              "1,100,000 Litres",
                              "580,000 Litres",
                              "47% Saved",
                              "+26% Boll Harvest"
                        ]
                  ]
            },
            "takeaways": [
                  "Install a minimum 120-mesh disc filter at the borewell head to trap micro-sand particles before they enter drip lines.",
                  "Operate drip laterals at a steady operating pressure of 1.0 to 1.2 kg/cm² for uniform discharge across rows.",
                  "Inject liquid bio-ferments through Venturi units during the middle 30% of the irrigation run to prevent root burn.",
                  "Conduct acid flushing with organic citric acid every 60 days to dissolve hard calcium and iron scale in emitters.",
                  "Leverage the PMKSY micro-irrigation subsidy through GreenRoots for up to 100% government hardware financing."
            ],
            "faqs": [
                  {
                        "q": "How frequently should disc filters be cleaned?",
                        "a": "In borewells with moderate silt, remove and wash disc rings with clean water once every 3 to 4 days. If the pressure difference between inlet and outlet gauges exceeds 0.3 kg/cm², clean the discs immediately."
                  },
                  {
                        "q": "Can drip irrigation work effectively on gravity pressure from an elevated tank?",
                        "a": "Yes. Low-pressure gravity drip kits designed for 0.2 to 0.5 bar operate seamlessly from overhead 1,000-litre tanks raised at least 2.5 metres above ground level, covering up to 0.5 acre without any electricity."
                  },
                  {
                        "q": "What is the expected lifespan of UV-stabilized virgin HDPE lateral drip tubes?",
                        "a": "High-grade UV-stabilized laterals (16 mm, Class 2) last between 7 to 10 years when handled carefully during inter-cultivation and shielded from direct rat gnawing."
                  }
            ]
      },
      "member-story-lakshmi": {
            "lead": "Trapped in the cycle of low-margin paddy monoculture and crippling local trader commissions, smallholder farmer Lakshmi transformed her two-acre family holding in Thanjavur district. By transitioning to climate-resilient traditional millets, accessing shared FPC processing infrastructure, and marketing branded products directly, her net annual income surged from ₹28,000 to over ₹1,42,000.",
            "sections": [
                  {
                        "heading": "The Predicament of Marginal Monoculture",
                        "body": "Operating just two acres of tail-end delta land, Lakshmi faced acute water deficits whenever canal releases ran dry. Borrowing at 36% annual interest from local middlemen for chemical fertilizers, her family was forced to sell fresh paddy immediately at harvest gate at steep price discounts to settle seasonal loans.",
                        "tip": "Tail-end lands subject to canal water instability should allocate at least 50% acreage to low-water millets."
                  },
                  {
                        "heading": "Joining GreenRoots & Embracing Traditional Millets",
                        "body": "In 2023, Lakshmi joined GreenRoots Producer Company as an equity shareholder. Our field agronomists guided her to convert 1.5 acres into indigenous Barnyard Millet (Kuthiraivali) and Finger Millet (Ragi). These ancient crops matured in just 75 to 90 days, required only two light irrigations, and suffered zero damage from wild birds and pests.",
                        "tip": "Plant traditional barnyard millet as a contingency crop when monsoon onset is delayed by more than 3 weeks."
                  },
                  {
                        "heading": "Value-Addition via Shared Processing Machinery",
                        "body": "Rather than selling raw, uncleaned millet grains at ₹22/kg, Lakshmi mobilized her women's self-help cluster to utilize the GreenRoots village processing centre. Using the shared mechanical destoner, de-huller, and aspirator, they converted raw grains into export-grade polished millet and stone-ground ragi flour, packaging them in branded 1 kg hermetic pouches that command ₹75/kg in urban organic markets.",
                        "tip": "Value-addition (destoning, grading, vacuum packing) captures 60% of the retail consumer price back to the farm gate."
                  },
                  {
                        "heading": "Community Leadership & Economic Independence",
                        "body": "Today, Lakshmi serves as a Cluster Director on the GreenRoots Board of Directors, mentoring 64 marginal women farmers across her panchayat. Her enterprise has fully repaid previous informal debts, installed a solar rooftop pump, and financed higher education for her children, demonstrating the transformative economic power of farmer aggregation.",
                        "tip": "Participate in monthly FPC cluster meetings to vote on collective procurement and machinery rental schedules."
                  }
            ],
            "table": {
                  "title": "Farmer Lakshmi’s 2-Acre Farm Enterprise Audit: Before vs. After GreenRoots FPC",
                  "headers": [
                        "Economic Parameter",
                        "Before (Conventional Paddy)",
                        "After (GreenRoots Millets + FPC Link)",
                        "Net Difference",
                        "Farmer Impact"
                  ],
                  "rows": [
                        [
                              "Total Water Consumption",
                              "2,800,000 Litres / Year",
                              "750,000 Litres / Year",
                              "73% Water Saved",
                              "Zero crop failure under drought"
                        ],
                        [
                              "Input Cultivation Cost / Acre",
                              "₹22,500 (Synthetics/Labor)",
                              "₹8,200 (Bio-Inputs/Relay)",
                              "₹14,300 Lower Cost",
                              "No private informal borrowing"
                        ],
                        [
                              "Average Farm Gate Realization",
                              "₹18.50 / kg (Raw Paddy)",
                              "₹68.00 / kg (Processed Millet)",
                              "+267% Value Realization",
                              "Eliminated middleman deductions"
                        ],
                        [
                              "Annual Gross Farm Revenue",
                              "₹74,000",
                              "₹1,86,000",
                              "+₹1,12,000 Increase",
                              "Year-round predictable cash flow"
                        ],
                        [
                              "Annual Net Take-Home Profit",
                              "₹29,000",
                              "₹1,44,000",
                              "+396% Net Income",
                              "Full economic self-reliance"
                        ]
                  ]
            },
            "takeaways": [
                  "Diversify at least 40% of smallholdings into short-duration millets to safeguard income against monsoon delays.",
                  "Never sell raw uncleaned grains at farm gate; access collective FPC destoning and grading facilities for 2x margins.",
                  "Form village joint liability groups (JLGs) to access formal bank credit at 4% interest via FPC guarantees.",
                  "Package value-added flours and clean grains in moisture-proof branded pouches to access direct consumer markets.",
                  "Take an active leadership role in your producer company to influence procurement prices and community development."
            ],
            "faqs": [
                  {
                        "q": "What machinery did Lakshmi’s cluster use to process small millets?",
                        "a": "The cluster utilized a centrifugal millet de-huller with an integrated aspirator and vibrating grader installed at the GreenRoots Village Processing Hub, funded under the National Food Security Mission."
                  },
                  {
                        "q": "How does GreenRoots support women farmers who lack land title deeds in their own name?",
                        "a": "Through our Women Farmer Producer Groups, women cultivating leased land or family holdings can enroll via Self-Help Group (SHG) certification and access full equity voting rights and input subsidies."
                  },
                  {
                        "q": "Where are the processed millets sold?",
                        "a": "GreenRoots aggregates member produce and supplies directly to certified organic supermarket chains, institutional school nutrition programs, and our direct-to-consumer online distribution channels."
                  }
            ]
      },
      "soil-sensors": {
            "lead": "Deploying low-cost IoT soil moisture probes, electrical conductivity (EC) sensors, and telemetry gateways empowers smallholders to eliminate guesswork in irrigation. Real-time sub-soil telemetry transmits SMS alerts directly to farmers' mobile phones, preventing root hypoxia, cutting electricity bills, and conserving up to 35% groundwater.",
            "sections": [
                  {
                        "heading": "Capacitance Sensing vs. Traditional Tensiometers",
                        "body": "Traditional porous ceramic cup tensiometers require frequent water refilling and lose soil contact in drying clay soils. Modern frequency domain reflectometry (FDR) capacitance probes measure dielectric permittivity continuously without soil disturbance. Installed at dual depths (15 cm for active surface feeder roots and 45 cm for deep sub-soil reserves), these sensors track water movement accurately.",
                        "tip": "Pack excavated soil firmly around probe prongs during installation to eliminate air pockets that skew moisture readings."
                  },
                  {
                        "heading": "Calibrating Volumetric Water Content (VWC) Thresholds",
                        "body": "Different soil textures hold water with varying capillary tension. In heavy delta clay soils, field capacity sits around 38% VWC and permanent wilting occurs at 18% VWC. In contrast, sandy loam soils reach field capacity at 22% VWC. GreenRoots agronomists calibrate local sensor nodes so automated alerts trigger before capillary tension forces plants into stomatal closure.",
                        "tip": "Trigger irrigation when root-zone VWC drops to 50% of available water capacity (AWC), not when the surface appears dry."
                  },
                  {
                        "heading": "LoRaWAN Mesh Telemetry & Solar Battery Nodes",
                        "body": "Rather than relying on expensive cellular SIM cards for every single sensor node, GreenRoots installs low-power LoRaWAN mesh networks across village farm clusters. A single solar-powered central gateway installed at the village water tower collects sensor packets from up to 80 farm nodes within a 5-kilometre radius, routing data to our cloud advisory engine.",
                        "tip": "Mount sensor transmitter solar panels facing south at a 15-degree tilt to maintain year-round battery charge."
                  },
                  {
                        "heading": "Preventing Root Rot and Fertilizer Leaching",
                        "body": "Over-irrigation in heavy soils saturates pore spaces, expelling oxygen and creating anaerobic conditions that breed Pythium root rot and collar rot fungi. Real-time telemetry prevents excessive watering, maintaining optimal root aeration while preventing dissolved nitrogen and potassium from leaching below the root zone.",
                        "tip": "Monitor the 45 cm sensor reading: if sub-soil moisture spikes during irrigation, water is being wasted past root depth."
                  }
            ],
            "table": {
                  "title": "Soil Moisture Thresholds & Automated Irrigation Triggers by Crop Stage",
                  "headers": [
                        "Crop & Growth Stage",
                        "Optimal Root-Zone VWC (%)",
                        "Irrigation Start Trigger (%)",
                        "Sensor Depth Placement",
                        "Recommended Run Duration"
                  ],
                  "rows": [
                        [
                              "Paddy (Tillering)",
                              "32% – 36% (Saturated)",
                              "26% VWC (Hairline cracks)",
                              "10 cm & 25 cm",
                              "45 mins (Intermittent wetting)"
                        ],
                        [
                              "Banana (Vegetative / Shooting)",
                              "28% – 34% (Field capacity)",
                              "22% VWC",
                              "20 cm & 50 cm",
                              "90 mins drip run"
                        ],
                        [
                              "Tomato (Flowering / Fruiting)",
                              "24% – 28%",
                              "18% VWC",
                              "15 cm & 35 cm",
                              "45 mins drip run"
                        ],
                        [
                              "Millets / Pulses (Pod fill)",
                              "18% – 22%",
                              "14% VWC",
                              "15 cm & 30 cm",
                              "30 mins sprinkler run"
                        ],
                        [
                              "Turmeric (Rhizome bulking)",
                              "26% – 30%",
                              "20% VWC",
                              "15 cm & 40 cm",
                              "60 mins drip run"
                        ]
                  ]
            },
            "takeaways": [
                  "Place sensors in representative soil zones away from edge bunds, farm roads, or direct water outlet splashes.",
                  "Check SMS telemetry alerts every morning at 7:00 AM before switching on borewell pump starters.",
                  "Stop irrigation immediately when the deep 45 cm sensor registers moisture increase to prevent deep drainage waste.",
                  "Clean sensor prongs annually with a scotch-brite pad to remove mineral crusting and salt buildup.",
                  "Utilize historical moisture trend graphs provided in the GreenRoots farmer portal to fine-tune seasonal water budgets."
            ],
            "faqs": [
                  {
                        "q": "How much does a GreenRoots solar sensor node cost for an individual smallholder?",
                        "a": "Under the cooperative cluster leasing model, members pay a seasonal service fee of just ₹600 per season, which includes hardware installation, mesh connectivity, mobile SMS advisory, and technical maintenance."
                  },
                  {
                        "q": "Do I need a smartphone with internet access in the field to receive alerts?",
                        "a": "No. The GreenRoots advisory engine transmits basic SMS text alerts in Tamil and English directly to any standard basic feature phone."
                  },
                  {
                        "q": "Will farm equipment or tractors damage buried sensors during ploughing?",
                        "a": "Sensors are placed within crop rows and marked with bright orange fluorescent poles. Wireless transmitter nodes are mounted on boundary bunds safely outside tractor turning radiuses."
                  }
            ]
      },
      "price-trends": {
            "lead": "Agricultural market prices exhibit recurring cyclical volatility driven by seasonal harvest gluts, regional festival demands, and interstate transport bottlenecks. Understanding price trend analytics and leveraging collective warehousing enables smallholders to transition from distress sellers into strategic price makers.",
            "sections": [
                  {
                        "heading": "Analyzing the Seasonal Post-Harvest Glut Curve",
                        "body": "In the weeks immediately following harvest, thousands of smallholders harvest and transport perishable crops simultaneously to local APMC mandis. Private commission agents exploit this supply glut to drive down spot prices by 30% to 50%. Within 60 to 90 days after harvest concludes, market arrivals plummet and wholesale prices rebound to profitable highs.",
                        "tip": "Track historical 5-year price modal graphs before deciding between immediate spot sale and storage."
                  },
                  {
                        "heading": "Cooperative Warehousing & Electronic Warehouse Receipts (e-NWR)",
                        "body": "To eliminate the pressure of distress selling to pay off seasonal harvest debts, GreenRoots operates certified village godowns registered under the Warehousing Development and Regulatory Authority (WDRA). Member farmers deposit graded grains and receive negotiable electronic warehouse receipts (e-NWRs), against which commercial banks disburse instant pledge loans at 7% interest.",
                        "tip": "Pledge loans unlock up to 70% of crop value within 48 hours without relinquishing ownership of your harvest."
                  },
                  {
                        "heading": "Direct Institutional Forward Contracting",
                        "body": "GreenRoots negotiates forward procurement contracts with flour mills, pulse processors, and national retail chains months before harvesting commences. These agreements establish guaranteed minimum floor prices with upside-sharing clauses, insulating growers from sudden international commodity dumps or speculative market drops.",
                        "tip": "Lock in at least 50% of expected harvest volume under FPC forward contracts to cover cultivation expenses."
                  },
                  {
                        "heading": "Integrating with e-NAM Digital Auctions",
                        "body": "Through integration with the National Agriculture Market (e-NAM) digital portal, GreenRoots lists assay-certified commodity lots for bidding among verified buyers across India. High-quality pulses from Tamil Nadu are sold directly to buyers in Delhi and Mumbai, capturing inter-state price premiums of ₹400 to ₹850 per quintal.",
                        "tip": "Always obtain a certified moisture and grade certificate from the FPC lab before listing commodity lots on e-NAM."
                  }
            ],
            "table": {
                  "title": "Commodity Glut vs. Off-Season Mandi Price Realization Analysis",
                  "headers": [
                        "Commodity",
                        "Peak Harvest Glut Price (₹/Q)",
                        "Off-Season Stored Price (₹/Q)",
                        "FPC Storage Cost (₹/Q/Mo)",
                        "Net Farmer Profit Gain"
                  ],
                  "rows": [
                        [
                              "Black Gram (Urad Dal)",
                              "₹5,200 / Quintal",
                              "₹7,800 / Quintal",
                              "₹45 / Quintal",
                              "+₹2,465 / Quintal (+47%)"
                        ],
                        [
                              "Green Gram (Moong)",
                              "₹5,800 / Quintal",
                              "₹8,400 / Quintal",
                              "₹45 / Quintal",
                              "+₹2,465 / Quintal (+42%)"
                        ],
                        [
                              "Finger Millet (Ragi)",
                              "₹2,400 / Quintal",
                              "₹3,900 / Quintal",
                              "₹35 / Quintal",
                              "+₹1,395 / Quintal (+58%)"
                        ],
                        [
                              "Turmeric (Salem Finger)",
                              "₹6,100 / Quintal",
                              "₹11,500 / Quintal",
                              "₹55 / Quintal",
                              "+₹5,235 / Quintal (+85%)"
                        ],
                        [
                              "Maize (Feed Grade)",
                              "₹1,650 / Quintal",
                              "₹2,350 / Quintal",
                              "₹30 / Quintal",
                              "+₹610 / Quintal (+37%)"
                        ]
                  ]
            },
            "takeaways": [
                  "Avoid selling entire crop volumes during the initial 3 weeks of peak harvest when mandi supply peaks.",
                  "Store dried, graded grains in WDRA-accredited GreenRoots warehouses to maintain quality and prevent weevil damage.",
                  "Access e-NWR pledge financing at 7% interest to meet urgent family cash flow needs while holding stock.",
                  "Monitor wholesale mandi arrivals on the Agmarknet portal or GreenRoots weekly SMS price advisory.",
                  "Participate in collective grade pooling: uniform grade-1 lots command up to 15% price premiums over mixed lots."
            ],
            "faqs": [
                  {
                        "q": "What is the maximum duration a farmer can store produce in GreenRoots warehouses?",
                        "a": "Members can store non-perishable food grains and pulses for up to 11 months under full insurance coverage against fire, moisture, theft, and pest damage."
                  },
                  {
                        "q": "How does pledge financing work with electronic warehouse receipts?",
                        "a": "Upon depositing graded grain at our warehouse, an e-NWR is generated. Partner public sector banks disburse up to 70% of the market value directly into the farmer's bank account within 2 working days."
                  },
                  {
                        "q": "What quality parameters must grains meet before warehouse acceptance?",
                        "a": "Grains must have moisture content below 12% (10% for oilseeds), less than 2% foreign matter, and zero live insect infestation. Our depot staff provide free grain moisture testing."
                  }
            ]
      },
      "crop-rotation": {
            "lead": "Repetitive monocropping depletes specific soil nutrient strata, encourages specialized pest epidemics, and leads to severe root auto-toxicity. Implementing a structured four-season crop rotation alternating deep-rooted legumes, fibrous-rooted cereals, and pest-cleansing brassicas restores soil microbial balance and elevates per-acre net returns.",
            "sections": [
                  {
                        "heading": "Complementary Root Architecture & Soil Stratification",
                        "body": "Paddy and cereals possess fibrous, shallow root systems that concentrate nutrient and water uptake within the top 15 to 20 cm of soil, creating a hard, impermeable plow pan underneath. In contrast, deep tap-rooted crops such as pigeon pea (tur), sunnhemp, and cotton penetrate down to 80 to 120 cm. These taproots act as biological subsoilers, creating root channels that facilitate deep water infiltration and scavenge minerals leached beyond cereal reach.",
                        "tip": "Plant deep tap-root legumes immediately following shallow cereal crops to break plow hardpans naturally."
                  },
                  {
                        "heading": "Biological Nitrogen Fixation via Rhizobium Symbiosis",
                        "body": "Leguminous crops form nodules with host-specific Rhizobium bacteria that convert inert atmospheric dinitrogen into plant-absorbable ammonium. A single rotation cycle of cowpea or groundnut contributes between 40 to 65 kg of residual elemental nitrogen per acre. When the next cereal crop is planted, basal synthetic nitrogen requirements are reduced by 30% to 50%.",
                        "tip": "Inspect legume roots at flowering: active, healthy nitrogen-fixing nodules exhibit a distinct pink or red interior when sliced open."
                  },
                  {
                        "heading": "Disrupting Specialized Pest and Weed Life Cycles",
                        "body": "Continuous cultivation of host crops allows specialized insect larvae, fungal spores, and weed seeds to accumulate in soil. For instance, rice root-knot nematodes and false smut fungal spores build up rapidly in monoculture paddy soils. Rotating with non-host crops such as sesame, sunnhemp, or marigolds starves nematode juveniles, reducing pest incidence in subsequent crops by over 70%.",
                        "tip": "Never follow a solanaceous crop (tomato, brinjal, chili) with another solanaceous crop to prevent bacterial wilt recurrence."
                  },
                  {
                        "heading": "Economic Risk Diversification Across Multiple Seasons",
                        "body": "Relying on a single harvest leaves farm families acutely vulnerable to unseasonal weather events or market price crashes. A diversified rotation plan ensures multiple revenue streams distributed across the agricultural year, smoothing household income and ensuring steady cash flows for input purchases and school fees.",
                        "tip": "Allocate 20% of farm acreage to high-value seasonal cash pulses or oilseeds during each rotation turn."
                  }
            ],
            "table": {
                  "title": "Four-Season Regenerative Rotation Cycle & Soil Biological Impact",
                  "headers": [
                        "Rotation Phase",
                        "Crop Category & Example",
                        "Root Architecture",
                        "Nutrient Contribution",
                        "Pest Disruption Effect"
                  ],
                  "rows": [
                        [
                              "Season 1 (Kharif / Samba)",
                              "Main Cereal: Paddy (BPT 5204)",
                              "Shallow Fibrous (15–20 cm)",
                              "High carbon residue; heavy feeder",
                              "Suppressed by subsequent dry fallow"
                        ],
                        [
                              "Season 2 (Rabi / Winter)",
                              "Relay Legume: Black Gram (VBN 8)",
                              "Taproot + Nodules (40–55 cm)",
                              "Fixes 38–45 kg free nitrogen/acre",
                              "Starves cereal stem borers & leaf folders"
                        ],
                        [
                              "Season 3 (Summer)",
                              "Drought Oilseed: Sesame (TMV 7)",
                              "Moderate Taproot (30–45 cm)",
                              "Deep phosphorus & potash scavenger",
                              "Allelopathic suppression of weed seeds"
                        ],
                        [
                              "Season 4 (Pre-Kharif)",
                              "Green Manure: Sunnhemp (Daincha)",
                              "Aggressive Deep Taproot (80+ cm)",
                              "Adds 18 tons succulent organic biomass",
                              "Exudates kill root-knot nematodes"
                        ]
                  ]
            },
            "takeaways": [
                  "Never cultivate the same botanical family consecutively in the same field block across multiple seasons.",
                  "Always integrate at least one nitrogen-fixing leguminous pulse crop within every annual rotation sequence.",
                  "Check legume root nodules at 50% flowering to confirm active pink leghemoglobin nitrogen fixation.",
                  "Grow deep tap-root crops like pigeon pea to naturally shatter compacted subsurface plow pans without heavy machinery.",
                  "Incorporate green manure biomass into the soil 2 weeks before transplanting main cereals to allow full decomposition."
            ],
            "faqs": [
                  {
                        "q": "Can I rotate pulses immediately after hybrid maize in dryland soils?",
                        "a": "Yes. Following hybrid maize with chickpea, cowpea, or black gram is an excellent rotation. Maize leaves high carbonaceous root stubble that benefits from the biological nitrogen fixed by the subsequent pulse crop."
                  },
                  {
                        "q": "What should I do if my legume crops fail to develop root nodules?",
                        "a": "Failure of nodulation indicates an absence of native Rhizobium strains or excessive residual synthetic nitrogen in the soil. Always coat seeds with certified Rhizobium bio-inoculant (500g per 10 kg seed) before sowing."
                  },
                  {
                        "q": "Does crop rotation increase overall farm labour requirements?",
                        "a": "While rotation requires planning different sowing windows, overall labor is reduced because weed infestation drops by up to 60% and zero-till relay seeding eliminates primary tillage labour."
                  }
            ]
      },
      "seed-saving": {
            "lead": "Modern industrial agriculture has made smallholders dangerously dependent on expensive, proprietary F1 hybrid seeds that cannot be saved for subsequent planting. Preserving open-pollinated indigenous heirloom seed varieties safeguards climate resilience, preserves vital genetic biodiversity, and cuts input expenses to zero.",
            "sections": [
                  {
                        "heading": "Open-Pollinated Heirlooms vs. Terminator Hybrids",
                        "body": "Commercial F1 hybrid seeds exhibit high hybrid vigour in their first generation but suffer dramatic genetic segregation and severe yield drops if saved and replanted. In contrast, open-pollinated traditional varieties (OPVs) breed true to type year after year. Farmers selecting the healthiest, most vigorous parent plants continuously adapt the crop to local microclimatic conditions and endemic pests.",
                        "tip": "Select true-to-type seed parent plants from the centre of your field, never from field edges where cross-pollination occurs."
                  },
                  {
                        "heading": "Traditional Indigenous Seed Preservation Methods",
                        "body": "Centuries of traditional agricultural wisdom developed highly effective, chemical-free seed preservation protocols. Storing sun-dried seeds (<9% moisture) inside earthen pots coated with cow-dung wash, mixed with dried neem leaves (Azadirachta indica), crushed black pepper, and sieved wood ash creates an inhospitable, desiccating environment that repels pulse beetles (Callosobruchus maculatus) without toxic aluminium phosphide.",
                        "tip": "Conduct the 'thumbnail test': properly dried pulse seeds will not dent or crack when pressed firmly with a thumbnail."
                  },
                  {
                        "heading": "Establishing Community-Managed Seed Banks",
                        "body": "GreenRoots organizes decentralized village seed banks managed by experienced women farmers. The operating model is simple: a member borrows 5 kg of certified native seed at the start of the season and returns 7.5 kg of cleaned, graded seed after harvest. This cooperative mechanism expands community seed stocks, ensuring no farmer is left without seeds following flood or drought losses.",
                        "tip": "Keep detailed seed passport registers documenting variety name, days to maturity, drought tolerance, and cooking qualities."
                  },
                  {
                        "heading": "Climate Resilience of Heritage Cereal Germplasm",
                        "body": "Traditional heritage paddy varieties such as Mapillai Samba (rich in iron and zinc), Karungkuruvai (immune to coastal salinity), and Poongar (survives direct submergence and flooding) possess genetic adaptations honed over hundreds of generations. These climate-smart varieties thrive in low-input organic systems where commercial hybrids fail completely.",
                        "tip": "Heritage red and black rice varieties command 2x to 3x higher retail market prices in urban organic health food stores."
                  }
            ],
            "table": {
                  "title": "Heirloom Crop Varieties Conserved by GreenRoots Producer Clusters",
                  "headers": [
                        "Heirloom Variety",
                        "Crop Family",
                        "Key Climate Resilience Trait",
                        "Maturity Duration",
                        "Nutritional / Health Benefit"
                  ],
                  "rows": [
                        [
                              "Mapillai Samba",
                              "Traditional Paddy",
                              "High drought tolerance; deep root penetration",
                              "155–160 Days",
                              "High zinc & iron; low glycemic index"
                        ],
                        [
                              "Karungkuruvai",
                              "Traditional Paddy",
                              "Coastal salinity & flood tolerance",
                              "120–125 Days",
                              "Immunity booster; traditional Siddha medicinal rice"
                        ],
                        [
                              "Poongar",
                              "Traditional Paddy",
                              "Withstands 10-day field water submergence",
                              "70–75 Days",
                              "Rich in anthocyanins; excellent for postpartum health"
                        ],
                        [
                              "Kavuni (Black Rice)",
                              "Heritage Paddy",
                              "Resistant to brown planthopper & blast",
                              "140–145 Days",
                              "Highest antioxidant & polyphenol concentration"
                        ],
                        [
                              "Salem Local Turmeric",
                              "Heirloom Spice",
                              "High rhizome rot resistance; zero chemical demand",
                              "270 Days",
                              "4.8% Curcumin content (vs. 2.5% in commercial hybrids)"
                        ]
                  ]
            },
            "takeaways": [
                  "Select robust, disease-free seed mother plants from middle field rows during peak physiological maturity.",
                  "Sun-dry harvested seeds on clean tarpaulins until moisture drops below 9% for safe multi-year storage.",
                  "Store seeds in airtight containers mixed with sieved wood ash and dry neem leaves to repel weevils naturally.",
                  "Conduct a simple paper towel germination test before seasonal sowing to verify at least 85% germination viability.",
                  "Contribute 2 kg of your best harvested native seed to your village GreenRoots seed bank to maintain genetic purity."
            ],
            "faqs": [
                  {
                        "q": "How can I test the germination rate of saved seeds before sowing my main field?",
                        "a": "Place 100 seeds evenly spaced on a wet paper towel or cotton cloth, roll it up, and keep it moist in a warm shaded room. Count the sprouted seedlings after 5 to 7 days: 85 or more vigorous sprouts represents 85%+ germination."
                  },
                  {
                        "q": "Can I save seeds from F1 hybrid vegetable packets bought in agro-shops?",
                        "a": "No. F1 hybrid seeds will not breed true to type in the second generation (F2), resulting in irregular plant height, variable fruit sizes, and substantial yield losses. Only save seeds from verified open-pollinated (OP) or heirloom varieties."
                  },
                  {
                        "q": "Where can GreenRoots members obtain genuine starter seeds of heritage rice varieties?",
                        "a": "Visit our Central Seed Gene Bank in Thanjavur or attend our annual Indigenous Seed Exchange Festival held every May, where over 80 verified traditional varieties are distributed."
                  }
            ]
      },
      "solar-pumps": {
            "lead": "Volatile diesel fuel costs and unreliable three-phase agricultural electrical grids create severe irrigation bottlenecks for rural smallholders. Installing standalone solar-powered direct-current (DC) irrigation pumps provides clean, daylight-synchronized water flow, reduces operational expenses to zero, and cuts farm carbon emissions.",
            "sections": [
                  {
                        "heading": "DC Brushless (BLDC) vs. Conventional AC Induction Pumps",
                        "body": "Traditional AC agricultural submersible pumps suffer significant power conversion losses when operated through inverters. Modern brushless DC (BLDC) submersible pumps operate directly on variable DC voltage generated by photovoltaic arrays. With high-flux neodymium rare-earth permanent magnets, BLDC motors achieve 92% electrical-to-hydraulic efficiency, delivering up to 30% more water discharge under cloudy morning and evening sunlight.",
                        "tip": "Clean dust from solar photovoltaic modules twice monthly using a soft microfiber brush and clean water."
                  },
                  {
                        "heading": "Sizing PV Arrays to Borewell Depth & Discharge Needs",
                        "body": "Accurate system sizing prevents costly equipment mismatch. For shallow dug wells and open ponds up to 15 metres depth, a 3 HP solar surface monobloc pump with a 3,000 Wp solar array delivers up to 1,80,000 litres per day. For deep borewells exceeding 60 metres, a 5 HP submersible pump backed by a 4,800 Wp array provides the necessary static head and volume.",
                        "tip": "Install maximum power point tracking (MPPT) controllers to maximize pump RPM during low-irradiance hours."
                  },
                  {
                        "heading": "Communal Pipeline Networks & Water Sharing Clusters",
                        "body": "Rather than individual farmers duplicating capital expenditures on separate deep borewells, GreenRoots promotes collective solar pump clusters. A centralized 7.5 HP solar pump installed at a shared community water source discharges water through buried underground PVC distribution pipelines to multiple member farms, charging nominal maintenance fees.",
                        "tip": "Install mechanical water flow meters on each member branch line to maintain transparent and equitable billing."
                  },
                  {
                        "heading": "Navigating PM-KUSUM Subsidies & Maintenance Protocols",
                        "body": "Under Component-B of the Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan (PM-KUSUM), small and marginal farmers receive up to 60% capital subsidies (30% Central + 30% State), with partner rural banks financing an additional 30%. GreenRoots technical engineers inspect solar mounting structures, ground earthing lightning arresters, and automated run-dry sensors.",
                        "tip": "Ensure your solar array installation includes copper lightning arresters and earth pits measuring below 5 ohms resistance."
                  }
            ],
            "table": {
                  "title": "5 HP Solar DC Irrigation Pump vs. 5 HP Diesel Engine: 5-Year Financial Audit",
                  "headers": [
                        "Expense / Performance Factor",
                        "5 HP Diesel Engine Pump",
                        "5 HP DC Solar Irrigation System",
                        "5-Year Cost Comparison",
                        "Environmental Benefit"
                  ],
                  "rows": [
                        [
                              "Initial Capital Cost (Farmer Share)",
                              "₹42,000 (Engine & Pipes)",
                              "₹78,000 (After 60% PM-KUSUM Subsidy)",
                              "-₹36,000 Higher upfront cost",
                              "Payback achieved in 14 months"
                        ],
                        [
                              "Annual Fuel / Energy Cost",
                              "₹68,400 (720 Litres Diesel @ ₹95/L)",
                              "₹0 (100% Free Solar Daylight)",
                              "+₹3,42,000 Saved over 5 years",
                              "100% independence from fuel price hikes"
                        ],
                        [
                              "Annual Maintenance & Engine Oil",
                              "₹8,500 (Filters, oil, gaskets, repairs)",
                              "₹1,200 (Panel cleaning & checkup)",
                              "+₹36,500 Saved over 5 years",
                              "Zero moving wear parts in solar panels"
                        ],
                        [
                              "5-Year Total Cost of Ownership",
                              "₹4,26,500",
                              "₹84,000",
                              "+₹3,42,500 Net Savings",
                              "Over ₹68,000 saved per year"
                        ],
                        [
                              "Carbon Footprint (5-Year)",
                              "10,800 kg CO2 emissions",
                              "0 kg CO2 emissions (Clean Energy)",
                              "10.8 Tons CO2 Abated",
                              "Eligible for FPC carbon credits"
                        ]
                  ]
            },
            "takeaways": [
                  "Position solar arrays facing true South at a 12 to 15-degree tilt for maximum year-round solar irradiance in Southern India.",
                  "Wash dust and bird droppings off panels early in the morning before solar modules heat up to avoid thermal glass shock.",
                  "Connect solar pump discharge directly to pressurized drip irrigation systems to maximize water use efficiency.",
                  "Ensure dry-run sensor probes are installed 1 metre above the pump intake to shut off the motor if groundwater levels drop.",
                  "Enroll in the PM-KUSUM subsidy scheme through GreenRoots to obtain 60% government subsidy and low-interest bank loans."
            ],
            "faqs": [
                  {
                        "q": "What happens on overcast or cloudy monsoon days?",
                        "a": "Modern MPPT pump controllers operate pumps at lower RPMs even under diffused solar light (down to 20% irradiance). On rainy days, crops experience minimal evapotranspiration, reducing irrigation necessity."
                  },
                  {
                        "q": "Can solar irrigation pumps also be used to power farm homestead lighting?",
                        "a": "Yes. Universal solar controllers can switch power to battery banks or household inverters in the evening after irrigation hours conclude, providing reliable rural electrification."
                  },
                  {
                        "q": "What is the warranty coverage on solar panels and submersible motors?",
                        "a": "All MNRE-approved solar modules supplied through GreenRoots carry a 25-year performance warranty (guaranteeing at least 80% output at year 25), while DC pump motors include a 5-year comprehensive manufacturer warranty."
                  }
            ]
      },
      "post-harvest": {
            "lead": "Post-harvest grain losses caused by inadequate sun drying, moisture condensation, and rice weevil infestations destroy 15% to 25% of agricultural produce before it reaches consumer plates. Adopting scientific moisture testing, solar bubble dryers, and multi-layer hermetic storage bags preserves grain quality, prevents mycotoxin development, and protects farm value.",
            "sections": [
                  {
                        "heading": "The Critical Moisture Threshold Before Storage",
                        "body": "Storing grains with excess moisture content accelerates fungal mold proliferation and insect reproduction. For long-term storage exceeding six months, food grains (paddy, maize, millets) must be dried down to 12.0% to 13.0% moisture, while oil-rich seeds (sesame, groundnut) must reach 8.0% to 9.0%. Storing grain at 15% moisture can generate internal respiration heat, destroying germination embryos within 30 days.",
                        "tip": "Use calibrated digital pin moisture meters rather than testing moisture by biting grains with teeth."
                  },
                  {
                        "heading": "Hermetic PICS Bags vs. Conventional Jute Gunny Sacks",
                        "body": "Traditional porous jute and woven polypropylene sacks allow air and ambient atmospheric moisture to enter freely. In contrast, multi-layer hermetic bags (Purdue Improved Crop Storage - PICS) feature two inner high-density polyethylene (HDPE) liners inside an outer woven sack. When sealed, the respiration of trapped insects and grain quickly depletes oxygen (<3%) and increases carbon dioxide, naturally suffocating all insect pests without chemical fumigants.",
                        "tip": "Twist and tie each inner hermetic liner separately with heavy-duty cable ties to ensure airtight sealing."
                  },
                  {
                        "heading": "Solar Bubble Drying to Prevent Rain Losses",
                        "body": "Drying grains on roadside asphalt exposes harvest lots to passing vehicle dust, animal droppings, and unexpected monsoon showers. GreenRoots distributes foldable solar bubble dryers. Transparent UV-stabilized plastic bubbles trap solar energy like a greenhouse, while low-wattage solar fans continuously exhaust humid air, drying a one-ton grain batch in 6 hours with zero contamination.",
                        "tip": "Rake grain layers inside solar dryers every 45 minutes to maintain uniform drying across the batch depth."
                  },
                  {
                        "heading": "Preventing Aflatoxin and Mold Contamination",
                        "body": "Aspergillus flavus molds infect groundnuts, maize, and pulses under warm, humid storage conditions, producing carcinogenic aflatoxins that trigger total commercial shipment rejections. Maintaining proper wooden pallet dunnage (keeping bags 30 cm away from concrete floors and warehouse walls) and adequate ventilation completely prevents mold sporulation.",
                        "tip": "Never place grain bags directly on bare concrete floors; always stack bags on elevated wooden or plastic pallets."
                  }
            ],
            "table": {
                  "title": "Grain Storage Method Performance & Weight Loss Over 12 Months",
                  "headers": [
                        "Storage Container Type",
                        "Moisture Re-absorption",
                        "Weevil Infestation Rate (12 Mo)",
                        "Storage Weight Loss (%)",
                        "Germination Viability Retained"
                  ],
                  "rows": [
                        [
                              "Traditional Jute Gunny Sack",
                              "High (Seasonal absorption)",
                              "Severe (45%–60% damaged grains)",
                              "14% – 18% Loss",
                              "Under 40% (Embryo damaged)"
                        ],
                        [
                              "Woven Polypropylene (PP) Bag",
                              "Moderate to High",
                              "Moderate (30%–45% damaged grains)",
                              "10% – 14% Loss",
                              "50% – 55%"
                        ],
                        [
                              "Galvanized Iron Storage Silo",
                              "Low (Moisture sweat on walls)",
                              "Low (If sealed with biopesticides)",
                              "4% – 6% Loss",
                              "75% – 80%"
                        ],
                        [
                              "Multi-Layer Hermetic (PICS Bag)",
                              "Zero (Hermetically sealed)",
                              "Zero (Complete biological suffocation)",
                              "< 0.5% Loss",
                              "Over 92% (High viability)"
                        ],
                        [
                              "GreenRoots Central Silo Facility",
                              "Controlled (<11.5% climate control)",
                              "Zero (CO2 biological flush)",
                              "< 0.2% Loss",
                              "Over 95% (Export grade)"
                        ]
                  ]
            },
            "takeaways": [
                  "Test grain moisture with digital meters before packing: paddy <13%, pulses <10%, oilseeds <9%.",
                  "Replace porous jute gunny bags with multi-layer hermetic storage bags for 100% insect-free chemical-free storage.",
                  "Stack storage bags on raised wooden pallets at least 30 cm away from walls to prevent ground condensation.",
                  "Dry damp harvest lots using portable solar bubble dryers to protect produce from dust, stones, and sudden rain.",
                  "Inspect warehouse stacks monthly for temperature spikes that indicate hidden insect respiration hot-spots."
            ],
            "faqs": [
                  {
                        "q": "How many seasons can a multi-layer hermetic PICS bag be reused?",
                        "a": "When handled carefully without punctures from sharp hooks, high-grade PICS bags can be reused for 3 to 4 consecutive storage seasons."
                  },
                  {
                        "q": "Are toxic chemical fumigants like celphos tablets necessary inside hermetic bags?",
                        "a": "No. Never add chemical fumigant tablets inside hermetic bags. The airtight seal alone naturally suffocates insects within 72 hours by cutting off oxygen supply."
                  },
                  {
                        "q": "Where can members purchase genuine hermetic storage bags at subsidized rates?",
                        "a": "GreenRoots supplies certified multi-layer hermetic bags (50 kg and 100 kg capacities) directly from all village collection centres at subsidized member prices."
                  }
            ]
      },
      "vermicompost-bio-enrichment": {
            "lead": "Farm biomass burning and improper crop residue disposal strip rural ecosystems of valuable carbon. On-farm vermicomposting converts agricultural stubble, cattle manure, and green foliage into bioactive vermicast teeming with humic acids, plant growth hormones, and beneficial bacteria. Smallholders practicing farm-scale vermicomposting reduce synthetic NPK expenditure by over 45% while building deep soil moisture resilience.",
            "sections": [
                  {
                        "heading": "Selecting Earthworm Species: Eisenia fetida vs. Native Eudrilus eugeniae",
                        "body": "Commercial vermicomposting relies on specialized epigeic earthworm species that dwell and feed on surface organic matter rather than burrowing deep into subsoil. Red Californian earthworms (Eisenia fetida) and African nightcrawlers (Eudrilus eugeniae) tolerate tropical composting temperatures up to 35°C. These voracious bio-processors consume biomass equal to their body weight daily, converting rough crop straw into rich granular casts within 45 to 60 days.",
                        "tip": "Stock 1 kg (approximately 1,000 adult earthworms) per square metre of bed area for optimal decomposition velocity."
                  },
                  {
                        "heading": "Bed Layering, Moisture Control & Temperature Management",
                        "body": "Successful vermicomposting requires strict bedding stratification: a 15 cm base drainage layer of dry chopped paddy straw or coconut coir pith, followed by a 30 cm layer of pre-decomposed farmyard manure mixed with green legume leaves. Beds must be sheltered under a thatched bamboo roof or 75% agro-shade net. Moisture levels must be maintained strictly at 60% to 70% by daily sprinkling with clean water.",
                        "tip": "Test bed moisture: a handful of bedding squeezed firmly should release a few drops of water without continuous dripping."
                  },
                  {
                        "heading": "Extracting and Applying Concentrated Vermiwash",
                        "body": "Vermiwash is a potent bio-liquid nutrient gathered by collecting excess water filtered through active earthworm burrows. Rich in soluble auxins, gibberellins, cytokines, and micro-nutrients, vermiwash acts as an organic tonic that stimulates root elongation, elevates chlorophyll synthesis, and repels soft-bodied sucking pests when applied as a 5% foliar spray.",
                        "tip": "Dilute fresh vermiwash 1:10 with water and spray onto crop leaves during active vegetative tillering or flowering."
                  },
                  {
                        "heading": "Cooperative Bagging, Quality Testing & Direct Farmer Marketing",
                        "body": "Through GreenRoots Village Processing Centres, member clusters pool and mechanically sieve harvested vermicast through a 3 mm vibrating rotary screen. The sieved vermicast is lab-certified for moisture (<20%), organic carbon (>18%), and beneficial microbial counts before being packed into moisture-proof 25 kg bags marketed directly to horticultural farms, tea estates, and urban nurseries at premium prices.",
                        "tip": "Sell certified vermicast through the GreenRoots cooperative brand to earn ₹8 to ₹10 per kg compared to ₹3 in loose bulk."
                  }
            ],
            "table": {
                  "title": "Nutrient Profile of Vermicast vs. Traditional Farmyard Manure (FYM)",
                  "headers": [
                        "Nutrient Parameter",
                        "Standard Farmyard Manure (FYM)",
                        "Enriched Organic Vermicast",
                        "Advantage Factor",
                        "Core Agronomic Function"
                  ],
                  "rows": [
                        [
                              "Total Nitrogen (N)",
                              "0.50% – 0.80%",
                              "1.80% – 2.20%",
                              "3x Higher Nitrogen",
                              "Drives vigorous leaf canopy and tillering"
                        ],
                        [
                              "Available Phosphorus (P2O5)",
                              "0.20% – 0.40%",
                              "0.85% – 1.15%",
                              "2.8x Higher Phosphorus",
                              "Accelerates deep root network expansion"
                        ],
                        [
                              "Available Potash (K2O)",
                              "0.50% – 0.70%",
                              "1.20% – 1.50%",
                              "2.2x Higher Potash",
                              "Improves drought tolerance and grain weight"
                        ],
                        [
                              "Total Organic Carbon (OC)",
                              "10.5% – 14.0%",
                              "22.5% – 28.0%",
                              "2x Organic Carbon",
                              "Rebuilds long-term topsoil humus layer"
                        ],
                        [
                              "Carbon-to-Nitrogen Ratio",
                              "25:1 – 35:1 (Slow)",
                              "12:1 – 15:1 (Optimal)",
                              "Immediate Bio-Availability",
                              "Prevents soil nitrogen immobilization"
                        ]
                  ]
            },
            "takeaways": [
                  "Construct shaded vermicompost beds on elevated ground to prevent waterlogging during heavy monsoon rains.",
                  "Maintain bedding moisture at 65% and shade temperatures below 32°C to prevent earthworm heat mortality.",
                  "Never add citrus peels, onion wastes, or fresh undiluted cattle dung that can burn delicate earthworm skin.",
                  "Spray 5% diluted vermiwash during crop flowering to stimulate fruit set and repel sucking aphids.",
                  "Sieve harvested vermicast through a 3 mm screen to recycle juvenile earthworms and cocoons back into fresh beds."
            ],
            "faqs": [
                  {
                        "q": "How much vermicast is recommended per acre for cereal crops?",
                        "a": "Apply 1.5 to 2.0 tons per acre as a basal soil dressing before final harrowing. For vegetable crops, apply 2.5 tons per acre in split doses."
                  },
                  {
                        "q": "How long does one vermicomposting bed cycle take to complete?",
                        "a": "A standard 10ft x 3ft x 2ft bed stocked with 2,000 adult earthworms processes one ton of pre-decomposed biomass in 45 to 60 days."
                  },
                  {
                        "q": "Can vermiwash be used through drip irrigation systems?",
                        "a": "Yes. Filter vermiwash through a 100-mesh nylon filter and inject at a rate of 20 litres per acre through the Venturi unit twice monthly."
                  }
            ]
      },
      "indigenous-cattle-farming": {
            "lead": "Modern specialized monocultures have artificially separated animal husbandry from crop production. In regenerative agricultural ecosystems, indigenous Bos indicus cattle (such as Kangayam, Gir, and Red Sindhi) act as biological bioreactors. A single indigenous cow provides sufficient daily dung and urine to fertilize 30 acres of diverse farmland through fermented Jeevamrutham and Beejamrutham formulations.",
            "sections": [
                  {
                        "heading": "The Microbiological Superiority of Bos indicus Rumen Flora",
                        "body": "Unlike exotic European cattle breeds, hump-backed indigenous desi cows possess distinct rumen microorganisms that synthesize probiotic enzymes, sulfur compounds, and trace humic substances. Analysis reveals that fresh desi cow dung contains over 300 million beneficial bacteria per gram, including nitrogen-fixing Azotobacter and phosphorus-solubilizing Bacillus strains that thrive in tropical soil conditions.",
                        "tip": "Always utilize fresh dung from hump-backed desi cattle for bio-fermentations to maximize bacterial vitality."
                  },
                  {
                        "heading": "Low-Cost Shed Design, Urine Collection & Biomass Bedding",
                        "body": "A productive integrated livestock system requires smart shed engineering. Floors are laid with a 1:40 slope leading to a stone-lined, covered collection gutter draining into HDPE collection drums. Daily urine (5 to 8 litres per animal) is captured with zero loss, while shredded dry paddy straw bedding absorbs animal droppings to create high-carbon compost bedding.",
                        "tip": "Cover urine collection tanks tightly; exposed cow urine loses up to 40% of its nitrogen through ammonia volatilization."
                  },
                  {
                        "heading": "Formulating Cow-Dung Seed Pelleting (Beejamrutham)",
                        "body": "Before sowing, seeds are pelleted with Beejamrutham: a natural slurry composed of 5 kg fresh cow dung, 5 litres cow urine, 50 grams slaked lime, and a handful of fertile ant-hill soil mixed in 20 litres of water. This biological coating protects emerging seedlings from soil-borne Rhizoctonia root rot, promotes uniform germination, and accelerates early root establishment.",
                        "tip": "Air-dry pelleted seeds in shade for 2 hours before sowing; never expose coated seeds to direct sunlight."
                  },
                  {
                        "heading": "A2 Milk, Ghee & Cooperative Dairy Value Chains",
                        "body": "Beyond agricultural inputs, indigenous cows produce premium A2 beta-casein milk that is naturally easier to digest. GreenRoots supports member dairy farmers with traditional wooden churn bilona equipment to produce certified pure A2 cow ghee, which commands prices upwards of ₹1,800 to ₹2,200 per litre in health-conscious urban markets.",
                        "tip": "Join the GreenRoots A2 Dairy Cooperative to access certified cold-chain collection and guaranteed premium milk pricing."
                  }
            ],
            "table": {
                  "title": "Desi Cow Bio-Formulations: Ingredients, Dosages & Application Timelines",
                  "headers": [
                        "Bio-Formulation",
                        "Primary Raw Ingredients",
                        "Fermentation Time",
                        "Application Dosage",
                        "Target Agronomic Benefit"
                  ],
                  "rows": [
                        [
                              "Beejamrutham",
                              "Cow dung, urine, lime, ant-hill soil",
                              "12 Hours",
                              "Seed slurry / 10 kg seed",
                              "Prevents soil-borne seedling damping off"
                        ],
                        [
                              "Solid Ghanajeevamrutham",
                              "Cow dung, jaggery, pulse flour",
                              "72 Hours drying",
                              "250 kg / Acre basal dressing",
                              "Provides slow-release microbial humus"
                        ],
                        [
                              "Liquid Jeevamrutham",
                              "Fresh dung, urine, jaggery, besan",
                              "48 – 72 Hours",
                              "200 Litres / Acre with water",
                              "Multiplies soil bacterial colonies and earthworms"
                        ],
                        [
                              "Panchagavya",
                              "Dung, urine, milk, curd, ghee, cane",
                              "21 Days ferment",
                              "3% Foliar spray (300 ml / 10 L)",
                              "Stimulates tillering, branching and fruit set"
                        ],
                        [
                              "Agniastra Pest Repellent",
                              "Urine, neem, tobacco, chili, garlic",
                              "Boiled & cooled",
                              "2.5% Foliar spray",
                              "Controls severe stem borers and armyworms"
                        ]
                  ]
            },
            "takeaways": [
                  "One indigenous desi cow produces sufficient daily dung and urine to sustain up to 30 acres of natural farming.",
                  "Store cow urine in closed HDPE containers away from sunlight to prevent ammonia gas loss.",
                  "Pellet all crop seeds with Beejamrutham slurry to achieve 95%+ germination viability and seedling disease immunity.",
                  "Grow high-protein fodder trees (Gliricidia, Subabul) along boundary fences to reduce purchased livestock feed costs.",
                  "Enroll indigenous cattle in the cooperative veterinary checkup program for free routine vaccinations and deworming."
            ],
            "faqs": [
                  {
                        "q": "Why are indigenous hump-backed cows preferred over exotic Jersey cows for natural farming?",
                        "a": "Desi cows possess higher concentrations of beneficial bacteria (Bacillus, Pseudomonas) and mineral-rich secretions in their dung and urine due to their evolved digestive physiology and heat tolerance."
                  },
                  {
                        "q": "How much space is needed for a simple zero-waste cattle shed?",
                        "a": "A single cow shed requires roughly 80 sq ft of covered space with a 1:40 slope towards a covered urine collection gutter."
                  },
                  {
                        "q": "Can cow urine be sprayed directly on crops without dilution?",
                        "a": "Never spray undiluted cow urine; the high ammonia concentration will scorch plant leaves. Always dilute with at least 10 parts clean water (1:10 ratio)."
                  }
            ]
      },
      "agroforestry-bund-planting": {
            "lead": "Farm boundary bunds represent between 8% to 12% of total agricultural land that typically remains unutilized or overgrown with invasive weeds. Peripheral agroforestry establishes deep-rooted timber species, multi-cut fodder trees, and perennial fruit varieties along boundary lines. This living border acts as a windbreak, moderates field microclimates, sequesters carbon, and creates a multi-lakh rupee timber retirement fund for farming families.",
            "sections": [
                  {
                        "heading": "Optimizing Species Selection for Field Boundary Lines",
                        "body": "Careful species selection ensures tree plantations do not interfere with adjacent crops. Fast-growing Malabar Neem (Melia dubia) develops a straight bole, reaches commercial maturity in 6 to 7 years, and produces high-value plywood core logs. Interspersing Melia dubia with perennial Moringa (PKM 1) delivers steady weekly drumstick harvests, while border teak trees (Tectona grandis) provide long-term high-value timber.",
                        "tip": "Plant Malabar Neem saplings at 3-metre spacing on northern or western peripheral bunds to avoid casting heavy morning shadows."
                  },
                  {
                        "heading": "Root Pruning & Canopy Management to Prevent Crop Shading",
                        "body": "To eliminate root competition with adjacent field crops, an annual isolation trench (30 cm wide and 60 cm deep) is excavated one metre away from the tree line. This mechanically severs shallow lateral surface roots, training tree roots to plunge vertically downward. Annual lower-branch pruning up to 50% of tree height maintains an open understory that allows full sunlight to penetrate down to crops.",
                        "tip": "Conduct branch pruning during late winter (January to February) when sap flow is low and cuts heal rapidly."
                  },
                  {
                        "heading": "Microclimate Buffering & Windbreak Protection",
                        "body": "Peripheral boundary tree belts serve as living shelterbelts. Dense foliage reduces desiccating surface wind velocities by up to 45%, protecting delicate cereal and pulse crops from severe lodging during coastal monsoon depressions. Furthermore, windbreaks lower crop evapotranspiration rates, conserving 15% to 20% soil moisture in adjacent field rows.",
                        "tip": "Interplant flowering hedge bushes (such as Hibiscus and Cassia) under tree lines to shelter insect predators like hoverflies and ladybirds."
                  },
                  {
                        "heading": "Timber Harvest Valuation & GreenRoots Buy-Back Linkages",
                        "body": "At year six, a well-maintained Malabar Neem tree attains a breast-height girth of 65 to 75 cm, yielding 12 to 15 cubic feet of commercial plywood timber. GreenRoots negotiates direct buy-back agreements with certified veneer mills, guaranteeing prices between ₹5,500 and ₹7,200 per standing tree, generating ₹4,00,000 to ₹5,50,000 in timber revenue for a standard two-acre boundary perimeter.",
                        "tip": "Register tree plantations with the GreenRoots Agroforestry Cell to lock in guaranteed forward timber purchase contracts."
                  }
            ],
            "table": {
                  "title": "Field Bund Agroforestry Species: Growth Rates, Spacing & Harvest Economics",
                  "headers": [
                        "Tree Species",
                        "Primary Commercial Use",
                        "Recommended Spacing",
                        "Gestation Period",
                        "Expected Commercial Value / Tree"
                  ],
                  "rows": [
                        [
                              "Malabar Neem (Melia dubia)",
                              "Plywood & Paper Core logs",
                              "3 Metres on boundary",
                              "6 – 7 Years",
                              "₹5,500 – ₹7,200 / Tree"
                        ],
                        [
                              "Burma Teak (Tectona grandis)",
                              "Premium Furniture Timber",
                              "4 Metres on outer line",
                              "15 – 18 Years",
                              "₹28,000 – ₹38,000 / Tree"
                        ],
                        [
                              "Moringa (PKM 1)",
                              "Year-Round Vegetable Pods",
                              "2.5 Metres on inner bund",
                              "6 Months (Annual)",
                              "₹1,400 / Year (Recurring)"
                        ],
                        [
                              "Subabul (Leucaena leucocephala)",
                              "High-Protein Cattle Fodder",
                              "1.5 Metres hedge line",
                              "3 Months (Multi-cut)",
                              "Cuts cattle feed cost by 35%"
                        ],
                        [
                              "Sesbania grandiflora (Agathi)",
                              "Betelvine shade & green fodder",
                              "2 Metres interval",
                              "4 Months (Continuous)",
                              "₹650 / Year in cut fodder"
                        ]
                  ]
            },
            "takeaways": [
                  "Plant timber saplings strictly on external boundaries oriented North-South to minimize morning and evening crop shading.",
                  "Dig a 1-foot isolation trench between boundary tree lines and crop beds to prevent tree roots from stealing crop nutrients.",
                  "Prune side branches up to 50% tree height during the first 3 years to produce straight, knot-free commercial timber logs.",
                  "Water saplings during the first two summers using low-cost gravity drip tubing connected to the main field line.",
                  "Register tree plantations with the District Forest Office through GreenRoots to secure hassle-free felling and transit permits."
            ],
            "faqs": [
                  {
                        "q": "Will deep tree roots compete with paddy or vegetable crops for water?",
                        "a": "Not when deep tap-root species (such as Melia dubia and Teak) are planted and an isolation trench is maintained 1 metre from the crop row."
                  },
                  {
                        "q": "How many timber trees can be planted along the boundary of a one-acre field?",
                        "a": "A standard one-acre square field has a perimeter of roughly 260 metres. Spaced at 3-metre intervals, you can comfortably plant 75 to 80 trees."
                  },
                  {
                        "q": "What legal clearances are required to fell and sell Malabar Neem trees in India?",
                        "a": "In most southern states including Tamil Nadu, Melia dubia is exempted from the Timber Transit Rules, permitting harvest and transport without forest department permits."
                  }
            ]
      },
      "biological-water-harvesting": {
            "lead": "Erratic climate patterns increasingly bring extreme torrential cloudbursts followed by prolonged droughts. Excavating lined on-farm ponds (Kuttais) and continuous contour percolation trenches captures excess monsoon overland runoff. Storing 1.5 million litres of rainwater on a five-acre holding provides vital emergency protective irrigation while recharging surrounding borewells within a 500-metre radius.",
            "sections": [
                  {
                        "heading": "Site Selection, Catchment Area Ratios & Contour Mapping",
                        "body": "A dependable farm pond requires precise topographic placement. GreenRoots watershed engineers utilize drone elevation models to map natural drainage lines, locating ponds at the lowest convergence points. Sizing follows a 1:10 catchment ratio (a 0.5-acre pond captures runoff from 5 acres of agricultural catchment), designed with 1:1.5 embankment side slopes to prevent bank collapse.",
                        "tip": "Ensure the inlet channel includes an earthen silt trap pit to settle coarse sands before water enters the main pond basin."
                  },
                  {
                        "heading": "Low-Cost Pond Lining: Bentonite Clay vs. UV Geotextile Tarpaulins",
                        "body": "In permeable sandy soils, water seepage can drain stored water within weeks. In heavy clay soils, natural puddling with a 5 cm layer of bentonite clay creates an impermeable seal at minimal expense. In porous or gravelly loams, installing 500-micron multilayer UV-stabilized geomembrane tarpaulins (IS 15351 certified) provides 100% seepage protection for over 12 years.",
                        "tip": "Anchor geomembrane tarpaulins securely in a 45 cm deep trench along the pond embankment crest backfilled with packed earth."
                  },
                  {
                        "heading": "Integrated Aquaculture & Bio-Filter Perimeter Plantings",
                        "body": "An on-farm pond serves multiple biological functions. Stocking freshwater fish fingerlings (such as Catla, Rohu, and Grass Carp) at 800 fingerlings per 1,000 m³ eliminates mosquito larvae and algae while converting water into nutrient-rich fish effluent. Planting vetiver grass along perimeter bunds binds soil embankments against heavy monsoon wave erosion.",
                        "tip": "Vetiver roots plunge 3 metres deep within 12 months, creating a living root barrier that prevents embankment blowouts."
                  },
                  {
                        "heading": "Solar Low-Lift Pumping & Micro-Sprinkler Connectivity",
                        "body": "Pond water is pumped using energy-efficient 2 HP solar DC surface monobloc pumps. Connected to portable micro-sprinklers or low-pressure drip laterals, stored rainwater delivers two life-saving supplemental irrigations during critical grain filling or pod formation stages, saving summer crops from catastrophic drought failures.",
                        "tip": "Floating pump intake strainers suspended 30 cm below the water surface draw clean water without sucking bottom mud."
                  }
            ],
            "table": {
                  "title": "Farm Pond Specifications, Capacity & Protective Irrigation Benchmarks",
                  "headers": [
                        "Pond Dimensions (Top x Bottom x Depth)",
                        "Total Water Storage",
                        "Catchment Area Needed",
                        "Protective Irrigation Capacity",
                        "Groundwater Recharge Footprint"
                  ],
                  "rows": [
                        [
                              "20m x 20m x 3.0m (Standard)",
                              "1,200,000 Litres (1,200 m³)",
                              "3 to 5 Acres",
                              "2 Life-saving irrigations for 5 acres",
                              "Recharges borewells within 300m"
                        ],
                        [
                              "30m x 30m x 3.5m (Community)",
                              "3,150,000 Litres (3,150 m³)",
                              "8 to 12 Acres",
                              "Complete summer vegetable crop (3 acres)",
                              "Recharges village wells within 800m"
                        ],
                        [
                              "15m x 15m x 2.5m (Smallholder)",
                              "560,000 Litres (560 m³)",
                              "1.5 to 2.5 Acres",
                              "1 Life-saving irrigation for 2.5 acres",
                              "Prevents local topsoil run-off"
                        ],
                        [
                              "Contour Percolation Trenches",
                              "In-situ ground absorption",
                              "Continuous bunds",
                              "Increases soil moisture by 25%",
                              "Elevates regional water table by 2–4m"
                        ]
                  ]
            },
            "takeaways": [
                  "Locate farm ponds at the lowest natural gradient point of your holding where natural surface runoff converges.",
                  "Install a stone-pitched silt trap inlet chamber to settle heavy mud sediments before water enters the main reservoir.",
                  "Line pond banks with vetiver grass (Chrysopogon zizanioides) to stabilize soil embankments against monsoon wave erosion.",
                  "Stock 500 grass carp fingerlings per 1,000 m³ to consume aquatic weeds and convert water into nutrient-rich natural fertilizer.",
                  "Apply for the 50% capital subsidy on farm pond excavation through the National Mission for Sustainable Agriculture (NMSA)."
            ],
            "faqs": [
                  {
                        "q": "How much does it cost to excavate a standard 20m x 20m x 3m farm pond?",
                        "a": "Using mechanical JCB excavators, basic earthwork costs approximately ₹38,000 to ₹45,000, of which up to 50% is subsidised under government watershed schemes."
                  },
                  {
                        "q": "How do I stop stored pond water from evaporating during hot summer months?",
                        "a": "Plant neem or pongamia shade trees on the southern and western banks of the pond, and cultivate non-invasive water lilies or floating azolla mats over 30% of the surface area."
                  },
                  {
                        "q": "Can pond water be pumped directly through drip irrigation laterals?",
                        "a": "Yes, but you must pass the water through a dual filtration system (gravel sand filter followed by a 120-mesh disc filter) to remove suspended algae."
                  }
            ]
      },
      "honeybee-pollination-yield": {
            "lead": "Insect pollinators are the unsung heroes of agricultural productivity. Over 75% of flowering food crops—including oilseeds, pulses, cucurbits, and fruit orchards—rely on active insect cross-pollination for effective ovary fertilization and seed set. Installing domesticated Indian honeybee colonies (Apis cerana indica) within farm clusters elevates crop yields by 20% to 35%, reduces misshapen fruits, and yields premium raw floral honey.",
            "sections": [
                  {
                        "heading": "The Pollination Economics of Apis cerana indica",
                        "body": "Wild pollinator populations have crashed due to indiscriminate synthetic chemical spraying and habitat destruction. Domesticated Indian honeybees (Apis cerana indica) are docile, highly adaptable to tropical farm conditions, and can be easily managed in movable-frame Newton bee boxes. A healthy colony containing 25,000 worker bees makes thousands of pollination foraging flights daily within a 500-metre radius.",
                        "tip": "Install 3 to 4 active bee boxes per acre of cross-pollinated crops (sesame, sunflower, cucumbers, watermelons)."
                  },
                  {
                        "heading": "Strategic Hive Density & Placement Guidelines",
                        "body": "Beehive placement directly affects foraging efficiency. Boxes should be mounted on ant-proof iron stands coated with grease, placed under dappled tree shade, and elevated 45 cm above ground level. Hive flight entrances should face East or South-East to receive the first morning sun rays, encouraging worker bees to commence foraging flights early when flower stigma receptivity peaks.",
                        "tip": "Provide a clean, shallow water basin with floating wooden floats nearby so bees can drink without drowning."
                  },
                  {
                        "heading": "Chemical Pesticide Protection & Farm Sanctuary Protocols",
                        "body": "Synthetic pesticides (especially neonicotinoids like imidacloprid and organophosphates) cause lethal bee disorientation and instant colony collapse. GreenRoots member clusters establish chemical-free apiary sanctuary zones. When botanical pest sprays (like Neem Seed Kernel Extract) are necessary, applications are carried out strictly after 5:00 PM when bees have safely returned to the hive.",
                        "tip": "Never apply any foliar sprays during peak morning hours (7:00 AM – 11:00 AM) when pollinator flight activity is highest."
                  },
                  {
                        "heading": "Cooperative Honey Extraction, Moisture Testing & Direct Sales",
                        "body": "Honey is harvested hygienically using stainless-steel centrifugal extractors that spin raw honey out of honeycomb cells without damaging the delicate wax comb foundation. The empty frames are immediately returned to the hive for bees to refill. Harvested honey is tested for moisture (<18%) and packaged raw without ultra-filtering or pasteurization, retailing at ₹650 per kg.",
                        "tip": "Only harvest honey from sealed, capped honeycomb super frames; uncapped nectar has high moisture and ferments in storage."
                  }
            ],
            "table": {
                  "title": "Crop Yield Increase & Fruit Quality Impact from Honeybee Pollination",
                  "headers": [
                        "Crop Variety",
                        "Pollination Dependency",
                        "Recommended Hives / Acre",
                        "Average Yield Increase (%)",
                        "Quality Improvement Parameter"
                  ],
                  "rows": [
                        [
                              "Sesame / Gingelly (TMV 7)",
                              "High Cross-Pollination",
                              "3 Bee Boxes / Acre",
                              "+24% Seed Weight Gain",
                              "Higher oil recovery (+2.8%)"
                        ],
                        [
                              "Watermelon & Cucurbits",
                              "Essential (Separate flowers)",
                              "4 Bee Boxes / Acre",
                              "+35% Marketable Fruit",
                              "Eliminates curved/crooked deformed fruits"
                        ],
                        [
                              "Sunflower (Hybrid CO 2)",
                              "Obligate (Self-incompatible)",
                              "4 Bee Boxes / Acre",
                              "+32% Seed Set Rate",
                              "Zero hollow empty seeds in centre disc"
                        ],
                        [
                              "Mustard & Oilseeds",
                              "High Cross-Pollination",
                              "3 Bee Boxes / Acre",
                              "+26% Pod Formation",
                              "Higher test weight per 1,000 seeds"
                        ],
                        [
                              "Guava & Citrus Orchards",
                              "Moderate to High",
                              "2 Bee Boxes / Acre",
                              "+22% Fruit Retention",
                              "Larger fruit size and uniform brix sweetness"
                        ]
                  ]
            },
            "takeaways": [
                  "Install Newton bee boxes on ant-proof greased stands placed under tree shade facing morning sunlight.",
                  "Provide a clean shallow water source with floating wooden twigs nearby so bees can drink without drowning.",
                  "Coordinate with neighbouring farmers: never spray chemical pesticides within a 1-kilometre radius of active apiaries.",
                  "Feed bees 1:1 clean sugar syrup during non-flowering monsoon months to maintain colony strength and prevent queen absconding.",
                  "Harvest honey only from sealed honeycomb supers using centrifugal extractors to preserve comb foundation frames."
            ],
            "faqs": [
                  {
                        "q": "How much honey can a single Apis cerana indica bee box produce per year?",
                        "a": "In agricultural regions with diversified seasonal flowering crops, one healthy colony produces between 8 kg to 15 kg of pure multi-flora honey annually."
                  },
                  {
                        "q": "Do honeybees sting farm labourers working in the field?",
                        "a": "Apis cerana indica is very gentle. Workers can comfortably weed and harvest crops just 3 metres away without protective equipment as long as the hive is not bumped."
                  },
                  {
                        "q": "Where can GreenRoots members receive practical beekeeping training?",
                        "a": "GreenRoots conducts hands-on two-day apiculture certificate courses every month at our Thanjavur Training Centre, providing subsidized starter bee colonies and toolkits."
                  }
            ]
      },
      "cold-chain-perishables": {
            "lead": "Perishable horticulture crops—including tomatoes, green chilies, bell peppers, and fresh greens—suffer up to 30% physical spoilage and distress price discounting when ambient summer temperatures exceed 36°C. Installing decentralized solar-powered micro-cold rooms at village collection depots extends crop shelf life from 2 days to over 3 weeks, giving smallholder farmer groups complete leverage to wait for favorable market prices.",
            "sections": [
                  {
                        "heading": "Thermal Storage vs. Chemical Battery Storage",
                        "body": "Traditional refrigerated rooms depend on unreliable rural electrical grids and high-maintenance lead-acid battery banks that fail after three years. GreenRoots installs innovative solar cold rooms equipped with Phase Change Material (PCM) thermal energy storage. Cold energy generated by rooftop solar panels during peak daylight is stored in thermal wax cassettes that release cold continuously for 30 hours overnight without electricity.",
                        "tip": "Maintain solar cold room temperatures between 8°C and 12°C for optimal vegetable firmness and energy efficiency."
                  },
                  {
                        "heading": "Pre-Cooling & Relative Humidity (RH) Control",
                        "body": "Freshly harvested produce carries high internal field heat that accelerates cellular respiration and moisture loss. Loaded crops must be pre-cooled within two hours of harvest. Equipped with ultrasonic mist humidifiers, the cold chamber maintains 90% to 95% relative humidity, preventing transpiration shrinkage and keeping vegetables crisp and glossy.",
                        "tip": "Never place warm vegetables inside sealed airtight bags before cold room loading; use ventilated plastic crates."
                  },
                  {
                        "heading": "Commodity Compatibility & Ethylene Segregation",
                        "body": "Different vegetables have distinct temperature tolerances and gaseous interactions. Ethylene-sensitive crops (cucumbers, green chilies, leafy greens) must be stored in separate chambers from ethylene-emitting ripe fruits (bananas, papayas, mangoes). Storing them together induces rapid yellowing, bitterness, and premature decay.",
                        "tip": "Check the GreenRoots Cold Storage Compatibility Chart displayed on every village cold room entrance."
                  },
                  {
                        "heading": "Cooperative Cold Chain Logistics to Metropolitan Retailers",
                        "body": "Pre-cooled vegetables are aggregated into refrigerated reefer vans operated by GreenRoots Logistics, maintaining unbroken 10°C cold chains during the 6-hour journey to Chennai, Bengaluru, and Coimbatore retail distribution centres. This direct farm-to-shelf cold link eliminates 3 intermediary handlers and delivers 35% higher prices back to growers.",
                        "tip": "Book crate storage slots in advance via the GreenRoots app to ensure collection transport coordination."
                  }
            ],
            "table": {
                  "title": "Horticultural Produce Shelf Life: Ambient Room Temperature vs. Solar Cold Room",
                  "headers": [
                        "Horticulture Commodity",
                        "Optimal Cold Temp (°C)",
                        "Optimal Humidity (RH)",
                        "Ambient Shelf Life (32°C)",
                        "Solar Cold Room Shelf Life"
                  ],
                  "rows": [
                        [
                              "Fresh Tomatoes (Green Mature)",
                              "10°C – 12°C",
                              "88% – 92%",
                              "3 – 4 Days (Over-ripens)",
                              "21 – 28 Days (Crisp Firm)"
                        ],
                        [
                              "Green Chilies (Export Grade)",
                              "8°C – 10°C",
                              "90% – 95%",
                              "2 – 3 Days (Shrivels/Red)",
                              "18 – 24 Days (Glossy Green)"
                        ],
                        [
                              "Bell Peppers / Capsicum",
                              "7°C – 9°C",
                              "92% – 95%",
                              "3 – 4 Days (Soft skin)",
                              "21 – 25 Days (Export Quality)"
                        ],
                        [
                              "Spinach & Fresh Leafy Greens",
                              "2°C – 4°C",
                              "95% – 98%",
                              "1 Day (Severe wilting)",
                              "8 – 12 Days (Farm Fresh)"
                        ],
                        [
                              "Okra / Lady’s Finger",
                              "9°C – 11°C",
                              "90% – 95%",
                              "2 Days (Blackening tips)",
                              "10 – 14 Days (Tender Green)"
                        ]
                  ]
            },
            "takeaways": [
                  "Harvest perishable vegetables in early morning hours (6:00 AM – 9:00 AM) to minimize internal field heat before cold room loading.",
                  "Stack produce inside perforated food-grade plastic crates rather than sealed plastic bags to allow cold air circulation.",
                  "Keep tomato storage temperature strictly between 10°C to 12°C to prevent chilling injury and loss of aroma.",
                  "Maintain cold room relative humidity above 90% by installing ultrasonic cold foggers to prevent produce weight loss.",
                  "Book cold room crate storage through the GreenRoots mobile portal at a nominal member charge of ₹1.50 per crate per day."
            ],
            "faqs": [
                  {
                        "q": "How does a solar cold room operate overnight when there is no sunshine?",
                        "a": "The system charges a thermal energy storage (TES) phase change material bank during peak daylight hours. At night, stored thermal cooling keeps the room between 4°C to 10°C for up to 30 continuous hours without sunshine."
                  },
                  {
                        "q": "Can smallholder farmers store just 5 to 10 crates, or is it strictly bulk storage?",
                        "a": "The GreenRoots village cold hub operates on a per-crate basis. A farmer can store even a single crate of tomatoes or chilies for a few days to avoid distress price dumps."
                  },
                  {
                        "q": "What is the daily storage fee for FPC members?",
                        "a": "Member farmers pay just ₹1.50 per 20 kg crate per day, while non-members pay ₹3.00 per crate. Electricity is 100% solar-generated."
                  }
            ]
      }
};

    var art = customArticles[p.slug] || customArticles['seasonal-crop-planning'];

    if (bdBody) {
      var bodyHtml = '<div class="lead-box p-4 rounded-4 bg-light border mb-5"><p class="lead mb-0 text-secondary lh-lg">' + art.lead + '</p></div>';

      bodyHtml += (art.sections || []).map(function (s, i) {
        var secHtml = '<section class="mb-5">' +
          '<h2 id="s' + i + '" class="h3 mb-3 text-heading fw-bold">' + s.heading + '</h2>' +
          '<div class="article-section-body mb-3 text-secondary lh-lg fs-6">' + s.body + '</div>';
        
        if (s.tip) {
          secHtml += '<div class="p-3 my-4 rounded-3 border-start border-4 border-success bg-light d-flex gap-3 align-items-center shadow-sm">' +
            '<i class="bi bi-lightbulb-fill text-success fs-4 flex-shrink-0"></i>' +
            '<div class="small mb-0 text-secondary"><strong>Agronomist Field Tip:</strong> ' + s.tip + '</div>' +
          '</div>';
        }

        if (i === 1 && p.img) {
          secHtml += '<div class="img-frame my-4 ratio ratio-16x9 rounded-4 overflow-hidden shadow border">' +
            '<img loading="lazy" src="' + p.img + '" alt="' + s.heading + '" class="w-100 h-100 object-cover">' +
          '</div>';
        }

        secHtml += '</section>';
        return secHtml;
      }).join('');

      // Add Data Table if present
      if (art.table) {
        bodyHtml += '<section class="mb-5">' +
          '<h3 class="h4 mb-3 text-heading fw-bold"><i class="bi bi-table text-primary me-2"></i>' + (art.table.title || 'Agronomic Benchmark Data') + '</h3>' +
          '<div class="table-responsive rounded-4 border shadow-sm mb-4">' +
            '<table class="table table-hover align-middle mb-0">' +
              '<thead class="table-light">' +
                '<tr>' + (art.table.headers || []).map(function (h) { return '<th class="py-3 px-3 fw-semibold small text-uppercase">' + h + '</th>'; }).join('') + '</tr>' +
              '</thead>' +
              '<tbody>' +
                (art.table.rows || []).map(function (r) {
                  return '<tr>' + r.map(function (c, ci) {
                    return '<td class="py-3 px-3 ' + (ci === 0 ? 'fw-bold text-dark' : 'text-secondary') + '">' + c + '</td>';
                  }).join('') + '</tr>';
                }).join('') +
              '</tbody>' +
            '</table>' +
          '</div>' +
        '</section>';
      }

      // Add Key Takeaways
      if (art.takeaways && art.takeaways.length) {
        bodyHtml += '<div class="p-4 rounded-4 bg-light border my-5 shadow-sm">' +
          '<h3 class="h4 mb-3 text-primary fw-bold"><i class="bi bi-check2-circle me-2"></i>Key Farmer Action Takeaways</h3>' +
          '<ul class="ticks mb-0 ps-3">' +
            art.takeaways.map(function (t) { return '<li class="mb-2 text-secondary">' + t + '</li>'; }).join('') +
          '</ul>' +
        '</div>';
      }

      // Add FAQ Accordion if present
      if (art.faqs && art.faqs.length) {
        bodyHtml += '<section class="mb-5">' +
          '<h3 class="h4 mb-3 text-heading fw-bold"><i class="bi bi-question-circle text-primary me-2"></i>Frequently Asked Agronomic Questions</h3>' +
          '<div class="accordion accordion-flush rounded-4 border overflow-hidden shadow-sm" id="blogFaqAccordion">' +
            art.faqs.map(function (faq, fi) {
              var fid = 'bfaq' + fi;
              return '<div class="accordion-item">' +
                '<h2 class="accordion-header" id="heading' + fid + '">' +
                  '<button class="accordion-button ' + (fi === 0 ? '' : 'collapsed') + ' fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#collapse' + fid + '" aria-expanded="' + (fi === 0 ? 'true' : 'false') + '" aria-controls="collapse' + fid + '">' +
                    faq.q +
                  '</button>' +
                '</h2>' +
                '<div id="collapse' + fid + '" class="accordion-collapse collapse ' + (fi === 0 ? 'show' : '') + '" aria-labelledby="heading' + fid + '" data-bs-parent="#blogFaqAccordion">' +
                  '<div class="accordion-body text-secondary lh-base">' +
                    faq.a +
                  '</div>' +
                '</div>' +
              '</div>';
            }).join('') +
          '</div>' +
        '</section>';
      }

      // Advisory Helpline CTA
      bodyHtml += '<div class="p-4 rounded-4 my-5 border bg-primary bg-opacity-10 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 shadow-sm">' +
        '<div>' +
          '<h5 class="mb-1 text-primary fw-bold"><i class="bi bi-telephone-inbound me-2"></i>Need Field Assistance for Your Crop?</h5>' +
          '<p class="mb-0 text-secondary small">Our agronomists visit member plots across 42 village clusters weekly to offer free soil and crop advisory.</p>' +
        '</div>' +
        '<a href="contact.html" class="btn btn-fpc text-nowrap flex-shrink-0"><i class="bi bi-chat-dots me-2"></i>Contact Agronomy Desk</a>' +
      '</div>';

      bdBody.innerHTML = bodyHtml;
    }

    if (bdToc) {
      bdToc.innerHTML = (art.sections || []).map(function (s, i) {
        return '<li><a href="#s' + i + '">' + s.heading + '</a></li>';
      }).join('');
    }

    if (bdRecent) {
      bdRecent.innerHTML = allPosts.slice(0, 4).map(function (x) {
        return (
          '<li>' +
            '<a href="blog-details.html?p=' + x.slug + '">' + x.title + '</a><br>' +
            '<small class="muted"><i class="bi bi-calendar3"></i> ' + x.date + '</small>' +
          '</li>'
        );
      }).join('');
    }

    if (bdRel) {
      bdRel.innerHTML = allPosts.filter(function (x) { return x.slug !== p.slug; }).slice(0, 2).map(pcard).join('');
    }

    // Social sharing links
    var pageUrl = encodeURIComponent(location.href);
    var pageTitle = encodeURIComponent(p.title);
    var shareX = $('shareX') || $('shTw');
    var shareFb = $('shareFb') || $('shFb');
    var shareLi = $('shareLi') || $('shIn');
    var shareWa = $('shareWa') || $('shWa');
    if (shareX) shareX.href = 'https://twitter.com/intent/tweet?url=' + pageUrl + '&text=' + pageTitle;
    if (shareFb) shareFb.href = 'https://www.facebook.com/sharer/sharer.php?u=' + pageUrl;
    if (shareLi) shareLi.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + pageUrl;
    if (shareWa) shareWa.href = 'https://api.whatsapp.com/send?text=' + pageTitle + '%20' + pageUrl;

    rel();
  }

  // Prevent default jump for placeholder hash anchors
  document.querySelectorAll('a[href="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
    });
  });

  // Video autoplay & error fallback to poster background
  document.querySelectorAll('video').forEach(function (v) {
    v.muted = true;
    var playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise.catch(function () {});
    }
    v.addEventListener('error', function () {
      v.style.display = 'none';
    });
  });

  // Auto-close mobile navigation menu when a link or mobile CTA is selected
  var mainNav = document.getElementById('mainNav');
  if (mainNav) {
    var closeTargets = mainNav.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item, .mobile-cta .btn');
    closeTargets.forEach(function (target) {
      target.addEventListener('click', function () {
        if (mainNav.classList.contains('show') && window.bootstrap && bootstrap.Collapse) {
          var bsCol = bootstrap.Collapse.getInstance(mainNav) || new bootstrap.Collapse(mainNav, { toggle: false });
          bsCol.hide();
        }
      });
    });
  }

})();
