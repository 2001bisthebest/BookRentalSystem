const mongoose = require('mongoose')
const books = require('./Book')
const stores = require('./Store')

const bookCopySchema = mongoose.Schema({
    BookId: {
        type: mongoose.Schema.ObjectId,
        ref: books
    },
    StoreId: {
        type: mongoose.Schema.ObjectId,
        ref: stores
    },
    copyNumber: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('bookcopies', bookCopySchema)