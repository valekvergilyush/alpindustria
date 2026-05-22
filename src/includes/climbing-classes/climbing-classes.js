import Swiper, { Navigation, Pagination } from 'swiper';

class ClimbingClasses {
	constructor() {
		this.init();
	}

	init() {
		const containers = document.querySelectorAll('[data-climbing-classes]');

		if (!containers.length) {
			return;
		}

		this.sliders = [];

		containers.forEach((container) => {
			const section = container.closest('.climbing-classes') || container.parentElement;
			const buttonPrev = section.querySelector('[data-climbing-classes-prev]');
			const buttonNext = section.querySelector('[data-climbing-classes-next]');
			const paginationEl = container.querySelector('.swiper-pagination');

			const slider = new Swiper(container, {
				modules: [Navigation, Pagination],
				slidesPerView: 'auto',
				spaceBetween: 0,
				loop: false,
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

export default new ClimbingClasses();
