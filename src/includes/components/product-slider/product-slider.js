import Flickity from 'flickity';
import 'flickity-fade';
class ProductSlider {
	constructor() {
		this.sliderBlock = document.querySelector('[data-product-slider]');
		this.sliderBtns = document.querySelectorAll('[data-slider-btn]');
		this.init();
	}

	init() {
		if (!this.sliderBlock) {
			return;
		}
		this.initSlider();
	}

	initSlider() {
		this.slider = new Flickity(this.sliderBlock, {
			fade: true,
			pageDots: false,
			prevNextButtons: false,
			draggable: false,
			imagesLoaded: true,
		});
		this.sliderBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				this.sliderBtnHandler(btn);
			});
		});
	}

	sliderBtnHandler(btn) {
		const index = btn.dataset.sliderBtn;
		this.slider.select(index);
	}
}

export default new ProductSlider();
