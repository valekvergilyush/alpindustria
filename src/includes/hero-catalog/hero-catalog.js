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
		this.setBgImgHeight = this.setBgImgHeight.bind(this);

		if (this.container.hasAttribute('data-parallax')) {
			this.title = this.container.querySelector('.hero-catalog__title');
			this.filter = this.container.querySelector('.hero-catalog__quick-filter');
			this.bgImages = this.container.querySelectorAll('.hero-catalog__bg-img');
			this.bgImageWrapper = this.container.querySelector('.hero-catalog__bg-img-wrapper');

			this.setBgImgHeight();

			ScrollHelper.onScroll.add(this.initParallax);
			window.addEventListener('resize', this.setBgImgHeight);
		}
	}
	initParallax() {
		const ratio = window.pageYOffset / window.innerHeight;

		gsap.set(this.title, { y: -ratio * 250 });
		gsap.set(this.filter, { y: -ratio * 150 });
	}
	setBgImgHeight() {
		this.bgImageHeight = this.bgImageWrapper.offsetHeight;
		gsap.set(this.bgImages, {
			height: this.bgImageHeight,
		});
	}
}
export default new HeroCatalog();
