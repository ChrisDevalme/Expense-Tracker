const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    type: { type: String, default: "income", enum: ["expense", "income"], required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
}, { timestamps: true }
)


const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction