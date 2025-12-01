const ClassName = {
	OPENED: '_opened',
};

class RentProductsAccordion {
	constructor() {
		this.init();
	}

	init() {
		this.sections = document.querySelectorAll('[data-rent-accordion-section]');

		if (!this.sections.length) {
			return;
		}

		this.sections.forEach(section => {
			const header = section.querySelector('[data-rent-accordion-header]');

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

export default new RentProductsAccordion();
