const mongoose = require('mongoose')
const bookCopy = require('./BookCopy')
const user = require('./User')
const book = require('./Book')
const Store = require('./Store')


const queueReservingSchema = mongoose.Schema({
    AccId: {
        type: mongoose.Schema.ObjectId,
        ref: user
    },
    CopyId: {
        type: mongoose.Schema.ObjectId,
        ref: bookCopy
    },
    BookId: {
        type: mongoose.Schema.ObjectId,
        ref: book
    },
    StoreId: {
        type: mongoose.Schema.ObjectId,
        ref: Store
    },
    reservationStatus: {
        type: Boolean,
        default: false
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: Date
}, { timestamps: true })
module.exports = mongoose.model('queuereserve', queueReservingSchema)