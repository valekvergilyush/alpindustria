const ClassName = {
	OPENED: '_opened',
	REVEALED: '_revealed',
};

class RentProductItem {
	constructor() {
		this.init();
		this.initBooknow();
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

	initBooknow() {
		const booknowBtns = document.querySelectorAll('[data-booknow]');

		booknowBtns.forEach(btn => {
			btn.addEventListener('click', e => {
				if (btn.classList.contains(ClassName.REVEALED)) {
					return;
				}

				e.preventDefault();

				const href = btn.getAttribute('href');
				const phone = href.replace('tel:', '').replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3-$4-$5');
				const textEl = btn.querySelector('.button__text');

				if (textEl) {
					textEl.textContent = phone;
				}

				btn.classList.add(ClassName.REVEALED);
			});
		});
	}

	toggleDetails(item) {
		item.classList.toggle(ClassName.OPENED);
	}
}

export default new RentProductItem();
