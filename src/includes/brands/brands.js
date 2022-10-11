class Brands {
	constructor() {
		this.brandsItems = document.querySelectorAll('[data-brand-item]');
		this.gridBtn = document.querySelector('[data-brand-grid]');
		this.listBtn = document.querySelector('[data-brand-list]');
		this.brandsBlock = document.querySelector('[data-brand-block]');
		this.activeItemClass = '_active';
		this.activeBtnClass = '_active';
		this.init();
	}

	init() {
		if (!this.brandsItems.length) {
			return;
		}
		this.brandsItems.forEach(item => {
			const btn = item.querySelector('[data-brand-btn]');
			btn.addEventListener('click', () => {
				if (item.classList.contains(this.activeItemClass)) {
					return;
				}
				this.removeItemsClass();
				item.classList.add(this.activeItemClass);
			});
		});
		console.log(this.brandsBlock);
		console.log(this.gridBtn);
		console.log(this.listBtn);
		if (!this.brandsBlock || !this.gridBtn || !this.listBtn) {
			return;
		}
		this.gridBtn.addEventListener('click', () => {
			this.setGridBrands();
		});
		this.listBtn.addEventListener('click', () => {
			this.setListBrands();
		});
	}

	setGridBrands() {
		this.brandsBlock.classList.add('_logo');
		this.gridBtn.classList.add(this.activeBtnClass);
		this.listBtn.classList.remove(this.activeBtnClass);
	}

	setListBrands() {
		this.brandsBlock.classList.remove('_logo');
		this.gridBtn.classList.remove(this.activeBtnClass);
		this.listBtn.classList.add(this.activeBtnClass);
	}

	removeItemsClass() {
		this.brandsItems.forEach(item => {
			item.classList.remove(this.activeItemClass);
		});
	}
}

export default new Brands();
