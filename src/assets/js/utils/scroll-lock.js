import { lock, unlock } from 'tua-body-scroll-lock';

const body = document.querySelector('body');

export default {
	enable() {
		body.style.overflow = 'hidden';
		lock();
	},
	disable() {
		body.style.removeProperty('overflow');
		unlock();
	},
};
