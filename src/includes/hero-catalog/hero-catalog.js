import ScrollHelper from '../../assets/js/helpers/ScrollHelper';

class HeroCatalog {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.hero-catalog');

		if (!this.container) {
			return;
		}

		this.initParallax = this.initParallax.bind(this);

		if (this.container.hasAttribute('data-parallax')) {
			this.title = this.container.querySelector('.hero-catalog__title');
			this.filter = this.container.querySelector('[data-quick-filter]');
			this.bgImages = this.container.querySelectorAll('.hero-catalog__bg-img');
			this.bgImageWrapper = this.container.querySelector('.hero-catalog__bg-img-wrapper');

			ScrollHelper.onScroll.add(this.initParallax);
		}
	}
	initParallax() {
		const ratio = window.pageYOffset / window.innerHeight;

		gsap.set(this.title, { y: -ratio * 250 });
		gsap.set(this.filter, { y: -ratio * 150 });
	}
}
export default new HeroCatalog();
