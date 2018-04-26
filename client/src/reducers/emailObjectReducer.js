import { ADDEMAILOBJECT, SETEMAILOBJECTS, DELETEEMAILOBJECT } from '../actions';

export default (state = [], action) => {
	switch (action.type) {
		case DELETEEMAILOBJECT:
		const currentState = [ ...state ];
		const newState = [];
		// eslint-disable-next-line
		currentState.map((story, index) => {
			if (story.id !== action.payload.id) {
				newState.push(story);
			}
		});
		return newState;
		case ADDEMAILOBJECT:
			return [ ...state, action.payload ];

		case SETEMAILOBJECTS:
			return action.payload;

		default:
			return state;
	}
};
