const express = require('express')
const app =express()
const router = express.Router()

const db = require('../Controller/user.controller')
const token = require('../jwttoken')
app.use(express.json())

// GETALL DATA 
router.get('/users/fetch_users',db.getAllUser)
//INSERT DATA
router.post('/users/create_user',db.createUser)

//GETONE BY ID 
router.get('/users/fetch_users/:id',db.findUserById)

//login using email and password
router.post('/authorise/login', db.findUser)

//UPDATA BY ID 
router.post('/users/update_user',db.updateUser)

//change password by user id
router.post('/authorise/change_password', db.changePassword)


// DELETE BY ID
router.get('/users/deleteUser/:id',db.deleteUserById)

//forget Password using email id
router.post('/authorise/forgot_password', db.forgetPassword)

//verify otp using email 
router.get('/authorise/verify_otp',db.verifyOtp)

module.exports = router