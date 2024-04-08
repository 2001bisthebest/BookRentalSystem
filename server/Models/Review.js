const mongoose = require('mongoose')
const Book = require('./Book')
const User = require('./User')

const reviewSchema = mongoose.Schema({
    AccId: {
        type: mongoose.Schema.ObjectId,
        ref: User
    },
    BookId: {
        type: mongoose.Schema.ObjectId,
        ref: Book
    },
    comment: String,
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

module.exports = mongoose.model('reviews', reviewSchema)