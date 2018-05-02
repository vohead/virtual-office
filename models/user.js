// Imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// UserSchema
const UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		lowercase: true
	},
	password: String
});

/** 
 * @function pre Savehook, triggered before saving a document into the
 * database generates a hash for the given password and saves the hash
 * instead
 */
UserSchema.pre('save', function(next) {
	const user = this;
	bcrypt.genSalt(10, function(err, salt) {
		if (err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) {
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});


/**
 * @function comparePassword, utility function available on the model class
 * to easily compare password with hash
 */
UserSchema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		
		if (err) {
			return callback(err);
		}
		callback(null, isMatch);
	});
};

// registering User modelclass with mongoose
const model = mongoose.model('user', UserSchema);

module.exports = model;
