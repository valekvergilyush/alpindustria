const body = document.querySelector('body');

let scrollPosition = 0;

export default {
	enable() {
		scrollPosition = window.scrollY;
		body.style.overflow = 'hidden';
		body.style.position = 'fixed';
		document.querySelector('.wrapper').style.top = `-${scrollPosition}px`;
		body.style.width = '100%';
	},
	disable() {
		body.style.removeProperty('overflow');
		body.style.removeProperty('position');
		document.querySelector('.wrapper').style.removeProperty('top');
		body.style.removeProperty('width');
		window.scrollTo(0, scrollPosition);
	},
};
