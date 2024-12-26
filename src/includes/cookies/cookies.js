import Popups from '../../assets/js/modules/Popups';

const ClassName = {
	HIDDEN: '_hidden',
};

class Cookies {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('[data-cookies]');

		if (!this.container) {
			return;
		}

		const cookiesName = 'cookies-info-shown';
		const closeButtons = this.container.querySelectorAll('[data-cookies-close]');
		this.hasCookie = this.getCookie(cookiesName);

		setTimeout(() => {
			!this.hasCookie && this.container.classList.remove(ClassName.HIDDEN);
		}, 1000);

		closeButtons.length &&
			closeButtons.forEach(button => {
				button.addEventListener('click', evt => {
					evt.preventDefault();
					this.setCookie(cookiesName, 'closed');
					this.container.classList.add(ClassName.HIDDEN);

					Popups.open('subscription-news');
				});
			});
	}

	getCookie(name) {
		const value = ' ' + document.cookie;
		const parts = value.split(' ' + name + '=');
		return parts.length < 2 ? undefined : parts.pop().split(';').shift();
	}

	setCookie(name, value, expiryDays, domain, path, secure) {
		const exdate = new Date();
		exdate.setHours(exdate.getHours() + (typeof expiryDays !== 'number' ? 365 : expiryDays) * 24);
		document.cookie =
			name +
			'=' +
			value +
			';expires=' +
			exdate.toUTCString() +
			';path=' +
			(path || '/') +
			(domain ? ';domain=' + domain : '') +
			(secure ? ';secure' : '');
	}
}

export default new Cookies();
