const AuthenticationController = require('./controllers/authentication');
const passportService = require('./passport');
const passport = require('passport');

const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
	app.post('/api/signup', AuthenticationController.signup);
	app.post('/api/signin', requireSignin, AuthenticationController.signin);
};
