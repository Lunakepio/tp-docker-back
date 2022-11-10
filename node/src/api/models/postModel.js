const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  userName: { type: String, required: true },
  content: { type: String, required: "le contenu est requis" },
  createdAt : { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);

