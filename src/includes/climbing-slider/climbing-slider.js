import Swiper, { Navigation, Pagination } from 'swiper';

class ClimbingSlider {
	constructor() {
		this.init();
	}

	init() {
		const containers = document.querySelectorAll('[data-climbing-slider]');

		if (!containers.length) {
			return;
		}

		this.sliders = [];

		containers.forEach((container) => {
			const root = container.closest('.climbing-slider__container') || container.parentElement;
			const buttonPrev = root.querySelector('[data-climbing-slider-prev]');
			const buttonNext = root.querySelector('[data-climbing-slider-next]');
			const paginationEl = container.querySelector('.swiper-pagination');

			const slider = new Swiper(container, {
				modules: [Navigation, Pagination],
				slidesPerView: 1,
				spaceBetween: 0,
				loop: true,
				pagination: {
					el: paginationEl,
					type: 'bullets',
					clickable: true,
				},
				navigation: {
					prevEl: buttonPrev,
					nextEl: buttonNext,
				},
			});

			this.sliders.push(slider);
		});
	}
}

export default new ClimbingSlider();
