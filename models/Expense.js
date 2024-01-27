const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, default: "expense"},
    date: { type: Date, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true }
}, { timestamps: true }
)

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense