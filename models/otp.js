const mongoose = require("mongoose")

const OTPSchema = new mongoose.Schema({

    email: {
        type: String,
        trim: true,
        required: true,
    },
    otp: {
        type: String,
        trim: true
    },
    createdAt: {type: Date, default: Date.now, index: { expires:60 }}

}, {timestamps: true}) 

module.exports.OTPModel = mongoose.model("otpholder", OTPSchema)