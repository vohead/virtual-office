import { ADDEMAILOBJECT, SETEMAILOBJECTS } from '../actions';

export default (state = [], action) => {
	switch (action.type) {
		case ADDEMAILOBJECT:
			return [ ...state, action.payload ];

		case SETEMAILOBJECTS:
			return action.payload;

		default:
			return state;
	}
};
