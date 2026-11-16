/* Pulsedesk – small, dependency-free interactions */
(function () {
  'use strict';

  var body = document.body;
  var navbar = document.querySelector('.navbar');
  var toggle = document.querySelector('.menu-toggle');
  var navLinks = document.querySelectorAll('.nav__link');

  /* ---------- Mobile menu ---------- */
  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', function () {
    setMenu(!body.classList.contains('menu-open'));
  });
  document.querySelectorAll('.nav a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });
  window.matchMedia('(min-width: 821px)').addEventListener('change', function (e) {
    if (e.matches) setMenu(false);
  });

  /* ---------- Navbar shadow + back-to-top button ---------- */
  var toTop = document.getElementById('to-top');
  function onScroll() {
    var y = window.scrollY;
    navbar.classList.toggle('is-scrolled', y > 8);
    toTop.hidden = y < 600;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Highlight the nav link of the section in view ---------- */
  var sections = Array.prototype.map.call(navLinks, function (link) {
    return document.querySelector(link.getAttribute('href'));
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { if (s) observer.observe(s); });
  }

  /* ---------- Pricing: monthly / yearly toggle ---------- */
  var billingButtons = document.querySelectorAll('.billing__btn');
  var amounts = document.querySelectorAll('.price__amount[data-monthly]');

  billingButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var period = btn.dataset.period;
      billingButtons.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      amounts.forEach(function (el) { el.textContent = el.dataset[period]; });
    });
  });

  /* ---------- Buttons with data-plan pre-select the plan in the form ---------- */
  var planSelect = document.getElementById('plan');
  document.querySelectorAll('a[data-plan]').forEach(function (a) {
    a.addEventListener('click', function () {
      planSelect.value = a.dataset.plan || '';
    });
  });

  /* ---------- Demo request form: validation + success message ---------- */
  var form = document.getElementById('demo-form');
  var fields = document.getElementById('form-fields');
  var success = document.getElementById('form-success');
  var successText = document.getElementById('success-text');
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setError(input, message) {
    var field = input.closest('.field');
    var out = field.querySelector('.error');
    field.classList.toggle('has-error', Boolean(message));
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    out.textContent = message || '';
  }

  function validate(input) {
    var value = input.value.trim();
    var message = '';

    if (input.id === 'name') {
      if (!value) message = 'Please enter your name.';
      else if (value.length < 2) message = 'Name must be at least 2 characters.';
    } else if (input.id === 'email') {
      if (!value) message = 'Please enter your work email.';
      else if (!emailPattern.test(value)) message = 'Enter a valid email, e.g. jane@company.com.';
    } else if (input.id === 'size') {
      if (!value) message = 'Please choose your team size.';
    }

    setError(input, message);
    return !message;
  }

  var required = form.querySelectorAll('#name, #email, #size');

  required.forEach(function (input) {
    input.addEventListener('blur', function () { validate(input); });
    input.addEventListener('input', function () {
      if (input.closest('.field').classList.contains('has-error')) validate(input);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var firstInvalid = null;
    required.forEach(function (input) {
      if (!validate(input) && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) { firstInvalid.focus(); return; }

    // No backend: show the success state instead of sending data.
    var first = document.getElementById('name').value.trim().split(' ')[0];
    successText.textContent = 'Thanks, ' + first + '! We’ve received your request and will email you within one business day.';
    fields.hidden = true;
    success.hidden = false;
    success.focus && success.setAttribute('tabindex', '-1');
    success.focus();
  });

  document.getElementById('form-reset').addEventListener('click', function () {
    form.reset();
    required.forEach(function (input) { setError(input, ''); });
    success.hidden = true;
    fields.hidden = false;
    document.getElementById('name').focus();
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
