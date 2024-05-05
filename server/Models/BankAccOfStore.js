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
})

module.exports = mongoose.model('bankacc', bankAccSchema)