const express =require('express')
const app = express()
const userRoutes = require('./routes/userRoutes')
const transactions = require('./routes/transactionRoutes')


app.use(express.json())
app.use('/user', userRoutes)
app.use('/transactions', transactions)

// app.use('/transaction', transactionRouter)

module.exports = app