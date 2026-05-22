const DURATION = 400;
const MOBILE_BREAKPOINT = 768;

class ClimbingDirections {
	constructor() {
		this.lists = document.querySelectorAll('[data-directions-list]');
		if (!this.lists.length) return;
		this.openItems = new Map();
		this.lists.forEach(list => this.bind(list));
		window.addEventListener('resize', () => this.handleResize());
	}

	isMobile() {
		return window.innerWidth <= MOBILE_BREAKPOINT;
	}

	bind(list) {
		list.addEventListener('click', (e) => {
			const openBtn = e.target.closest('[data-direction-open]');
			const closeBtn = e.target.closest('[data-direction-close]');
			if (openBtn) {
				const item = openBtn.closest('[data-direction]');
				if (!item) return;
				if (this.isMobile()) {
					item.classList.toggle('_open');
				} else if (!item.classList.contains('_open')) {
					this.open(list, item);
				}
			} else if (closeBtn) {
				const item = closeBtn.closest('[data-direction]');
				if (item) this.close(list, item);
			}
		});
	}

	handleResize() {
		if (this.isMobile()) return;
		this.openItems.forEach((_, item) => {
			const list = item.parentNode;
			if (!list) return;
			const listRect = list.getBoundingClientRect();
			item.style.transition = 'none';
			item.style.top = '0px';
			item.style.left = '0px';
			item.style.width = `${listRect.width}px`;
			item.style.height = `${listRect.height}px`;
		});
	}

	open(list, item) {
		const listRect = list.getBoundingClientRect();
		const itemRect = item.getBoundingClientRect();

		const startTop = itemRect.top - listRect.top;
		const startLeft = itemRect.left - listRect.left;
		const startW = itemRect.width;
		const startH = itemRect.height;

		item.style.position = 'absolute';
		item.style.top = `${startTop}px`;
		item.style.left = `${startLeft}px`;
		item.style.width = `${startW}px`;
		item.style.height = `${startH}px`;
		item.style.transition = 'none';

		// force reflow
		void item.offsetWidth;

		list.classList.add('_has-open');
		item.classList.add('_open');

		item.style.transition = `top ${DURATION}ms ease, left ${DURATION}ms ease, width ${DURATION}ms ease, height ${DURATION}ms ease`;
		item.style.top = '0px';
		item.style.left = '0px';
		item.style.width = `${listRect.width}px`;
		item.style.height = `${listRect.height}px`;

		this.openItems.set(item, true);

		const panel = item.querySelector('.climbing-directions__panel');
		if (panel) panel.setAttribute('aria-hidden', 'false');

		const header = document.querySelector('.page__header');
		const headerHeight = header ? header.getBoundingClientRect().height : 0;
		const offset = 16;
		const topClipped = listRect.top < headerHeight + offset;
		const bottomClipped = listRect.bottom > window.innerHeight;
		if (topClipped || bottomClipped) {
			window.scrollTo({
				top: window.scrollY + listRect.top - headerHeight - offset,
				behavior: 'smooth',
			});
		}
	}

	close(list, item) {
		const listRect = list.getBoundingClientRect();
		// compute the original cell position by temporarily removing absolute positioning
		const placeholder = document.createElement('li');
		placeholder.style.visibility = 'hidden';
		placeholder.className = item.className.replace('_open', '').trim();
		item.parentNode.insertBefore(placeholder, item);
		const targetRect = placeholder.getBoundingClientRect();
		placeholder.remove();

		const targetTop = targetRect.top - listRect.top;
		const targetLeft = targetRect.left - listRect.left;
		const targetW = targetRect.width;
		const targetH = targetRect.height;

		item.style.transition = `top ${DURATION}ms ease, left ${DURATION}ms ease, width ${DURATION}ms ease, height ${DURATION}ms ease`;
		item.style.top = `${targetTop}px`;
		item.style.left = `${targetLeft}px`;
		item.style.width = `${targetW}px`;
		item.style.height = `${targetH}px`;

		const panel = item.querySelector('.climbing-directions__panel');
		if (panel) panel.setAttribute('aria-hidden', 'true');

		this.openItems.delete(item);

		const cleanup = () => {
			item.removeEventListener('transitionend', cleanup);
			item.classList.remove('_open');
			list.classList.remove('_has-open');
			item.style.cssText = '';
		};
		item.addEventListener('transitionend', cleanup, { once: true });
	}
}

export default new ClimbingDirections();
