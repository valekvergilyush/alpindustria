import Flickity from 'flickity';

class ArticleSlider {
	constructor() {
		this.sliderBlocks = document.querySelectorAll('[data-article-slider]');
		this.init();
	}

	init() {
		if (!this.sliderBlocks.length) {
			return;
		}
		this.sliderBlocks.forEach(slider => {
			this.initSlider(slider);
		});
	}

	initSlider(slider) {
		this.slider = new Flickity(slider, {
			pageDots: false,
			wrapAround: true,
			cellAlign: 'left',
		});
	}
}

export default new ArticleSlider();
