import { lock, unlock } from 'tua-body-scroll-lock';

const body = document.querySelector('body');

export default {
	enable() {
		lock();
		body.style.overflow = 'hidden';
	},
	disable() {
		unlock();
		body.style.removeProperty('overflow');
	},
};
