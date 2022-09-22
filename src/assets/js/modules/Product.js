class Product {
	constructor() {
		this.addBlock = document.querySelector('[data-product-add-mobile]');
		this.review = document.querySelector('[data-product-review]');
		this.colors = {
			block: document.querySelector('[data-product-colors]'),
			nextBtn: document.querySelector('[data-product-colors-next]'),
			step: 160,
		};
		this.sizes = {
			block: document.querySelector('[data-product-sizes]'),
			nextBtn: document.querySelector('[data-product-sizes-next]'),
			step: 192,
		};
		this.breakpointWidth = 992;
		this.sliderOffsetGap = 20;

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
		this.initInputSlider(this.colors);
		this.initInputSlider(this.sizes);
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
