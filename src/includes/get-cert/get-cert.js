import gsap from 'gsap';

const ClassName = {
	HIDDEN: '_hidden',
	LOADER: '_loader',
};

class GetCert {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('[data-get-cert]');

		if (!this.container) {
			return;
		}

		this.loaderEl = this.container.querySelector('[data-loader]');

		this.showLoader();

		setTimeout(() => {
			this.hideLoader();
			this._initAnim();
		}, 1000);
	}

	showLoader() {
		this.loaderEl.classList.remove(ClassName.HIDDEN);
	}

	hideLoader() {
		this.loaderEl.classList.add(ClassName.HIDDEN);
		this.container.classList.remove(ClassName.LOADER);
	}
	_initAnim() {
		const contentEl = this.container.querySelector('[data-get-cert-content]');
		const layers = this.container.querySelectorAll('[data-get-cert-layer]');

		const tl = gsap.timeline({
			ease: 'Power4.out',
		});

		tl.from(
			layers[0],
			{
				scale: 2,
				bottom: '10%',
				right: '20.5%',
				filter: 'blur(0px)',
				duration: 2.5,
			},
			'<'
		)
			.from(
				layers[1],
				{
					scale: 2,
					bottom: '-100%',
					left: '-13%',
					filter: 'blur(0px)',
					duration: 2,
				},
				'<'
			)
			.from(
				layers[2],
				{
					scale: 2,
					right: '30%',
					bottom: '-100%',
					duration: 2,
				},
				'<'
			)
			.from(
				layers[3],
				{
					scale: 1.2,
					bottom: '-90%',
					duration: 2,
				},
				'<+0.5'
			)
			.from(
				layers[4],
				{
					bottom: '-50%',
					duration: 1.5,
				},
				'<+0.9'
			)
			.from(
				contentEl,
				{
					xPercent: 100,
					duration: 0.8,
				},
				'+=0.1'
			);
	}
}

export default new GetCert();
