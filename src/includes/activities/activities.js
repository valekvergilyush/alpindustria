import Swiper, { Navigation, Pagination } from 'swiper';

class Activities {
	constructor() {
		this.init();
	}

	init() {
		const containers = document.querySelectorAll('.activities__slider');

		if (!containers.length) {
			return;
		}

		this.sliders = [];

		containers.forEach((container) => {
			const buttonPrev = container.querySelector('.swiper-button-prev');
			const buttonNext = container.querySelector('.swiper-button-next');
			const paginationEl = container.querySelector('.swiper-pagination');

			let slidesPerView = 'auto';
			const isRentCategories = container.hasAttribute('data-rent-categories');

			if (isRentCategories) {
				const slidesCount = container.querySelectorAll('.swiper-slide').length;

				if (slidesCount <= 4) {
					slidesPerView = slidesCount;
					container.classList.add('activities__slider--rent-' + slidesCount);
				} else {
					container.classList.add('activities__slider--rent-many');
				}
			}

			const swiperConfig = {
				modules: [Navigation, Pagination],
				slidesPerView: 'auto',
				centeredSlides: true,
				loop: false,
				pagination: {
					el: paginationEl,
					type: 'bullets',
				},
				navigation: {
					prevEl: buttonPrev,
					nextEl: buttonNext,
				},
				breakpoints: {
					769: {
						slidesPerView: slidesPerView,
						centeredSlides: false,
					},
				},
			};

			if (!isRentCategories) {
				swiperConfig.slidesPerView = slidesPerView;
			}

			const slider = new Swiper(container, swiperConfig);

			this.sliders.push(slider);
		});
	}
}

export default new Activities();
