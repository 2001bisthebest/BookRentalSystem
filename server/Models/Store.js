const mongoose = require('mongoose')
const users = require('../Models/User')
const storeSchema = mongoose.Schema({
    accId: {
        type: mongoose.Schema.ObjectId,
        ref: users
    },
    name: String,
    address: String,
    telephone: Number,
    detailStore: String,
    numberOfDayForShipping: Number
})
module.exports = mongoose.model('store', storeSchema)