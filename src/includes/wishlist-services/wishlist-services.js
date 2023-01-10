const CLASS_ACTIVE = '_active';

class WishlistServices {
	constructor() {
		this.citiesBlock = document.querySelector('[data-wishlist-cities]');
		this.init();
	}

	init() {
		if (!this.citiesBlock) {
			return;
		}

		this.cityBtns = document.querySelectorAll('[data-wishlist-city-btn]');
		this.cityItems = this.citiesBlock.querySelectorAll('[data-wishlist-city-item]');
		this.backBtns = document.querySelectorAll('[data-wishlist-city-back]');
		this.shopBtns = this.citiesBlock.querySelectorAll('[data-wishlist-shop]');
		this.cityName = this.citiesBlock.querySelector('[data-wishlist-city-name]');

		this.setActiveCity = this.setActiveCity.bind(this);
		this.clearCitiesBlock = this.clearCitiesBlock.bind(this);
		this.shopBtnHandler = this.shopBtnHandler.bind(this);

		this.cityBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				const cityName = btn.dataset.wishlistCityBtn;
				this.clearCitiesBlock();
				this.setActiveCity(cityName);
			});
		});
		this.backBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				this.clearCitiesBlock();
			});
		});
		this.shopBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				this.shopBtnHandler(btn);
			});
		});
	}

	setActiveCity(city) {
		const btn = this.citiesBlock.querySelector(`[data-wishlist-city-btn="${city}"]`);
		const item = btn.closest('[data-wishlist-city-item]');
		this.citiesBlock.classList.add(CLASS_ACTIVE);
		this.cityItems.forEach(i => {
			i.classList.remove(CLASS_ACTIVE);
		});
		item.classList.add(CLASS_ACTIVE);
		if (this.cityName) {
			this.cityName.classList.add(CLASS_ACTIVE);
			this.cityName.textContent = btn.textContent;
		}
	}

	clearCitiesBlock() {
		this.citiesBlock.classList.remove(CLASS_ACTIVE);
		this.cityItems.forEach(i => {
			i.classList.remove(CLASS_ACTIVE);
		});
		if (this.cityName) {
			this.cityName.classList.remove(CLASS_ACTIVE);
			this.cityName.textContent = '';
		}
	}

	shopBtnHandler(btn) {
		btn.addEventListener('click', () => {
			if (btn.classList.contains(CLASS_ACTIVE)) {
				btn.classList.remove(CLASS_ACTIVE);
				return;
			}
			this.shopBtns.forEach(b => {
				b.classList.remove(CLASS_ACTIVE);
			});
			btn.classList.add(CLASS_ACTIVE);
		});
	}
}

export default new WishlistServices();
