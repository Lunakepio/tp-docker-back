const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let commentSchema = new Schema({
  name: { type: String, required: true },
  content: { type: String, required: "le contenu est requis" },
  createdAt: { type: Date, default: Date.now },
  post_id: { type: String },
});

module.exports = mongoose.model("Comment", commentSchema);

