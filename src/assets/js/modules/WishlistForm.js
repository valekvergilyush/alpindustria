class WishlistForm {
	constructor() {
		this.form = document.querySelector('[data-wishlist-form]');
		this.showBtn = document.querySelector('[data-wishlist-show]');
		this.cancelBtn = document.querySelector('[data-wishlist-cancel]');
		this.input = document.querySelector('[data-wishlist-input]');
		this.init();
	}
	init() {
		if (!this.form || !this.showBtn) {
			return;
		}

		this.showBtn.addEventListener('click', () => {
			this.hideShowBtn();
			this.showForm();
			this.input.focus();
		});
		this.cancelBtn.addEventListener('click', () => {
			this.hideForm();
			this.showShowBtn();
			this.input.value = '';
		});
	}

	showShowBtn() {
		this.showBtn.classList.remove('_hide');
	}

	hideShowBtn() {
		this.showBtn.classList.add('_hide');
	}

	showForm() {
		this.form.classList.remove('_hide');
	}

	hideForm() {
		this.form.classList.add('_hide');
	}
}

export default new WishlistForm();
