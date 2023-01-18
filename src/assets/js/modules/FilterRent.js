const ClassName = {
	OPENED: '_opened',
	SUBCATEGORY: '_subcategory',
	ACTIVE: '_active',
};

class FilterRent {
	constructor() {
		this.path = [];
		this.currentCategory = '';
		this.init();
	}

	init() {
		this.subContainers = document.querySelectorAll('[data-subcategory-rent]');

		if (!this.subContainers.length) {
			return;
		}
		this.heroContainer = document.querySelector('.page__hero');
		this.categoryBtns = document.querySelectorAll('[data-category-rent]');
		if (this.heroContainer) {
			this.heroTitleRoot = this.heroContainer.querySelector('.hero-catalog__title-root');
			this.heroTitleCategory = this.heroContainer.querySelector('.hero-catalog__title-category');
			this.heroTitleText = this.heroTitleCategory.textContent;
			this.heroBgImage = this.heroContainer.querySelector('.hero-catalog__bg-img._hero');
			const startCity = this.heroContainer.dataset.subcategoryStartCity;
			if (startCity) {
				this.path.push(startCity);
			}
		}
		this.checkContainerScroll();

		this.subContainers.forEach(subContainer => {
			Array(...subContainer.children).forEach(item => {
				const button = item.querySelector('[data-subcategory-opener]');
				const backButton = item.querySelector('[data-subcategory-back]');

				if (button) {
					button.addEventListener('click', evt => {
						evt.preventDefault();

						this.openSubcategory(subContainer, item, button);
					});
				}

				if (backButton) {
					backButton.addEventListener('click', evt => {
						evt.preventDefault();

						this.closeSubcategory(subContainer, item);
					});
				}
			});
		});

		this.categoryBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				this.activeCategory(btn);
			});
		});
	}
	openSubcategory(container, item, button) {
		const upperItem = container.closest('[data-subcategory-item]');
		container.classList.add(ClassName.OPENED);
		item.classList.add(ClassName.OPENED);
		const btnText = button.querySelector('.button__text').textContent;
		this.path.push(btnText);
		this.currentCategory = '';
		this.checkContainerScroll();

		if (upperItem) {
			upperItem.classList.add(ClassName.SUBCATEGORY);
		}

		if (this.heroContainer) {
			this.showSubcategoryBg(button);
			this.updateHeroTitle();
			this.updateTitleRoot();
		}
	}
	closeSubcategory(container, item) {
		const upperItem = container.closest('[data-subcategory-item]');
		container.classList.remove(ClassName.OPENED);
		item.classList.remove(ClassName.OPENED);
		this.path.pop();
		this.currentCategory = '';
		this.checkContainerScroll();

		if (upperItem) {
			upperItem.classList.remove(ClassName.SUBCATEGORY);
		}

		if (this.heroContainer) {
			this.showHeroBg();
			this.updateHeroTitle();
			this.updateTitleRoot();
		}
	}
	showSubcategoryBg(button) {
		const classMod = button.getAttribute('data-subcategory-mod');
		if (!classMod) {
			return;
		}
		this.subcategoryBgImg = this.heroContainer.querySelector(`.hero-catalog__bg-img.${classMod}`);
		if (!this.subcategoryBgImg) {
			return;
		}
		this.heroBgImage.style.display = 'none';
		this.subcategoryBgImg.style.display = 'block';
	}
	showHeroBg() {
		if (!this.subcategoryBgImg) {
			return;
		}
		this.heroBgImage.style.display = 'block';
		this.subcategoryBgImg.style.display = 'none';
	}
	updateTitleRoot() {
		this.heroTitleRoot.innerHTML = '';
		this.path.forEach(item => {
			const element = document.createElement('span');
			element.textContent = item;
			this.heroTitleRoot.appendChild(element);
		});
	}
	updateHeroTitle() {
		const pathWithCategory = [...this.path] || [];
		if (this.currentCategory) {
			pathWithCategory.push(this.currentCategory);
		}
		const extraTitleNameArray = [];
		if (pathWithCategory.length === 2) {
			extraTitleNameArray.push(pathWithCategory[1]);
		} else if (pathWithCategory.length > 2) {
			extraTitleNameArray.push(pathWithCategory[1]);
			extraTitleNameArray.push(pathWithCategory[pathWithCategory.length - 1]);
		}
		this.heroTitleCategory.textContent = '';
		this.heroTitleCategory.textContent = this.heroTitleText + ' ' + extraTitleNameArray.join(', ');
	}
	activeCategory(btn) {
		this.categoryBtns.forEach(b => {
			b.classList.remove(ClassName.ACTIVE);
		});
		btn.classList.add(ClassName.ACTIVE);
		const newCategory = btn.dataset.categoryRent;
		if (newCategory) {
			this.currentCategory = newCategory;
		}
		if (this.heroContainer) {
			this.updateHeroTitle();
		}
	}
	checkContainerScroll() {
		if (!this.quickFilter) {
			return;
		}
		const hasHorizontalScroll =
			this.quickFilter.clientWidth < this.quickFilter.scrollWidth ||
			this.quickFilter.offsetWidth < this.quickFilter.scrollWidth;

		if (hasHorizontalScroll) {
			this.quickFilter.style.justifyContent = 'flex-start';
		} else {
			this.quickFilter.style.justifyContent = 'center';
		}
	}
}

export default new FilterRent();
