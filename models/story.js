// Imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EmailSchema = require('./email');

// StorySchema
const StorySchema = new Schema({
	title: {
		type: String,
		unique: true,
		required: true
	},
	author: String,
	text: String,
	emails: [ { type: Schema.Types.ObjectId, ref: 'email' } ],
	dependencies: [ { emailID: { type: String }, emailDependencies: [ String ] } ],
	_user: { type: Schema.Types.ObjectId, ref: 'User' }
});

// registering story modelclass with mongoose
const model = mongoose.model('story', StorySchema);

module.exports = model;
