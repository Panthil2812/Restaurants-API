const express = require('express')
const app =express()
const router = express.Router()

const db = require('../Controller/cart.controller')
const token = require('../jwttoken')
app.use(express.json())

//get all Cart  Data
router.get('/Cart/get_Cart/:id',token,db.getCartData)

//Add to Cart in item
router.post('/Cart/Add_item_Cart',token, db.addCartItem)

//Remove food in cart using userid and food id
router.post('/Cart/remove_item_Cart',token,db.RemoveFoodCart)

//Delete all food in cart
router.get('/Cart/Delete_Cart/:id',token,db.DeleteCart)

module.exports = router