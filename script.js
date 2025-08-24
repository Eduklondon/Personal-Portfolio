document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  const togglePasswordBtn = document.getElementById('toggle-password');
  const submitButton = document.getElementById('submit-button');
  const yearSpan = document.getElementById('year');

  if (yearSpan) yearSpan.textContent = new Date().getFullYear().toString();

  function setFieldError(inputEl, errorEl, message) {
    inputEl.setAttribute('aria-invalid', 'true');
    errorEl.textContent = message;
  }

  function clearFieldError(inputEl, errorEl) {
    inputEl.removeAttribute('aria-invalid');
    errorEl.textContent = '';
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    if (!value) {
      setFieldError(emailInput, emailError, 'Informe o e-mail.');
      return false;
    }
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!isValid) {
      setFieldError(emailInput, emailError, 'E-mail inválido.');
      return false;
    }
    clearFieldError(emailInput, emailError);
    return true;
  }

  function validatePassword() {
    const value = passwordInput.value;
    if (!value) {
      setFieldError(passwordInput, passwordError, 'Informe a senha.');
      return false;
    }
    if (value.length < 6) {
      setFieldError(passwordInput, passwordError, 'A senha deve ter pelo menos 6 caracteres.');
      return false;
    }
    clearFieldError(passwordInput, passwordError);
    return true;
  }

  emailInput.addEventListener('blur', validateEmail);
  passwordInput.addEventListener('blur', validatePassword);

  togglePasswordBtn.addEventListener('click', () => {
    const revealed = passwordInput.getAttribute('type') === 'text';
    passwordInput.setAttribute('type', revealed ? 'password' : 'text');
    togglePasswordBtn.setAttribute('aria-pressed', (!revealed).toString());
    togglePasswordBtn.setAttribute('aria-label', revealed ? 'Mostrar senha' : 'Ocultar senha');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const okEmail = validateEmail();
    const okPass = validatePassword();
    if (!okEmail || !okPass) return;

    submitButton.disabled = true;
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Entrando...';

    try {
      await new Promise((r) => setTimeout(r, 800));
      console.log('Login simulado com sucesso');
      form.reset();
    } catch (err) {
      console.error(err);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
});