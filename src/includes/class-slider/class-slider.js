import Flickity from 'flickity';
import 'flickity-fade';
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

export default new ClassSlider();
