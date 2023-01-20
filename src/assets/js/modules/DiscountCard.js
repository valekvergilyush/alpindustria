const ACTIVE_CLASS = '_linked';

class DiscountCard {
	constructor() {
		this.discountSection = document.querySelector('[data-discount-section]');
		this.addForm = document.querySelector('[data-discount-add]');
		this.unlinkBtn = document.querySelector('[data-discount-unlink]');

		this.init();
	}

	init() {
		if (!this.discountSection) {
			return;
		}
		if (this.addForm) {
			const header = document.querySelector('.header');
			if (header) {
				this.headerHeight = header.offsetHeight;
			}
			this.addForm.addEventListener('submit', e => {
				e.preventDefault();
				this.discountSection.classList.add(ACTIVE_CLASS);
				gsap.to(window, {
					duration: 0.3,
					scrollTo: {
						y: this.discountSection,
						offsetY: this.headerHeight,
					},
					ease: 'Power1.easeInOut',
				});
			});
		}
		if (this.unlinkBtn) {
			this.unlinkBtn.addEventListener('click', e => {
				e.preventDefault();
				this.discountSection.classList.remove(ACTIVE_CLASS);
			});
		}
	}
}

export default new DiscountCard();
