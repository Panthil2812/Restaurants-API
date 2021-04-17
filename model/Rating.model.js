const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RatingSchema = new Schema({
    user_id:{
        type:String
    },
    food_id:{
        type:String
    },
    rating:{
        type:Number
    },
    comments:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Rating = mongoose.model('Rating',RatingSchema)

module.exports = Rating