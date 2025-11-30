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
			const content = section.querySelector('[data-rent-accordion-content]');

			if (!header || !content) {
				return;
			}

			if (section.classList.contains(ClassName.OPENED)) {
				const contentInner = content.querySelector('.rent-products-accordion__content-inner');
				if (contentInner) {
					content.style.height = contentInner.scrollHeight + 'px';
				}
			}

			header.addEventListener('click', () => {
				this.toggle(section, content);
			});
		});
	}

	toggle(section, content) {
		const isOpened = section.classList.contains(ClassName.OPENED);
		const contentInner = content.querySelector('.rent-products-accordion__content-inner');

		if (!contentInner) {
			return;
		}

		if (isOpened) {
			this.close(section, content);
		} else {
			this.open(section, content, contentInner);
		}
	}

	open(section, content, contentInner) {
		const contentHeight = contentInner.scrollHeight;

		section.classList.add(ClassName.OPENED);
		gsap.to(content, {
			height: contentHeight,
			duration: 0.3,
			ease: 'power2.out',
			onComplete: () => {
				gsap.set(content, { height: 'auto' });
			},
		});
	}

	close(section, content) {
		const contentInner = content.querySelector('.rent-products-accordion__content-inner');
		const contentHeight = contentInner.scrollHeight;

		gsap.set(content, { height: contentHeight });
		gsap.to(content, {
			height: 0,
			duration: 0.3,
			ease: 'power2.out',
			onComplete: () => {
				section.classList.remove(ClassName.OPENED);
			},
		});
	}
}

export default new RentProductsAccordion();
