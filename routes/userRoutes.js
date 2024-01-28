require('dotenv').config()

const express = require('express')
const router = express.Router()
const userCrtl = require('../controllers/userController')

// Create a User
router.post('/', userCrtl.createUser)

// logs a User in 
router.post('/login', userCrtl.loginUser)

// Dispalys 1 User
router.get('/:id', userCrtl.showUser)

// Updates a user 
router.put('/:id', userCrtl.updateUser)

// List all Users transactions
router.get('/:userId/transaction', userCrtl.transactionIndex)

// Deletes a user
router.delete('/:id', userCrtl.authorizeUser, userCrtl.deleteUser)

module.exports = router