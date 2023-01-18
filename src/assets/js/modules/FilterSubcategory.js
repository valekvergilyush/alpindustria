const ClassName = {
	OPENED: '_opened',
	SUBCATEGORY: '_subcategory',
};

class FilterSubcategory {
	constructor() {
		this.init();
	}

	init() {
		this.subContainers = document.querySelectorAll('[data-subcategory]');

		if (!this.subContainers.length) {
			return;
		}

		this.heroContainer = document.querySelector('.page__hero');
		this.quickFilter = document.querySelector('[data-quick-filter]');
		if (this.heroContainer) {
			this.heroTitleCategory = this.heroContainer.querySelector('.hero-catalog__title-category');
			this.heroTitleText = this.heroTitleCategory.textContent;
			this.heroBgImage = this.heroContainer.querySelector('.hero-catalog__bg-img._hero');
		}

		this.checkContainerScroll();
		this.subContainers.forEach(subContainer => {
			subContainer.querySelectorAll('[data-subcategory-item]').forEach(item => {
				const button = item.querySelector('[data-subcategory-opener]');
				const backButton = item.querySelector('[data-subcategory-back]');
				const list = item.querySelector('[data-subcategory-list]');

				button.addEventListener('click', evt => {
					evt.preventDefault();

					this.openSubcategory(subContainer, item, list, button);
				});

				backButton.addEventListener('click', evt => {
					evt.preventDefault();

					this.closeSubcategory(subContainer, item, list);
				});
			});
		});
	}
	openSubcategory(container, item, list, button) {
		container.classList.add(ClassName.OPENED);
		item.classList.add(ClassName.OPENED);
		this.checkContainerScroll();

		if (this.heroContainer) {
			this.showSubcategoryBg(button);
			this.showSubcategoryTitle(button);
		}

		if (list) {
			this.calcListWidth(list);

			window.addEventListener('resize', () => {
				this.calcListWidth(list);
			});
		}
	}
	closeSubcategory(container, item) {
		container.classList.remove(ClassName.OPENED);
		item.classList.remove(ClassName.OPENED);
		this.checkContainerScroll();

		if (this.heroContainer) {
			this.showHeroBg();
			this.showHeroTitle();
		}
	}
	calcListWidth(list) {
		list.style.flexWrap = 'nowrap';
		list.style.width = `${(list.scrollWidth + 100) / 2}px`;
		list.style.flexWrap = 'wrap';
	}
	showSubcategoryBg(button) {
		const classMod = button.getAttribute('data-subcategory-mod');
		this.subcategoryBgImg = this.heroContainer.querySelector(`.hero-catalog__bg-img.${classMod}`);

		this.heroBgImage.style.display = 'none';
		this.subcategoryBgImg.style.display = 'block';
	}
	showHeroBg() {
		this.heroBgImage.style.display = 'block';
		this.subcategoryBgImg.style.display = 'none';
	}
	showSubcategoryTitle(button) {
		this.subcategoryName = button.textContent;
		this.heroContainer.classList.add(ClassName.SUBCATEGORY);
		this.heroTitleCategory.textContent = this.subcategoryName;
	}
	showHeroTitle() {
		this.heroContainer.classList.remove(ClassName.SUBCATEGORY);
		this.heroTitleCategory.textContent = this.heroTitleText;
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

export default new FilterSubcategory();
