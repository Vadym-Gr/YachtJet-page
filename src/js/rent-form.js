export function initRentForm() {
  const form = document.querySelector('[data-rent-form]');
  if (!form) return;
  const fields = [...form.querySelectorAll('input, textarea')];
  const status = form.querySelector('[data-rent-status]');
  let submitted = false;

  function validate(field) {
    const value = field.value.trim();
    let message = '';
    if (field.required && !value) {
      message =
        field.name === 'fullName'
          ? 'Please enter your full name.'
          : 'Please enter your email.';
    } else if (field.name === 'fullName' && value.length < 2) {
      message = 'Please enter at least two characters.';
    } else if (field.type === 'email' && field.validity.typeMismatch) {
      message = 'Please enter a valid email address.';
    } else if (field.name === 'phone' && value) {
      const digits = value.replace(/\D/g, '');
      if (
        !/^\+?[\d\s().-]+$/.test(value) ||
        digits.length < 6 ||
        digits.length > 15
      ) {
        message = 'Please enter a phone number with 6–15 digits.';
      }
    }
    if (value.length > field.maxLength && field.maxLength > 0) {
      message = `Please use no more than ${field.maxLength} characters.`;
    }
    const error = document.getElementById(`${field.id}-error`);
    field.setAttribute('aria-invalid', String(Boolean(message)));
    if (message) field.setAttribute('aria-describedby', error.id);
    else field.removeAttribute('aria-describedby');
    error.textContent = message;
    error.hidden = !message;
    return !message;
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    submitted = true;
    fields.forEach(field => {
      field.value = field.value.trim();
    });
    const invalid = fields.filter(field => !validate(field));
    status.hidden = false;
    if (invalid.length) {
      status.textContent = 'Please check the highlighted fields.';
      invalid[0].focus();
      return;
    }
    status.textContent =
      'Your details are valid. Online booking is not available yet; your request has not been sent.';
  });

  fields.forEach(field => {
    field.addEventListener('input', () => {
      status.textContent = '';
      status.hidden = true;
      if (submitted || field.getAttribute('aria-invalid') === 'true')
        validate(field);
    });
    field.addEventListener('blur', () => {
      if (submitted || field.value.trim()) validate(field);
    });
  });

  // Intercept submissions before enabling the button; no personal data is sent.
  form.noValidate = true;
  form.querySelector('[type="submit"]').disabled = false;
}
