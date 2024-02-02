const request = require('supertest') 
const { MongoMemoryServer } = require('mongodb-memory-server') 
const app = require('../app') 
const Transaction = require('../models/Transaction')
const { default: mongoose } = require('mongoose')
const server = app.listen(8080, () => console.log('Testing on port 8080'))
let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
})

afterAll(async () => {
    await mongoose.connection.close() 
    mongoServer.stop()
    server.close()
})

describe('Test suite for the /transaction routes on our api', () => {
   
    test('This creates a new income transaction in the db', async () => {
        const response = await request(app).post('/transactions/income').send({ 
            amount: 30, category: 'gift' , description: 'birthday gift' , date: '2024-01-12T05:00:00.000Z' , userId: "65b31c6d20500463337ec17b", type: 'income'})
        
        expect(response.statusCode).toBe(200)
        expect(response.body.amount).toBe(30)
        expect(response.body.category).toEqual('gift')
        expect(response.body.description).toEqual('birthday gift')
        expect(response.body.date).toBe('2024-01-12T05:00:00.000Z')
        expect(response.body.userId).toEqual(['65b31c6d20500463337ec17b'])
        expect(response.body.type).toEqual('income')
    })
    
    test('This creates a new expense transaction in the db', async () => {
        const response = await request(app).post('/transactions/expense').send({ 
            amount: 1500, category: 'taxes' , description: 'property taxes' , date: '2024-01-12T05:00:00.000Z', userId: "65b31c6d20500463337ec17b", type: 'expense'})

        expect(response.statusCode).toBe(200)
        expect(response.body.amount).toBe(1500)
        expect(response.body.category).toEqual('taxes')
        expect(response.body.description).toEqual('property taxes')
        expect(response.body.date).toBe('2024-01-12T05:00:00.000Z') 
        expect(response.body.userId).toEqual(['65b31c6d20500463337ec17b'])
        expect(response.body.type).toEqual('expense')
    })

    test('This Shows all income transactions in the db', async () => {
        const income = new Transaction({ 
            amount: 1500, category: 'taxes' , description: 'propery taxes' , date: 1/12/24 , userId: "65b31c6d20500463337ec17b", type: 'income'})
        await income.save()

        const response = await request(app).get('/transactions/income')
        expect(Array.isArray(response.body)).toBeTruthy()

        for(let i = 0; i < response.body.length; i++){
            expect(response.body[i]).toHaveProperty('amount')
            expect(response.body[i]).toHaveProperty('category')
            expect(response.body[i]).toHaveProperty('description')
            expect(response.body[i]).toHaveProperty('date')
            expect(response.body[i]).toHaveProperty('userId')
            expect(response.body[i]).toHaveProperty('type')
        }
    })
    
    test('This Shows all expense transactions in the db', async () => {
        const expense = new Transaction({ 
            amount: 1500, category: 'taxes' , description: 'propery taxes' , date: 1/12/24 , userId: "65b31c6d20500463337ec17b", type: 'expense'})
        await expense.save()

        const response = await request(app).get('/transactions/expense')
        expect(Array.isArray(response.body)).toBeTruthy()

        for(let i = 0; i < response.body.length; i++){
            expect(response.body[i]).toHaveProperty('amount')
            expect(response.body[i]).toHaveProperty('category')
            expect(response.body[i]).toHaveProperty('description')
            expect(response.body[i]).toHaveProperty('date')
            expect(response.body[i]).toHaveProperty('userId')
            expect(response.body[i]).toHaveProperty('type')
        }
    })

    test( 'This Updates 1 income transaction', async () => {
        const income = new Transaction({ 
            amount: 1500, 
            category: 'work' , 
            description: 'pay day' , 
            date: 1/12/24 , 
            userId: "65b31c6d20500463337ec17b", 
            type: 'expense'
        })
        await income.save()

        const response = await request(app).put(`/transactions/income/${income._id}`).send({
            description: 'rental income'
        })

        expect(response.statusCode).toBe(200)
        expect(response.body.description).toEqual('rental income')
    })
    
    test( 'This Updates 1 expense transaction', async () => {
        const expense = new Transaction({ 
            amount: 1500, 
            category: 'taxes' , 
            description: 'property taxes' , 
            date: 1/12/24 , 
            userId: "65b31c6d20500463337ec17b", 
            type: 'expense'
        })
        await expense.save()

        const response = await request(app).put(`/transactions/expense/${expense._id}`).send({
            description: 'Car insurance'
        })

        expect(response.statusCode).toBe(200)
        expect(response.body.description).toEqual('Car insurance')
    })

    test( 'This Shows 1 income transaction', async () => {
        const income = new Transaction({ 
            amount: 1500, 
            category: 'taxes' , 
            description: 'property taxes' , 
            date: '2024-01-12T05:00:00.000Z' , 
            userId: "65b31c6d20500463337ec17b", 
            type: 'income'
        })
        await income.save()

        const response = await request(app).get(`/transactions/income/${income._id}`)
        console.log(response.statusCode.message)
        expect(response.statusCode).toBe(200)
        expect(response.body.amount).toBe(1500)
        expect(response.body.category).toEqual('taxes')
        expect(response.body.description).toEqual('property taxes')
        expect(response.body.date).toBe('2024-01-12T05:00:00.000Z')
        expect(response.body.userId).toEqual(["65b31c6d20500463337ec17b"])
        expect(response.body.type).toEqual('income')
    })
    
    test( 'This Shows 1 expense transaction', async () => {
        const expense = new Transaction({ 
            amount: 1500, 
            category: 'taxes' , 
            description: 'property taxes' , 
            date: '2024-01-12T05:00:00.000Z' , 
            userId: "65b31c6d20500463337ec17b", 
            type: 'expense'
        })
        await expense.save()

        const response = await request(app).get(`/transactions/expense/${expense._id}`)
        
        expect(response.statusCode).toBe(200)
        expect(response.body.amount).toBe(1500)
        expect(response.body.category).toEqual('taxes')
        expect(response.body.description).toEqual('property taxes')
        expect(response.body.date).toBe('2024-01-12T05:00:00.000Z')
        expect(response.body.userId).toEqual(["65b31c6d20500463337ec17b"])
        expect(response.body.type).toEqual('expense')
    })

    test( 'This Deletes 1 income transaction', async () => {
        const income = new Transaction({ 
            amount: 1500, 
            category: 'taxes' , 
            description: 'property taxes' , 
            date: '2024-01-12T05:00:00.000Z' , 
            userId: "65b31c6d20500463337ec17b", 
            type: 'income'
        })
        await income.save()

        const response = await request(app).delete(`/transactions/income/${income._id}`)

        
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe(`Deleted ${income.category} expense`)
    
    })
    
    test( 'This Deletes 1 expense transaction', async () => {
        const expense = new Transaction({ 
            amount: 1500, 
            category: 'taxes' , 
            description: 'property taxes' , 
            date: '2024-01-12T05:00:00.000Z' , 
            userId: "65b31c6d20500463337ec17b", 
            type: 'expense'
        })
        await expense.save()

        const response = await request(app).delete(`/transactions/expense/${expense._id}`)
        
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe(`Deleted ${expense.category} expense`)
    })
})
