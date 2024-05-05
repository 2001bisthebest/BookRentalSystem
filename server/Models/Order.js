const mongoose = require('mongoose')
const user = require('./User')
const bookCopy = require('./BookCopy')
const store = require('./Store')
const queue = require('./QueueReserving')

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
    QueueId: {
        type: mongoose.Schema.ObjectId,
        ref: queue
    },
    statusOrder: {
        type: String,
        default: 'WaitForPaid'
    },
    price: Number,
    shippingFromStoreDate: Date,
    shippingFromCustomerDate: Date,
    trackNumberFromStore: String,
    trackNumberFromCustomer: String,
    shippingNameFromStore: String,
    shippingNameFromCustomer: String,
    file: String
}, { timestamps: true })
module.exports = mongoose.model('order', orderSchema)