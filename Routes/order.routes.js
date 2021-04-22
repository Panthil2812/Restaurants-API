const express = require('express')
const app =express()
const router = express.Router()

const db = require('../Controller/order.controller')
const token = require('../jwttoken')
app.use(express.json())

//get all Order data
router.get('/Order/get_all_Order',token,db.getAllOrder)

//create Order
router.post('/Order/Create_Order',token, db.createOrder)

//get order by user_id
router.get('/Order/get_all_user_order/:id',token,db.getuserorder)

// update status in order
router.get('/Order/status_Order',token,db.updatestatus)

//delete order by order_id
router.get('/Order/Delete_Order/:id',token,db.deleteOrder)

module.exports = router