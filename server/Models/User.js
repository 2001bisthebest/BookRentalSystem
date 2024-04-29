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