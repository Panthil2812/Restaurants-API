const express = require('express')
const app =express()
const router = express.Router()

const db = require('../Controller/user.controller')
const token = require('../jwttoken')
app.use(express.json())

// GETALL DATA 
router.get('/users/fetch_users',token,db.getAllUser)
//INSERT DATA
router.post('/users/create_user',db.createUser)

//GETONE BY ID 
router.get('/users/fetch_users/:id',token,db.findUserById)

//login using email and password
router.post('/authorise/login', db.findUser)

//UPDATA BY ID 
router.post('/users/update_user',token,db.updateUser)

//change password by user id
router.post('/authorise/change_password',token, db.changePassword)


// DELETE BY ID
router.get('/users/deleteUser/:id',token,db.deleteUserById)

//forget Password using email id
router.post('/authorise/forgot_password',token, db.forgetPassword)

//verify otp using email 
router.post('/authorise/verify_otp',token,db.verifyOtp)

module.exports = router