import Popups from '../../assets/js/modules/Popups';
import DiscountCard from '../discount-card/discount-card';

const ClassName = {
	TEL_CONFIRMED: '_tel_confirmed',
};
let animTO;

class DiscountCreateForm {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('[data-discount-create-form]');

		if (!this.container) {
			return;
		}

		this.submitCodeButton = this.container.querySelector('[data-submit-code]');
		const submitPopupName = 'data-editing';
		const isWallet = this.container.classList.contains('_wallet');

		this.submitCodeButton &&
			this.submitCodeButton.addEventListener('click', evt => {
				evt.preventDefault();

				this.container.classList.add(ClassName.TEL_CONFIRMED);
			});

		this.container.addEventListener('submit', evt => {
			evt.preventDefault;

			const invalidInput = this.container.querySelector('.is-invalid');

			if (!invalidInput) {
				if (isWallet) {
					DiscountCard.showAnim();
					clearTimeout(animTO);
					animTO = setTimeout(() => {
						DiscountCard.hideAnim();
						DiscountCard.showCardInfo();
					}, 5000);

					return;
				}
				Popups.open(submitPopupName);
			} else {
				this.container.querySelector('.is-invalid input').focus();
			}
		});
	}
}

export default new DiscountCreateForm();
