import { ADDSTORYOBJECT, SETSTORYOBJECTS, DELETESTORYOBJECT } from '../actions';

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
		case ADDSTORYOBJECT:
			return [ ...state, action.payload ];
		case SETSTORYOBJECTS:
			return action.payload;
		default:
			return state;
	}
};
