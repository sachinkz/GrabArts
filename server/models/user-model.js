const mongoose = require("mongoose")
const { Schema } = require("mongoose")
const unique = require("mongoose-unique-validator")

const userSchema = new Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps:true
})

userSchema.plugin(unique)

module.exports = mongoose.model("User", userSchema)
