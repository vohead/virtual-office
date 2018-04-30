import { SAVESTORY, DELETESTORY, FETCHSTORIES, UPDATESTORY } from '../actions';

export default (state = [], action) => {
	switch (action.type) {
		case DELETESTORY:
			const currentState = [ ...state ];
			const newState = [];
			// eslint-disable-next-line
			currentState.map((story, index) => {
				if (story._id !== action.payload) {
					newState.push(story);
				}
			});
			return newState;
		case SAVESTORY:
			return [ ...state, action.payload ];
		case FETCHSTORIES:
			return action.payload;
		case UPDATESTORY:
			const currentStories = [ ...state ];
			const newStories = [];
			// eslint-disable-next-line
			currentStories.map((story) => {
				if (story._id !== action.payload._id) {
					newStories.push(story);
				} else {
					newStories.push(action.payload);
				}
			});
			return newStories;
		default:
			return state;
	}
};
