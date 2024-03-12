const mongoose = require('mongoose')
const categories = require('./Category')
const books = require('./Book')

const categoryofbookSchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.ObjectId,
        ref: categories
    },
    bookId: {
        type: mongoose.Schema.ObjectId,
        ref: books
    }
})
module.exports = mongoose.model('categoryofbooks', categoryofbookSchema)