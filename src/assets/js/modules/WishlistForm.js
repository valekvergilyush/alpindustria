class WishlistForm {
	constructor() {
		this.init();
	}
	init() {
		this.container = document.querySelector('[data-wishlist-form]');
		this.popupOpeners = document.querySelectorAll('[data-popup-opener="wishlist"]');

		if (!this.container || this.popupOpeners.length === 0) {
			return;
		}

		const nameInput = this.container.querySelector('[data-wishlist-input]');

		this.popupOpeners.forEach(opener => {
			opener.addEventListener('click', evt => {
				evt.preventDefault();

				opener.TO && clearTimeout(opener.TO);
				opener.TO = setTimeout(() => {
					nameInput.focus();
				}, 300);
			});
		});
	}
}

export default new WishlistForm();
