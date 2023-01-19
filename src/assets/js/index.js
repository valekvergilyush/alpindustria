import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { listen } from 'quicklink';

const TABLET_BREAKPOINT = 768;

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
		this.modules = {
			LottieAnimations: require('./modules/LottieAnimations').default,
			RangeSlider: require('./modules/RangeSlider').default,
			Accordion: require('./modules/Accordion').default,
			AnchorLinks: require('./modules/AnchorLinks').default,
			FilterSubcategory: require('./modules/FilterSubcategory').default,
			FilterRent: require('./modules/FilterRent').default,
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
			ArticleSlider: require('./modules/ArticleSlider').default,
			AddressesScroll: require('./modules/AddressesScroll').default,
			Services: require('./modules/Services').default,
			Search: require('./modules/Search').default,
			DiscountCard: require('./modules/DiscountCard').default,
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
			HeroCatalog: require('../../includes/hero-catalog/hero-catalog').default,
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
			ClassSlider: require('../../includes/class-slider/class-slider').default,
			HeroTrails: require('../../includes/hero-trails/hero-trails').default,
			TrailVideo: require('../../includes/trail-video/trail-video').default,
			DiscountCreateForm: require('../../includes/discount-create-form/discount-create-form')
				.default,
			Addresses: require('../../includes/addresses/addresses').default,
			HeroIndex: require('../../includes/hero-index/hero-index').default,
			CommunityIndex: require('../../includes/community-index/community-index').default,
			BannerSection: require('../../includes/banner-section/banner-section').default,
			AboutSlider: require('../../includes/about-slider/about-slider').default,
			Team: require('../../includes/team/team').default,
			Timeline: require('../../includes/timeline/timeline').default,
			Auth: require('../../includes/auth/auth').default,
			PersonalDataForm: require('../../includes/personal-data-form/personal-data-form').default,
			ProductCard: require('../../includes/components/product-card/product-card').default,
			Tooltip: require('../../includes/components/tooltip/tooltip').default,
			Class: require('../../includes/class/class').default,
			WishlistServices: require('../../includes/wishlist-services/wishlist-services').default,
			SubscribeForm: require('../../includes/subscribe-form/subscribe-form').default,
			ClubCardForm: require('../../includes/club-card-form/club-card-form').default,
			ProfileOrder: require('../../includes/components/profile-order/profile-order').default,
			DeliveryAuth: require('../../includes/delivery-auth/delivery-auth').default,
		};
		this.helpers = {
			ScrollHelper: require('./helpers/ScrollHelper'),
			TextSplitter: require('./helpers/TextSplitter').default,
		};

		window.addEventListener('load', () => {
			listen();
		});

		document.addEventListener('DOMContentLoaded', () => {
			document.documentElement.classList.remove('_loading');

			document
				.querySelectorAll('.page__menu [data-accordion-toggle]')
				.forEach(toggle => new this.modules.Accordion(toggle));
			document
				.querySelectorAll('.services-accordion [data-accordion-toggle]')
				.forEach(toggle => new this.modules.Accordion(toggle));
			document
				.querySelectorAll('.profile-purchases [data-accordion-toggle]')
				.forEach(toggle => new this.modules.Accordion(toggle));

			document.querySelectorAll('[data-range]').forEach(item => new this.modules.RangeSlider(item));
			document.querySelectorAll('[data-tabs]').forEach(tabs => new this.components.Tabs(tabs));
			document
				.querySelectorAll('[data-drag-scroll]')
				.forEach(container => new this.modules.DragScroll(container));

			if (window.innerWidth > TABLET_BREAKPOINT) {
				document
					.querySelectorAll('[data-animation="words"]:not(._anim-first)')
					.forEach(item => this.helpers.TextSplitter.split(item).words);
			}

			let hash = window.location.hash;
			if (hash) {
				hash = hash.substring(1);

				this.modules.Popups.close();
				if (this.modules.Popups.getPopup(hash)) {
					this.modules.Popups.open(hash);
				}
			}
		});
	}
}

global.ProjectApp = new AlpIndustry();

if (module.hot) {
	module.hot.accept();
}
