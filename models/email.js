// Imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// EmailSchema
const EmailSchema = new Schema({
	title: String,
	author: String,
	text: String,
	timer: Number,
	_user: { type: Schema.Types.ObjectId, ref: 'User' }

});

// registering email modelclass with mongoose
const model = mongoose.model('email', EmailSchema);


module.exports = model;
