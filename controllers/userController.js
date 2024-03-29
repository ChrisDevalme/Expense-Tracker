require('dotenv').config()

const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.authorizeUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.SECRET)
    const user = await User.findOne({ _id: data._id })
    if (!user) {
      throw new Error()
    }
    req.user = user
    next()
  } catch (error) {
    res.status(401).send('Not authorized')
  }
}

exports.loginUser = async (req, res) => {
  try{
    const user = await User.findOne({ email: req.body.email })
    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
      res.status(400).send('Invalid login credentials')
    } else {
      const token = await user.generateAuthToken()
      res.status(200).json({ user, token })
    }
  } catch(error){
    res.status(400).json({message: error.message})
  }
}

exports.createUser = async (req, res) => {
  try{
    const user = await new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.status(200).json({ user,token })
  } catch(error){
    res.status(400).json({message: error.message})
  }
}

exports.showUser = async (req, res) => {
  try {
    const foundUser = await User.findOne({ _id: req.params.id })
    
    res.status(200).json(foundUser)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

exports.transactionIndex = async (req, res) => {
    try {
        const foundUser = await User.findOne({ _id: req.params.userId}).populate('transactions')
        res.status(200).json(foundUser.transactions)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.updateUser = async (req, res) => {
    try{
      const updates = Object.keys(req.body) // turns object you pass into an array of keys
      const user = await User.findOne({ _id: req.params.id })
      updates.forEach(update => user[update] = req.body[update])
      await user.save()
      res.status(200).json(user)
    }catch(error){
      res.status(400).json({message: error.message})
    }
    
}

exports.deleteUser = async (req, res) => {
    try{
      await req.user.deleteOne()
      res.status(200).json({ message: 'User deleted' })
    }catch(error){
      res.status(400).json({message: error.message})
    }
}



