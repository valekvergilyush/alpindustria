import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

global.gsap = gsap;

gsap.defaults({
	overwrite: 'auto',
});

class AlpIndustry {
	constructor() {
		this.env = require('./utils/env').default;
		this.utils = require('./utils/utils').default;
		this.classes = {
			Signal: require('./classes/Signal').default,
		};
		this.components = {
			Header: require('../../includes/header/header').default,
			Menu: require('../../includes/menu/menu').default,
			Filters: require('../../includes/filters/filters').default,
			Catalog: require('../../includes/catalog/catalog').default,
			ProductSlider: require('../../includes/components/product-slider/product-slider').default,
			CatalogAccordion: require('../../includes/catalog-accordion/catalog-accordion').default,
			Ticker: require('../../includes/components/ticker/ticker').default,
			Counter: require('../../includes/components/counter/counter').default,
			Tabs: require('../../includes/components/tabs/tabs').default,
			DeliveryAddress: require('../../includes/delivery-address/delivery-address').default,
			Hero: require('../../includes/hero/hero').default,
			Cart: require('../../includes/cart/cart').default,
			InputDate: require('../../includes/components/input-date/input-date').default,
			InputTime: require('../../includes/components/input-time/input-time').default,
			Brands: require('../../includes/brands/brands').default,
			CommunityTabs: require('../../includes/community-tabs/community-tabs').default,
			InputFile: require('../../includes/components/input-file/input-file').default,
			ApplicationForm: require('../../includes/application-form/application-form').default,
			CommunitySlider: require('../../includes/community-slider/community-slider').default,
			CommunityAdvantages: require('../../includes/community-advantages/community-advantages')
				.default,
			TrailVideo: require('../../includes/trail-video/trail-video').default,
		};
		this.helpers = {
			ScrollHelper: require('./helpers/ScrollHelper'),
			TextSplitter: require('./helpers/TextSplitter').default,
		};
		this.modules = {
			RangeSlider: require('./modules/RangeSlider').default,
			Accordion: require('./modules/Accordion').default,
			AnchorLinks: require('./modules/AnchorLinks').default,
			FilterSubcategory: require('./modules/FilterSubcategory').default,
			DragScroll: require('./modules/DragScroll').default,
			Product: require('./modules/Product').default,
			Popups: require('./modules/Popups').default,
			Select: require('./modules/Select').default,
			Availability: require('./modules/Availability').default,
			Input: require('./modules/Input').default,
			WishlistForm: require('./modules/WishlistForm').default,
			Map: require('./modules/Map').default,
			FormValidate: require('./modules/FormValidate').default,
			Notification: require('./modules/Notification').default,
			ShowAnimations: require('./modules/ShowAnimations').default,
		};
		document.addEventListener('DOMContentLoaded', () => {
			document.documentElement.classList.remove('_loading');

			document
				.querySelectorAll('.page__menu [data-accordion-toggle]')
				.forEach(toggle => new this.modules.Accordion(toggle));

			document.querySelectorAll('[data-range]').forEach(item => new this.modules.RangeSlider(item));
			document.querySelectorAll('[data-tabs]').forEach(tabs => new this.components.Tabs(tabs));

			document
				.querySelectorAll('[data-animation="words"]')
				.forEach(item => this.helpers.TextSplitter.split(item).words);
		});
	}
}

global.ProjectApp = new AlpIndustry();

if (module.hot) {
	module.hot.accept();
}
