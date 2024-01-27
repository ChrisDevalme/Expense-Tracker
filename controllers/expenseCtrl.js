const Expense = require('../models/Expense')
const Expense = require('../models/Expense')


exports.addExpense = async (req, res) => {
    const { title, amount, category , description , date } = req.body
    const expense = Expense({ title, amount, category, category, description, date })
    try {
        if( !title || !amount || !description || !date || !category ) {
            return res.status(400).json({ messsage: 'All inputs required' })
        } 
        if( amount <= 0 || !amount === 'number' ){
            return res.status(400).json({ messsage: 'Amount must be a positive number' })
        }
        await expensexpense.save()
        res.status(200).json({ message: 'Expense  added'})
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.expenseIndex = async (req, res) => {
    try {
        const expenses = await Expense.find({}).sort({createdAt: -1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.showExpense = async function show(req, res) {
    try {
        const foundexpense = await Expense.findOne({ _id: req.params.id})
        res.status(200).json({foundexpense})
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.updateExpense = async function updateExpense(req, res) {
    try {
        const updates = Object.keys(req.body)
        const expense = await Expense.findOne({ _id: req.params.id })
        updates.forEach(update => expense[update] = req.body[update])
        await expense.save()
        res.status(200).json(expense)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.deleteExpense = async (req, res) => {
    try{
        await Expense.findOneAndDelete({ _id: req.params.id })
        res.status(200).json({ message: 'Expense deleted' })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
} 