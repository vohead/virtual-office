import { SETAUTH } from '../actions';

export default (state = {}, action) => {
	switch (action.type) {
		case SETAUTH:
			return action.payload;

		default:
			return state;
	}
};
