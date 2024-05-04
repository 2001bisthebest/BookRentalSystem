const mongoose = require('mongoose')
const stores = require('./Store')

const bookSchema = mongoose.Schema({
    storeId: {
        type: mongoose.Schema.ObjectId,
        ref: stores
    },
    title: String,
    ISBN: Number,
    author: String,
    translator: String,
    publisher: String,
    year: Number,
    price: Number,
    file: {
        type: String,
        default: 'noimg.jpg'
    }
}, { timestamps: true })

module.exports = mongoose.model('books', bookSchema)