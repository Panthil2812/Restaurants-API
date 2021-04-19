const express = require('express')
const app = express()
const createError = require('http-errors')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));

// console.log("panthil malaviya")
// Database connection
require('./initdb')()

//User Router
const UserRouter = require('./Routes/user.routes')
app.use('/', UserRouter)

//Category  Router
const CategoryRouter = require('./Routes/category.routes')
app.use('/',CategoryRouter)

//Restaurant Router
const RestaurantRouter = require('./Routes/restaurant.routes')
app.use('/',RestaurantRouter)

//Food  Router
const FoodRouter = require('./Routes/food.routes')
app.use('/',FoodRouter)

//Rating Router
const RatingRouter = require('./Routes/rating.routes')
app.use('/',RatingRouter)

//Topping Router
const ToppingRouter = require('./Routes/topping.router')
app.use('/',ToppingRouter)


//Admin Router
const AdminRouter = require('./Routes/admin.routes')
app.use('/',AdminRouter)

//error handing
app.use((req,res,next)=>{
    next(createError(404,"Not found"))
})
app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            status: err.status || 500,
            message : err.message
        }
    })
})

const PORT = process.env.PORT || 5050
app.listen(PORT,()=>{
    console.log('Server Started on port http://localhost:'+PORT+'/')
})