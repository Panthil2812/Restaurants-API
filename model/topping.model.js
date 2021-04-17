const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ToppingSchema = new Schema({
    topping_name:{
        type:String
    },
    cost:{
        type:Number
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Topping = mongoose.model('Topping',ToppingSchema)

module.exports = Topping