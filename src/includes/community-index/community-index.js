import { tns } from 'tiny-slider';
import Utils from '../../assets/js/utils/utils';
import TextSplitter from '../../assets/js/helpers/TextSplitter';

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
			autoplay: true,
		});

		this.slider.tns.events.on('transitionEnd', slider => {
			Array.from(slider.slideItems).forEach(slide => {
				const animatedBlocks = slide.querySelectorAll('[data-slider-animation]');
				animatedBlocks.forEach(block => {
					const isAnimated = block.classList.contains(ClassName.ANIMATED);

					if (!isAnimated) {
						if (
							block.getAttribute('data-slider-animation') === 'words' &&
							!block.querySelector('.word')
						) {
							TextSplitter.split(block).words;
						}
						block.classList.add(ClassName.ANIMATED);
					}
				});
			});
		});
		this.slider.tns.events.on('transitionStart', slider => {
			const slide = slider.slideItems[slider.index];

			Array.from(slider.slideItems).forEach(item => {
				const animatedBlocks = item.querySelectorAll('[data-slider-animation]');
				animatedBlocks.forEach(block => {
					block.classList.remove(ClassName.ANIMATED);
				});
			});

			if (slide) {
				const animatedBlocks = slide.querySelectorAll('[data-slider-animation]');
				animatedBlocks.forEach(block => {
					block.classList.remove(ClassName.ANIMATED);
				});
			}
		});
		this.slider.tns.events.on('dragStart', slider => {
			Array.from(slider.slideItems).forEach(slide => {
				if (!slide.classList.contains('tns-slide-active')) {
					const animatedBlocks = slide.querySelectorAll('[data-slider-animation]');
					animatedBlocks.forEach(block => {
						block.classList.remove(ClassName.ANIMATED);
					});
				}
			});
		});
	}
	_onWindowScroll() {
		const animatedBlocks = this.slides[0].querySelectorAll('[data-slider-animation]');
		animatedBlocks.forEach(block => {
			const isAnimated = block.classList.contains(ClassName.ANIMATED);
			if (!isAnimated) {
				if (
					block.getAttribute('data-slider-animation') === 'words' &&
					!block.querySelector('.word')
				) {
					TextSplitter.split(block).words;
				}
				const isInViewport = Utils.isElementInViewport(block, 1.2);

				isInViewport && block.classList.add(ClassName.ANIMATED);
			}
		});
	}
}

export default new CommunityIndex();
