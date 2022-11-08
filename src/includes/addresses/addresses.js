const CLASS_ACTIVE = '_active';
const CLASS_WRAP_ACTIVE = '_wrap-active';
const ACTIVE_CITY_INDEX = '1';
const TABLET_BREAKPOINT = 992;

class Addresses {
	constructor() {
		this.addressesBlock = document.querySelector('[data-addresses]');
		this.cityBtns = document.querySelectorAll('[data-city-btn]');
		this.cityTabs = document.querySelectorAll('[data-city-tab]');
		this.shopItems = document.querySelectorAll('[data-shop-item]');
		this.activeCityIndex = ACTIVE_CITY_INDEX;
		this.mqTablet = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT}px)`);
		this.init();
	}

	init() {
		if (!this.addressesBlock) {
			return;
		}
		// cities
		this.cityBtns.forEach(btn => {
			btn.addEventListener('click', e => {
				this.cityBtnHandler(e);
			});
		});
		this.citiesMobileCheck();
		this.mqTablet.addEventListener('change', () => {
			this.citiesMobileCheck();
		});

		// shops
		this.shopItems.forEach(shopItem => {
			this.initShopItem(shopItem);
		});

		// horisontal scroll
		this.initHorisontalScroll();
	}

	citiesMobileCheck() {
		if (window.innerWidth < TABLET_BREAKPOINT) {
			this.closeActiveCityTab();
			this.activeCityIndex = -1;
		} else {
			this.changeActiveCity(ACTIVE_CITY_INDEX);
		}
	}

	cityBtnHandler(e) {
		const index = e.target.closest('[data-city-btn]').dataset.cityBtn;
		if (window.innerWidth < TABLET_BREAKPOINT && this.activeCityIndex !== -1) {
			this.closeActiveCityTab();
			return;
		}
		this.changeActiveCity(index);
	}

	changeActiveCity(index) {
		this.closeActiveCityTab();
		this.openCityTab(index);
	}

	openCityTab(index) {
		const activeTab = Array(...this.cityTabs).find(elem => {
			return elem.dataset.cityTab === index;
		});
		const activeBtn = Array(...this.cityBtns).find(elem => {
			return elem.dataset.cityBtn === index;
		});
		if (!activeTab) {
			return;
		}
		activeTab.classList.add(CLASS_ACTIVE);
		activeBtn.classList.add(CLASS_ACTIVE);
		this.addressesBlock.classList.add(CLASS_WRAP_ACTIVE);
		this.activeCityIndex = index;
	}

	closeActiveCityTab() {
		const activeTab = Array(...this.cityTabs).find(elem => {
			return elem.dataset.cityTab === this.activeCityIndex;
		});
		const activeBtn = Array(...this.cityBtns).find(elem => {
			return elem.dataset.cityBtn === this.activeCityIndex;
		});
		this.activeCityIndex = -1;
		if (activeTab) {
			activeTab.classList.remove(CLASS_ACTIVE);
		}
		if (activeBtn) {
			activeBtn.classList.remove(CLASS_ACTIVE);
		}
		this.addressesBlock.classList.remove(CLASS_WRAP_ACTIVE);
	}

	initShopItem(shopBlock) {
		const openBtn = shopBlock.querySelector('[data-shop-open]');
		const closeBtn = shopBlock.querySelector('[data-shop-close]');
		if (openBtn) {
			openBtn.addEventListener('click', e => {
				e.preventDefault();
				this.clearShopItems();
				this.openShopItem(shopBlock);
			});
		}
		if (closeBtn) {
			closeBtn.addEventListener('click', e => {
				e.preventDefault();
				this.closeShopItem(shopBlock);
			});
		}
	}

	clearShopItems() {
		this.shopItems.forEach(item => {
			this.closeShopItem(item);
		});
	}

	openShopItem(item) {
		if (!item) {
			return;
		}
		item.classList.add(CLASS_ACTIVE);
	}

	closeShopItem(item) {
		if (!item) {
			return;
		}
		item.classList.remove(CLASS_ACTIVE);
	}

	initHorisontalScroll() {
		console.log('initHorisontalScroll');
	}
}

export default new Addresses();
