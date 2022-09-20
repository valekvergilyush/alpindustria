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
			Filters: require('../../includes/filters/filters').default,
			Catalog: require('../../includes/catalog/catalog').default,
			CatalogAccordion: require('../../includes/catalog-accordion/catalog-accordion').default,
			Ticker: require('../../includes/components/ticker/ticker').default,
			// FiltersForm: require('../../includes/filters-form/filters-form').default,
		};
		this.helpers = {};
		this.modules = {
			RangeSlider: require('./modules/RangeSlider').default,
			Accordion: require('./modules/Accordion').default,
			AnchorLinks: require('./modules/AnchorLinks').default,
			FilterSubcategory: require('./modules/FilterSubcategory').default,
			DragScroll: require('./modules/DragScroll').default,
		};
		document.addEventListener('DOMContentLoaded', () => {
			document.documentElement.classList.remove('_loading');

			document
				.querySelectorAll('[data-accordion-toggle]')
				.forEach(toggle => new this.modules.Accordion(toggle));

			document.querySelectorAll('[data-range]').forEach(item => new this.modules.RangeSlider(item));
		});
	}
}

global.ProjectApp = new AlpIndustry();

if (module.hot) {
	module.hot.accept();
}
