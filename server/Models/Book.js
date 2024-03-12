const mongoose = require('mongoose')
const stores = require('./Store')

const bookSchema = mongoose.Schema({
    storeId: {
        type: mongoose.Schema.ObjectId,
        ref: stores
    },
    title: String,
    author: String,
    translator: String,
    publisher: String,
    year: Number,
    price: Number
})

module.exports = mongoose.model('books', bookSchema)