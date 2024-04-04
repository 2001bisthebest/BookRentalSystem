const mongoose = require('mongoose')
const user = require('./User')
const bookCopy = require('./BookCopy')
const store = require('./Store')

const orderSchema = mongoose.Schema({
    AccId: {
        type: mongoose.Schema.ObjectId,
        ref: user
    },
    CopyId: {
        type: mongoose.Schema.ObjectId,
        ref: bookCopy
    },
    StoreId: {
        type: mongoose.Schema.ObjectId,
        ref: store
    },
    status: {
        type: Boolean,
        default: false
    },
    shippingFromStoreDate: Date,
    shippingFromCustomerDate: Date,
    trackNumberFromStore: Number,
    shippingNameFromStore: String,
    shippingNameFromCustomer: String,
}, { timestamps: true })
module.exports = mongoose.model('order', orderSchema)