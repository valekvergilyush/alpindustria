import { lock, unlock } from 'tua-body-scroll-lock';
import env from './env';

const HTML_CLASSLIST = document.documentElement.classList;

const ClassName = {
	NO_SCROLL: '_no-scroll',
};

class Scroll {
	disabled(target) {
		if (env.isIOS) {
			document.body.style.overflow = 'hidden';
			document.documentElement.style.overflow = 'hidden';
		} else {
			lock(target);
		}
		HTML_CLASSLIST.add(ClassName.NO_SCROLL);
	}
	enabled(target) {
		if (env.isIOS) {
			document.body.style.overflow = '';
			document.documentElement.style.overflow = '';
		} else {
			unlock(target);
		}
		HTML_CLASSLIST.remove(ClassName.NO_SCROLL);
	}
}

export default new Scroll();
