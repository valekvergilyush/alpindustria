const FormStage = {
	ADD: 'add',
	PAY: 'pay',
	CANCEL: 'cancel',
	CODE: 'code',
};

class ClubCardForm {
	constructor(el) {
		this.init(el);
	}

	init(el) {
		this.container = el;

		this.addButton = this.container.querySelector('.club-card-form__btn._add');
		this.payButton = this.container.querySelector('.club-card-form__btn._pay');
		this.codeButton = this.container.querySelector('.club-card-form__btn._check-code');
		this.sendCodeButton = this.container.querySelector('.club-card-form__btn._send-code');
		this.cancelButton = this.container.querySelector('.club-card-form__btn._cancel');
		this.cardBalance = this.container.querySelector('.club-card-form__available-number');
		this.smsCodeInput = this.container.querySelector('.club-card-form__input._check-code input');

		this.addButton.addEventListener('click', evt => {
			evt.preventDefault();

			const isValid = this.container.checkValidity();

			if (isValid) {
				this._openPay();
			} else {
				this.container.reportValidity();
			}
		});

		this.codeButton.addEventListener('click', evt => {
			evt.preventDefault();

			if (!this.smsCodeInput.value) {
				this.smsCodeInput.setAttribute('required', true);
				this.smsCodeInput.reportValidity();
			} else {
				this._pay();
				this.smsCodeInput.blur();
			}
		});

		this.sendCodeButton.addEventListener('click', evt => {
			evt.preventDefault();

			this.smsCodeInput.value = '';
			this.smsCodeInput.focus();
		});

		this.payButton.addEventListener('click', evt => {
			evt.preventDefault();

			this._openCode();
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
	_openCode() {
		this.smsCodeInput.value = '';
		this.classModifier = FormStage.CODE;
		this.container.setAttribute('data-form-stage', this.classModifier);
		this.smsCodeInput.focus();
	}
}

document.querySelectorAll('.club-card-form').forEach(el => new ClubCardForm(el));

export default ClubCardForm;
