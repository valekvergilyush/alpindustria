const ClassName = {
	ACTIVE: '_active',
};

class NewCert {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('[data-new-cert]');

		if (!this.container) {
			return;
		}

		const images = this.container.querySelectorAll('[data-new-cert-img]');
		const radioButtons = Array.from(this.container.querySelectorAll('[data-new-cert-radio]'));
		let activeIndex = radioButtons.indexOf(radioButtons.find(radioButton => radioButton.checked));

		images[activeIndex].classList.add(ClassName.ACTIVE);

		radioButtons.forEach((radioButton, i) => {
			radioButton.addEventListener('change', () => {
				if (radioButton.checked) {
					images[activeIndex].classList.remove(ClassName.ACTIVE);
					activeIndex = i;
					images[activeIndex].classList.add(ClassName.ACTIVE);
				}
			});
		});
	}
}

export default new NewCert();
