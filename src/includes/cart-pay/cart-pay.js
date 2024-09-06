class CartPay {
	constructor(el) {
		this.init(el);
	}

	init(el) {
		this.container = el;

		if (!this.container) {
			return;
		}

		const bottomToggle = this.container.querySelector('[data-cart-pay-bottom-toggle]');

		bottomToggle &&
			bottomToggle.addEventListener('click', () => {
				const parenrEl = bottomToggle.parentElement;
				parenrEl.classList.toggle('_active');
				parenrEl.querySelector('input').focus();
			});
	}
}

document.querySelectorAll('.cart-pay').forEach(el => new CartPay(el));

export default CartPay;
