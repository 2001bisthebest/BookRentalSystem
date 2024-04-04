const mongoose = require('mongoose')
const catagory = require('./Category')
const userSchema = mongoose.Schema({
    username: String,
    password: {
        type: String
    },
    name: String,
    email: String,
    address: String,
    telephone: Number,
    typeofbook: [{
        type: mongoose.Schema.ObjectId,
        ref: catagory
    }],
    haveStore: {
        type: Boolean,
        default: false
    },
    file: {
        type: String,
        default: 'noprofile.jpg'
    }
}, { timestamps: true })
module.exports = mongoose.model('users', userSchema)