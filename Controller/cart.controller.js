const createError = require('http-errors')
const Mongoose = require('mongoose')
const Food = require('../model/Food.model')
const Topping = require('../model/topping.model')
const Cart = require('../model/Cart.model')
const jwt = require('jsonwebtoken');
const cry = require('../crypto')
var randomFixedInteger = function (length) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}
module.exports = {
    
    //get all user data
    getCartData:async (req,res,next)=>{    
        const id = req.params.id
        try {
            const result = await Cart.find({ user_id: id }, { __v: 0, _id: 0 })
            if (result.length == 0)
            {
                res.send({
                    Status: 'Null',
                    Message: 'Cart is Empty',
                    Data: 0
                })
            } else
            {
                const sumvalue= await Cart.aggregate(
                    [
                        { $match: { user_id: id } },
                        {$group:
                        {
                            _id: id,
                            totalsum: { $sum: "$total_amount" },
                            totaltopping: {$sum:"$total_topping_cost"}
                            //$cond: [ { $eq: [ "$food_id", req.body.food_id ] }, 30, 20 ]
                          }
                      }
                    ]
                 )
              res.send({
                Status :'SUCCESSFULL',
                Message: 'successfully all user information',
                  Data: {
                      food_total: sumvalue[0].totalsum,
                      topping_total: sumvalue[0].totaltopping,
                      grand_total:(sumvalue[0].totalsum+sumvalue[0].totaltopping),
                      cart_details:result
                  }
             })
            }
        } catch (error) {
            //  console.log(error.message)  
             res.send(error.message)    
        }
    },
    
    //Add to cart item
    addCartItem: async (req, res, next) =>
    {       
        const food_id = req.body.food_id;
        const user = req.body.user_id;
        Cart.countDocuments({user_id :user,food_id:food_id },async function(err, c) {
            if (c == 1)
            {
                try
                {
                
                    const food_data = await Food.findOne({ _id: food_id })
                    if (!food_data)
                    {
                        throw createError(404, "Food does not exist.")
                    }
                    const topping_no = (req.body.toppings_id).split(',')
                    const topping_arr = []
                    let total_topping = 0
                    for (i = 0; i < topping_no.length; i++)
                    {
                        try
                        {
                            const data = await Topping.findOne({ _id: topping_no[i] })
                            if (!data)
                            {
                                throw createError(404, "Topping does not exist.")
                            } else
                            {
                                const feed = { "topping_id": data._id, "topping_name": data.topping_name, "cost": data.cost }
                                total_topping = total_topping + data.cost
                                topping_arr.push(feed);
                            }
                            
                        } catch (error)
                        {
                            res.send(error.message)
                        }
                    }
                    const insert_data = {
                        user_id: req.body.user_id,
                        food_id: food_id,
                        food_name: food_data.food_name,
                        food_image: food_data.food_image,
                        food_thumbnail: food_data.food_thumbnail,
                        price: food_data.price,
                        select_qty: req.body.selected_qty,
                        total_amount: (food_data.price * req.body.selected_qty),
                        topping_arr: topping_arr,
                        total_topping_cost: total_topping
                    }
                    // const cart = new Cart(insert_data)
                    const result = await Cart.findOneAndUpdate({ user_id: user, food_id: food_id }, insert_data, { new: true })
                    res.send({
                        Status: 'SUCCESSFULL',
                        Message: 'successfully added information in Cart',
                        Data: 1
                    })
                } catch (error)
                {
                    console.log(error)
                    if (error.name === 'ValidationError')
                    {
                        next(createError(422, error.message))
                        return
                    }
                    next(error)
                }
                console.log("already exists")
            } else if (c == 0)
            {
                try
                {
                
                    const food_data = await Food.findOne({ _id: food_id })
                    if (!food_data)
                    {
                        throw createError(404, "Food does not exist.")
                    }
                    const topping_no = (req.body.toppings_id).split(',')
                    const topping_arr = []
                    let total_topping = 0
                    for (i = 0; i < topping_no.length; i++)
                    {
                        try
                        {
                            const data = await Topping.findOne({ _id: topping_no[i] })
                            if (!data)
                            {
                                throw createError(404, "Topping does not exist.")
                            } else
                            {
                                const feed = { "topping_id": data._id, "topping_name": data.topping_name, "cost": data.cost }
                                total_topping = total_topping + data.cost
                                topping_arr.push(feed);
                            }
                            
                        } catch (error)
                        {
                            //  console.log(error.message)  
                            res.send(error.message)
                        }
                    }
                    const insert_data = {
                        user_id: req.body.user_id,
                        food_id: food_id,
                        food_name: food_data.food_name,
                        food_image: food_data.food_image,
                        food_thumbnail: food_data.food_thumbnail,
                        price: food_data.price,
                        select_qty: req.body.selected_qty,
                        total_amount: (food_data.price * req.body.selected_qty),
                        topping_arr: topping_arr,
                        total_topping_cost: total_topping
                    }
                    const cart = new Cart(insert_data)
                    const result = await cart.save()
                    res.send({
                        Status: 'SUCCESSFULL',
                        Message: 'successfully added information in Cart',
                        Data: 1
                    })
                } catch (error)
                {
                    console.log(error)
                    if (error.name === 'ValidationError')
                    {
                        next(createError(422, error.message))
                        return
                    }
                    next(error)
                }
            }
       }); 
        
    },

  //Remove food in cart using userid and food id
    RemoveFoodCart:async (req,res,next)=>{
        const food = req.body.food_id;
        const user = req.body.user_id;
        try {
            const result = await Cart.deleteOne({user_id:user,food_id:food})
            if(!result){
                throw createError(404,"Food does not exist.")
            }
            res.send({
                Status :'SUCCESSFULL',
                Message: 'successfully deleted information ',
                Data: 1 
             })
        } catch (error) {
            if(error instanceof Mongoose.CastError){
                next(createError(400,"Invalid id"))
                return
            }
            next(error)
        }
    },
  //Delete all food in cart
  DeleteCart:async (req,res,next)=>{
    const user = req.params.id;
    try {
        const result = await Cart.deleteOne({user_id:user})
        if(!result){
            throw createError(404,"user does not exist.")
        }
        res.send({
            Status :'SUCCESSFULL',
            Message: 'successfully deleted information ',
            Data: 1 
         })
    } catch (error) {
        if(error instanceof Mongoose.CastError){
            next(createError(400,"Invalid user id"))
            return
        }
        next(error)
    }
}
}