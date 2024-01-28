// The packages and variables needed for setup

const request = require('supertest') // This is the thing that lets us run our code like postman
const { MongoMemoryServer } = require('mongodb-memory-server') // This creates the fake MongoDB databases that exists on our computer un our memory nt on atlas
const app = require('../app') // this is our api application that we made with express. This is the thing that we are giving to supertest to test
const User = require('../models/User')
const { default: mongoose } = require('mongoose')
const server = app.listen(3001, () => console.log('Testing on port 3001'))
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
  test('This should create a new user', async () => {
    const response = await request(app).post('/user').send({ userName: 'Chris Devalme', email: 'cuuuhhhh@gmail.com', password: '12345'})
    
    
    expect(response.statusCode).toBe(200)
    expect(response.body.user.userName).toEqual('Chris Devalme')
    expect(response.body.user.email).toEqual('cuuuhhhh@gmail.com')
    expect(response.body).toHaveProperty('token')
  })

  // /user/login - Login Route
  test('This should log in a user', async () => {
    const user = await new User({ userName: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
    await user.save()

    const response = await request(app)
      .post('/user/login')
      .send({ email: 'john.doe@example.com', password: 'password123' })
    
    expect(response.statusCode).toBe(200)
    expect(response.body.user.userName).toEqual('John Doe')
    expect(response.body.user.email).toEqual('john.doe@example.com')
    expect(response.body).toHaveProperty('token')
  })

  // /users/:id update
  test('This should update a user', async () => {
    const user = await new User({ userName: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
    await user.save()
    const token = await user.generateAuthToken()

    const response = await request(app)
      .put(`/user/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ userName: 'Jane Doe', email: 'jane.doe@example.com' })
    
    expect(response.statusCode).toBe(200)
    expect(response.body.userName).toEqual('Jane Doe')
    expect(response.body.email).toEqual('jane.doe@example.com')
    })

  test('This should Display a user', async () => {
    const user = new User({ userName: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
    await user.save()
    const token = await user.generateAuthToken()

    const response = await request(app).get(`/user/${user._id}`).set('Authorization', `Bearer ${token}`)
      
    
    expect(response.statusCode).toBe(200)
    expect(response.body.userName).toEqual('John Doe')
    expect(response.body.email).toEqual('john.doe@example.com')
  })
      
  // /user/:id delete
  test('This should delete a user', async () => {
    const user = new User({ userName: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
    await user.save()
    const token = await user.generateAuthToken()

    const response = await request(app)
      .delete(`/user/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
    
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toEqual('User deleted')
  })
    
})

