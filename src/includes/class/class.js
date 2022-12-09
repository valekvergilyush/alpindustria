import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TABLET_BREAKPOINT = 992;
const ClassName = {
	NO_BG: '_no-bg',
};

class Class {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('[data-class]');

		if (!this.container) {
			return;
		}

		this._initPriceBlock();
	}
	_initPriceBlock() {
		const priceBlock = this.container.querySelector('.class__price-block');
		const payBlock = this.container.querySelector('.class__pay');

		if (window.innerWidth > TABLET_BREAKPOINT) {
			ScrollTrigger.create({
				trigger: payBlock,
				start: 'bottom bottom',
				onEnter: () => {
					priceBlock.classList.add(ClassName.NO_BG);
				},
				onLeaveBack: () => {
					priceBlock.classList.remove(ClassName.NO_BG);
				},
			});
		}
	}
}

export default new Class();
