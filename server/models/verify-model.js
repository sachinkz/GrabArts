const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const verifySchema = new Schema({
  
}, {
  timestamps:true
})


module.exports = mongoose.model("User", verifySchema)
