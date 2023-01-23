import Popups from '../../assets/js/modules/Popups';

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
		const submitPopupName = 'data-editing';

		this.submitCodeButton &&
			this.submitCodeButton.addEventListener('click', evt => {
				evt.preventDefault();

				this.container.classList.add(ClassName.TEL_CONFIRMED);
			});

		this.container.addEventListener('submit', evt => {
			evt.preventDefault;

			const invalidInput = this.container.querySelector('.is-invalid');

			if (!invalidInput) {
				Popups.open(submitPopupName);
			} else {
				this.container.querySelector('.is-invalid input').focus();
			}
		});
	}
}

export default new DiscountCreateForm();
