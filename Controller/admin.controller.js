const createError = require('http-errors')
const Mongoose = require('mongoose')
const Admin = require('../model/Admin.model')
const Otp = require('../model/Otp.model')
const jwt = require('jsonwebtoken');
const cry = require('../crypto')
module.exports = {
    
    //get all Admin data
    getAllAdmin:async (req,res,next)=>{    

        try {
           const result=  await Admin.find({},{__v : 0,date:0,updated_date:0})
          res.send({
            Status :'SUCCESSFULL',
            Message: 'successfully all Admin information',
            Data: result
         })       
        } catch (error) {
            //  console.log(error.message)  
             res.send(error.message)    
        }
    },
    
    //create new Admin
    createAdmin: async (req, res, next) =>
    {
        const email_id = req.body.email;
       // console.log("email id : " + email_id)
             try {
                
                req.body.password = cry.encrypt(req.body.password)
                const user = new Admin(req.body)
            
                const result = await user.save()
                res.send({
                    Status :'SUCCESSFULL',
                    Message: 'successfully added information',
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

    //update Admin data
    updateAdmin:async(req,res,next)=>{
        try {
           const id = req.body._id 
            let newQuery = JSON.parse(JSON.stringify(req.body));
            
           const option = {new : true}
           newQuery.password = cry.encrypt(req.body.password)
           newQuery.updated_date = new Date(); 
            // console.log(newQuery)
            const result = await Admin.findOneAndUpdate({ _id:id},newQuery,option)
            if(!result){
                throw createError(404,"Admin does not exist.")
            }
            res.send({
               Status :'SUCCESSFULL',
               Message: 'successfully updated Admin data',
               Data: result
            })
        } catch (error) {
            if(error instanceof Mongoose.CastError){
                next(createError(400,"Invalid Admin id"))
                return
            }
            next(error)
        }
    },

    //find Admin by id
    findAdminById:async (req,res,next)=>{
        const id = req.params.id
        try {
            const result = await Admin.findOne({_id:id},{d_flag:0,password:0})
            // console.log(student)
            if(!result){
                throw createError(404,"Admin does not exist.")
            }
            res.send({
                Status :'SUCCESSFULL',
                Message: 'successfully find Admin information',
                Data:  result
             })
        } catch (error) {
           // console.log(error.message) 
           if(error instanceof Mongoose.CastError)
           {
               next(createError(400,"Invalid Admin id"))
               return
           }
       
           next(error)
        }
    },

    //delete Admin by id
    deleteAdminById:async (req,res,next)=>{
    
        try {
            const id = req.params.id
            const newQuery = {d_flag:true}
            const option = {new : true}
            const result = await Admin.findOneAndUpdate({_id:id},newQuery,option)
            if(!result){
                throw createError(404,"Admin does not exist.")
            }
            res.send({
                Status :'SUCCESSFULL',
                Message: 'successfully deleted information ',
                Data: 1
 
             })
        } catch (error) {
            if(error instanceof Mongoose.CastError){
                next(createError(400,"Invalid Admin id"))
                return
            }
            next(error)
        }
        // res.send("deleting a single product ")
    },
    //find Admin using email and password
    findAdmin: async (req,res,next)=>{
        // req.body.password = cry.encrypt(req.body.password)
       // let userdata =JSON.parse(JSON.stringify(req.body));
        //userdata.d_flag = false; 

        //  console.log(userdata)
        //  res.send(userdata)
        try {
            const result = await Admin.findOne({email:req.body.email},{d_flag:0})
            if(req.body.password == cry.decrypt(result.password))
            {  
                const token = jwt.sign(JSON.parse(JSON.stringify(result)), 'shhhhh',{ expiresIn: 60*60*24});
                res.send({
                    Status :'SUCCESSFULL',
                    Message: 'successfully created token',
                    Data: token
                 })
            }else{
                throw createError(400,'password is invalid')
            }

            if(!result){
                throw createError(404,"Admin does not exist.")
            }
            
        } catch (error) {
           if(error instanceof Mongoose.CastError)
           {
               next(createError(400,"Invalid Admin id"))
               return
           }
       
           next(error)
        }
    }
}