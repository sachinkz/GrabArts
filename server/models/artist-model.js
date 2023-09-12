const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const unique = require("mongoose-unique-validator")


const artistSchema = new Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  image: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: Number, required: true ,minlength:10},
  isVerified:{type:Boolean,requied:true},
  isTopten:{type:Boolean,requied:true},
  posts:[{ type: mongoose.Types.ObjectId, required: true, ref: "Post" }],
  reviews:[{ type: mongoose.Types.ObjectId, required: true, ref: "Review" }],
  followers: [{ type: mongoose.Types.ObjectId, required: true, ref: "Artists" }],
  following: [{ type: mongoose.Types.ObjectId, required: true, ref: "Artists" }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

artistSchema.plugin(unique)

module.exports = mongoose.model('Artist', artistSchema);
