const request = require('supertest') // This is the thing that lets us run our code like postman
const { MongoMemoryServer } = require('mongodb-memory-server') // This creates the fake MongoDB databases that exists on our computer un our memory nt on atlas
const app = require('../app') // this is our api application that we made with express. This is the thing that we are giving to supertest to test
const Transaction = require('../models/Transaction')
const { default: mongoose } = require('mongoose')
const server = app.listen(8080, () => console.log('Testing on port 8080'))
let mongoServer

