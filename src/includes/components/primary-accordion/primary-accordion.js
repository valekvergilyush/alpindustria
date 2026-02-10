const ClassName = {
	OPENED: '_opened',
};

class PrimaryAccordion {
	constructor() {
		this.init();
	}

	init() {
		this.sections = document.querySelectorAll('[data-primary-accordion-section]');

		if (!this.sections.length) {
			return;
		}

		this.sections.forEach(section => {
			const header = section.querySelector('[data-primary-accordion-header]');

			if (!header) {
				return;
			}

			header.addEventListener('click', () => {
				this.toggle(section);
			});
		});
	}

	toggle(section) {
		section.classList.toggle(ClassName.OPENED);
	}
}

export default new PrimaryAccordion();
