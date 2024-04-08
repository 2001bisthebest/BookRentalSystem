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
    statusOrder: {
        type: Boolean,
        default: false
    },
    price: Number,
    shippingFromStoreDate: Date,
    shippingFromCustomerDate: Date,
    trackNumberFromStore: Number,
    shippingNameFromStore: String,
    shippingNameFromCustomer: String,
    file: String,
    statusPaid: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })
module.exports = mongoose.model('order', orderSchema)