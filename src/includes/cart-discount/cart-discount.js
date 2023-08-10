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
		this.addBonusBtn = this.container.querySelector('[data-add-bonus]');
		this.spendBonusBtn = this.container.querySelector('[data-spend-bonus]');
		this.submitBonusBtn = this.container.querySelector('[data-submit-bonus]');
		this.cancelBonusBtn = this.container.querySelector('[data-cancel-bonus]');

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
		this.addBonusBtn.addEventListener('click', evt => {
			evt.preventDefault();
			this.container.classList.add('_bonus');
		});
		this.spendBonusBtn.addEventListener('click', evt => {
			evt.preventDefault();
			this.container.classList.add('_bonus-sms');
		});
		this.submitBonusBtn.addEventListener('click', evt => {
			evt.preventDefault();
			this.container.classList.remove('_bonus-sms');
			this.container.classList.add('_card-bonus');
		});
		this.cancelBonusBtn.addEventListener('click', evt => {
			evt.preventDefault();
			this.container.classList.remove('_card-bonus');
		});
	}
}

export default new CartDiscount();
