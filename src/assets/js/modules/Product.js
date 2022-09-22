import Flickity from 'flickity';

class Product {
	constructor() {
		this.addBlock = document.querySelector('[data-product-add-mobile]');
		this.review = document.querySelector('[data-product-review]');
		this.colors = document.querySelector('[data-product-colors]');
		this.colorsNextBtn = document.querySelector('[data-product-colors-next]');
		this.sizes = document.querySelector('[data-product-sizes]');
		this.sizesNextBtn = document.querySelector('[data-product-sizes-next]');
		this.breakpointWidth = 992;
		this.sliderBreakpoint = window.matchMedia(`(max-width:1439px) and (min-width: 922px)`);

		this.init();
	}

	init() {
		if (this.addBlock && this.review) {
			this.checkAddBlockVisibility();
			document.addEventListener('scroll', () => {
				this.checkAddBlockVisibility();
			});
		}

		this.initInputSliders();
	}

	initInputSliders() {
		const breakpointChecker = () => {
			if (this.sliderBreakpoint.matches) {
				console.log('initSlider');
				this.sizesSlider = this.initSlider(this.sizes);
				this.colorsSlider = this.initSlider(this.colors);
			} else {
				console.log('destroySlider');
				this.destroySlider(this.sizesSlider);
				this.destroySlider(this.colorsSlider);
			}
		};
		this.sliderBreakpoint.addListener(breakpointChecker);
		breakpointChecker();

		this.initSliderBtnHandlers(this.colorsSlider, this.colorsNextBtn);
		this.initSliderBtnHandlers(this.sizesSlider, this.sizesNextBtn);
	}

	initSlider(sliderblock) {
		const slider = new Flickity(sliderblock, {
			pageDots: false,
			prevNextButtons: false,
			groupCells: sliderblock.dataset.sliderGroup,
			draggable: false,
			// wrapAround: true,
			percentPosition: false,
			// contain: true,
		});
		return slider;
	}

	destroySlider(slider) {
		if (slider) {
			this.colorsSlider.destroy();
		}
	}

	initSliderBtnHandlers(slider, btn) {
		if (!btn) {
			return;
		}
		btn.addEventListener('click', () => {
			if (slider) {
				slider.next(true);
			}
		});
	}

	hideAddBlock() {
		gsap.to(this.addBlock, {
			duration: 0.4,
			opacity: 0,
			display: 'none',
		});
	}

	showAddBlock() {
		gsap.to(this.addBlock, {
			duration: 0.4,
			opacity: 1,
			display: 'flex',
		});
	}

	checkAddBlockVisibility() {
		if (window.innerWidth > this.breakpointWidth) {
			this.hideAddBlock();
			return;
		}
		if (this.getCoords(this.review).top < this.getCoords(this.addBlock).top) {
			this.hideAddBlock();
			return;
		}
		this.showAddBlock();
	}

	getCoords(elem) {
		const box = elem.getBoundingClientRect();

		const body = document.body;
		const docEl = document.documentElement;

		const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
		const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

		const clientTop = docEl.clientTop || body.clientTop || 0;
		const clientLeft = docEl.clientLeft || body.clientLeft || 0;

		const top = box.top + scrollTop - clientTop;
		const left = box.left + scrollLeft - clientLeft;

		return { top: Math.round(top), left: Math.round(left) };
	}
}

export default new Product();
