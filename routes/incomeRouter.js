const express = require('express')
const router = express.Router()
const income = require('../controllers/incomectrl')

// List all Income Transactions
router.get('/', income.incomesIndex)

// Add an Income Transaction
router.post('/add-income', income.addIncome)

// Show 1 Income transaction
router.get('/:id', income.showIncome)

// Updates a transaction
router.put('/:id', income.updateIncome)

// Delete an Income Transaction
router.delete('/:id', income.deleteIncome)

module.exports = router