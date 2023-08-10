import Header from '../../../includes/header/header';

const body = document.querySelector('body');

let scrollPosition = 0;

export default {
	enable() {
		scrollPosition = window.scrollY;
		body.style.overflow = 'hidden';
		body.style.position = 'fixed';
		body.style.top = `-${scrollPosition}px`;
		body.style.width = '100%';
		setTimeout(() => {
			Header.hideHeader();
		}, 200);
	},
	disable() {
		body.style.removeProperty('overflow');
		body.style.removeProperty('position');
		body.style.removeProperty('top');
		body.style.removeProperty('width');
		window.scrollTo(0, scrollPosition);
		setTimeout(() => {
			Header.showHeader();
		}, 200);
	},
};
