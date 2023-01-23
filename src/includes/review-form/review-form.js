import Popups from '../../assets/js/modules/Popups';

class ReviewForm {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('[data-review-form]');

		if (!this.container) {
			return;
		}

		const submitPopupName = 'data-editing';

		this.container.addEventListener('submit', evt => {
			evt.preventDefault;

			const invalidInput = this.container.querySelector('.is-invalid');

			if (!invalidInput) {
				Popups.open(submitPopupName);
			} else {
				if (this.container.querySelector('.is-invalid input')) {
					this.container.querySelector('.is-invalid input').focus();
				}
			}
		});
	}
}

export default new ReviewForm();
