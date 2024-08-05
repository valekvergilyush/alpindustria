import Popups from '../../assets/js/modules/Popups';
import Cookies from '../cookies/cookies';

class SubscriptionNews {
	constructor() {
		this.form = document.querySelector('.subscription-news__form');

		if (!this.form) return;

		this.input = this.form.querySelector('.subscription-news__input');
		this.init();
	}
	init() {
		if (!localStorage.getItem('subscription-news') && Cookies.hasCookie) {
			Popups.open('subscription-news');
		}

		this.form.addEventListener('submit', () => {
			if (!this.input.classList.contains('is-invalid') && this.input.value !== '') {
				Popups.open('subscription-success');
			}
		});
	}
}

export default new SubscriptionNews();
