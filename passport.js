// Imports
const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const User = mongoose.model('user');

// writes user into session
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// reads user from session
passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false);
		}
		done(null, user);
	});
});

/**
 * @param {String} username specified in request
 * @param {String} password specified in request
 * checks if user exists and then compares passwords
 */
const localLogin = new LocalStrategy((username, password, done) => {
	User.findOne({ username: username }, (err, user) => {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false);
		}
		user.comparePassword(password, function (err, isMatch) {
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

// Initialize localLogin strategy
passport.use('local', localLogin);
