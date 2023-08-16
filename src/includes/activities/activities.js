import Flickity from 'flickity';

class Activities {
	constructor() {
		this.init();
	}

	init() {
		const container = document.querySelector('.activities__slider');

		if (!container) {
			return;
		}

		const sliderContainer = document.querySelector('[data-activities-slider]');
		const buttonPrev = container.querySelector('.activities__button.prev');
		const buttonNext = container.querySelector('.activities__button.next');

		this.slider = new Flickity(sliderContainer, {
			cellSelector: '[data-activities-slider] li',
			cellAlign: 'left',
			groupCells: 4,
			contain: true,
			pageDots: true,
			prevNextButtons: false,
			draggable: true,
		});

		const onChange = index => {
			if (index === 0) {
				buttonPrev.setAttribute('disabled', true);
			} else {
				buttonPrev.removeAttribute('disabled');
			}
			if (index === this.slider.slides.length - 1) {
				buttonNext.setAttribute('disabled', true);
			} else {
				buttonNext.removeAttribute('disabled');
			}
		};

		const onResize = () => {
			if (window.innerWidth < 1024) {
				this.slider.destroy();
				this.slider = new Flickity(sliderContainer, {
					cellSelector: '[data-activities-slider] li',
					cellAlign: 'left',
					groupCells: 3,
					contain: true,
					pageDots: true,
					prevNextButtons: false,
					draggable: true,
				});
			}
			if (window.innerWidth < 768) {
				this.slider.destroy();
				this.slider = new Flickity(sliderContainer, {
					cellSelector: '[data-activities-slider] li',
					pageDots: true,
					prevNextButtons: false,
					draggable: true,
				});
			}

			this.slider.on('change', onChange);
		};

		window.addEventListener('resize', onResize);
		buttonPrev.addEventListener('click', () => {
			this.slider.previous();
		});
		buttonNext.addEventListener('click', () => {
			this.slider.next();
		});
		onResize();
	}
}

export default new Activities();
