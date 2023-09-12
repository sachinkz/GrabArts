const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const rpOrderSchema = new Schema({
  id: { type: String, required: true },
  entity: { type: String, required: true },
  amount: { type: Number, required: true },
  amount_paid: { type: Number, required: true },
  amount_due: { type: Number, required: true },
  currency: { type: String, required: true },
  receipt: { type: String, required: true },
  offer_id: { type: String, required: false },
  status: { type: String, required: true },
  attempts: { type: Number, required: true },
  notes: [],
  created_at: { type: Number, required: true },
})


module.exports = mongoose.model("Rorder", rpOrderSchema)
