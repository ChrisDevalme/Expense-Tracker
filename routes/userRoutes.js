const express = require('express')
const router = express.Router()
const userCrtl = require('../controllers/userController')

// Create a User
router.post('/', userCrtl.create)

// List all Users
router.get('/', userCrtl.index)

// Dispalys 1 User
router.get('/:id', userCrtl.show)

// Updates a user 
router.put('/:id', userCrtl.updateUser)

// Deletes a user
router.delete('/:id', userCrtl.deleteUser)
