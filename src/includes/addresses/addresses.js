const CLASS_ACTIVE = '_active';

class Addresses {
	constructor() {
		this.addressesBlock = document.querySelector('[data-addresses]');
		this.cityBtns = document.querySelectorAll('[data-city-btn]');
		this.cityTabs = document.querySelectorAll('[data-city-tab]');
		this.shopItems = document.querySelectorAll('[data-shop-item]');
		this.init();
	}

	init() {
		if (!this.addressesBlock) {
			return;
		}
		this.cityBtns.forEach(btn => {
			btn.addEventListener('click', this.cityBtnHandler);
		});
		this.shopItems.forEach(shopItem => {
			this.initShopItem(shopItem);
		});
	}

	cityBtnHandler() {
		console.log('change city');
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
}

export default new Addresses();
