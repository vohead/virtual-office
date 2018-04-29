const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
	title: String,
	author: String,
	text: String,
	timer: Number
});

module.exports = EmailSchema;
