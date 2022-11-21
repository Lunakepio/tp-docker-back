const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  content: { type: String, required: "le contenu est requis" },
  createdAt : { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
});

module.exports = mongoose.model("Post", postSchema);

