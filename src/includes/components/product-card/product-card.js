const ClassName = {
	PROPS_OPENED: '_props-opened',
	PROPS_CHECKED: '_props-checked',
};

const LAPTOP_BREAKPOINT = 1024;

class ProductCard {
	constructor() {
		this.init();
	}

	init() {
		this.cards = document.querySelectorAll('[data-product-card]');

		if (!this.cards.length) {
			return;
		}

		this.mqLaptop = window.matchMedia(`(max-width: ${LAPTOP_BREAKPOINT}px)`);
		this.propsOpeners = document.querySelectorAll('[data-product-card]');
		this.sliderOffsetGap = 16;

		this.onOpenerClick = this.onOpenerClick.bind(this);

		this.propsOpeners.forEach(opener => {
			opener.addEventListener('mouseenter', () => {
				const card = opener;

				card.classList.add(ClassName.PROPS_OPENED);
				card.addEventListener(
					'mouseleave',
					() => {
						card.classList.remove(ClassName.PROPS_OPENED);
					},
					{ once: true }
				);
			});
		});

		const onWindowWidthChange = evt => {
			if (evt.matches) {
				this.destroy();
			} else {
				this.cards.forEach(card => {
					this.onOpenerClick(card);
				});
			}
		};

		this.mqLaptop.addEventListener('change', onWindowWidthChange);
		onWindowWidthChange(this.mqLaptop);
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
	onOpenerClick(card) {
		const form = card.querySelector('[data-product-card-props]');
		const colorInputs = card.querySelectorAll('.product-card__colors input');
		const sizeInputs = card.querySelectorAll('.product-card__sizes input');
		const daysInputs = card.querySelectorAll('.product-card__days input');
		const colorOutput = card.querySelector('[data-product-card-color]');
		const sizeOutput = card.querySelector('[data-product-card-size]');
		const daysOutput = card.querySelector('[data-product-card-days]');
		const backButton = card.querySelector('[data-product-card-back]');

		const isCheckedAll = () => {
			if (daysInputs.length) {
				return Boolean(
					form.elements.color.value && form.elements.size.value && form.elements.days.value
				);
			}

			return Boolean(form.elements.color.value && form.elements.size.value);
		};
		const showTotalState = () => {
			if (isCheckedAll()) {
				card.classList.add(ClassName.PROPS_CHECKED);
				colorOutput && (colorOutput.style.background = card.colorData);
				sizeOutput && (sizeOutput.textContent = card.sizeValue);
				daysOutput && (daysOutput.textContent = card.daysValue);
			}
		};

		showTotalState();

		colorInputs.length &&
			colorInputs.forEach(input =>
				input.addEventListener('change', evt => {
					card.colorValue = form.elements.color.value;
					card.colorData = evt.target.getAttribute('data-value');
					colorOutput.style.background = card.colorData;

					showTotalState();
				})
			);
		sizeInputs.length &&
			sizeInputs.forEach(input =>
				input.addEventListener('change', () => {
					card.sizeValue = form.elements.size.value;
					sizeOutput.textContent = card.sizeValue;

					showTotalState();
				})
			);
		daysInputs.length &&
			daysInputs.forEach(input =>
				input.addEventListener('change', () => {
					card.daysValue = form.elements.days.value;
					daysOutput.textContent = card.daysValue;

					showTotalState();
				})
			);

		// card.classList.add(ClassName.PROPS_OPENED);

		card.sizes = {
			block: card.querySelector('[data-product-sizes]'),
			nextBtn: card.querySelector('[data-product-sizes-next]'),
			step: 72,
		};
		card.days = {
			block: card.querySelector('[data-product-days]'),
			nextBtn: card.querySelector('[data-product-days-next]'),
			step: 96,
		};

		sizeInputs.length && this.initInputSlider(card.sizes);
		daysInputs.length && this.initInputSlider(card.days);

		backButton.addEventListener('click', e => {
			e.preventDefault();

			card.classList.remove(ClassName.PROPS_CHECKED);
			form.reset();
		});
	}
	destroy() {
		document
			.querySelectorAll(`[data-product-card].${ClassName.PROPS_OPENED}`)
			.forEach(card => card.classList.remove(ClassName.PROPS_OPENED));
	}
}

export default new ProductCard();
