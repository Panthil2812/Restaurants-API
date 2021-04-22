const createError = require('http-errors')
const Mongoose = require('mongoose')
const Food = require('../model/Food.model')
const Topping = require('../model/topping.model')
const Cart = require('../model/Cart.model')
const Order = require('../model/Order.model')
const jwt = require('jsonwebtoken');
const cry = require('../crypto')
var randomFixedInteger = function (length) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}
module.exports = {
    
    //get all order for user
    getuserorder:async (req,res,next)=>{    
        const id = req.params.id
        try
        {
            
            const result = await Order.find({ user_id:id }, { __v: 0, _id: 0 })
            if (result.length == 0)
            {
                res.send({
                    Status: 'Null',
                    Message: 'not order',
                    Data: 0
                })
            } else
            {
              res.send({
                Status :'SUCCESSFULL',
                Message: 'successfully all user information',
                  Data: result
             })
            }
        } catch (error) {
            //  console.log(error.message)  
             res.send(error.message)    
        }
    },
    //get all order data
    getAllOrder:async (req,res,next)=>{    
        try {
            const result = await Order.find({ order_status: 0 }, { __v: 0, _id: 0 })
            if (result.length == 0)
            {
                res.send({
                    Status: 'Null',
                    Message: 'not any pending order',
                    Data: 0
                })
            } else
            {
              res.send({
                Status :'SUCCESSFULL',
                Message: 'successfully all user information',
                  Data: result
             })
            }
        } catch (error) {
            //  console.log(error.message)  
             res.send(error.message)    
        }
    },
    
    //Create Order
    createOrder: async (req, res, next) =>
    {       
        const table = req.body.table_no;
        const id = req.body.user_id;
                try
                {
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
                        const insert_Data = {
                            user_id: id,
                            order_id:randomFixedInteger(4),
                            table_no:table,
                            food_total: sumvalue[0].totalsum,
                            topping_total: sumvalue[0].totaltopping,
                            grand_total:(sumvalue[0].totalsum+sumvalue[0].totaltopping),
                            order_status:0,
                            cart_details:result
                          }
                          const insert = new Order(insert_Data)
                        const ans = await insert.save()
                        await Cart.deleteOne({user_id:id})
                          res.send({
                              Status: 'SUCCESSFULL',
                              Message: 'successfully added information in Cart',
                              Data: ans
                          })
                    }                   
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
        
    },

  //update pending status using order number
  updatestatus:async (req,res,next)=>{
        const no = req.body.order_no;
        try {
            const result = await Order.findOneAndUpdate({ order_id: no }, {order_status:1}, { new: true })
            if(!result){
                throw createError(404,"Order does not exist.")
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
  //Delete one order using order_id
  deleteOrder:async (req,res,next)=>{
    const id = req.params.id;
    try {
        const result = await Order.deleteOne({order_id:id})
        if(!result){
            throw createError(404,"Order does not exist.")
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