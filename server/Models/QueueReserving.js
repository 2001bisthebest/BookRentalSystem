const mongoose = require('mongoose')
const bookCopy = require('./BookCopy')
const user = require('./User')


const queueReservingSchema = mongoose.Schema({
    AccId: {
        type: mongoose.Schema.ObjectId,
        ref: user
    },
    CopyId: {
        type: mongoose.Schema.ObjectId,
        ref: bookCopy
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