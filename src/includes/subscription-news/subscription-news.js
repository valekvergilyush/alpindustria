import Popups from '../../assets/js/modules/Popups';

class SubscriptionNews {
	constructor() {
		this.init();
	}
	init() {
		Popups.open('subscription-news');
	}
}

export default new SubscriptionNews();
