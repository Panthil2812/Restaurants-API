const express = require('express')
const app =express()
const router = express.Router()

const db = require('../Controller/food.controller')
const token = require('../jwttoken')
app.use(express.json())

//get all Food data
router.get('/Food/get_Food',db.getAllFood)

//create new Food
router.post('/Food/new_Food', db.createFood)

//find Food by id
router.get('/Food/fetch_Food/:id',db.findFoodById)

//update Food data
router.post('/Food/update_Food',db.updateFood)

//delete Food by id
router.get('/Food/deleteFood/:id',db.deleteFoodById)

module.exports = router