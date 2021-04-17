const express = require('express')
const app =express()
const router = express.Router()

const db = require('../Controller/topping.controller')
const token = require('../jwttoken')
app.use(express.json())

//get all Topping data
router.get('/Topping/get_Topping',token,db.getAllTopping)

//create new Topping
router.post('/Topping/new_Topping',token, db.createTopping)

//find Topping by id
router.get('/Topping/fetch_Topping/:id',token,db.findToppingById)

//update Topping data
router.post('/Topping/update_Topping',token,db.updateTopping)

//delete Topping by id
router.get('/Topping/deleteTopping/:id',token,db.deleteToppingById)

module.exports = router