const express = require('express')
const app =express()
const router = express.Router()

const db = require('../Controller/restaurant.controller')
const token = require('../jwttoken')
app.use(express.json())

//get all Restaurant data
router.get('/Restaurant/get_Restaurant',token,db.getAllRestaurant)

//create new Restaurant
router.post('/Restaurant/new_Restaurant',token, db.createRestaurant)

//find Restaurant by id
router.get('/Restaurant/fetch_Restaurant/:id',token,db.findRestaurantById)

//update Restaurant data
router.post('/Restaurant/update_Restaurant',token,db.updateRestaurant)

//delete Restaurant by id
router.get('/Restaurant/deleteRestaurant/:id',token,db.deleteRestaurantById)

module.exports = router