const mongoose = require("mongoose");

const PowerSchema = new mongoose.Schema({ branch: String, status: String }, { timestamps: true })
const Power = mongoose.model('Power', PowerSchema)
module.exports = { Power }