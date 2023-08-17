import Swiper, { Navigation, Pagination } from 'swiper';

class Activities {
	constructor() {
		this.init();
	}

	init() {
		const container = document.querySelector('.activities__slider');

		if (!container) {
			return;
		}

		const buttonPrev = container.querySelector('.swiper-button-prev');
		const buttonNext = container.querySelector('.swiper-button-next');
		const paginationEl = container.querySelector('.swiper-pagination');

		this.slider = new Swiper(container, {
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
					centeredSlides: false,
				},
			},
		});
	}
}

export default new Activities();
