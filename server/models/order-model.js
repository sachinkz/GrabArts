const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const orderSchema = new Schema({
  userId: { type: String, required: true ,ref:'User'},
  artistId: { type: String, required: true, ref:'Artist' },
  name: { type: String, required: true },
  paper: { type: String, required: true },
  face: { type: String, required: true },
  mobile: { type: Number, required: true, minlength: 10 },
  address1: { type: String, required: true },
  address2: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  pin: { type: Number, required: true, minlength: 6 },
  suggestion: { type: String, required: false },
  status: { type: String, required: true },
  style: { type: String, required: true },
  amount: { type: Number, required: true },
  image: { type: String, required: true },
}, {
  timestamps:true
})

module.exports = mongoose.model("Order", orderSchema)
