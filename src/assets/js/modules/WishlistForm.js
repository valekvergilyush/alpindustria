class WishlistForm {
	constructor() {
		this.form = document.querySelector('[data-wishlist-form]');
		this.opener = document.querySelector('[data-wishlist-show]');
		this.cancelBtn = document.querySelector('[data-wishlist-cancel]');
		this.input = document.querySelector('[data-wishlist-input]');
		this.hideClass = '_hide';
		this.init();
	}
	init() {
		if (!this.form || !this.opener) {
			return;
		}

		this.opener.addEventListener('click', () => {
			this.hideOpener();
			this.showForm();
			this.input.focus();
		});
		this.cancelBtn.addEventListener('click', () => {
			this.hideForm();
			this.showOpener();
			this.input.value = '';
		});
	}

	showOpener() {
		this.opener.classList.remove(this.hideClass);
	}

	hideOpener() {
		this.opener.classList.add(this.hideClass);
	}

	showForm() {
		this.form.classList.remove(this.hideClass);
	}

	hideForm() {
		this.form.classList.add(this.hideClass);
	}
}

export default new WishlistForm();
