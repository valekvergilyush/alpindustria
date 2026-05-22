const ClassName = {
	ACTIVE: '_active',
};

class ClimbingAbout {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.climbing-about');

		if (!this.container) {
			return;
		}

		this.videoEl = this.container.querySelector('[data-video]');

		if (!this.videoEl) {
			return;
		}

		const playButton = this.videoEl.querySelector('[data-video-play]');

		playButton.addEventListener('click', evt => {
			evt.preventDefault();

			const src = this.videoEl.getAttribute('data-video');
			const iframe = this._getIframe(src);
			this.videoEl.append(iframe);
			this.videoEl.classList.add(ClassName.ACTIVE);
		});
	}

	_getIframe(src) {
		const iframe = document.createElement('iframe');

		iframe.setAttribute('src', src);
		iframe.setAttribute('allowfullscreen', '');
		iframe.setAttribute('allow', 'autoplay; encrypted-media; fullscreen; picture-in-picture');
		iframe.setAttribute('frameborder', '0');

		return iframe;
	}
}

export default new ClimbingAbout();
