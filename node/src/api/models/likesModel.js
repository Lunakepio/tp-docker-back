const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const likesSchema = new Schema({
  userId: { type: String, required: true },
  postId: { type: String, required: true },

});

module.exports = mongoose.model("Likes", likesSchema);

