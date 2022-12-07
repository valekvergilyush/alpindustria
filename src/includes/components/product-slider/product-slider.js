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
		this.sliderThumbsBlock = document.querySelector('[data-product-thumbs-slider]');
		this.sliderThumbsWrap = document.querySelector('[data-product-thumbs-wrapper]');

		this.init();
	}

	init() {
		if (!this.sliderBlock) {
			return;
		}
		this.initSlider();
		this.initSliderThumbs();
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
		this.sliderBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				this.sliderBtnHandler(btn);
			});
		});
	}

	initSliderThumbs() {
		if (!this.sliderThumbsBlock) {
			return;
		}
		this.sliderThumbSlides = this.sliderThumbsBlock.querySelectorAll('.product-slider__thumbnail');
		if (this.sliderThumbSlides.length <= THUMB_SLIDES_NUMBER) {
			return;
		}
		this.sliderThumbsBlock.classList.add(INIT_CLASS);
		this.updateSliderThumbs = this.updateSliderThumbs.bind(this);
		this.sliderThumbs = tns({
			container: '[data-product-thumbs-slider]',
			items: THUMB_SLIDES_NUMBER,
			slideBy: 'page',
			axis: 'vertical',
			mouseDrag: false,
			responsive: {
				992: {
					axis: 'horizontal',
					nav: false,
					mouseDrag: true,
				},
			},
		});
		this.updateSliderThumbs();
		window.addEventListener('resize', this.updateSliderThumbs);
	}

	updateSliderThumbs() {
		if (window.innerWidth < TABLET_BREAKPOINT) {
			this.sliderThumbs.destroy();
			this.sliderThumbsBlock.classList.add(INIT_CLASS);
			window.removeEventListener('resize', this.updateSliderThumbs);
		}
		const slides = this.sliderThumbsBlock.querySelectorAll('.product-slider__thumbnail');
		const btn = this.sliderThumbsWrap.querySelector('[data-controls="next"]');
		slides.forEach(slide => {
			slide.style.height = this.sliderThumbsWrap.offsetHeight / (THUMB_SLIDES_NUMBER + 1) + 'px';
		});
		if (btn) {
			btn.style.height = this.sliderThumbsWrap.offsetHeight / (THUMB_SLIDES_NUMBER + 1) + 'px';
		}
	}

	sliderBtnHandler(btn) {
		const index = btn.dataset.sliderBtn;
		this.slider.select(index);
	}
}

export default new ProductSlider();
