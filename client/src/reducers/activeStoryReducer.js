import { SETACTIVESTORY, FETCHSTORY } from '../actions';

export default (state = {}, action) => {
	switch (action.type) {
		case SETACTIVESTORY:
			return action.payload;
		case FETCHSTORY:
			return action.payload[0];
		default:
			return state;
	}
};
