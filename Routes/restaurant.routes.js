const express = require('express')
const app =express()
const router = express.Router()

const db = require('../Controller/restaurant.controller')
const token = require('../jwttoken')
app.use(express.json())

//get all Restaurant data
router.get('/Restaurant/get_Restaurant',db.getAllRestaurant)

//create new Restaurant
router.post('/Restaurant/new_Restaurant', db.createRestaurant)

//find Restaurant by id
router.get('/Restaurant/fetch_Restaurant/:id',db.findRestaurantById)

//update Restaurant data
router.post('/Restaurant/update_Restaurant',db.updateRestaurant)

//delete Restaurant by id
router.get('/Restaurant/deleteRestaurant/:id',db.deleteRestaurantById)

module.exports = router