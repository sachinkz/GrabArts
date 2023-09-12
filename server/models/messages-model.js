const mongoose = require("mongoose")
const { Schema } = require("mongoose")
const unique = require("mongoose-unique-validator")

const MessagesSchema = new Schema(
  {
    conversationId: {
      type: String,
    },
    sender: { type: String },
    message: { type: String },
  },
  {
    timestamps: true,
  }
)

MessagesSchema.plugin(unique)

module.exports = mongoose.model("Messages", MessagesSchema)
