import { ADDEMAILOBJECT, SETEMAILOBJECTS, DELETEEMAILOBJECT, FETCHEMAILS, SAVEMAIL } from '../actions';

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

		case FETCHEMAILS:
		return action.payload;

		case SAVEMAIL:
			return [ ...state, action.payload ];

		default:
			return state;
	}
};
