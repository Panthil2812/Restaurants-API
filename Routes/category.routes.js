const express = require('express')
const app =express()
const router = express.Router()

const db = require('../Controller/category.controller')
const token = require('../jwttoken')
app.use(express.json())

//get all Category data
router.get('/Category/get_Category',db.getAllCategory)

//create new Category
router.post('/Category/new_Category', db.createCategory)

//find Category by id
router.get('/Category/fetch_Category/:id',db.findCategoryById)

//update Category data
router.post('/Category/update_Category',db.updateCategory)

//delete Category by id
router.get('/Category/deleteCategory/:id',db.deleteCategoryById)

module.exports = router