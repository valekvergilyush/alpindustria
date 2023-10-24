import Swiper, { Navigation, Pagination } from 'swiper';

class ArticleSlider {
	constructor() {
		this.sliderBlocks = document.querySelectorAll('[data-article-slider]');
		this.init();
	}

	init() {
		if (!this.sliderBlocks.length) {
			return;
		}
		this.sliderBlocks.forEach(slider => {
			this.initSlider(slider);

			window.addEventListener('resize', () => {
				this.initSlider(slider);
			});
		});
	}

	initSlider(slider) {
		const slides = slider.querySelectorAll('.article-slider__product:not(._empty)');
		if (slides.length < 3) return;

		const articleSlider = slider.querySelector('.article-slider');
		articleSlider.classList.add('_md');

		const windowWidth = window.innerWidth;

		if (
			(windowWidth <= 992 && slides.length > 3) ||
			(windowWidth <= 640 && slides.length > 2) ||
			slides.length > 4
		) {
			if (!slider.slider) {
				slider.slider = this.initSwiper(slider);
			}
		} else if (slider.slider) {
			slider.slider.destroy();
			slider.slider = null;
		}
	}

	initSwiper(slider) {
		const buttonPrev = slider.querySelector('.swiper-button-prev');
		const buttonNext = slider.querySelector('.swiper-button-next');
		const paginationEl = slider.querySelector('.swiper-pagination');

		return new Swiper(slider, {
			modules: [Navigation, Pagination],
			slidesPerView: 'auto',
			loop: false,
			pagination: {
				el: paginationEl,
				type: 'bullets',
			},
			navigation: {
				prevEl: buttonPrev,
				nextEl: buttonNext,
			},
		});
	}
}

export default new ArticleSlider();
