const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RestaurantSchema = new Schema({
    rest_name:{
        type:String
    },
    rest_info:{
        type:String
    },
    rest_email:{
        type:String
    },
    logo :{
        type:String
    },
    banner :{
        type:String
    },
    payment_options :{
        type:String
    },
    house_number :{
        type:String
    },
    road :{
        type:String
    },
    city :{
        type:String
    },
    pincode:{
        type:Number
    },
    num_table:{
        type:Number
    },
    list_table:{
        type:Array
    },
    phone:{
        type:Number
    },
    ave_rating :{
        type:String
    },
    opening_timing :{
        type:String
    },
    updated_date:{
        type:Date
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Restaurant = mongoose.model('Restaurant',RestaurantSchema)

module.exports = Restaurant