// Menu mobile
const navToggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');
if (navToggle && menu) {
	navToggle.addEventListener('click', () => {
		const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
		navToggle.setAttribute('aria-expanded', String(!isOpen));
		menu.classList.toggle('open');
	});
}

// Fechar menu ao clicar em um link (mobile)
menu?.querySelectorAll('a').forEach((link) => {
	link.addEventListener('click', () => {
		menu.classList.remove('open');
		navToggle?.setAttribute('aria-expanded', 'false');
	});
});

// Accordion FAQ
const accordionTriggers = document.querySelectorAll('.accordion-trigger');
accordionTriggers.forEach((btn) => {
	btn.addEventListener('click', () => {
		const expanded = btn.getAttribute('aria-expanded') === 'true';
		btn.setAttribute('aria-expanded', String(!expanded));
		const panel = btn.nextElementSibling;
		if (panel) {
			panel.hidden = expanded;
		}
	});
});

// Preferência do usuário por redução de movimento
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Rolagem suave para âncoras internas
const internalLinks = document.querySelectorAll('a[href^="#"]');
internalLinks.forEach((a) => {
	a.addEventListener('click', (e) => {
		const targetId = a.getAttribute('href');
		if (!targetId || targetId === '#') return;
		const target = document.querySelector(targetId);
		if (target) {
			e.preventDefault();
			target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
			if (target.tabIndex === -1) {
				target.setAttribute('tabindex', '-1');
			}
			target.focus({ preventScroll: true });
		}
	});
});

// Destacar link ativo conforme rolagem
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('#menu a[href^="#"]');
const sectionById = new Map();
sections.forEach((sec) => sectionById.set('#' + sec.id, sec));

let activeHref = '';
const onScroll = () => {
	let current = '';
	sections.forEach((sec) => {
		const rect = sec.getBoundingClientRect();
		if (rect.top <= 120 && rect.bottom >= 120) {
			current = '#' + sec.id;
		}
	});
	if (current && current !== activeHref) {
		activeHref = current;
		navLinks.forEach((lnk) => {
			if (lnk.getAttribute('href') === activeHref) lnk.classList.add('active');
			else lnk.classList.remove('active');
		});
	}
};

document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Ano automático no footer
document.getElementById('year')?.append(String(new Date().getFullYear()));