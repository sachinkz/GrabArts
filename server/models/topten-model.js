const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const toptenSchema = new Schema({
    artistId: { type: mongoose.Types.ObjectId, reqired: true, ref: 'Artist' }
})

module.exports = mongoose.model("Topten", toptenSchema)
