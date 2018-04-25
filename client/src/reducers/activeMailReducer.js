import { SETACTIVEMAIL } from '../actions';

export default (state = [], action) => {
	switch (action.type) {
		case SETACTIVEMAIL:
			return [action.payload];

		default:
			return state;
	}
};
