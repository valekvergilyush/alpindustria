class Compare {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('[data-compare]');

		if (!this.container) {
			return;
		}

		this.initShowMore();
	}

	initShowMore() {
		const toggles = this.container.querySelectorAll('[data-show-more-toggle]');
		const toggleText = toggles[0].textContent;
		const closeText = toggles[0].getAttribute('data-close-text');

		toggles.forEach(toggle => {
			toggle.addEventListener('click', evt => {
				evt.preventDefault();

				const text = toggle.previousElementSibling;
				text.classList.toggle('_active');

				toggle.textContent = text.classList.contains('_active') ? closeText : toggleText;
			});
		});
	}
}

export default new Compare();
