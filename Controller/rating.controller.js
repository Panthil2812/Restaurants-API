const createError = require('http-errors')
const Mongoose = require('mongoose')
const Rating = require('../model/Rating.model')
const jwt = require('jsonwebtoken');
const cry = require('../crypto')
module.exports = {
    
    //get all Rating data
    getAllRating:async (req,res,next)=>{    

        try {
           const result=  await Rating.find({},{__v : 0})
          res.send({
            Status :'SUCCESSFULL',
            Message: 'successfully all Rating information',
            Data: result
         })       
        } catch (error) {
            //  console.log(error.message)  
             res.send(error.message)    
        }
    },
    //create new Rating
    createRating: async (req, res, next) =>
    {
             try {
                const rest = new Rating(req.body)
                const result = await rest.save()
                res.send({
                    Status :'SUCCESSFULL',
                    Message: 'successfully added Rating',
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

    //find Rating by user id
    findRatingById:async (req,res,next)=>{
        const id = req.params.id
        try {
            const result = await Rating.findOne({user_id:id},{__v:0})
            // console.log(student)
            if(!result){
                throw createError(404,"USer does not exist.")
            }
            res.send({
                Status :'SUCCESSFULL',
                Message: 'successfully find Rating information',
                Data:  result
             })
        } catch (error) {
           // console.log(error.message) 
           if(error instanceof Mongoose.CastError)
           {
               next(createError(400,"Invalid User id"))
               return
           }
       
           next(error)
        }
    },

}