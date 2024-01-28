require('dotenv').config()

const express = require('express')
const router = express.Router()
const userCrtl = require('../controllers/userController')


router.post('/', userCrtl.createUser)

router.post('/login', userCrtl.loginUser)

router.get('/:id', userCrtl.showUser)

router.put('/:id', userCrtl.updateUser)

router.get('/:userId/transaction', userCrtl.transactionIndex)

router.delete('/:id', userCrtl.authorizeUser, userCrtl.deleteUser)

module.exports = router