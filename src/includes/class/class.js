import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TABLET_BREAKPOINT = 992;
const ClassName = {
	NO_BG: '_no-bg',
	HIDDEN: '_hidden',
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

		this.priceBlock = this.container.querySelector('.class__price-block');
		this.payBlock = this.container.querySelector('.class__pay');
		this.classContent = this.container.querySelector('.class__content');

		this.mqTablet = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT}px)`);

		const onWindowWidthChange = evt => {
			if (evt.matches) {
				if (this.priceBlockTrigger) {
					this.priceBlockTrigger.kill();
					this.priceBlock.classList.remove(ClassName.NO_BG);
				}

				this._initMobilePriceBlock();
			} else {
				if (this.priceBlockTrigger) {
					this.priceBlockTrigger.kill();
					this.priceBlock.classList.remove(ClassName.HIDDEN);
				}

				this._initDesktopPriceBlock();
			}
		};

		this.mqTablet.addEventListener('change', onWindowWidthChange);
		onWindowWidthChange(this.mqTablet);
	}
	_initMobilePriceBlock() {
		this.priceBlockTrigger = ScrollTrigger.create({
			trigger: this.payBlock,
			start: 'top bottom',
			onEnter: () => {
				this.priceBlock.classList.add(ClassName.HIDDEN);
			},
			onLeaveBack: () => {
				this.priceBlock.classList.remove(ClassName.HIDDEN);
			},
		});
	}
	_initDesktopPriceBlock() {
		this.priceBlockTrigger = ScrollTrigger.create({
			trigger: this.payBlock,
			start: 'bottom bottom',
			onEnter: () => {
				this.priceBlock.classList.add(ClassName.NO_BG);
			},
			onLeaveBack: () => {
				this.priceBlock.classList.remove(ClassName.NO_BG);
			},
		});
	}
}

export default new Class();
