import Map from '../../assets/js/modules/Map';
import AddressesScroll from '../../assets/js/modules/AddressesScroll';

const CLASS_ACTIVE = '_active';
const CLASS_WRAP_ACTIVE = '_wrap-active';
const ACTIVE_CITY_INDEX = '1';
const TABLET_BREAKPOINT = 992;
const CONTENT = `
	<div class="map-popup">
		<h3>г. Санкт-Петербург, наб. Черной речки, д. 6 (ст.м. Черная Речка)</h3>
		<p>Ежедневно c 10:00 до 22:00</p>
		<p>Телефон: <a href="tel:+78122421195">+7 (812) 242-11-95</a></p>
		<a href="#" class="choose ttu">Выбрать магазин</a>
	</div>`;
const MAP_DATA_ADDRESSES = [
	{
		mapData: {
			center: {
				lat: 40.712784,
				lng: -74.005941,
			},
			zoom: 11,
		},
		pointsData: [
			{
				position: {
					lat: 40.712784,
					lng: -73.994606,
				},
				content: CONTENT,
			},
			{
				position: {
					lat: 40.712784,
					lng: -74.1,
				},
				content: CONTENT,
			},
		],
	},
	{
		mapData: {
			center: {
				lat: 40.812784,
				lng: -74.005941,
			},
			zoom: 11,
		},
		pointsData: [
			{
				position: {
					lat: 40.812784,
					lng: -73.994606,
				},
				content: CONTENT,
			},
			{
				position: {
					lat: 40.812784,
					lng: -74.1,
				},
				content: CONTENT,
			},
		],
	},
	{
		mapData: {
			center: {
				lat: 40.712784,
				lng: -74.005941,
			},
			zoom: 11,
		},
		pointsData: [
			{
				position: {
					lat: 40.712784,
					lng: -73.994606,
				},
				content: CONTENT,
			},
			{
				position: {
					lat: 40.712784,
					lng: -74.1,
				},
				content: CONTENT,
			},
		],
	},
	{
		mapData: {
			center: {
				lat: 40.812784,
				lng: -74.005941,
			},
			zoom: 11,
		},
		pointsData: [
			{
				position: {
					lat: 40.812784,
					lng: -73.994606,
				},
				content: CONTENT,
			},
			{
				position: {
					lat: 40.812784,
					lng: -74.1,
				},
				content: CONTENT,
			},
		],
	},
	{
		mapData: {
			center: {
				lat: 40.712784,
				lng: -74.005941,
			},
			zoom: 11,
		},
		pointsData: [
			{
				position: {
					lat: 40.712784,
					lng: -73.994606,
				},
				content: CONTENT,
			},
			{
				position: {
					lat: 40.712784,
					lng: -74.1,
				},
				content: CONTENT,
			},
		],
	},
	{
		mapData: {
			center: {
				lat: 40.812784,
				lng: -74.005941,
			},
			zoom: 11,
		},
		pointsData: [
			{
				position: {
					lat: 40.812784,
					lng: -73.994606,
				},
				content: CONTENT,
			},
			{
				position: {
					lat: 40.812784,
					lng: -74.1,
				},
				content: CONTENT,
			},
		],
	},
	{
		mapData: {
			center: {
				lat: 40.712784,
				lng: -74.005941,
			},
			zoom: 11,
		},
		pointsData: [
			{
				position: {
					lat: 40.712784,
					lng: -73.994606,
				},
				content: CONTENT,
			},
			{
				position: {
					lat: 40.712784,
					lng: -74.1,
				},
				content: CONTENT,
			},
		],
	},
	{
		mapData: {
			center: {
				lat: 40.812784,
				lng: -74.005941,
			},
			zoom: 11,
		},
		pointsData: [
			{
				position: {
					lat: 40.812784,
					lng: -73.994606,
				},
				content: CONTENT,
			},
			{
				position: {
					lat: 40.812784,
					lng: -74.1,
				},
				content: CONTENT,
			},
		],
	},
	{
		mapData: {
			center: {
				lat: 40.712784,
				lng: -74.005941,
			},
			zoom: 11,
		},
		pointsData: [
			{
				position: {
					lat: 40.712784,
					lng: -73.994606,
				},
				content: CONTENT,
			},
			{
				position: {
					lat: 40.712784,
					lng: -74.1,
				},
				content: CONTENT,
			},
		],
	},
	{
		mapData: {
			center: {
				lat: 40.812784,
				lng: -74.005941,
			},
			zoom: 11,
		},
		pointsData: [
			{
				position: {
					lat: 40.812784,
					lng: -73.994606,
				},
				content: CONTENT,
			},
			{
				position: {
					lat: 40.812784,
					lng: -74.1,
				},
				content: CONTENT,
			},
		],
	},
	{
		mapData: {
			center: {
				lat: 40.712784,
				lng: -74.005941,
			},
			zoom: 11,
		},
		pointsData: [
			{
				position: {
					lat: 40.712784,
					lng: -73.994606,
				},
				content: CONTENT,
			},
			{
				position: {
					lat: 40.712784,
					lng: -74.1,
				},
				content: CONTENT,
			},
		],
	},
	{
		mapData: {
			center: {
				lat: 40.812784,
				lng: -74.005941,
			},
			zoom: 11,
		},
		pointsData: [
			{
				position: {
					lat: 40.812784,
					lng: -73.994606,
				},
				content: CONTENT,
			},
			{
				position: {
					lat: 40.812784,
					lng: -74.1,
				},
				content: CONTENT,
			},
		],
	},
	{
		mapData: {
			center: {
				lat: 40.712784,
				lng: -74.005941,
			},
			zoom: 11,
		},
		pointsData: [
			{
				position: {
					lat: 40.712784,
					lng: -73.994606,
				},
				content: CONTENT,
			},
			{
				position: {
					lat: 40.712784,
					lng: -74.1,
				},
				content: CONTENT,
			},
		],
	},
	{
		mapData: {
			center: {
				lat: 40.812784,
				lng: -74.005941,
			},
			zoom: 11,
		},
		pointsData: [
			{
				position: {
					lat: 40.812784,
					lng: -73.994606,
				},
				content: CONTENT,
			},
			{
				position: {
					lat: 40.812784,
					lng: -74.1,
				},
				content: CONTENT,
			},
		],
	},
	{
		mapData: {
			center: {
				lat: 40.712784,
				lng: -74.005941,
			},
			zoom: 11,
		},
		pointsData: [
			{
				position: {
					lat: 40.712784,
					lng: -73.994606,
				},
				content: CONTENT,
			},
			{
				position: {
					lat: 40.712784,
					lng: -74.1,
				},
				content: CONTENT,
			},
		],
	},
];

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
		AddressesScroll.addressContentProgressUpdate();
		this.setMapData(index);
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
		this.closeAllShops();
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

	closeAllShops() {
		this.shopItems.forEach(item => {
			this.closeShopItem(item);
		});
	}

	setMapData(index) {
		if (window.google) {
			const data = MAP_DATA_ADDRESSES[index];
			Map.adressesMap.setZoom(data.mapData.zoom);
			Map.adressesMap.setCenter(
				// eslint-disable-next-line no-undef
				new google.maps.LatLng(data.mapData.center.lat, data.mapData.center.lng)
			);
			Map.clearPoints(Map.adressesMap);
			MAP_DATA_ADDRESSES[index].pointsData.forEach(point => {
				Map.setPoint(Map.adressesMap, point);
			});
		}
	}
}

export default new Addresses();
