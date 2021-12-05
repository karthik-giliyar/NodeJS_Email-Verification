const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true
    }

}, {timestamps: true}) 

module.exports.userModel = mongoose.model("user", userSchema)