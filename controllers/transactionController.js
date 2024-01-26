const Transaction = require('../models/Transaction')


exports.create = async function create(req, res) {
    try {
        const transaction = new Transaction(req.body)
        await transaction.save()
        res.status(200).json(transaction)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.index = async function index(req, res) {
    try {
        const allTransaction = await Transaction.find({})
        res.status(200).json(allTransaction)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.show = async function show(req, res) {
    try {
        const foundTransaction = await Transaction.findOne({ _id: req.params.id})
        res.status(200).json({foundTransaction})
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.updateTransaction = async function updateTransaction(req, res) {
    try {
        const updates = Object.keys(req.body)
        const transaction = await Transaction.findOne({ _id: req.params.id })
        updates.forEach(update => transaction[update] = req.body[update])
        await transaction.save()
        res.status(200).json(transaction)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.deleteTransaction= async function deleteTransaction(req, res) {
    try {
        await Transaction.findOneAndDelete({ _id: req.params.id })
        res.status(200).json({ message: 'Transaction deleted' })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

