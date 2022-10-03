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
const INFO_MAX_WIDTH = 295;

class Map {
	constructor() {
		this.mapBlock = document.querySelector(`[data-map]`);
		this.init();
	}
	init() {
		console.log('map');
		if (!this.mapBlock) {
			return;
		}
		this.initMap();
	}
	initMap() {
		const gApiKey = `AIzaSyAghvGrW2kSxzqP6cfhFoP5GOuSUd6as8o`;
		const gmapApi = new GoogleMapsApi(gApiKey);

		gmapApi.load().then(() => {
			this.renderMap();
		});
	}
	renderMap() {
		this.opts = {
			center: {
				lat: 40.712784,
				lng: -74.005941,
			},
			zoom: 11,
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
		this.map = new google.maps.Map(this.mapBlock, this.opts);

		// marker
		const markerOptions = {
			map: this.map,
			position: {
				lat: 40.712784,
				lng: -73.994606,
			},
		};
		markerOptions.icon = {
			url: 'https://snazzy-maps-cdn.azureedge.net/assets/marker-e72f515f-d133-42c0-a793-917b85ff4d9a.svg',
			// eslint-disable-next-line no-undef
			scaledSize: new google.maps.Size(52, 80),
			// eslint-disable-next-line no-undef
			size: new google.maps.Size(52, 80),
			// eslint-disable-next-line no-undef
			anchor: new google.maps.Point(26, 80),
		};
		markerOptions.options = {
			optimized: true,
		};
		// eslint-disable-next-line no-undef
		const marker = new google.maps.Marker(markerOptions);

		// InfoWindow content
		const content =
			'<div class="map-popup">' +
			'<h3 class="p2">г. Санкт-Петербург, наб. Черной речки, д. 6 (ст.м. Черная Речка)</h3>' +
			'<p class="p3">Ежедневно c 10:00 до 22:00</p>' +
			'<p class="p3">Телефон: +7 (812) 242-11-95</p>' +
			'<a href="#" class="h7 ttu">Выбрать магазин</a>' +
			'</div>';

		// eslint-disable-next-line no-undef
		const infowindow = new google.maps.InfoWindow({
			content: content,
			maxWidth: INFO_MAX_WIDTH,
		});
		// eslint-disable-next-line no-undef
		google.maps.event.addListener(marker, 'click', function () {
			infowindow.open(this.map, marker);
		});
		// eslint-disable-next-line no-undef
		google.maps.event.addListener(this.map, 'click', function () {
			infowindow.close();
		});
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
