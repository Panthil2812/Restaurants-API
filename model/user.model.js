const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    userName:{
        type:String,
        required:true
    },
    first_name:{
        type:String,
        required:true
    },
    last_name:{
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
    phone:{
        type:Number,
        required:true
    },
    road:{
        type:String,
        required:true
    },
    house_number:{
        type:String,
        required:true
    },
    residence:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    profile_pic:{
        type:String
    },
    d_flag:{
        type:Boolean,
        default:false
    },
    updated_date:{
        type:Date
    },
    date:{
        type:Date,
        default:Date.now
    }
})
// const RestaurantSchema = new Schema({
//     userName:{
//         type:String,
//         required:true
//     },
//     first_name:{
//         type:String,
//         required:true
//     },
//     last_name:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         // unique: true
//     },
//     phone:{
//         type:Number,
//         required:true
//     },
//     road:{
//         type:String,
//         required:true
//     },
//     house_number:{
//         type:String,
//         required:true
//     },
//     residence:{
//         type:String,
//         required:true
//     },
//     pincode:{
//         type:Number,
//         required:true
//     },
//     profile_pic:{
//         type:String
//     },
//     d_flag:{
//         type:Boolean,
//         default:false
//     },
//     updated_date:{
//         type:Date
//     },
//     date:{
//         type:Date,
//         default:Date.now
//     }
// }) 
// const CategorySchema = new Schema({
//     userName:{
//         type:String,
//         required:true
//     },
//     first_name:{
//         type:String,
//         required:true
//     },
//     last_name:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         // unique: true
//     },
//     phone:{
//         type:Number,
//         required:true
//     },
//     road:{
//         type:String,
//         required:true
//     },
//     house_number:{
//         type:String,
//         required:true
//     },
//     residence:{
//         type:String,
//         required:true
//     },
//     pincode:{
//         type:Number,
//         required:true
//     },
//     profile_pic:{
//         type:String
//     },
//     d_flag:{
//         type:Boolean,
//         default:false
//     },
//     updated_date:{
//         type:Date
//     },
//     date:{
//         type:Date,
//         default:Date.now
//     }
// }) 
// const FoodSchema = new Schema({
//     userName:{
//         type:String,
//         required:true
//     },
//     first_name:{
//         type:String,
//         required:true
//     },
//     last_name:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         // unique: true
//     },
//     phone:{
//         type:Number,
//         required:true
//     },
//     road:{
//         type:String,
//         required:true
//     },
//     house_number:{
//         type:String,
//         required:true
//     },
//     residence:{
//         type:String,
//         required:true
//     },
//     pincode:{
//         type:Number,
//         required:true
//     },
//     profile_pic:{
//         type:String
//     },
//     d_flag:{
//         type:Boolean,
//         default:false
//     },
//     updated_date:{
//         type:Date
//     },
//     date:{
//         type:Date,
//         default:Date.now
//     }
// }) 
// const ToppingSchema = new Schema({
//     userName:{
//         type:String,
//         required:true
//     },
//     first_name:{
//         type:String,
//         required:true
//     },
//     last_name:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         // unique: true
//     },
//     phone:{
//         type:Number,
//         required:true
//     },
//     road:{
//         type:String,
//         required:true
//     },
//     house_number:{
//         type:String,
//         required:true
//     },
//     residence:{
//         type:String,
//         required:true
//     },
//     pincode:{
//         type:Number,
//         required:true
//     },
//     profile_pic:{
//         type:String
//     },
//     d_flag:{
//         type:Boolean,
//         default:false
//     },
//     updated_date:{
//         type:Date
//     },
//     date:{
//         type:Date,
//         default:Date.now
//     }
// }) 
// const OrderSchema = new Schema({
//     userName:{
//         type:String,
//         required:true
//     },
//     first_name:{
//         type:String,
//         required:true
//     },
//     last_name:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         // unique: true
//     },
//     phone:{
//         type:Number,
//         required:true
//     },
//     road:{
//         type:String,
//         required:true
//     },
//     house_number:{
//         type:String,
//         required:true
//     },
//     residence:{
//         type:String,
//         required:true
//     },
//     pincode:{
//         type:Number,
//         required:true
//     },
//     profile_pic:{
//         type:String
//     },
//     d_flag:{
//         type:Boolean,
//         default:false
//     },
//     updated_date:{
//         type:Date
//     },
//     date:{
//         type:Date,
//         default:Date.now
//     }
// }) 
// const Order_statusSchema = new Schema({
//     userName:{
//         type:String,
//         required:true
//     },
//     first_name:{
//         type:String,
//         required:true
//     },
//     last_name:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         // unique: true
//     },
//     phone:{
//         type:Number,
//         required:true
//     },
//     road:{
//         type:String,
//         required:true
//     },
//     house_number:{
//         type:String,
//         required:true
//     },
//     residence:{
//         type:String,
//         required:true
//     },
//     pincode:{
//         type:Number,
//         required:true
//     },
//     profile_pic:{
//         type:String
//     },
//     d_flag:{
//         type:Boolean,
//         default:false
//     },
//     updated_date:{
//         type:Date
//     },
//     date:{
//         type:Date,
//         default:Date.now
//     }
// }) 
// const OrderSchema = new Schema({
//     userName:{
//         type:String,
//         required:true
//     },
//     first_name:{
//         type:String,
//         required:true
//     },
//     last_name:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         // unique: true
//     },
//     phone:{
//         type:Number,
//         required:true
//     },
//     road:{
//         type:String,
//         required:true
//     },
//     house_number:{
//         type:String,
//         required:true
//     },
//     residence:{
//         type:String,
//         required:true
//     },
//     pincode:{
//         type:Number,
//         required:true
//     },
//     profile_pic:{
//         type:String
//     },
//     d_flag:{
//         type:Boolean,
//         default:false
//     },
//     updated_date:{
//         type:Date
//     },
//     date:{
//         type:Date,
//         default:Date.now
//     }
// }) 
const User = mongoose.model('user',UserSchema)
// const Restaurant = mongoose.model('Restaurant',RestaurantSchema)
// 
// const Food = mongoose.model('Food',FoodSchema)
// const Topping = mongoose.model('Topping',ToppingSchema)
// const Order = mongoose.model('Order',OrderSchema)

module.exports = User