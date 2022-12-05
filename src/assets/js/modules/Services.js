const ClassName = {
	OPENED: '_opened',
};

class Services {
	constructor() {
		this.servicesBlock = document.querySelector('[data-services]');
		this.accordions = [];

		this.init();
	}

	init() {
		if (!this.servicesBlock) {
			return;
		}

		let hash = window.location.hash;
		if (hash) {
			hash = hash.substring(1);
			const activeAccordion = this.servicesBlock.querySelector(
				`[data-accordion-section="${hash}"]`
			);
			if (activeAccordion) {
				const btn = activeAccordion.querySelector('[data-accordion-title]');
				activeAccordion.classList.add(ClassName.OPENED);
				if (btn) {
					btn.classList.add(ClassName.OPENED);
				}
				setTimeout(() => {
					this.scrollTo(activeAccordion);
				});
			}
		}
	}

	scrollTo(y) {
		y = y < 0 ? 0 : y;
		this._updateMaxScroll();
		y = y > this.maxScrollTop ? this.maxScrollTop : y;
		const distance = Math.abs(window.pageYOffset - y);
		let duration = distance / 500;
		duration = duration < 0.15 ? 0.15 : duration;
		duration = duration > 1 ? 1 : duration;
		this.autoScrolling = true;
		gsap.to(window, {
			scrollTo: { y: y },
			duration: duration,
			ease: 'none',
			onStart: () => {
				this.autoScrolling = true;
			},
			onComplete: () => {
				this.autoScrolling = false;
			},
		});
	}

	_updateMaxScroll() {
		this.maxScrollTop =
			Math.max(
				document.body.scrollHeight,
				document.body.offsetHeight,
				document.documentElement.clientHeight,
				document.documentElement.scrollHeight,
				document.documentElement.offsetHeight
			) - window.innerHeight;
	}
}

export default new Services();
