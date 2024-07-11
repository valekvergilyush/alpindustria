import { Carousel, Fancybox } from '@fancyapps/ui/';
import { Thumbs } from '@fancyapps/ui/dist/carousel/carousel.thumbs.esm';
import { Panzoom } from '@fancyapps/ui/dist/panzoom/panzoom.esm';

const isMobile = () => window.innerWidth < 992;

class ProductSlider {
	constructor() {
		this.container = document.querySelector('[data-product-slider]');

		if (!this.container) {
			return;
		}

		this.container.querySelectorAll('[data-zoom-img]').forEach(img => {
			const zoomImgUrl = img.getAttribute('data-zoom-img');
			img.src = zoomImgUrl;
		});

		this.init();
	}

	init() {
		const slides = this.container.querySelectorAll('.product-slider__slide');
		const resetSlideZoom = slide => {
			if (!slide.panzoom) {
				return;
			}
			slide.zoomed = false;
			slide.panzoom.reset();
			slide.contentEl.classList.add('can-zoom_in');
		};
		Fancybox.bind('[data-fancybox="gallery"]', {
			idle: false,
			compact: false,
			dragToClose: false,
			animated: false,
			showClass: 'f-fadeSlowIn',
			hideClass: false,
			contentClick: 'zoomToMax',
			on: {
				'Carousel.change': fancybox => {
					const slide = fancybox.getSlide();
					resetSlideZoom(slide);
				},
				reveal: fancybox => {
					const slide = fancybox.getSlide();
					resetSlideZoom(slide);
				},
				'Carousel.click': fancybox => {
					const slide = fancybox.getSlide();
					if (slide.zoomed) {
						resetSlideZoom(slide);
					} else {
						slide.zoomed = true;
						slide.contentEl.classList.remove('can-zoom_in');
					}
				},
			},

			Carousel: {
				infinite: false,
			},

			Images: {
				zoom: false,
				Panzoom: {
					maxScale: 1,
				},
			},

			Toolbar: {
				display: {
					left: [],
					middle: [],
					right: ['close'],
				},
			},

			Thumbs: {
				type: 'classic',
				Carousel: {
					axis: 'x',

					slidesPerPage: 1,
					Navigation: true,
					center: true,
					fill: true,
					dragFree: true,

					breakpoints: {
						'(min-width: 993px)': {
							axis: 'y',
						},
					},
				},
			},
		});

		new Carousel(
			this.container,
			{
				infinite: false,
				Dots: false,
				Thumbs: {
					type: 'classic',
					Carousel: {
						dragFree: false,
						slidesPerPage: 'auto',
						Navigation: true,

						axis: 'x',
						breakpoints: {
							'(min-width: 993px)': {
								axis: 'y',
							},
						},
					},
				},
				on: {
					ready: () => {
						const options = {
							panMode: 'mousemove',
							mouseMoveFactor: 1.25,
							click: false,
							wheel: false,
							maxScale: 1,
						};

						const initPanzoom = el => {
							if (el.hasAttribute('data-video') || isMobile()) {
								return;
							}

							const instance = new Panzoom(el, options);
							el.panzoom = instance;

							el.addEventListener('mouseenter', evt => {
								if (!evt.buttons) {
									instance.zoomToMax(evt);
								}
							});

							el.addEventListener('mouseleave', () => {
								instance.reset();
							});
						};
						const destroyPanzoom = el => {
							if (el.panzoom) {
								el.panzoom.destroy();
								el.panzoom = null;
							}
						};

						this.container.parentElement.classList.add('is-inited');
						slides.forEach(el => {
							initPanzoom(el);
						});

						window.addEventListener('resize', () => {
							slides.forEach(el => {
								if (isMobile()) {
									destroyPanzoom(el);
								} else {
									!el.panzoom && initPanzoom(el);
								}
							});
						});

						setTimeout(() => {
							const thumbs = this.container.parentElement.querySelectorAll('.f-thumbs__slide');
							thumbs.forEach(thumb => {
								const index = thumb.dataset.index;
								const el = document.querySelector(`.product-slider__slide[data-video="${index}"]`);
								if (el) {
									thumb.classList.add('_has-video');
								}
							});
						}, 1000);
					},
				},
			},
			{ Thumbs }
		);
	}
}

export default new ProductSlider();
