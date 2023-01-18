const ACTIVE_CLASS = '_linked';

class Discount {
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
			this.addForm.addEventListener('submit', e => {
				e.preventDefault();
				this.discountSection.classList.add(ACTIVE_CLASS);
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

export default new Discount();
