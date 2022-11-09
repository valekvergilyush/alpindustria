import { tns } from 'tiny-slider';

const ClassName = {
	HORIZONTAL: '_horizontal',
};

const TABLET_BREAKPOINT = 768;

class BannerSection {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.banner-section');

		if (!this.container) {
			return;
		}

		this.slider = this.container.querySelector('[data-banner-slider]');
		this.slides = this.slider.querySelectorAll('[data-banner-slide]');

		this.mqTablet = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT}px)`);

		const onWindowWidthChange = evt => {
			if (evt.matches) {
				if (this.slider.tns) {
					this.slider.tns.destroy();
					this.slider.tns = null;
				}
				this._initSlider();
			} else {
				if (this.slider.tns) {
					this.slider.tns.destroy();
					this.slider.tns = null;
				}
				this._initSlider('vertical');
			}
		};

		this.mqTablet.addEventListener('change', onWindowWidthChange);
		onWindowWidthChange(this.mqTablet);
	}
	_initSlider(axisValue = 'horizontal') {
		this.container.classList.remove(ClassName.HORIZONTAL);

		if (axisValue === 'horizontal') {
			this.container.classList.add(ClassName.HORIZONTAL);
		}

		this.slider.tns = tns({
			container: '[data-banner-slider]',
			items: 1,
			axis: axisValue,
			mouseDrag: true,
			controls: false,
		});
	}
}

export default new BannerSection();
