import { tns } from 'tiny-slider';
import Utils from '../../assets/js/utils/utils';

const HTML_CLASSLIST = document.documentElement.classList;

const ClassName = {
	ACTIVE: '_active',
	HORIZONTAL: '_horizontal',
	ANIMATED: 'is-animated',
	ANIMATIONS: 'animations',
};

const TABLET_BREAKPOINT = 768;

class CommunityIndex {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.community-index');

		if (!this.container) {
			return;
		}

		this.slider = this.container.querySelector('[data-section-slider]');
		this.slides = this.slider.querySelectorAll('[data-section-slide]');

		this.mqTablet = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT}px)`);

		this._onWindowScroll = this._onWindowScroll.bind(this);

		const onWindowWidthChange = evt => {
			if (evt.matches) {
				if (this.slider.tns) {
					this.slider.tns.destroy();
					this.slider.tns = null;
				}
				this._initSlider();
				HTML_CLASSLIST.remove(ClassName.ANIMATIONS);
			} else {
				if (this.slider.tns) {
					this.slider.tns.destroy();
					this.slider.tns = null;
				}
				this._initSlider('vertical');
				HTML_CLASSLIST.add(ClassName.ANIMATIONS);
			}
		};

		this.mqTablet.addEventListener('change', onWindowWidthChange);
		onWindowWidthChange(this.mqTablet);

		window.addEventListener('scroll', this._onWindowScroll);
		this._onWindowScroll();
	}
	_initSlider(axisValue = 'horizontal') {
		this.container.classList.remove(ClassName.HORIZONTAL);

		if (axisValue === 'horizontal') {
			this.container.classList.add(ClassName.HORIZONTAL);
		}

		this.slider.tns = tns({
			container: '[data-section-slider]',
			items: 1,
			axis: axisValue,
			mouseDrag: true,
			controls: false,
		});

		this.slider.tns.events.on('indexChanged', slider => {
			const index = slider.index - 1;
			const slide = this.slides[index];

			if (slide) {
				const animatedBlocks = slide.querySelectorAll('[data-animation]');
				animatedBlocks.forEach(block => {
					const isAnimated = block.classList.contains(ClassName.ANIMATED);

					if (!isAnimated) {
						block.classList.add(ClassName.ANIMATED);
					}
				});
			}
		});
	}
	_onWindowScroll() {
		const animatedBlocks = this.slides[0].querySelectorAll('[data-animation]');
		animatedBlocks.forEach(block => {
			const isAnimated = block.classList.contains(ClassName.ANIMATED);
			if (!isAnimated) {
				const isInViewport = Utils.isElementInViewport(block, 1.2);

				isInViewport && block.classList.add(ClassName.ANIMATED);
			}
		});
	}
}

export default new CommunityIndex();
