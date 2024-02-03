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
    typeofbook: String,
    haveStore: {
        type: Boolean,
        default: false
    }
}, { timestamp: true })
module.exports = mongoose.model('users', userSchema)