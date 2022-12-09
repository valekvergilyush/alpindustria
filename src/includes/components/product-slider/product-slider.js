import Flickity from 'flickity';
import 'flickity-fade';
import { tns } from 'tiny-slider';

const TABLET_BREAKPOINT = 992;
const THUMB_SLIDES_NUMBER = 4;
const INIT_CLASS = '_init';
class ProductSlider {
	constructor() {
		this.sliderBlock = document.querySelector('[data-product-slider]');
		this.sliderBtns = document.querySelectorAll('[data-slider-btn]');
		this.sliderBtnSelector = '[data-slider-btn]';
		this.sliderThumbsBlock = document.querySelector('[data-product-thumbs-slider]');
		this.sliderThumbsWrap = document.querySelector('[data-product-thumbs-wrapper]');

		this.updateSliderThumbs = this.updateSliderThumbs.bind(this);

		this.init();
	}

	init() {
		if (!this.sliderBlock) {
			return;
		}
		this.initSlider();

		if (!this.sliderThumbsBlock) {
			return;
		}
		this.sliderThumbSlides = this.sliderThumbsBlock.querySelectorAll('.product-slider__thumbnail');
		if (this.sliderThumbSlides.length <= THUMB_SLIDES_NUMBER) {
			return;
		}

		const onWindowWidthChange = evt => {
			if (evt.matches) {
				if (this.sliderThumbs) {
					this.sliderThumbs.destroy();
					this.sliderThumbs = null;
					this.sliderThumbsWrap.classList.remove(INIT_CLASS);
				}
				this.initSliderThumbs();
			} else {
				if (this.sliderThumbs) {
					this.sliderThumbs.destroy();
					this.sliderThumbs = null;
					this.sliderThumbsWrap.classList.remove(INIT_CLASS);
				}
				this.initSliderThumbs('vertical');
			}
		};

		this.mqTablet = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT}px)`);
		this.mqTablet.addEventListener('change', onWindowWidthChange);
		onWindowWidthChange(this.mqTablet);
		window.addEventListener('resize', this.updateSliderThumbs);
	}

	initSlider() {
		this.slider = new Flickity(this.sliderBlock, {
			fade: true,
			pageDots: false,
			prevNextButtons: false,
			draggable: false,
			imagesLoaded: true,
			wrapAround: true,
		});
		document.addEventListener('click', e => {
			const btn = e.target.closest(this.sliderBtnSelector);
			if (btn) {
				this.sliderBtnHandler(btn);
			}
		});
	}

	initSliderThumbs(axisValue = 'horizontal') {
		this.sliderThumbsWrap.classList.add(INIT_CLASS);
		const mouseDrag = axisValue === 'horizontal';
		this.sliderThumbs = tns({
			container: '[data-product-thumbs-slider]',
			items: THUMB_SLIDES_NUMBER,
			slideBy: 'page',
			axis: axisValue,
			mouseDrag,
		});
		this.updateSliderThumbs();
	}

	updateSliderThumbs() {
		if (window.innerWidth < TABLET_BREAKPOINT) {
			return;
		}
		const slides = this.sliderThumbsBlock.querySelectorAll('.product-slider__thumbnail');
		slides.forEach(slide => {
			slide.style.height = this.sliderThumbsWrap.offsetHeight / (THUMB_SLIDES_NUMBER + 1) + 'px';
		});
	}

	sliderBtnHandler(btn) {
		console.log('qwe');
		const index = btn.dataset.sliderBtn;
		this.slider.select(index);
	}
}

export default new ProductSlider();
