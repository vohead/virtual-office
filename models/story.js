const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EmailSchema = require("./email");

const StorySchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  author: String,
  text: String,
  emails: [{ id: {type: Schema.Types.ObjectId, ref: "email"} , dependencies: [Number] }],
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

const model = mongoose.model("story", StorySchema);

module.exports = model;