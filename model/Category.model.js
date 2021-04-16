const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CategorySchema = new Schema({
    cat_name:{
        type: String,
    },
    cat_image:{
        type:String
    },
    create_at: {
        type: Date,
        default: Date.now
    },
    updated_date:{
        type:Date
    }
})

const Category = mongoose.model('Category',CategorySchema)
module.exports = Category