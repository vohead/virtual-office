const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
	title: String,
	author: String,
	text: String,
	timer: Number,
	_user: { type: Schema.Types.ObjectId, ref: 'User' }

});

const model = mongoose.model('email', EmailSchema);


module.exports = model;
