const mongoose = require("mongoose")
const { Schema } = require("mongoose")
const unique = require("mongoose-unique-validator")

const postSchema = new Schema({
  caption: { type: String},
  image: { type: String, required: true },
  artistId: { type: mongoose.Types.ObjectId, required: true, ref: "Artist" },
  comments: [
    {
      artistId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Artist",
      },
      comment: { type: String, required: false },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  likes: [
    {
      artistId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Artist",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

postSchema.plugin(unique)

module.exports = mongoose.model("Post", postSchema)
