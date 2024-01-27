const express = require('express')
const router = express.Router()
const transCrtl = require('../controllers/transactionController')

// Create a transaction
router.post('/', transCrtl.create)

// List all transaction
router.get('/', transCrtl.index)

// Dispalys 1 transaction
router.get('/:id', transCrtl.show)

// Updates a transaction 
router.put('/:id', transCrtl.updateTransaction)

// Deletes a transaction
router.delete('/:id', transCrtl.deleteTransaction)

module.exports = router