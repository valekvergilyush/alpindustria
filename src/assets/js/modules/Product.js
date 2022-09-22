class Product {
	constructor() {
		this.addBlock = document.querySelector('[data-product-add-mobile]');
		this.review = document.querySelector('[data-product-review]');
		this.colors = document.querySelector('[data-product-colors]');
		this.colorsNextBtn = document.querySelector('[data-product-colors-next]');
		this.sizes = document.querySelector('[data-product-sizes]');
		this.sizesNextBtn = document.querySelector('[data-product-sizes-next]');
		this.breakpointWidth = 992;
		this.sliderBreakpoint = window.matchMedia(`(max-width:1280px) and (min-width: 922px)`);

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
		this.initInputSlider(this.colors, this.colorsNextBtn, 152);
		this.initInputSlider(this.sizes, this.sizesNextBtn, 192);
	}

	initInputSlider(sliderblock, nextBtn, step) {
		let scroll = 0;
		const elemWidth = sliderblock.offsetWidth;
		const maxScroll = sliderblock.scrollWidth - elemWidth - 10;
		const scrollStep = step;

		nextBtn.addEventListener('click', () => {
			if (maxScroll < scroll) {
				sliderblock.scrollTo(0, 0);
				scroll = 0;
				return;
			}
			sliderblock.scrollBy(scrollStep, 0);
			scroll += scrollStep;
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
