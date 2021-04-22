const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    user_id:{
        type:String
    },
    order_id: {
        type:String
    },
    table_no:{
        type:String
    },
    food_total:{
        type:String
    },
    topping_total:{
        type:String
    },
    grand_total:{
        type:String
    },
    order_status:{
        type:Number
    },
    cart_details:{
        type:Object
    },
    date:{
        type:Date,
        default:Date.now
    },
    expire_at: {type: Date, default: Date.now, expires: 60*60*24} 

})

const Order = mongoose.model('Order',OrderSchema)
module.exports = Order