import Popups from '../../assets/js/modules/Popups';

class ApplicationForm {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.application-form');

		if (!this.container) {
			return;
		}

		this.hobbyList = this.container.querySelector('.application-form__hobbies');
		this.hobbyListError = this.container.querySelector('.application-form__hobbies-error-msg');
		this.showMoreButton = this.container.querySelector('.application-form__show-more-btn');
		const submitPopupName = 'data-editing';

		this.showMoreButton &&
			this.showMoreButton.addEventListener('click', evt => {
				evt.preventDefault();

				this.hobbyList.style.maxHeight = 'none';
				this.showMoreButton.remove();
			});

		this.container.addEventListener('submit', evt => {
			evt.preventDefault;

			const invalidInput = this.container.querySelector('.is-invalid');
			const hobbyChecked = this.hobbyList.querySelector('input[type="checkbox"]:checked');

			if (hobbyChecked) {
				this.hobbyListError.style.display = '';
			} else {
				this.hobbyListError.style.display = 'block';
			}

			if (!invalidInput && hobbyChecked) {
				Popups.open(submitPopupName);
			} else {
				if (this.container.querySelector('.is-invalid input')) {
					this.container.querySelector('.is-invalid input').focus();
				} else if (this.hobbyList.querySelector('input[type="checkbox"]:not(:checked)')) {
					this.hobbyList.querySelector('input[type="checkbox"]:not(:checked)').focus();
				}
			}
		});
	}
}

export default new ApplicationForm();
