const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminSchema = new Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        // unique: true
    },
    updated_date:{
        type:Date
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Admin = mongoose.model('Admin',AdminSchema)
module.exports = Admin