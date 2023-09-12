const mongoose = require("mongoose")
const { Schema } = require("mongoose")
const unique = require("mongoose-unique-validator")

const pricingSchema = new Schema({
  artistId: { type: mongoose.Types.ObjectId, required: true, ref: "Artist" },
  styles: [
    {
      style: { type: String, required: true },
      A5_1: { type: Number, required: true },
      A5_2: { type: Number, required: true },
      A5_3: { type: Number, required: true },
      A5_4: { type: Number, required: true },
      A5_5: { type: String, required: true },
      A4_1: { type: Number, required: true },
      A4_2: { type: Number, required: true },
      A4_3: { type: Number, required: true },
      A4_4: { type: Number, required: true },
      A4_5: { type: String, required: true },
      A3_1: { type: Number, required: true },
      A3_2: { type: Number, required: true },
      A3_3: { type: Number, required: true },
      A3_4: { type: Number, required: true },
      A3_5: { type: String, required: true },
      
    },
  ],
})
pricingSchema.plugin(unique)

module.exports = mongoose.model("Pricing", pricingSchema)
