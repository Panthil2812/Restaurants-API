const express = require('express')
const app =express()
const router = express.Router()

const db = require('../Controller/rating.controller')
const token = require('../jwttoken')
app.use(express.json())

//get all Rating data
router.get('/Rating/get_Rating',token,db.getAllRating)

//create new Rating
router.post('/Rating/new_Rating',token, db.createRating)

//find Rating by user id
router.get('/Rating/fetch_User_Rating/:id',token,db.findRatingById)


module.exports = router