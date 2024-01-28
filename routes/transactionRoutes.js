const express = require('express')
const router = express.Router()
const income = require('../controllers/incomeCtrl')
const expense = require('../controllers/expenseCtrl')


router.post('/income', income.createIncome)
router.post('/expense', expense.createExpense)

router.get('/income', income.incomeIndex) 
router.get('/expense', expense.expenseIndex)

router.get('/income/:id', income.showIncome)
router.get('/expense/:id', expense.showExpense)

router.put('/income/:id', income.updateIncome)
router.put('/expense/:id', expense.updateExpense)

router.delete('/income/:id', income.deleteIncome)
router.delete('/expense/:id', expense.deleteExpense)

module.exports = router