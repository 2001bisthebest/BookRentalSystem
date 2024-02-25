const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    password: {
        type: String
    },
    name: String,
    email: String,
    address: String,
    telephone: Number,
    typeofbook: {
        type: String
    },
    haveStore: {
        type: Boolean,
        default: false
    },
    file: {
        type: String,
        default: 'noimage.jpg'
    }
}, { timestamp: true })
module.exports = mongoose.model('users', userSchema)