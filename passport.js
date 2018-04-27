const passport = require('passport');
const User = require('./models/user');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');

const localLogin = new LocalStrategy((username, password, done) => {
	// Verify the username and password
	User.findOne({ username: username }, (err, user) => {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false);
		}
		user.comparePassword(password, function(err, isMatch) {
			if (err) {
				return done(err);
			}
			if (!isMatch) {
				return done(null, false);
			}
			return done(null, user);
		});
	});
});

passport.use(localLogin);
