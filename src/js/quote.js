/* Quote form: Web3Forms when a key is configured, mailto fallback otherwise. */
(function () {
  var form = document.getElementById('quote-form');
  if (!form) return;
  var status = form.querySelector('[data-status]');
  var key = form.getAttribute('data-key') || '';
  var hasKey = key && key.indexOf('YOUR_') !== 0;
  var TO = 'hello@hauspower.ca';

  var show = function (msg, isError) {
    status.innerHTML = msg;
    status.classList.add('is-visible');
    status.classList.toggle('is-error', !!isError);
  };
  var val = function (n) { var el = form.elements[n]; return el ? String(el.value || '').trim() : ''; };

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.elements.botcheck && form.elements.botcheck.checked) return;
    if (!form.checkValidity()) {
      var bad = form.querySelector(':invalid');
      show('Please complete the required fields. Check that your email address is valid.', true);
      if (bad) bad.focus();
      return;
    }
    var btn = form.querySelector('button[type="submit"]');

    if (!hasKey) {
      var body = [
        'Name: ' + val('first_name') + ' ' + val('last_name'),
        'Email: ' + val('email'),
        'Phone: ' + val('phone'),
        'Project address: ' + val('address'),
        'I am a: ' + val('role'),
        'Project type: ' + val('project_type'),
        'Timing: ' + val('timeline'),
        '',
        val('message')
      ].join('\n');
      var href = 'mailto:' + TO + '?subject=' + encodeURIComponent('Quote request: ' + val('project_type')) + '&body=' + encodeURIComponent(body);
      window.location.href = href;
      show('Your email app should open with the request filled in. If it does not, email <a class="link" href="mailto:' + TO + '">' + TO + '</a> or call <a class="link" href="tel:+15196352078">(519) 635-2078</a>.');
      return;
    }

    btn.disabled = true;
    var original = btn.innerHTML;
    btn.textContent = 'Sending...';
    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = v; });
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data)
    }).then(function (r) { return r.json(); }).then(function (res) {
      if (res && res.success) {
        form.reset();
        show('Thank you. Your request is in. Matt will be in touch shortly.');
      } else {
        throw new Error('fail');
      }
    }).catch(function () {
      show('Something went wrong sending the form. Please email <a class="link" href="mailto:' + TO + '">' + TO + '</a> or call <a class="link" href="tel:+15196352078">(519) 635-2078</a>.', true);
    }).finally(function () {
      btn.disabled = false;
      btn.innerHTML = original;
    });
  });
})();
