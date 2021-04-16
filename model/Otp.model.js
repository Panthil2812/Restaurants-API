const mongoose = require('mongoose')
const Schema = mongoose.Schema
const OtpSchema = new Schema({
    email:{
        type: String,
    },
    otp_no:{
        type:String
    },
    expire_at: {type: Date, default: Date.now, expires: 1000} 
})

const Otp = mongoose.model('Otp', OtpSchema)
module.exports = Otp