import { SAVESTORY, DELETESTORYOBJECT, FETCHSTORIES } from '../actions';

export default (state = [], action) => {
	switch (action.type) {
		case DELETESTORYOBJECT:
			const currentState = [ ...state ];
			const newState = [];
			// eslint-disable-next-line
			currentState.map((story, index) => {
				if (story.id !== action.payload.id) {
					newState.push(story);
				}
			});
			return newState;
		case SAVESTORY:
			return [ ...state, action.payload ];
		case FETCHSTORIES:
			return action.payload;
		default:
			return state;
	}
};
