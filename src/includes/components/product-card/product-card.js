const ClassName = {
	PROPS_OPENED: '_props-opened',
};

class ProductCard {
	constructor() {
		this.init();
	}

	init() {
		this.cards = document.querySelectorAll('[data-product-card]');

		if (!this.cards.length) {
			return;
		}

		this.propsOpener = document.querySelectorAll('[data-product-card-props-opener]');
		this.sliderOffsetGap = 16;

		this.propsOpener.forEach(button => {
			button.addEventListener('click', evt => {
				evt.preventDefault();

				const card = button.closest('[data-product-card]');
				const closer = card.querySelector('[data-product-card-props-closer]');

				card.classList.add(ClassName.PROPS_OPENED);

				card.sizes = {
					block: card.querySelector('[data-product-sizes]'),
					nextBtn: card.querySelector('[data-product-sizes-next]'),
					step: 72,
				};

				this.initInputSlider(card.sizes);
				closer.addEventListener('click', e => {
					e.preventDefault();

					card.classList.remove(ClassName.PROPS_OPENED);
				});
			});
		});
	}
	initInputSlider(element) {
		let scroll = 0;
		const elemWidth = element.block.offsetWidth;
		const maxScroll = element.block.scrollWidth - elemWidth - this.sliderOffsetGap;
		const scrollStep = element.step;

		element.nextBtn.addEventListener('click', () => {
			if (maxScroll < scroll) {
				element.block.scrollTo(0, 0);
				scroll = 0;
				return;
			}
			element.block.scrollBy(scrollStep, 0);
			scroll += scrollStep;
		});
	}
}

export default new ProductCard();
