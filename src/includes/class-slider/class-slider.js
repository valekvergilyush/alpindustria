import Flickity from 'flickity';

class ClassSlider {
	constructor() {
		this.sliderBlock = document.querySelector('[data-class-slider]');
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
			pageDots: true,
			prevNextButtons: false,
			draggable: true,
			imagesLoaded: true,
		});
	}
}

export default new ClassSlider();
