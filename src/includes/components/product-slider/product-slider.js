class ProductSlider {
	constructor() {
		this.sliders = document.querySelectorAll(['data-product-sliders']);
		this.init();
	}

	init() {
		if (this.sliders.length) {
			return;
		}
		console.log(this.sliders);
	}
}

export default ProductSlider;
