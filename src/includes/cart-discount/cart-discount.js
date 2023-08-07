class CartDiscount {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.cart-discount');

		if (!this.container) {
			return;
		}

		this.addCardBtn = this.container.querySelector('[data-add-card]');
		this.smsBackBtn = this.container.querySelector('[data-sms-back]');
		this.smsSubmitBtn = this.container.querySelector('[data-sms-submit]');
		this.deleteCardBtn = this.container.querySelector('[data-delete-card]');

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

export default new CartDiscount();
