const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    transactions: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Transaction'}]
})

userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
})

userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({ _id: this._id}, process.env.SECRET) // make secret in .env file
    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User