import { tns } from 'tiny-slider';

const ClassName = {
	ACTIVE: '_active',
};

class TrailVideo {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.trail-video');

		if (!this.container) {
			return;
		}

		this.videos = this.container.querySelectorAll('[data-video]');

		this.slider = this.container.querySelector('[data-video-slider]');

		this.slider.tns = tns({
			container: '[data-video-slider]',
			items: 1,
			axis: 'vertical',
			mouseDrag: true,
			controls: false,
		});

		this.videos.forEach(video => this._initVideo(video));
	}
	_initVideo(container) {
		const playButton = container.querySelector('[data-video-play]');

		playButton.addEventListener('click', evt => {
			evt.preventDefault();

			const videoId = container.getAttribute('data-video');
			const iframe = this._getYouTubeIframe(videoId);
			container.append(iframe);
			container.classList.add(ClassName.ACTIVE);
		});
	}
	_getYouTubeIframe(videoId) {
		const iframe = document.createElement('iframe');
		const url = `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&autoplay=1`;

		iframe.setAttribute('allowfullscreen', '');
		iframe.setAttribute('allow', 'autoplay');
		iframe.setAttribute('src', url);

		return iframe;
	}
}

export default new TrailVideo();
