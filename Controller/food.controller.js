const createError = require('http-errors')
const Mongoose = require('mongoose')
const Food = require('../model/Food.model')
const jwt = require('jsonwebtoken');
const cry = require('../crypto')
module.exports = {
    
    //get all Food data
    getAllFood:async (req,res,next)=>{    

        try {
           const result=  await Food.find({},{__v : 0})
          res.send({
            Status :'SUCCESSFULL',
            Message: 'successfully all Food information',
            Data: result
         })       
        } catch (error) {
            //  console.log(error.message)  
             res.send(error.message)    
        }
    },
    //create newFood
    createFood: async (req, res, next) =>
    {
             try {
                const rest = new Food(req.body)
                const result = await rest.save()
                res.send({
                    Status :'SUCCESSFULL',
                    Message: 'successfully added Food',
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
    //update Food data
    updateFood:async(req,res,next)=>{
        try {
           const id = req.body._id 
            let newQuery = JSON.parse(JSON.stringify(req.body));
            
           const option = {new : true}
           newQuery.updated_date = new Date();
            const result = await Food.findOneAndUpdate({ _id:id},newQuery,option)
            if(!result){
                throw createError(404,"Food does not exist.")
            }
            res.send({
               Status :'SUCCESSFULL',
               Message: 'successfully updated Food information',
               Data: 1
            })
        } catch (error) {
            if(error instanceof Mongoose.CastError){
                next(createError(400,"Invalid Food id"))
                return
            }
            next(error)
        }
    },
    //find Food by id
    findFoodById:async (req,res,next)=>{
        const id = req.params.id
        try {
            const result = await Food.findOne({_id:id},{__v:0})
            // console.log(student)
            if(!result){
                throw createError(404,"Food does not exist.")
            }
            res.send({
                Status :'SUCCESSFULL',
                Message: 'successfully find Food information',
                Data:  result
             })
        } catch (error) {
           // console.log(error.message) 
           if(error instanceof Mongoose.CastError)
           {
               next(createError(400,"Invalid Food id"))
               return
           }
       
           next(error)
        }
    },
    //search Food
    searchFood:async (req,res,next)=>{
        const id = req.body.category_id
        let arr = id.split(','); 

        try
        {
            const result = await Food.find({ category_id: { "$in":arr}},{__v:0})
            // console.log(student)
            if(!result){
                throw createError(404,"Food does not exist.")
            }
            res.send({
                Status :'SUCCESSFULL',
                Message: 'successfully find Food information',
                Data: result
             })
        } catch (error) {
           // console.log(error.message) 
           if(error instanceof Mongoose.CastError)
           {
               next(createError(400,"Invalid Food id"))
               return
           }
       
           next(error)
        }
    },
    //delete Food by id
    deleteFoodById:async (req,res,next)=>{
    
        try {
            const id = req.params.id
            const result = await Food.deleteOne({_id:id})
            if(!result){
                throw createError(404,"Food does not exist.")
            }
            res.send({
                Status :'SUCCESSFULL',
                Message: 'successfully deleted information ',
                //Data: result
 
             })
        } catch (error) {
            if(error instanceof Mongoose.CastError){
                next(createError(400,"Invalid Food id"))
                return
            }
            next(error)
        }
        // res.send("deleting a single product ")
    },
}