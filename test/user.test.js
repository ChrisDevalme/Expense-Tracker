// The packages and variables needed for setup

const request = require('supertest') // This is the thing that lets us run our code like postman
const { MongoMemoryServer } = require('mongodb-memory-server') // This creates the fake MongoDB databases that exists on our computer un our memory nt on atlas
const app = require('../app') // this is our api application that we made with express. This is the thing that we are giving to supertest to test
const User = require('../models/User')
const { default: mongoose } = require('mongoose')
const server = app.listen(8080, () => console.log('Testing on port 8080'))
let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
})

afterAll(async () => {
    await mongoose.connection.close() // shut off mongoose conection with MongoDB
    mongoServer.stop()
    server.close()
})


describe('Test suite for the /users routes on our api', () => {
    // /users
    test('It create a new user in the db', async () => {
        const response = await request(app).post('/users').send({ name: 'Chris Devalme', email: 'cuuuhhhh@gmail.com', password: '12345'})

        expect(response.statusCode).toBe(200)
        expect(response.body.user.name).toEqual('Chris Devalme')
        expect(response.body.user.email).toEqual('cuuuhhhh@gmail.com')
        expect(response.body).toHaveProperty('token')
    })
    // /users/:id update
    test('It should update a user', async () => {
        const user = new User({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
        await user.save()
        const token = await user.generateAuthToken()
    
        const response = await request(app)
          .put(`/users/${user._id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({ name: 'Jane Doe', email: 'jane.doe@example.com' })
        
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('Jane Doe')
        expect(response.body.email).toEqual('jane.doe@example.com')
      })
      // /user/:id delete
      test('It should delete a user', async () => {
        const user = new User({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
        await user.save()
        const token = await user.generateAuthToken()
    
        const response = await request(app)
          .delete(`/users/${user._id}`)
          .set('Authorization', `Bearer ${token}`)
        
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual('User deleted')
      })
    
})

