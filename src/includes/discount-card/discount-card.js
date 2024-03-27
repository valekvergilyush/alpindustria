class DiscountCard {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.discount-card._wallet');

		if (!this.container) {
			return;
		}

		this.initAddCardForm();
	}

	initAddCardForm() {
		this.addCardFormContainer = document.querySelector('.add-card-form');

		if (!this.addCardFormContainer) {
			return;
		}

		// const telSection = this.addCardFormContainer.querySelector('.add-card-form__tel');
		// const smsBlock = this.addCardFormContainer.querySelector('.add-card-form__sms');
		const backButtons = this.addCardFormContainer.querySelectorAll('.add-card-form__back');
		const smsSubmitButtons = this.addCardFormContainer.querySelectorAll(
			'.add-card-form__sms-submit'
		);

		backButtons.forEach(button =>
			button.addEventListener('click', evt => {
				evt.preventDefault();
				this.addCardFormContainer.classList.remove('_sms');
			})
		);

		smsSubmitButtons.forEach(button =>
			button.addEventListener('click', evt => {
				evt.preventDefault();
				this.showCardInfo();
			})
		);
	}
	showCardInfo() {
		this.cardInfoContainer = this.container.querySelector('.discount-card__info');

		if (!this.cardInfoContainer) {
			return;
		}

		this.addCardFormContainer.classList.remove('_sms');
		this.container.classList.add('_card-info');
	}
	showAnim() {
		this.container.classList.add('_anim');
	}
	hideAnim() {
		this.container.classList.remove('_anim');
	}
}

export default new DiscountCard();
