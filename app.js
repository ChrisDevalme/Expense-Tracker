const express =require('express')
const app = express()
const userRouter = require('./routes/userRoutes')
const transactions = require('./routes/transactionRoutes')


app.use(express.json())
app.use('/user', userRouter)
app.use('/transactions', transactions)

// app.use('/transaction', transactionRouter)

module.exports = app