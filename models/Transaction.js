const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema ({ 
    title: {type: String, required: true},
    category: {type: String, required: true, enum: [] },
    amount: {type: Number, required: true },
    income: Boolean,
    expense: Boolean,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction