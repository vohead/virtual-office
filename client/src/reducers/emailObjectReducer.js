import { DELETEMAIL, FETCHEMAILS, SAVEMAIL, UPDATEMAIL } from '../actions';

export default (state = [], action) => {
	switch (action.type) {
		case DELETEMAIL:
			const currentState = [ ...state ];
			const newState = [];
			// eslint-disable-next-line
			currentState.map((story, index) => {
				if (story._id !== action.payload) {
					newState.push(story);
				}
			});

			return newState;

		case FETCHEMAILS:
			return action.payload;

		case SAVEMAIL:
			return [ ...state, action.payload ];

		case UPDATEMAIL:
			const currentMails = [ ...state ];
			const newMails = [];
			// eslint-disable-next-line
			currentMails.map((email) => {
				if (email._id !== action.payload._id) {
					newMails.push(email);
				} else {
					newMails.push(action.payload);
				}
			});
			return newMails;

		default:
			return state;
	}
};
