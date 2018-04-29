import { LOGIN, LOGOUT } from '../actions';

export default (state = false, action) => {
	switch (action.type) {
		case LOGIN:
			console.log(action.payload);
			return action.payload;
		case LOGOUT:
			return false;
		default:
			return state;
	}
};
