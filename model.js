import mongoose from "mongoose";

const PowerSchema = new mongoose.Schema({ branch: String, status: String }, { timestamps: true })
const Power = mongoose.model('Power', PowerSchema)
export { Power }