const mongoose = require("mongoose")
const { Schema } = require("mongoose")
const unique = require("mongoose-unique-validator")

const conversationsSchema = new Schema(
  {
    members: { type: Array },
    messages: [{ type: mongoose.Types.ObjectId, ref: "Messages" }],
  },
  {
    timestamps: true,
  }
)

conversationsSchema.plugin(unique)

module.exports = mongoose.model("Conversations", conversationsSchema)
