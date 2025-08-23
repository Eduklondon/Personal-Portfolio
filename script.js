document.addEventListener('DOMContentLoaded', () => {
	const yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = new Date().getFullYear();

	const togglePasswordBtn = document.getElementById('toggle-password');
	const passwordInput = document.getElementById('password');
	const rememberCheckbox = document.getElementById('remember');
	const form = document.getElementById('login-form');

	if (rememberCheckbox) {
		rememberCheckbox.checked = getRememberPreference();
		rememberCheckbox.addEventListener('change', (e) => {
			setRememberPreference(e.target.checked);
		});
	}

	if (togglePasswordBtn && passwordInput) {
		togglePasswordBtn.addEventListener('click', () => {
			const isHidden = passwordInput.type === 'password';
			passwordInput.type = isHidden ? 'text' : 'password';
			togglePasswordBtn.setAttribute('aria-pressed', String(isHidden));
		});
	}

	if (form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const emailGroup = form.querySelector('.form-group:nth-of-type(1)');
			const passGroup = form.querySelector('.form-group:nth-of-type(2)');
			const email = document.getElementById('email');
			const password = document.getElementById('password');

			let isValid = true;
			clearFieldError(emailGroup);
			clearFieldError(passGroup);

			if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
				showFieldError(emailGroup, 'Informe um e-mail válido.');
				isValid = false;
			}
			if (!password.value || password.value.length < 6) {
				showFieldError(passGroup, 'A senha deve ter pelo menos 6 caracteres.');
				isValid = false;
			}

			if (!isValid) return;

			const submitBtn = document.getElementById('submit-btn');
			const originalText = submitBtn.textContent;
			submitBtn.disabled = true;
			submitBtn.textContent = 'Entrando...';

			setTimeout(() => {
				submitBtn.disabled = false;
				submitBtn.textContent = originalText;
				alert('Login simulado com sucesso!');
			}, 1000);
		});
	}
});

function setRememberPreference(isRemembered) {
	try {
		localStorage.setItem('remember_me', isRemembered ? '1' : '0');
	} catch {}
}

function getRememberPreference() {
	try {
		return localStorage.getItem('remember_me') === '1';
	} catch { return false; }
}

function showFieldError(groupEl, message) {
	groupEl.classList.add('form-error');
	const hint = groupEl.querySelector('.input-hint');
	if (hint) hint.textContent = message;
}

function clearFieldError(groupEl) {
	groupEl.classList.remove('form-error');
}