const express = require('express')
const app =express()
const router = express.Router()

const db = require('../Controller/admin.controller')
const token = require('../jwttoken')
app.use(express.json())

// GETALL admin DATA 
router.get('/Admin@/fetch_Admin',token,db.getAllAdmin)
//INSERT admin  DATA
router.post('/Admin@/create_Admin',db.createAdmin)

//GETONE admin  BY ID 
router.get('/Admin@/fetch_Admin/:id',token,db.findAdminById)

//login admin  using email and password
router.post('/Admin@/login', db.findAdmin)

//UPDATA admin  BY ID 
router.post('/Admin@/update_Admin',token,db.updateAdmin)

//Delete admin  BY ID 
router.get('/Admin@/Delete_Admin/:id',token,db.deleteAdminById)

module.exports = router