const express = require('express')
const app =express()
const router = express.Router()

const db = require('../Controller/food.controller')
const token = require('../jwttoken')
app.use(express.json())

//get all Food data
router.get('/Food/get_Food',token,db.getAllFood)

//create new Food
router.post('/Food/new_Food',token, db.createFood)

//find Food by id
router.get('/Food/fetch_Food/:id',token,db.findFoodById)

//update Food data
router.post('/Food/update_Food',token,db.updateFood)

//delete Food by id
router.get('/Food/deleteFood/:id',token,db.deleteFoodById)

module.exports = router