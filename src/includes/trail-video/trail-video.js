import { tns } from 'tiny-slider';

const ClassName = {
	ACTIVE: '_active',
	HORIZONTAL: '_horizontal',
};

const TABLET_BREAKPOINT = 768;

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
		this.slides = this.slider.querySelectorAll('[data-video-slide]');

		this.videos.forEach(video => this._initVideo(video));

		this.mqTablet = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT}px)`);

		const onWindowWidthChange = evt => {
			if (evt.matches) {
				if (this.slider.tns) {
					this.slider.tns.destroy();
					this.slider.tns = null;
				}
				this._initSlider();
			} else {
				if (this.slider.tns) {
					this.slider.tns.destroy();
					this.slider.tns = null;
				}
				this._initSlider('vertical');
			}
		};

		this.mqTablet.addEventListener('change', onWindowWidthChange);
		onWindowWidthChange(this.mqTablet);
	}
	_initSlider(axisValue = 'horizontal') {
		this.container.classList.remove(ClassName.HORIZONTAL);

		if (axisValue === 'horizontal') {
			this.container.classList.add(ClassName.HORIZONTAL);
		}

		this.slider.tns = tns({
			container: '[data-video-slider]',
			items: 1,
			axis: axisValue,
			mouseDrag: true,
			controls: false,
		});

		this.slider.tns.events.on('indexChanged', slider => {
			const prevIndex = slider.indexCached - 1;
			const ytIframe = this.slides[prevIndex].querySelector('iframe');

			if (ytIframe) {
				ytIframe.contentWindow.postMessage(
					'{"event":"command","func":"pauseVideo","args":""}',
					'*'
				);
			}
		});
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
		const url = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&showinfo=0&autoplay=1`;

		iframe.setAttribute('allowfullscreen', '');
		iframe.setAttribute('allow', 'autoplay');
		iframe.setAttribute('src', url);

		return iframe;
	}
}

export default new TrailVideo();
