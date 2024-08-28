class Stages {
	constructor(el) {
		this.init(el);
	}

	init(el) {
		this.container = el;

		if (!this.container) {
			return;
		}

		const stages = this.container.querySelectorAll('[data-stages-item]');
		const stagesSubmit = this.container.querySelectorAll('[data-stages-submit]');

		stages.forEach(stage => {
			const editButton = stage.querySelector('[data-edit-data]');
			const nextButton = stage.querySelector('[data-stages-next]');

			nextButton.addEventListener('click', evt => {
				evt.preventDefault();

				stage.classList.add('_complete');
				stage.classList.remove('_active');

				const nextStage = stage.nextElementSibling;
				if (!nextStage) {
					stagesSubmit.classList.remove('_hidden');
					return;
				}

				nextStage.classList.remove('_hidden');
				nextStage.classList.add('_active');
				nextStage.scrollIntoView({ behavior: 'smooth', block: 'center' });
			});
			editButton &&
				editButton.addEventListener('click', evt => {
					evt.preventDefault();

					stage.classList.remove('_complete');
				});
		});
	}
}

document.querySelectorAll('[data-stages]').forEach(el => new Stages(el));

export default Stages;
