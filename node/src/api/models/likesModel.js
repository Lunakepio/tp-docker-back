const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const likesSchema = new Schema({
  userId: { type: String, required: true },
  postId: { type: String},
  commentId: { type: String},
  dateCreation: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Likes", likesSchema);

