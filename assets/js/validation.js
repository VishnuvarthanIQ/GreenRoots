/**
 * GreenRoots Producer Company Universal Form Validation
 * Real-time character sanitization & strict validation across all forms:
 * - Name: English letters (A-Z, a-z) & spaces only, no digits/symbols, rejects all-whitespace
 * - Mobile: 10 digits only, starting with 6-9, strictly blocks non-digits & caps at 10 digits
 * - Email: Strict format check
 * - Required fields: Prevents empty or whitespace-only submissions
 */
(function () {
  'use strict';

  var modalEl = document.getElementById('successModal');

  function getFeedback(el) {
    var parent = el.parentElement;
    var fb = parent.querySelector('.invalid-feedback');
    if (!fb) {
      fb = document.createElement('div');
      fb.className = 'invalid-feedback';
      parent.appendChild(fb);
    }
    return fb;
  }

  function setFeedback(el, error) {
    var fb = getFeedback(el);
    fb.textContent = error || '';
    if (error) {
      el.classList.add('is-invalid');
      el.classList.remove('is-valid');
      el.setAttribute('aria-invalid', 'true');
    } else {
      el.classList.remove('is-invalid');
      if (el.value.trim().length > 0) {
        el.classList.add('is-valid');
      } else {
        el.classList.remove('is-valid');
      }
      el.removeAttribute('aria-invalid');
    }
  }

  function validateField(el) {
    var raw = el.value || '';
    var v = raw.trim();
    var rule = el.dataset.rule;
    var type = el.type ? el.type.toLowerCase() : '';
    var isName = rule === 'name' || el.name === 'cName' || el.name === 'bName' || el.name === 'mName' || el.name === 'eName';
    var isMobile = rule === 'mobile' || el.name === 'cMob' || el.name === 'bMob' || el.name === 'mMob' || el.name === 'eMob' || type === 'tel';
    var error = '';

    // Check required
    if (el.required && (!v || (type === 'checkbox' && !el.checked))) {
      error = el.tagName === 'SELECT' ? 'Please select an option.' : 'This field is required.';
      setFeedback(el, error);
      return false;
    }

    if (!v) {
      // Optional and empty
      setFeedback(el, '');
      return true;
    }

    // Name field validation
    if (isName) {
      if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(v)) {
        error = 'Name must contain only English letters and spaces (e.g. Ramesh Kumar).';
      } else if (v.length < 2) {
        error = 'Name must be at least 2 characters long.';
      } else if (v.length > 50) {
        error = 'Name cannot exceed 50 characters.';
      }
    }
    // Mobile field validation
    else if (isMobile) {
      if (!/^\d+$/.test(v)) {
        error = 'Mobile number must contain digits only.';
      } else if (v.length !== 10) {
        error = 'Mobile number must be exactly 10 digits (e.g. 9876543210).';
      } else if (!/^[6-9]/.test(v)) {
        error = 'Indian mobile numbers must start with 6, 7, 8, or 9.';
      }
    }
    // Email field validation
    else if (type === 'email' || el.name === 'cEmail' || el.name === 'bEmail' || el.name === 'mEmail') {
      var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(v)) {
        error = 'Enter a valid email address (e.g. user@example.com).';
      }
    }
    // Number min/max check
    else if (type === 'number') {
      var num = parseFloat(v);
      if (isNaN(num)) {
        error = 'Please enter a valid number.';
      } else if (el.min && num < parseFloat(el.min)) {
        error = 'Value must be at least ' + el.min + '.';
      } else if (el.max && num > parseFloat(el.max)) {
        error = 'Value cannot exceed ' + el.max + '.';
      }
    }

    setFeedback(el, error);
    return !error;
  }

  // Setup input sanitization and events on a field
  function bindField(el) {
    var rule = el.dataset.rule;
    var type = el.type ? el.type.toLowerCase() : '';
    var isName = rule === 'name' || el.name === 'cName' || el.name === 'bName' || el.name === 'mName' || el.name === 'eName';
    var isMobile = rule === 'mobile' || el.name === 'cMob' || el.name === 'bMob' || el.name === 'mMob' || el.name === 'eMob' || type === 'tel';

    // 1. Strict keydown filtering to physically prevent invalid characters
    el.addEventListener('keydown', function (e) {
      // Allow control keys: backspace, delete, tab, escape, enter, arrows, home, end
      if (e.ctrlKey || e.metaKey || [8, 9, 13, 27, 35, 36, 37, 38, 39, 40, 46].indexOf(e.keyCode) !== -1) {
        return;
      }

      if (isMobile) {
        // Only allow 0-9 keys (keyCode 48-57 and numpad 96-105)
        var isDigit = (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105);
        if (!isDigit) {
          e.preventDefault();
          setFeedback(el, 'Mobile number must contain digits only.');
        } else if (el.value.length >= 10 && el.selectionStart === el.selectionEnd) {
          e.preventDefault();
          setFeedback(el, 'Mobile number is capped at 10 digits.');
        }
      } else if (isName) {
        // Block numbers and punctuation
        if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
          e.preventDefault();
          setFeedback(el, 'Numbers are not allowed in names.');
        }
      }
    });

    // 2. Strict real-time character blocking on input & paste
    el.addEventListener('input', function () {
      if (isName) {
        var cur = el.value;
        var sanitized = cur.replace(/[^A-Za-z\s]/g, '').replace(/^\s+/, '').replace(/\s{2,}/g, ' ');
        if (cur !== sanitized) {
          el.value = sanitized;
          setFeedback(el, 'Numbers and special characters are not allowed in names.');
        } else {
          validateField(el);
        }
      } else if (isMobile) {
        var curMob = el.value;
        var sanitizedMob = curMob.replace(/\D/g, '').slice(0, 10);
        if (curMob !== sanitizedMob) {
          el.value = sanitizedMob;
          setFeedback(el, 'Letters and special characters are not allowed in mobile numbers.');
        } else if (sanitizedMob.length > 0 && !/^[6-9]/.test(sanitizedMob)) {
          setFeedback(el, 'Indian mobile numbers must start with 6, 7, 8, or 9.');
        } else if (sanitizedMob.length > 0 && sanitizedMob.length < 10) {
          setFeedback(el, 'Enter full 10-digit mobile number (' + sanitizedMob.length + '/10 digits).');
        } else if (sanitizedMob.length === 10) {
          setFeedback(el, '');
        } else if (el.required && sanitizedMob.length === 0) {
          setFeedback(el, 'This field is required.');
        }
      } else {
        if (el.classList.contains('is-invalid')) {
          validateField(el);
        }
      }
    });

    // 3. Validate on blur
    el.addEventListener('blur', function () {
      validateField(el);
    });
  }

  function submitSuccess(form) {
    var msgText = form.dataset.msg || 'Submitted successfully. Our team will contact you shortly.';
    var msgEl = document.getElementById('successMsg');
    if (msgEl) {
      msgEl.textContent = msgText;
    }

    var hostModal = form.closest('.modal');
    function showModal() {
      if (modalEl && window.bootstrap && bootstrap.Modal) {
        bootstrap.Modal.getOrCreateInstance(modalEl).show();
      } else {
        alert(msgText);
      }
    }

    if (hostModal && window.bootstrap && bootstrap.Modal) {
      var bsModal = bootstrap.Modal.getInstance(hostModal);
      if (bsModal) {
        hostModal.addEventListener('hidden.bs.modal', showModal, { once: true });
        bsModal.hide();
      } else {
        showModal();
      }
    } else {
      showModal();
    }

    form.reset();
    form.querySelectorAll('.is-valid, .is-invalid').forEach(function (e) {
      e.classList.remove('is-valid', 'is-invalid');
      e.removeAttribute('aria-invalid');
    });
  }

  // Bind all forms with data-validate or class fpc-form / news-form
  function initForms() {
    var forms = document.querySelectorAll('form[data-validate], form.fpc-form, form.news-form');
    forms.forEach(function (f) {
      var fields = f.querySelectorAll('input:not([readonly]):not([type="hidden"]):not([type="submit"]):not([type="button"]), select, textarea');
      fields.forEach(bindField);

      f.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var isValid = true;
        var firstInvalid = null;

        fields.forEach(function (el) {
          if (!validateField(el)) {
            isValid = false;
            if (!firstInvalid) firstInvalid = el;
          }
        });

        if (isValid) {
          submitSuccess(f);
        } else if (firstInvalid) {
          firstInvalid.focus();
          if (firstInvalid.scrollIntoView) {
            firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      });

      f.addEventListener('reset', function () {
        fields.forEach(function (el) {
          el.classList.remove('is-invalid', 'is-valid');
          el.removeAttribute('aria-invalid');
          var fb = el.parentElement.querySelector('.invalid-feedback');
          if (fb) fb.textContent = '';
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForms);
  } else {
    initForms();
  }
})();
