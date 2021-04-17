const createError = require('http-errors')
const Mongoose = require('mongoose')
const Topping = require('../model/topping.model')
const jwt = require('jsonwebtoken');
const cry = require('../crypto')
module.exports = {
    
    //get all Topping data
    getAllTopping:async (req,res,next)=>{    

        try {
           const result=  await Topping.find({},{__v : 0})
          res.send({
            Status :'SUCCESSFULL',
            Message: 'successfully all Topping information',
            Data: result
         })       
        } catch (error) {
            //  console.log(error.message)  
             res.send(error.message)    
        }
    },
    //create new Topping
    createTopping: async (req, res, next) =>
    {
             try {
                const rest = new Topping(req.body)
                const result = await rest.save()
                res.send({
                    Status :'SUCCESSFULL',
                    Message: 'successfully added Topping',
                    Data: 1
                }) 
                } catch (error) {
                    console.log(error)
                    if(error.name === 'ValidationError'){
                        next(createError(422,error.message))
                        return
                    }
                    next(error)
                }       
    },
 //update Topping data
 updateTopping:async(req,res,next)=>{
    try {
       const id = req.body._id 
        let newQuery = JSON.parse(JSON.stringify(req.body));
       const option = {new : true}
        const result = await Topping.findOneAndUpdate({ _id:id},newQuery,option)
        if(!result){
            throw createError(404,"Topping does not exist.")
        }
        res.send({
           Status :'SUCCESSFULL',
           Message: 'successfully updated Topping information',
           Data: 1
        })
    } catch (error) {
        if(error instanceof Mongoose.CastError){
            next(createError(400,"Invalid Topping id"))
            return
        }
        next(error)
    }
},
    //find Topping by user id
    findToppingById:async (req,res,next)=>{
        const id = req.params.id
        try {
            const result = await Topping.findOne({_id:id},{__v:0})
            // console.log(student)
            if(!result){
                throw createError(404,"Topping does not exist.")
            }
            res.send({
                Status :'SUCCESSFULL',
                Message: 'successfully find Topping information',
                Data:  result
             })
        } catch (error) {
           // console.log(error.message) 
           if(error instanceof Mongoose.CastError)
           {
               next(createError(400,"Invalid Topping id"))
               return
           }
       
           next(error)
        }
    },
    //delete Topping by id
    deleteToppingById:async (req,res,next)=>{
    
        try {
            const id = req.params.id
            const result = await Topping.deleteOne({_id:id})
            if(!result){
                throw createError(404,"Topping does not exist.")
            }
            res.send({
                Status :'SUCCESSFULL',
                Message: 'successfully deleted information ',
                //Data: result
 
             })
        } catch (error) {
            if(error instanceof Mongoose.CastError){
                next(createError(400,"Invalid Topping id"))
                return
            }
            next(error)
        }
        // res.send("deleting a single product ")
    },

}