const express =require('express')
const app = express()
const transactionRouter = require('./routes/transactionRoutes')
const userRouter = require('./routes/userRoutes')

app.use(express.json())
app.use('/user', userRouter)
app.use('/transaction', transactionRouter)

module.exports = app