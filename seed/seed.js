require('dotenv').config()
require('./database')

const UserSeed = require('../models/User')
const TransactionSeed = require('../models/Transaction')

const seed = async () => {
    const getUserIds = () => users.map(user => user._id.toString())
    const transactionIds = () => transactions.map(transactions => transactions._id.toString())

    await UserSeed.deleteMany({})
    const users = await UserSeed.create([
        {
            userName: "Chris",
            email: "reddog10@getMaxListeners.com",
            password: process.env.SEED_PASSWORD,
            transactions: []
        },
        {
            userName: "Bob The Builder",
            email: "bluedog10@getMaxListeners.com",
            password: process.env.SEED_PASSWORD,
            transactions: []
        },
        {
            userName: "Spongebob",
            email: "greendog10@getMaxListeners.com",
            password: process.env.SEED_PASSWORD,
            transactions: []
        },
        {
            userName: "Clifford",
            email: "bigreddog10@getMaxListeners.com",
            password: process.env.SEED_PASSWORD,
            transactions: []
        },
        {
            userName: "Buzz Lightyeat",
            email: "rage1000@getMaxListeners.com",
            password: process.env.SEED_PASSWORD,
            transactions: []
        }
    ])

    await TransactionSeed.deleteMany({})
    const transactions = await TransactionSeed.create([
        {
            amount: 10,
            type: "expense",
            date: 12/1/21,
            category: "Entertainment",
            description: "Apple Music Subscription",
            userId: [ users[1]._id, users[4]._id ]
        },
        {
            amount: 150,
            type: "expense",
            date: 2/1/23,
            category: "Bills",
            description: "Phone bill",
            userId: [ users[0]._id, users[2]._id  ]
        },
        {
            amount: 2300,
            type: "income",
            date: 12/1/21,
            category: "paychek",
            description: "paystub",
            userId: [ users[1]._id, users[3]._id, users[2]._id, users[4]._id ]
        },
        {
            amount: 400,
            type: "expense",
            date: 12/1/21,
            category: "electronics",
            description: "Apple Airpod Max",
            userId: [ users[0]._id, users[4]._id ]
        },
        {
            amount: 3500,
            type: "expense",
            date: 12/1/21,
            category: "electronics",
            description: "Apple Macbook Pro",
            userId: [ users[2]._id, users[3]._id ]
        },
        {
            amount: 10000,
            type: "income",
            date: 12/1/21,
            category: "cash",
            description: "Car sale",
            userId: [ users[1]._id ]
        }
    ])

    const Chris = await UserSeed.findOneAndUpdate({ _id: users[0]._id}, {
        $set: {transactions: [...transactions]}
    })
    process.exit()
}


seed()