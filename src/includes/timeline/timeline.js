import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ClassName = {
	INITED: '_initialized',
	ACTIVE: '_active',
};

class Timeline {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('[data-timeline]');

		if (!this.container) {
			return;
		}

		this.progressBar = this.container.querySelector('[data-timeline-progress]');
		this.links = this.container.querySelectorAll('[data-timeline-link]');
		this.sections = document.querySelectorAll('[data-history-section]');

		this.itemWidth = 100 / (this.links.length - 1);

		this._onLinkClick = this._onLinkClick.bind(this);

		this.links.forEach(link => {
			link.addEventListener('click', this._onLinkClick);
		});

		this.initScrollTrigger();

		this.container.classList.add(ClassName.INITED);
	}
	_onLinkClick(evt) {
		this.setActiveLink(evt.currentTarget);
	}
	setActiveLink(link) {
		if (this.activeLink) {
			this.activeLink.classList.remove(ClassName.ACTIVE);
			this.activeLink.parentElement.classList.remove(ClassName.ACTIVE);
		}
		this.activeLink = link;
		this.activeLink.classList.add(ClassName.ACTIVE);
		this.activeLink.parentElement.classList.add(ClassName.ACTIVE);
		this.activeIndex = Array.from(this.links).indexOf(link);
		this.progress = this.activeIndex === 0 ? 0 : this.activeIndex * this.itemWidth;
		this.progressBar.style.width = `${this.progress}%`;
		this.progressBar.style.height = `100%`;

		this.activeLink.focus();
	}
	initScrollTrigger() {
		const getActiveLink = id => Array.from(this.links).filter(link => link.hash === `#${id}`)[0];

		this.sections.forEach(section => {
			ScrollTrigger.create({
				trigger: section,
				start: 'top +200px',
				end: 'bottom bottom',
				onEnter: self => this.setActiveLink(getActiveLink(self.trigger.id)),
				onEnterBack: self => this.setActiveLink(getActiveLink(self.trigger.id)),
			});
		});
	}
}

export default new Timeline();
