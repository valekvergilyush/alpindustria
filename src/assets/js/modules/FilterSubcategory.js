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
			this.breadcrumbs = this.heroContainer.querySelector('.hero-catalog__title-root');
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

			subContainer.querySelectorAll('[data-subcategory2-item]').forEach(item => {
				const button = item.querySelector('[data-subcategory-opener2]');
				const backButton = item.querySelector('[data-subcategory-back2]');
				const backButton2 = this.heroContainer.querySelector('[data-subtitle]');
				const list = item.querySelector('[data-subcategory-list2]');

				button.addEventListener('click', evt => {
					evt.preventDefault();

					this.openSubcategory(subContainer, item, list, button, '_subcategory-opened', 1);
				});

				backButton.addEventListener('click', evt => {
					evt.preventDefault();

					this.closeSubcategory(subContainer, item, list, '_subcategory-opened', 1);
				});

				backButton2.addEventListener('click', evt => {
					evt.preventDefault();

					this.closeSubcategory(subContainer, item, list, '_subcategory-opened', 1);
				});
			});
		});
	}
	openSubcategory(container, item, list, button, mod, row = 2) {
		container.classList.add(ClassName.OPENED);
		mod && container.classList.add(mod);
		item.classList.add(ClassName.OPENED);
		this.checkContainerScroll();

		container.scrollTo(0, 0);

		if (this.heroContainer && this.heroContainer.contains(item)) {
			this.showSubcategoryBg(button, !!mod);
			this.showSubcategoryTitle(button, !!mod);
		}

		if (list) {
			this.calcListWidth(list, row);

			window.addEventListener('resize', () => {
				this.calcListWidth(list, row);
			});
		}

		if (container.getAttribute('data-subcategory') === 'filter-address') {
			const breadcrumbs = container.previousElementSibling;

			if (breadcrumbs.hasAttribute('data-subcategory-breadcrumbs')) {
				breadcrumbs.classList.add(ClassName.OPENED);
				breadcrumbs.textContent = button.textContent;
				const div = document.createElement('span');
				div.classList.add('.breadcrumbs-divider');
				div.textContent = '/';
				breadcrumbs.append(div);
			}
		}
	}
	closeSubcategory(container, item, list, mod, row = 2) {
		!mod && container.classList.remove(ClassName.OPENED);
		mod && container.classList.remove(mod);
		item.classList.remove(ClassName.OPENED);
		this.checkContainerScroll();

		container.scrollTo(0, 0);

		if (this.heroContainer && this.heroContainer.contains(item) && !mod) {
			this.showHeroBg();
			this.showHeroTitle();
		}

		if (this.heroContainer && this.heroContainer.contains(item) && mod) {
			this.showSubcategoryBg();
			this.showSubcategoryTitle();
		}

		this.calcListWidth(list, row);

		if (container.getAttribute('data-subcategory') === 'filter-address') {
			const breadcrumbs = container.previousElementSibling;

			if (breadcrumbs.hasAttribute('data-subcategory-breadcrumbs')) {
				breadcrumbs.classList.remove(ClassName.OPENED);
				breadcrumbs.textContent = '';
			}
		}
	}
	calcListWidth(list, row = 2) {
		if (row === 1) {
			return;
		}
		list.style.width = 'auto';
		list.style.flexWrap = 'nowrap';
		list.style.justifyContent = 'flex-start';
		list.style.width = `${(list.scrollWidth + 100) / row}px`;
		list.style.flexWrap = 'wrap';
		list.style.justifyContent = 'center';
	}
	showSubcategoryBg(button, subcategory) {
		if (subcategory) {
			this.classMod2 = button.getAttribute('data-subcategory-mod');
			this.subcategoryBgImg = this.heroContainer.querySelector(
				`.hero-catalog__bg-img.${this.classMod2}`
			);
		} else {
			button && (this.classMod = button.getAttribute('data-subcategory-mod'));
			this.subcategoryBgImg = this.heroContainer.querySelector(
				`.hero-catalog__bg-img.${this.classMod}`
			);
		}
		this.heroContainer
			.querySelectorAll('.hero-catalog__bg-img')
			.forEach(img => (img.style.display = 'none'));
		this.subcategoryBgImg.style.display = 'block';
	}
	showHeroBg() {
		this.heroBgImage.style.display = 'block';
		this.subcategoryBgImg.style.display = 'none';
	}
	showSubcategoryTitle(button, subcategory) {
		if (subcategory) {
			this.subcategoryName2 = button.textContent;
			subcategory &&
				(this.heroContainer.querySelector('[data-subtitle]').textContent = this.subcategoryName);

			this.heroTitleCategory.textContent = this.subcategoryName2;
		} else {
			button && (this.subcategoryName = button.textContent);
			this.heroContainer.querySelector('[data-subtitle]').textContent = '';
			this.heroTitleCategory.textContent = this.subcategoryName;
		}

		this.heroContainer.classList.add(ClassName.SUBCATEGORY);
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
