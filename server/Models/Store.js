const mongoose = require('mongoose')
const users = require('../Models/User')
const storeSchema = mongoose.Schema({
    accId: {
        type: mongoose.Schema.ObjectId,
        ref: users
    },
    name: {
        type: String,
        default: 'Store name'
    },
    address: {
        type: String,
        default: 'Store address'
    },
    telephone: {
        type: Number,
        default: 'Store telephone'
    },
    detailStore: {
        type: String,
        default: 'Store detail'
    },
    numberOfDayForShipping: {
        type: Number,
        default: 0
    },
    file: {
        type: String,
        default: 'noprofile.jpg'
    }
}, { timestamps: true })
module.exports = mongoose.model('stores', storeSchema)