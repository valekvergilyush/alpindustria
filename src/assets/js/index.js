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
		this.modules = {};
		document.addEventListener('DOMContentLoaded', () => {
			document.documentElement.classList.remove('_loading');
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
