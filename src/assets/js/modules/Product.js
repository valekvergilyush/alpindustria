class Product {
	constructor() {
		this.addBlock = document.querySelector('[data-product-add-mobile]');
		this.review = document.querySelector('[data-product-review]');
		this.img = document.querySelector('[data-product-img]');
		this.info = document.querySelector('[data-product-info]');

		this.init();

		window.innerWidth > 992 && this.checkListWrap();
		window.addEventListener('resize', () => {
			if (window.innerWidth > 992) {
				this.checkListWrap();
			}
		});

		document.querySelectorAll('[data-show]').forEach(el => {
			el.addEventListener('click', evt => {
				evt.preventDefault();
				document
					.querySelector(`[data-product-list="${el.dataset.show}"]`)
					.parentElement.classList.add('_show');
			});
		});
		document.querySelectorAll('[data-hide]').forEach(el => {
			el.addEventListener('click', evt => {
				evt.preventDefault();
				document
					.querySelector(`[data-product-list="${el.dataset.hide}"]`)
					.parentElement.classList.remove('_show');
			});
		});
	}

	init() {
		if (this.addBlock && this.review) {
			this.checkAddBlockVisibility();
			document.addEventListener('scroll', () => {
				this.checkAddBlockVisibility();
			});
		}
	}
	checkListWrap() {
		document.querySelectorAll('[data-product-list]').forEach(list => {
			const minWrapHeight = getComputedStyle(list).getPropertyValue('height').slice(0, -2) * 1.5;
			const hasWrap = list.scrollHeight > minWrapHeight;
			list.classList.toggle('_has-wrap', hasWrap);
			if (hasWrap) {
				list.count = 0;
				Array.from(list.children).forEach(item => {
					item.offsetTop > list.children[0].offsetTop && list.count++;
				});
				const showButtonTextEl = document.querySelector(
					`[data-show="${list.dataset.productList}"] .button__text`
				);
				!showButtonTextEl.sourceText &&
					(showButtonTextEl.sourceText = showButtonTextEl.textContent);
				showButtonTextEl.textContent = showButtonTextEl.sourceText + ` ${list.count}`;
			}
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
