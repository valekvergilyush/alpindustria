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
		this.tooltips = this.slider.hasAttribute('data-tooltips');
		this.tooltipsUnits = this.slider.getAttribute('data-tooltips-units');
		this.type = this.slider.dataset.rangeSlider;

		const handles =
			this.minValue && this.maxValue
				? [this.minValue, this.maxValue]
				: this.minValue || this.maxValue;

		const connect = this.minValue && this.maxValue ? true : [true, false];

		const tooltipsFormat = {
			from: formattedValue => Number(formattedValue),
			to: numericValue => `${Math.round(numericValue) + this.tooltipsUnits}`,
		};

		noUiSlider.create(this.slider, {
			start: handles,
			connect: connect,
			margin: this.step,
			tooltips: this.tooltips,
			format: tooltipsFormat,
			range: {
				min: this.min,
				max: this.max,
			},
			step: this.step,
		});

		if (this.outputMin && this.outputMax && this.type === 'price') {
			this.slider.noUiSlider.on('update', values => {
				const options = { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 };

				this.outputMin.value = new Intl.NumberFormat('ru-RU', options).format(values[0]);
				this.outputMax.value = new Intl.NumberFormat('ru-RU', options).format(values[1]);
			});
		}
		if (this.outputMin && this.outputMax && this.type === 'year') {
			this.slider.noUiSlider.on('update', values => {
				this.outputMin.value = values[0] + ' г.';
				this.outputMax.value = values[1] + ' г.';
			});
		}
	}
}

export default RangeSlider;
