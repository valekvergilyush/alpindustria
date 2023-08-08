class CreateCardPopup {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.create-card-popup');

		if (!this.container) {
			return;
		}

		this.addCardBtn = this.container.querySelector('[data-add-card]');

		this.addCardBtn.addEventListener('click', evt => {
			evt.preventDefault();
			this.container.classList.add('_sms');
		});
		this.smsBackBtn.addEventListener('click', evt => {
			evt.preventDefault();
			this.container.classList.remove('_sms');
		});
		this.smsSubmitBtn.addEventListener('click', evt => {
			evt.preventDefault();
			this.container.classList.remove('_sms');
			this.container.classList.add('_card');
		});
		this.deleteCardBtn.addEventListener('click', evt => {
			evt.preventDefault();
			this.container.classList.remove('_card');
		});
	}
}

export default new CreateCardPopup();
