const createError = require('http-errors')
const Mongoose = require('mongoose')
const User = require('../model/user.model')
const Otp = require('../model/Otp.model')
const jwt = require('jsonwebtoken');
const cry = require('../crypto')
var randomFixedInteger = function (length) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}
module.exports = {
    
    //get all user data
    getAllUser:async (req,res,next)=>{    

        try {
           const result=  await User.find({},{__v : 0,date:0,updated_date:0,password:0})
          res.send({
            Status :'SUCCESSFULL',
            Message: 'successfully all user information',
            Data: result
         })       
        } catch (error) {
            //  console.log(error.message)  
             res.send(error.message)    
        }
    },
    
    //create new user
    createUser: async (req, res, next) =>
    {
        const email_id = req.body.email;
        console.log("email id : " + email_id)
        User.countDocuments({email : email_id},async function(err, c) {
            if (c == 0)
            {
             try {
                
                req.body.password = cry.encrypt(req.body.password)
                const user = new User(req.body)
            
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
            }else{
                next(createError(500,"email already exists"))
            }
       });       
    },

    //update user data
    updateUser:async(req,res,next)=>{
        try {
           const id = req.body._id 
            let newQuery = JSON.parse(JSON.stringify(req.body));
            
           const option = {new : true}
           newQuery.password = cry.encrypt(req.body.password)
           newQuery.updated_date = new Date(); 
            // console.log(newQuery)
            const result = await User.findOneAndUpdate({ _id:id,email:req.body.email,d_flag:false},newQuery,option)
            if(!result){
                throw createError(404,"User does not exist.")
            }
            res.send({
               Status :'SUCCESSFULL',
               Message: 'successfully updated user data',
               Data: result
            })
        } catch (error) {
            if(error instanceof Mongoose.CastError){
                next(createError(400,"Invalid user id"))
                return
            }
            next(error)
        }
    },

    //find user by id
    findUserById:async (req,res,next)=>{
        const id = req.params.id
        try {
            const result = await User.findOne({_id:id,d_flag:false},{d_flag:0,password:0})
            // console.log(student)
            if(!result){
                throw createError(404,"product does not exist.")
            }
            res.send({
                Status :'SUCCESSFULL',
                Message: 'successfully find user information',
                Data:  result
             })
        } catch (error) {
           // console.log(error.message) 
           if(error instanceof Mongoose.CastError)
           {
               next(createError(400,"Invalid Product id"))
               return
           }
       
           next(error)
        }
    },

    //delete user by id
    deleteUserById:async (req,res,next)=>{
    
        try {
            const id = req.params.id
            const newQuery = {d_flag:true}
            const option = {new : true}
            const result = await User.findOneAndUpdate({_id:id},newQuery,option)
            if(!result){
                throw createError(404,"product does not exist.")
            }
            res.send({
                Status :'SUCCESSFULL',
                Message: 'successfully deleted information ',
                Data: 1
 
             })
        } catch (error) {
            if(error instanceof Mongoose.CastError){
                next(createError(400,"Invalid Product id"))
                return
            }
            next(error)
        }
        // res.send("deleting a single product ")
    },
    //find user using username and password
    findUser: async (req,res,next)=>{
        // req.body.password = cry.encrypt(req.body.password)
        let userdata =JSON.parse(JSON.stringify(req.body));
        userdata.d_flag = false; 

        //  console.log(userdata)
        //  res.send(userdata)
        try {
            const result = await User.findOne({email:req.body.email},{d_flag:0})
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
                throw createError(404,"product does not exist.")
            }
            
        } catch (error) {
           if(error instanceof Mongoose.CastError)
           {
               next(createError(400,"Invalid Product id"))
               return
           }
       
           next(error)
        }
    },

    //change user password 
    changePassword: async (req, res, next) =>
    {
        try {
            const id = req.body._id 
             let newQuery = JSON.parse(JSON.stringify(req.body));
             
            const option = {new : true}
            newQuery.password = cry.encrypt(req.body.password)
            // newQuery.updated_date = new Date(); 
             // console.log(newQuery)
             const result = await User.findOneAndUpdate({ _id:id},newQuery,option)
             if(!result){
                 throw createError(404,"User does not exist.")
             }
             res.send({
                Status :'SUCCESSFULL',
                Message: 'successfully update password ',
                //Data: result
             })
         } catch (error) {
             if(error instanceof Mongoose.CastError){
                 next(createError(400,"Invalid user id"))
                 return
             }
             next(error)
         }
    },

    //change user password 
    forgetPassword: async (req, res, next) =>
    {
        const id = req.body.email
        const otp = randomFixedInteger(6)
        try
        {
            
            const verifyotp = Otp({email:id,otp_no:otp})
            const result = await verifyotp.save()
            const Data_all =await Otp.find({},{__v : 0})
            res.send({
                Status :'SUCCESSFULL',
                Message: 'successfully create otp password',
                Data: Data_all
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
    verifyOtp: async (req, res, next) =>
    {
        const id = req.body.email
        const otp = req.body.otp
        try
        {
        
            const Data_all = await Otp.findOne({email:id,otp_no:otp},{__v : 0})
            res.send({
                Status :'SUCCESSFULL',
                Message: 'successfully verify OTP',
                Data: (Data_all != null)?1:0
            }) 
            } catch (error) {
                console.log(error)
                if(error.name === 'ValidationError'){
                    next(createError(422,error.message))
                    return
                }
                next(error)
            }
    }
}