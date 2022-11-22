const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let commentSchema = new Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  content: { type: String, required: "le contenu est requis" },
  createdAt: { type: Date, default: Date.now },
  likes:{type: Number, default: 0},
  post_id: { type: String },
});

module.exports = mongoose.model("Comment", commentSchema);

