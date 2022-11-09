const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let profilePictureSchema = new Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  user_id: { type: String },
});

module.exports = mongoose.model("ProfilePicture", profilePictureSchema);