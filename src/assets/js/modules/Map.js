import GoogleMapsApi from '../helpers/google-map-api';

const MAP_STYLES = [
	{
		featureType: 'water',
		elementType: 'geometry',
		stylers: [
			{
				color: '#e9e9e9',
			},
			{
				lightness: 17,
			},
		],
	},
	{
		featureType: 'landscape',
		elementType: 'geometry',
		stylers: [
			{
				color: '#f5f5f5',
			},
			{
				lightness: 20,
			},
		],
	},
	{
		featureType: 'road.highway',
		elementType: 'geometry.fill',
		stylers: [
			{
				color: '#ffffff',
			},
			{
				lightness: 17,
			},
		],
	},
	{
		featureType: 'road.highway',
		elementType: 'geometry.stroke',
		stylers: [
			{
				color: '#ffffff',
			},
			{
				lightness: 29,
			},
			{
				weight: 0.2,
			},
		],
	},
	{
		featureType: 'road.arterial',
		elementType: 'geometry',
		stylers: [
			{
				color: '#ffffff',
			},
			{
				lightness: 18,
			},
		],
	},
	{
		featureType: 'road.local',
		elementType: 'geometry',
		stylers: [
			{
				color: '#ffffff',
			},
			{
				lightness: 16,
			},
		],
	},
	{
		featureType: 'poi',
		elementType: 'geometry',
		stylers: [
			{
				color: '#f5f5f5',
			},
			{
				lightness: 21,
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'geometry',
		stylers: [
			{
				color: '#dedede',
			},
			{
				lightness: 21,
			},
		],
	},
	{
		elementType: 'labels.text.stroke',
		stylers: [
			{
				visibility: 'on',
			},
			{
				color: '#ffffff',
			},
			{
				lightness: 16,
			},
		],
	},
	{
		elementType: 'labels.text.fill',
		stylers: [
			{
				saturation: 36,
			},
			{
				color: '#333333',
			},
			{
				lightness: 40,
			},
		],
	},
	{
		elementType: 'labels.icon',
		stylers: [
			{
				visibility: 'off',
			},
		],
	},
	{
		featureType: 'transit',
		elementType: 'geometry',
		stylers: [
			{
				color: '#f2f2f2',
			},
			{
				lightness: 19,
			},
		],
	},
	{
		featureType: 'administrative',
		elementType: 'geometry.fill',
		stylers: [
			{
				color: '#fefefe',
			},
			{
				lightness: 20,
			},
		],
	},
	{
		featureType: 'administrative',
		elementType: 'geometry.stroke',
		stylers: [
			{
				color: '#fefefe',
			},
			{
				lightness: 17,
			},
			{
				weight: 1.2,
			},
		],
	},
];
const CONTENT = `
	<div class="map-popup">
		<h3>г. Санкт-Петербург, наб. Черной речки, д. 6 (ст.м. Черная Речка)</h3>
		<p>Ежедневно c 10:00 до 22:00</p>
		<p>Телефон: <a href="tel:+78122421195">+7 (812) 242-11-95</a></p>
		<a href="#" class="choose ttu">Выбрать магазин</a>
	</div>`;
const ADDRESSES_CONTENT = `
	<div class="map-popup">
		<h3>г. Санкт-Петербург, наб. Черной речки, д. 6 (ст.м. Черная Речка)</h3>
		<p>Ежедневно c 10:00 до 22:00</p>
		<p>Телефон: <a href="tel:+78122421195">+7 (812) 242-11-95</a></p>
	</div>`;
const gApiKey = `AIzaSyAghvGrW2kSxzqP6cfhFoP5GOuSUd6as8o`;
const MAP_DATA_CART = {
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
};
const MAP_DATA_ADDRESSES = {
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
			content: ADDRESSES_CONTENT,
		},
		{
			position: {
				lat: 40.712784,
				lng: -74.1,
			},
			content: ADDRESSES_CONTENT,
		},
	],
};

class Map {
	constructor() {
		this.mapBlock = document.querySelector(`[data-map]`);
		this.init();
	}
	init() {
		if (!this.mapBlock) {
			return;
		}
		this.initMap();
	}
	initMap() {
		const gmapApi = new GoogleMapsApi(gApiKey);

		gmapApi.load().then(() => {
			//cart map
			const cartMapBlocks = document.querySelectorAll(`[data-map="cart"]`);
			const addressMapBlock = document.querySelector(`[data-map="address"]`);
			if (cartMapBlocks.length) {
				cartMapBlocks.forEach(cartMapBlock => {
					this.renderMap(cartMapBlock, MAP_DATA_CART);
				});
			}
			if (addressMapBlock) {
				this.adressesMap = this.renderMap(addressMapBlock, MAP_DATA_ADDRESSES);
			}
		});
	}
	renderMap(mapBlock, data) {
		this.opts = {
			...data.mapData,
			styles: MAP_STYLES,
			maxZoom: 20,
			minZoom: 0,
			mapTypeId: 'roadmap',
		};

		this.opts.clickableIcons = true;
		this.opts.disableDoubleClickZoom = false;
		this.opts.draggable = true;
		this.opts.keyboardShortcuts = true;
		this.opts.scrollwheel = false;

		this.setControlOptions('fullscreen', false, 'DEFAULT', '', null);
		this.setControlOptions('mapType', false, 'DEFAULT', 'DEFAULT', [
			'roadmap',
			'satellite',
			'terrain',
		]);
		this.setControlOptions('rotate', false, 'DEFAULT', '', null);
		this.setControlOptions('scale', false, '', '', null);
		this.setControlOptions('streetView', false, 'DEFAULT', '', null);
		this.setControlOptions('zoom', true, 'LEFT_BOTTOM', '', null);
		// eslint-disable-next-line no-undef
		const googleMap = new google.maps.Map(mapBlock, this.opts);
		googleMap.markers = [];

		data.pointsData.forEach(point => {
			this.setPoint(googleMap, point);
		});

		return googleMap;
	}

	setPoint(map, pointData) {
		const markerOptions = {
			map: map,
			position: pointData.position,
		};
		markerOptions.icon = {
			url: '/assets/images/cart/marker.svg',
			// eslint-disable-next-line no-undef
			scaledSize: new google.maps.Size(52, 80),
			// eslint-disable-next-line no-undef
			size: new google.maps.Size(52, 80),
			// eslint-disable-next-line no-undef
			anchor: new google.maps.Point(26, 80),
		};
		markerOptions.options = {
			optimized: false,
		};
		// eslint-disable-next-line no-undef
		const marker = new google.maps.Marker(markerOptions);
		map.markers.push(marker);
		// eslint-disable-next-line no-undef
		const infowindow = new google.maps.InfoWindow({
			content: pointData.content,
		});
		// eslint-disable-next-line no-undef
		google.maps.event.addListener(marker, 'click', function () {
			infowindow.open(map, marker);
		});
		// eslint-disable-next-line no-undef
		google.maps.event.addListener(map, 'click', function () {
			infowindow.close();
		});
	}

	clearPoints(map) {
		map.markers.forEach(marker => {
			marker.setMap(null);
		});
		map.markers = [];
	}

	setControlOptions(key, enabled, position, style, mapTypeIds) {
		this.opts[key + 'Control'] = enabled;
		this.opts[key + 'ControlOptions'] = {
			// eslint-disable-next-line no-undef
			position: google.maps.ControlPosition[position],
			// eslint-disable-next-line no-undef
			style: google.maps.MapTypeControlStyle[style],
			mapTypeIds: mapTypeIds,
		};
	}
}

export default new Map();
