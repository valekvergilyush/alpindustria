class Header {
	constructor() {
		this.init();
	}
	init() {
		this.container = document.querySelector('.header');

		if (!this.container) {
			return;
		}

		this.isHeaderHidden = false;
		this.headerHeight = this.container.offsetHeight;
		console.log(this.headerHeight);

		this.onWindowScroll = this.onWindowScroll.bind(this);

		window.addEventListener('scroll', this.onWindowScroll);
	}
	onWindowScroll() {
		this.scrollY = window.scrollY;
		if (this.scrollY > this.headerHeight && !this.isHeaderHidden) {
			this.isHeaderHidden = !this.isHeaderHidden;
			gsap.to(this.container, {
				yPercent: -100,
				duration: 0.3,
			});
		} else if (this.scrollY < this.headerHeight && this.isHeaderHidden) {
			this.isHeaderHidden = !this.isHeaderHidden;
			gsap.to(this.container, {
				yPercent: 0,
				duration: 0.1,
			});
		}
	}
}

export default new Header();
