const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  isAdmin: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_pic: {
    type: String,
  },
  location: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "Member",
  },
  bio: {
    type: String,
    default: "",
  },
  watched: [
    {
      movie: {
        type: Schema.Types.ObjectId,
        ref: "movies",
      },
    },
  ],
  joined: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
