const Transaction = require('../models/Transaction')


exports.createIncome = async (req, res) => {
   
    try {
        const { amount, category , description , date, userId } = req.body
        const income = Transaction({ amount, category, description, date, userId })
        income.type = "income"
        await income.save()
        res.status(200).json(income)
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.incomeIndex = async (req, res) => {
    try {
        const incomes = await Transaction.find({type: 'income'}).sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.showIncome = async function show(req, res) {
    try {
        const foundIncome = await Transaction.findOne({ _id: req.params.id})
        res.status(200).json(foundIncome)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.updateIncome = async function updateIncome(req, res) {
    try {
        const updates = Object.keys(req.body)
        const income = await Transaction.findOne({ _id: req.params.id })
        updates.forEach(update => income[update] = req.body[update])
        await income.save()
        res.status(200).json(income)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.deleteIncome = async (req, res) => {
    try{
        const deletedTransaction = await Transaction.findOneAndDelete({ _id: req.params.id })
        res.status(200).json({message: `Deleted ${deletedTransaction.category} expense`})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
} 