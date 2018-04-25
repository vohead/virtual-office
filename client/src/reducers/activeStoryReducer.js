import { SETACTIVESTORY } from '../actions';

export default (state = {}, action) => {
	switch (action.type) {
		case SETACTIVESTORY:
			return action.payload;

		default:
			return state;
	}
};
