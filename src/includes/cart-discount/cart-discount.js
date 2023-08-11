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
		this.cartBottom = document.querySelector('[data-order-bottom]');

		if (this.addCardBtn) {
			this.addCardBtn.addEventListener('click', evt => {
				evt.preventDefault();
				this.addCard();
			});
		}
		if (this.smsBackBtn) {
			this.smsBackBtn.addEventListener('click', evt => {
				evt.preventDefault();
				this.container.classList.remove('_sms');
			});
		}
		if (this.smsSubmitBtn) {
			this.smsSubmitBtn.addEventListener('click', evt => {
				evt.preventDefault();
				this.container.classList.remove('_sms');
				this.container.classList.add('_card');
			});
		}
		if (this.deleteCardBtn) {
			this.deleteCardBtn.addEventListener('click', evt => {
				evt.preventDefault();
				this.container.classList.remove('_card');
			});
		}
		if (this.addBonusBtn) {
			this.addBonusBtn.addEventListener('click', evt => {
				evt.preventDefault();
				this.container.classList.add('_bonus');
			});
		}
		if (this.spendBonusBtn) {
			this.spendBonusBtn.addEventListener('click', evt => {
				evt.preventDefault();
				this.container.classList.add('_bonus-sms');
			});
		}
		if (this.submitBonusBtn) {
			this.submitBonusBtn.addEventListener('click', evt => {
				evt.preventDefault();
				this.container.classList.remove('_bonus-sms');
				this.container.classList.add('_card-bonus');
				this.cartBottom.classList.add('_card-bonus');
			});
		}
		if (this.cancelBonusBtn) {
			this.cancelBonusBtn.addEventListener('click', evt => {
				evt.preventDefault();
				this.container.classList.remove('_card-bonus');
				this.cartBottom.classList.remove('_card-bonus');
			});
		}
	}
	addCard() {
		this.container.classList.add('_sms');
	}
}

export default new CartDiscount();
