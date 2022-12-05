class Product {
	constructor() {
		this.addBlock = document.querySelector('[data-product-add-mobile]');
		this.review = document.querySelector('[data-product-review]');
		this.img = document.querySelector('[data-product-img]');
		this.info = document.querySelector('[data-product-info]');
		this.colors = {
			blocks: document.querySelectorAll('[data-product-colors]'),
			nextBtn: '[data-product-colors-next]',
			step: 160,
		};
		this.sizes = {
			blocks: document.querySelectorAll('[data-product-sizes]'),
			nextBtn: '[data-product-sizes-next]',
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
		if (this.sizes.blocks.length) {
			this.sizes.blocks.forEach(block => {
				this.initInputSlider(block, this.sizes);
			});
		}
		if (this.colors.block) {
			this.initInputSlider(this.colors);
		}
	}

	initInputSlider(block, element) {
		let scroll = 0;
		const scrollStep = element.step;
		const nextBtn = block.parentElement.querySelector(element.nextBtn);
		nextBtn.addEventListener('click', () => {
			const elemWidth = block.offsetWidth;
			const maxScroll = block.scrollWidth - elemWidth - this.sliderOffsetGap;
			if (maxScroll < scroll) {
				block.scrollTo(0, 0);
				scroll = 0;
				return;
			}
			block.scrollBy(scrollStep, 0);
			scroll += scrollStep;
		});
	}

	hideAddBlock() {
		if (this.isAddBlockVisibile === false) {
			return;
		}
		gsap.to(this.addBlock, {
			duration: 0.4,
			opacity: 0,
			autoAlpha: 0,
		});
		this.isAddBlockVisibile = false;
	}

	showAddBlock() {
		if (this.isAddBlockVisibile === true) {
			return;
		}
		gsap.to(this.addBlock, {
			duration: 0.4,
			opacity: 1,
			autoAlpha: 1,
		});
		this.isAddBlockVisibile = true;
	}

	checkAddBlockVisibility() {
		if (window.innerWidth > this.breakpointWidth) {
			this.hideAddBlock();
			return;
		}
		if (this.addBlock.getBoundingClientRect().top > this.review.getBoundingClientRect().bottom) {
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
		const scrollBottom = window.pageXOffset || docEl.scrollBottom || body.scrollBottom;

		const clientTop = docEl.clientTop || body.clientTop || 0;
		const clientLeft = docEl.clientLeft || body.clientLeft || 0;
		const clientBottom = docEl.clientbottom || body.clientBottom || 0;

		const top = box.top + scrollTop - clientTop;
		const left = box.left + scrollLeft - clientLeft;
		const bottom = box.bottom + scrollBottom - clientBottom;

		return { top: Math.round(top), left: Math.round(left), bottom: Math.round(bottom) };
	}
}

export default new Product();
