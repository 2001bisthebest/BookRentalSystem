const mongoose = require('mongoose')
const stores = require('./Store')

const bankAccSchema = mongoose.Schema({
    storeId: {
        type: mongoose.Schema.ObjectId,
        ref: stores
    },
    accNumber: Number,
    accName: String,
    bankName: String
}, { timestamps: true })

module.exports = mongoose.model('bankacc', bankAccSchema)