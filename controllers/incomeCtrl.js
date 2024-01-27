const Income = require('../models/Income')


exports.addIncome = async (req, res) => {
    const { title, amount, category , description , date } = req.body
    const income = Income({ title, amount, category, category, description, date })
    try {
        if( !title || !amount || !description || !date || !category ) {
            return res.status(400).json({ messsage: 'All inputs required' })
        } 
        if( amount <= 0 || !amount === 'number' ){
            return res.status(400).json({ messsage: 'Amount must be a positive number' })
        }
        await income.save()
        res.status(200).json({ message: 'Income  added'})
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.incomesIndex = async (req, res) => {
    try {
        const incomes = await Income.find({}).sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.showIncome = async function show(req, res) {
    try {
        const foundIncome = await Income.findOne({ _id: req.params.id})
        res.status(200).json({foundIncome})
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.updateIncome = async function updateIncome(req, res) {
    try {
        const updates = Object.keys(req.body)
        const income = await Income.findOne({ _id: req.params.id })
        updates.forEach(update => income[update] = req.body[update])
        await income.save()
        res.status(200).json(income)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.deleteIncome = async (req, res) => {
    try{
        await Income.findOneAndDelete({ _id: req.params.id })
        res.status(200).json({ message: 'Income deleted' })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
} 