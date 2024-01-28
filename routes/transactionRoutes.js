const express = require('express')
const router = express.Router()
// const userController = require('../controllers/userController')
const income = require('../controllers/incomeCtrl')
const expense = require('../controllers/expenseCtrl')

// router.use(userController.authorizeUser)


// Creates a Transaction
router.post('/income', income.createIncome)
router.post('/expense', expense.createExpense)

// Lists all Transactions
router.get('/income', income.incomeIndex) // blah.com/transactions/income
router.get('/expense', expense.expenseIndex)

// Shows 1 transaction
router.get('/income/:id', income.showIncome)
router.get('/expense/:id', expense.showExpense)

// Updates a transaction
router.put('/income/:id', income.updateIncome)
router.put('/expense/:id', expense.updateExpense)

// Deletes an Transaction
router.delete('/income/:id', income.deleteIncome)
router.delete('/expense/:id', expense.deleteExpense)

module.exports = router