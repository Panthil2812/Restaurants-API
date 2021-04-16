const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FoodSchema = new Schema({
    food_name:{
        type:String
    },
    category_id:{
        type:String
    },
    category_name:{
        type:String
    },
    description:{
        type:String
    },
    food_image:{
        type:String
    },
    food_thumbnail:{
        type:String
    },
    price:{
        type:String
    },
    avg_rating:{
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

const Food = mongoose.model('Food',FoodSchema)

module.exports = Food