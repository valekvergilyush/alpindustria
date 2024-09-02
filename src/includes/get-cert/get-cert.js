const ClassName = {
	HIDDEN: '_hidden',
};

class GetCert {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('[data-get-cert]');

		if (!this.container) {
			return;
		}

		this.loaderEl = this.container.querySelector('[data-loader]');

		this.showLoader();

		setTimeout(() => {
			this.hideLoader();
		}, 1000);
	}

	showLoader() {
		this.loaderEl.classList.remove(ClassName.HIDDEN);
	}

	hideLoader() {
		this.loaderEl.classList.add(ClassName.HIDDEN);
	}
}

export default new GetCert();
