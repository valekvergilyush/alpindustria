import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

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
			Hero: require('../../includes/hero/hero').default,
			Cart: require('../../includes/cart/cart').default,
		};
		this.helpers = {
			ScrollHelper: require('./helpers/ScrollHelper'),
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
		};
		document.addEventListener('DOMContentLoaded', () => {
			document.documentElement.classList.remove('_loading');

			document
				.querySelectorAll('.page__menu [data-accordion-toggle]')
				.forEach(toggle => new this.modules.Accordion(toggle));

			document.querySelectorAll('[data-range]').forEach(item => new this.modules.RangeSlider(item));
			document.querySelectorAll('[data-tabs]').forEach(tabs => new this.components.Tabs(tabs));
		});
	}
}

global.ProjectApp = new AlpIndustry();

if (module.hot) {
	module.hot.accept();
}
