import { gsap } from 'gsap';

// import { ScrollToPlugin } from 'gsap/ScrollToPlugin.js';
// gsap.registerPlugin(ScrollToPlugin);

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
		};
		this.helpers = {};
		this.modules = {
			RangeSlider: require('./modules/RangeSlider').default,
			Accordion: require('./modules/Accordion').default,
		};
		document.addEventListener('DOMContentLoaded', () => {
			document.documentElement.classList.remove('_loading');

			document
				.querySelectorAll('[data-accordion-toggle]')
				.forEach(toggle => new this.modules.Accordion(toggle));

			document.querySelectorAll('[data-range]').forEach(item => new this.modules.RangeSlider(item));
		});

		const calculateVh = () => {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', vh + 'px');
		};

		calculateVh();
		window.addEventListener('resize', calculateVh);
		window.addEventListener('orientationchange', calculateVh);
	}
}

global.ProjectApp = new AlpIndustry();

if (module.hot) {
	module.hot.accept();
}
