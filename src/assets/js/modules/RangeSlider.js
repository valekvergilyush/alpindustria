import noUiSlider from 'nouislider';

class RangeSlider {
	constructor(container) {
		this.init(container);
	}

	init(container) {
		this.container = container;
		this.slider = container.querySelector('[data-range-slider]');
		this.outputMin = container.querySelector('[data-range-output-min]');
		this.outputMax = container.querySelector('[data-range-output-max]');
		this.min = Number(this.slider.getAttribute('data-min'));
		this.max = Number(this.slider.getAttribute('data-max'));
		this.minValue = Number(this.slider.getAttribute('data-min-value'));
		this.maxValue = Number(this.slider.getAttribute('data-max-value'));
		this.step = Number(this.slider.getAttribute('data-step'));

		noUiSlider.create(this.slider, {
			start: [this.minValue, this.maxValue],
			connect: true,
			margin: this.step,
			range: {
				min: this.min,
				max: this.max,
			},
			step: this.step,
			// pips: {
			// 	mode: 'range',
			// 	density: this.max,
			// },
		});

		this.slider.noUiSlider.on('update', values => {
			const options = { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 };
			this.outputMin.value = new Intl.NumberFormat('ru-RU', options).format(values[0]);
			this.outputMax.value = new Intl.NumberFormat('ru-RU', options).format(values[1]);
		});
	}
}

export default RangeSlider;
