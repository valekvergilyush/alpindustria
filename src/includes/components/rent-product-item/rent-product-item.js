const ClassName = {
	OPENED: '_opened',
};

class RentProductItem {
	constructor() {
		this.init();
	}

	init() {
		this.items = document.querySelectorAll('[data-rent-product-item]');

		if (!this.items.length) {
			return;
		}

		this.items.forEach(item => {
			const detailsBtn = item.querySelector('[data-rent-product-details]');

			if (!detailsBtn) {
				return;
			}

			detailsBtn.addEventListener('click', () => {
				this.toggleDetails(item);
			});
		});
	}

	toggleDetails(item) {
		item.classList.toggle(ClassName.OPENED);
	}
}

export default new RentProductItem();
