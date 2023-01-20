class ProfileOrder {
	constructor() {
		this.profileOrderBtns = document.querySelectorAll('[data-profile-order-btn]');

		this.init();
	}

	init() {
		if (!this.profileOrderBtns.length) {
			return;
		}
		const header = document.querySelector('.header');
		if (header) {
			this.headerHeight = header.offsetHeight;
		}
		this.profileOrderBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				gsap.to(window, {
					duration: 0.3,
					scrollTo: {
						y: btn,
						offsetY: this.headerHeight,
					},
					ease: 'Power1.easeInOut',
				});
			});
		});
	}
}

export default new ProfileOrder();
