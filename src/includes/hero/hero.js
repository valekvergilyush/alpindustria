import ScrollHelper from '../../assets/js/helpers/ScrollHelper';

class Hero {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.hero');

		if (!this.container) {
			return;
		}

		this.initParallax = this.initParallax.bind(this);

		if (this.container.hasAttribute('data-parallax')) {
			this.title = this.container.querySelector('.hero__title');
			this.filter = this.container.querySelector('.hero__quick-filter');

			ScrollHelper.onScroll.add(this.initParallax);
		}
	}
	initParallax() {
		const ratio = window.pageYOffset / window.innerHeight;

		gsap.set(this.title, { y: -ratio * 250 });
		gsap.set(this.filter, { y: -ratio * 150 });
	}
}
export default new Hero();
