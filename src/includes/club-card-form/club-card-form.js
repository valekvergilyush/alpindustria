const FormStage = {
	ADD: 'add',
	PAY: 'pay',
	CANCEL: 'cancel',
};

class ClubCardForm {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.club-card-form');

		this.addButton = this.container.querySelector('.club-card-form__btn._add');
		this.payButton = this.container.querySelector('.club-card-form__btn._pay');
		this.cancelButton = this.container.querySelector('.club-card-form__btn._cancel');
		this.cardBalance = this.container.querySelector('.club-card-form__available-number');

		this.addButton.addEventListener('click', evt => {
			evt.preventDefault();

			const isValid = this.container.checkValidity();

			if (isValid) {
				this._openPay();
			} else {
				this.container.reportValidity();
			}
		});

		this.payButton.addEventListener('click', evt => {
			evt.preventDefault();

			this._pay();
		});

		this.cancelButton.addEventListener('click', evt => {
			evt.preventDefault();

			this.cardBalance.textContent = this.startBalanceValue;
			this.cartPriceValue = this.startPriceValue;
			this.cartPrice.textContent = Number(this.cartPriceValue).toLocaleString('ru');
			this._openPay();
		});

		this.classModifier = this.container.getAttribute('data-form-stage');
	}
	_openPay() {
		this.classModifier = FormStage.PAY;
		this.container.setAttribute('data-form-stage', this.classModifier);

		this.startBalanceValue = this.cardBalance.textContent;
		this.currentBalanceValue = this.startBalanceValue;
	}
	_pay() {
		this.cartPrice = document.querySelector('.cart__pay .cart__price-value');
		this.startPriceValue = this.cartPrice.textContent.replace(/\s/, '').match(/\d+/)[0];
		this.startBalanceValue = this.cardBalance.textContent;
		this.currentBalanceValue = this.startBalanceValue;

		this.classModifier = FormStage.CANCEL;
		this.container.setAttribute('data-form-stage', this.classModifier);

		this.cartPriceValue = this.startPriceValue - this.currentBalanceValue;
		this.currentBalanceValue = 0;
		this.cartPrice.textContent = this.cartPriceValue.toLocaleString('ru');
		this.cardBalance.textContent = this.currentBalanceValue;
	}
}

export default new ClubCardForm();
