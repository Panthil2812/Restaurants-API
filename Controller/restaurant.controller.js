const createError = require('http-errors')
const Mongoose = require('mongoose')
const Restaurant = require('../model/Restaurant.model')
const jwt = require('jsonwebtoken');
const cry = require('../crypto')
module.exports = {
    
    //get all Restaurant data
    getAllRestaurant:async (req,res,next)=>{    

        try {
           const result=  await Restaurant.find({},{__v : 0})
          res.send({
            Status :'SUCCESSFULL',
            Message: 'successfully all Restaurant information',
            Data: result
         })       
        } catch (error) {
            //  console.log(error.message)  
             res.send(error.message)    
        }
    },
    //create new Restaurant
    createRestaurant: async (req, res, next) =>
    {
             try {
                const rest = new Restaurant(req.body)
                // console.log(req.body);
                const result = await rest.save()
                res.send({
                    Status :'SUCCESSFULL',
                    Message: 'successfully added Restaurant',
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
    //update Restaurant data
    updateRestaurant:async(req,res,next)=>{
        try {
           const id = req.body._id 
            let newQuery = JSON.parse(JSON.stringify(req.body));
            
           const option = {new : true}
           newQuery.updated_date = new Date();
            const result = await Restaurant.findOneAndUpdate({ _id:id},newQuery,option)
            if(!result){
                throw createError(404,"Restaurant does not exist.")
            }
            res.send({
               Status :'SUCCESSFULL',
               Message: 'successfully updated Restaurant information',
               Data: 1
            })
        } catch (error) {
            if(error instanceof Mongoose.CastError){
                next(createError(400,"Invalid Restaurant id"))
                return
            }
            next(error)
        }
    },
    //find Restaurant by id
    findRestaurantById:async (req,res,next)=>{
        const id = req.params.id
        try {
            const result = await Restaurant.findOne({_id:id},{__v:0})
            // console.log(student)
            if(!result){
                throw createError(404,"Restaurant does not exist.")
            }
            res.send({
                Status :'SUCCESSFULL',
                Message: 'successfully find Restaurant information',
                Data:  result
             })
        } catch (error) {
           // console.log(error.message) 
           if(error instanceof Mongoose.CastError)
           {
               next(createError(400,"Invalid Restaurant id"))
               return
           }
       
           next(error)
        }
    },
    //delete Restaurant by id
    deleteRestaurantById:async (req,res,next)=>{
    
        try {
            const id = req.params.id
            const result = await Restaurant.deleteOne({_id:id})
            if(!result){
                throw createError(404,"Restaurant does not exist.")
            }
            res.send({
                Status :'SUCCESSFULL',
                Message: 'successfully deleted information ',
                //Data: result
 
             })
        } catch (error) {
            if(error instanceof Mongoose.CastError){
                next(createError(400,"Invalid Restaurant id"))
                return
            }
            next(error)
        }
        // res.send("deleting a single product ")
    },
    //delete Restaurant by id
    checkTable:async (req,res,next)=>{
    
        try {
            const table_name = req.body.table_name
            const id = req.body.id
            const result = await Restaurant.findOne({_id:id})
            const table_avalible = result.list_table.includes(table_name)
            
            if(!table_avalible){
                throw createError(404,"Table does not exist in Restaurant.")
            }
            res.send({
                Status :'SUCCESSFULL',
                Message: table_name +' table allowcated you ',
                Data: 1
 
             })
        } catch (error) {
            if(error instanceof Mongoose.CastError){
                next(createError(400,"Invalid Restaurant id"))
                return
            }
            next(error)
        }
        // res.send("deleting a single product ")
    },

}