const ClassName = {
	ACTIVE: '_active',
	NEIGHBOR: '_neighbor',
	OPENING: '_opening',
	CLOSING: '_closing',
	TYPE_A: '_a',
	TYPE_B: '_b',
	PREV: '_prev',
	NEXT: '_next',
};

const MOBILE_BREAKPOINT = 640;
const TABLET_BREAKPOINT = 992;

class Team {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('[data-team-list]');

		if (!this.container) {
			return;
		}

		this.items = this.container.querySelectorAll('[data-team-item]');

		this.onListClick = this.onListClick.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);

		this.container.addEventListener('click', this.onListClick);
		window.addEventListener('resize', this.onWindowResize);

		this.onWindowResize();
	}
	onListClick(evt) {
		const listItem = evt.target.closest('[data-team-item]');

		if (listItem) {
			evt.preventDefault();

			const isActive = listItem.classList.contains(ClassName.ACTIVE);

			isActive ? this.closeItem(listItem) : this.openItem(listItem);
		}
	}
	openItem(item) {
		if (window.innerWidth > MOBILE_BREAKPOINT) {
			if (this.activeItem) {
				this.closeItem(this.activeItem);

				clearTimeout(this.TO2);
				this.TO2 = setTimeout(() => {
					this.openItem(item);
				}, 350);
				return;
			}
		}

		if (this.isAnimating) {
			return;
		}
		this.activeItem = item;

		if (window.innerWidth > MOBILE_BREAKPOINT) {
			this.neighborElement = this.getNeighborElement(item);
		}

		this.activeItem.classList.add(ClassName.ACTIVE);

		if (window.innerWidth > MOBILE_BREAKPOINT) {
			this.addNeighborClass();

			this.isAnimating = true;
			item.classList.add(ClassName.OPENING);
			clearTimeout(this.TO);
			this.TO = setTimeout(() => {
				this.isAnimating = false;
				item.classList.remove(ClassName.OPENING);
			}, 300);
		}
	}
	closeItem(item) {
		if (this.isAnimating) {
			return;
		}

		item.classList.remove(ClassName.ACTIVE);
		this.removeNeighborClass();
		this.activeItem = null;

		if (window.innerWidth > MOBILE_BREAKPOINT) {
			this.isAnimating = true;
			item.classList.add(ClassName.CLOSING);
			clearTimeout(this.TO);
			this.TO = setTimeout(() => {
				this.isAnimating = false;
				item.classList.remove(ClassName.CLOSING);
			}, 300);
		}
	}
	getNeighborElement(item) {
		const obj = { prev: null, prev2: null, next: null, next2: null };

		obj.prev = item.previousElementSibling;
		if (obj.prev) {
			obj.prev2 = obj.prev.previousElementSibling;
		}
		obj.next = item.nextElementSibling;
		if (obj.next) {
			obj.next2 = obj.next.nextElementSibling;
		}

		return obj;
	}
	addNeighborClass() {
		this.items.forEach(item => {
			item.classList.remove(ClassName.TYPE_A);
			item.classList.remove(ClassName.TYPE_B);
			item.classList.remove(ClassName.PREV);
		});

		for (const [pos, element] of Object.entries(this.neighborElement)) {
			if (element) {
				element && element.classList.add(ClassName.NEIGHBOR);
				element.classList.remove(ClassName.PREV);
				(pos === 'prev' || pos === 'prev2') && element.classList.add(ClassName.PREV);
			}
		}

		const cardsA = this.container.querySelectorAll(
			'[data-team-item]:nth-child(4n+1), [data-team-item]:nth-child(4n+2)'
		);
		const cardsLaptopA = this.container.querySelectorAll('[data-team-item]:nth-child(3n+1)');
		const cardsLaptopB = this.container.querySelectorAll('[data-team-item]:nth-child(3n+3)');

		if (window.innerWidth > TABLET_BREAKPOINT) {
			cardsA.forEach(item => item.classList.add(ClassName.TYPE_A));
		} else {
			cardsLaptopA.forEach(item => item.classList.add(ClassName.TYPE_A));
			cardsLaptopB.forEach(item => item.classList.add(ClassName.TYPE_B));
		}

		if (window.innerWidth > TABLET_BREAKPOINT) {
			if (this.activeItem.classList.contains(ClassName.TYPE_A)) {
				this.neighborElement.prev && this.neighborElement.prev.classList.remove(ClassName.NEIGHBOR);
				this.neighborElement.prev2 &&
					this.neighborElement.prev2.classList.remove(ClassName.NEIGHBOR);
			} else {
				this.neighborElement.next && this.neighborElement.next.classList.remove(ClassName.NEIGHBOR);
				this.neighborElement.next2 &&
					this.neighborElement.next2.classList.remove(ClassName.NEIGHBOR);
			}
		} else if (window.innerWidth > MOBILE_BREAKPOINT) {
			if (this.activeItem.classList.contains(ClassName.TYPE_A)) {
				this.neighborElement.prev && this.neighborElement.prev.classList.remove(ClassName.NEIGHBOR);
				this.neighborElement.prev2 &&
					this.neighborElement.prev2.classList.remove(ClassName.NEIGHBOR);
			} else if (this.activeItem.classList.contains(ClassName.TYPE_B)) {
				this.neighborElement.next && this.neighborElement.next.classList.remove(ClassName.NEIGHBOR);
				this.neighborElement.next2 &&
					this.neighborElement.next2.classList.remove(ClassName.NEIGHBOR);
			} else {
				this.neighborElement.prev2 &&
					this.neighborElement.prev2.classList.remove(ClassName.NEIGHBOR);
				this.neighborElement.next2 &&
					this.neighborElement.next2.classList.remove(ClassName.NEIGHBOR);
			}
		}
	}
	removeNeighborClass() {
		if (this.neighborElement) {
			for (const [, element] of Object.entries(this.neighborElement)) {
				element && element.classList.remove(ClassName.NEIGHBOR);
			}
		}
	}
	onWindowResize() {
		const activeItems = this.container.querySelectorAll(`[data-team-item].${ClassName.ACTIVE}`);

		activeItems.length > 0 &&
			activeItems.forEach(item => {
				this.closeItem(item);
			});
	}
}

export default new Team();
