const ClassName = {
	TEL_CONFIRMED: '_tel_confirmed',
};

class DiscountCreateForm {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('[data-discount-create-form]');

		if (!this.container) {
			return;
		}

		this.submitCodeButton = this.container.querySelector('[data-submit-code]');

		this.submitCodeButton &&
			this.submitCodeButton.addEventListener('click', evt => {
				evt.preventDefault();

				this.container.classList.add(ClassName.TEL_CONFIRMED);
			});
	}
}

export default new DiscountCreateForm();
