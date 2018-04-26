import { ADDSTORYOBJECT, SETSTORYOBJECTS, DELETESTORYOBJECT } from '../actions';

export default (state = [], action) => {
	switch (action.type) {
		case DELETESTORYOBJECT:
			const currentState = [...state];
			console.log(currentState);
			const newState = currentState.map(story => {
				if (story !== undefined) {

					if (story.id !== action.payload.id) {
						return story
					}
				}
			})
			console.log("newstate", newState);
			return newState;
		case ADDSTORYOBJECT:
			return [...state, action.payload];
		case SETSTORYOBJECTS:
			return action.payload;
		default:
			return state;
	}
};
