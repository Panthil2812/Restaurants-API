const createError = require('http-errors')
const Mongoose = require('mongoose')
const Category = require('../model/Category.model')
const jwt = require('jsonwebtoken');
const cry = require('../crypto')
module.exports = {
    
    //get all Category data
    getAllCategory:async (req,res,next)=>{    

        try {
           const result=  await Category.find({},{__v : 0})
          res.send({
            Status :'SUCCESSFULL',
            Message: 'successfully all Category information',
            Data: result
         })       
        } catch (error) {
            //  console.log(error.message)  
             res.send(error.message)    
        }
    },
    //create new Category
    createCategory: async (req, res, next) =>
    {
        const category_name = req.body.cat_name;
        Category.countDocuments({cat_name : category_name},async function(err, c) {
            if (c == 0)
            {
             try {
                
                const cat = new Category(req.body)
            
                const result = await cat.save()
                res.send({
                    Status :'SUCCESSFULL',
                    Message: 'successfully added Category',
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
            }else{
                next(createError(500,"Catgory already exists"))
            }
       });       
    },
    //update Category data
    updateCategory:async(req,res,next)=>{
        try {
           const id = req.body._id 
            let newQuery = JSON.parse(JSON.stringify(req.body));
            
           const option = {new : true}
           newQuery.updated_date = new Date();
            const result = await Category.findOneAndUpdate({ _id:id},newQuery,option)
            if(!result){
                throw createError(404,"Category does not exist.")
            }
            res.send({
               Status :'SUCCESSFULL',
               Message: 'successfully updated Category information',
               Data: 1
            })
        } catch (error) {
            if(error instanceof Mongoose.CastError){
                next(createError(400,"Invalid Category id"))
                return
            }
            next(error)
        }
    },
    //find Category by id
    findCategoryById:async (req,res,next)=>{
        const id = req.params.id
        try {
            const result = await Category.findOne({_id:id},{__v:0})
            // console.log(student)
            if(!result){
                throw createError(404,"Category does not exist.")
            }
            res.send({
                Status :'SUCCESSFULL',
                Message: 'successfully find Category information',
                Data:  result
             })
        } catch (error) {
           // console.log(error.message) 
           if(error instanceof Mongoose.CastError)
           {
               next(createError(400,"Invalid Category id"))
               return
           }
       
           next(error)
        }
    },
    //delete Category by id
    deleteCategoryById:async (req,res,next)=>{
    
        try {
            const id = req.params.id
            const result = await Category.deleteOne({_id:id})
            if(!result){
                throw createError(404,"Category does not exist.")
            }
            res.send({
                Status :'SUCCESSFULL',
                Message: 'successfully deleted information ',
                //Data: result
 
             })
        } catch (error) {
            if(error instanceof Mongoose.CastError){
                next(createError(400,"Invalid Category id"))
                return
            }
            next(error)
        }
        // res.send("deleting a single product ")
    },
}