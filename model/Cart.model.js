const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema({
    user_id:{
        type:String
    },
    food_id:{
        type:String
    },
    food_name:{
        type:String
    },
    food_image:{
        type:String
    },
    food_thumbnail:{
        type:String
    },
    price:{
        type:Number
    },
    select_qty:{
        type:Number
    },
    total_amount:{
        type:Number
    },
    topping_arr:{
        type:Array
    },
    total_topping_cost:{
        type:Number,
        required:true
    },
    updated_date:{
        type:Date
    },
    date:{
        type:Date,
        default:Date.now
    },
    expire_at: {type: Date, default: Date.now, expires: 60*60*24} 

})

const Cart = mongoose.model('Cart',CartSchema)
module.exports = Cart