const express =require('express')
const app = express()
const transactionRouter = require('./routes/transactionRoutes')
const userRouter = require('./routes/userRoutes')
const incomeRouter = require('./routes/incomeRouter')

app.use(express.json())
app.use('/user', userRouter)
app.use('/transaction', transactionRouter)
app.use('/incomes', incomeRouter)

module.exports = app