import Popups from '../../assets/js/modules/Popups';

class SubscriptionNews {
	constructor() {
		this.form = document.querySelector('.subscription-news__form');
		this.input = this.form.querySelector('.subscription-news__input');
		this.init();
	}
	init() {
		Popups.open('subscription-news');

		this.form.addEventListener('submit', evt => {
			if (!this.input.classList.contains('is-invalid') && this.input.value !== '') {
				Popups.open('subscription-success');
			}
		});
	}
}

export default new SubscriptionNews();
