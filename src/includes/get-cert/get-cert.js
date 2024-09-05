import gsap from 'gsap';
import LockScroll from '../../assets/js/utils/scroll-lock';
import AnchorLinks from '../../assets/js/modules/AnchorLinks';

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

		LockScroll.enable();
		this.showLoader();

		setTimeout(() => {
			this.hideLoader();
			this._initAnim();
		}, 1200);
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

		const mm = gsap.matchMedia();

		mm.add('(min-width: 769px)', () => {
			gsap
				.timeline({
					ease: 'Power4.out',
				})
				.from(layers[0], {
					scale: 2,
					bottom: '10%',
					right: '20.5%',
					filter: 'blur(0px)',
					duration: 3,
				})
				.from(
					layers[1],
					{
						scale: 2,
						bottom: '-100%',
						left: '-13%',
						filter: 'blur(0px)',
						duration: 2.8,
					},
					'<'
				)
				.from(
					layers[2],
					{
						scale: 2,
						right: '30%',
						bottom: '-110%',
						duration: 3,
					},
					'<'
				)
				.from(
					layers[3],
					{
						scale: 1.2,
						bottom: '-90%',
						duration: 2.2,
					},
					'<0.8'
				)
				.from(
					layers[4],
					{
						bottom: '-50%',
						duration: 1.4,
					},
					'<0.8'
				)
				.from(contentEl, {
					xPercent: 100,
					duration: 0.8,
				});
		});
		mm.add('(max-width: 768px)', () => {
			gsap
				.timeline({
					ease: 'Power4.out',
					onComplete: () => {
						LockScroll.disable();
						AnchorLinks.scrollTo(contentEl);
					},
				})
				.from(layers[0], {
					scale: 2,
					bottom: '10%',
					right: '20.5%',
					filter: 'blur(0px)',
					duration: 3,
				})
				.from(
					layers[1],
					{
						scale: 2,
						bottom: '-50%',
						left: '-13%',
						filter: 'blur(0px)',
						duration: 2.8,
					},
					'<'
				)
				.from(
					layers[2],
					{
						scale: 2,
						right: '30%',
						bottom: '-80%',
						duration: 3,
					},
					'<'
				)
				.from(
					layers[3],
					{
						scale: 1.2,
						bottom: '-90%',
						duration: 2.2,
					},
					'<0.8'
				)
				.from(
					layers[4],
					{
						bottom: '-50%',
						duration: 1.4,
					},
					'<0.8'
				);
		});
	}
}

export default new GetCert();
