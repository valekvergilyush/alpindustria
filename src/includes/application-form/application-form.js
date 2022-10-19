class ApplicationForm {
	constructor() {
		this.init();
	}

	init() {
		this.containter = document.querySelector('.application-form');

		if (!this.containter) {
			return;
		}

		this.hobbyList = this.containter.querySelector('.application-form__hobbies');
		this.showMoreButton = this.containter.querySelector('.application-form__show-more-btn');

		this.showMoreButton.addEventListener('click', evt => {
			evt.preventDefault();

			this.hobbyList.style.maxHeight = 'none';
			this.showMoreButton.remove();
		});
	}
}

export default new ApplicationForm();
