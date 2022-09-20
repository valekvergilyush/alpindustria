const HTML_ELEMENT = document.documentElement;
const HTML_CLASSLIST = HTML_ELEMENT.classList;

import utils from '../utils/utils';
import Signal from '../classes/Signal';

const SCROLLED_CLASS = '_scrolled';
const SCROLLED_OFFSET = 80;
const DOWN = 'down';
const UP = 'up';
const CURRENT = 'current';

function ScrollHelper() {
	this.onScroll = new Signal();
	this.onDirectionChange = new Signal();
	this.onScrollUp = new Signal();
	this.onScrollDown = new Signal();

	this.getCurrentScrollTop();
	this.lastScrollTop = this.currentScrollTop;
	this.currentScrollDirection = CURRENT;

	window.addEventListener('scroll', () => {
		this.getCurrentScrollTop();

		if (this.currentScrollTop > SCROLLED_OFFSET) {
			HTML_CLASSLIST.add(SCROLLED_CLASS);
		} else {
			HTML_CLASSLIST.remove(SCROLLED_CLASS);
		}

		this.onScroll.call(this.currentScrollTop);
		this._directionController();
	});
}

ScrollHelper.prototype = {
	getCurrentScrollTop() {
		const currentScrollTop = utils.getCurrentScrollTop();
		this.currentScrollTop = currentScrollTop;
		return currentScrollTop;
	},

	_directionController() {
		let direction;
		const currentScrollTop = this.currentScrollTop;
		const lastScrollTop = this.lastScrollTop;

		if (currentScrollTop > lastScrollTop) {
			direction = DOWN;
		} else if (currentScrollTop < lastScrollTop) {
			direction = UP;
		} else {
			direction = CURRENT;
		}

		this.lastScrollTop = this.currentScrollTop;
		if (this.currentScrollDirection === direction) {
			return;
		}

		this.currentScrollDirection = direction;
		this.onDirectionChange.call(direction);
		if (direction === UP) {
			this.onScrollUp.call();
		} else if (direction === DOWN) {
			this.onScrollDown.call();
		}
	},
};

const instance = new ScrollHelper();
instance.UP = UP;
instance.DOWN = DOWN;
instance.CURRENT = CURRENT;

// module.exports = instance;

export default instance;
