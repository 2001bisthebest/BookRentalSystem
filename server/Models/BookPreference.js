const mongoose = require('mongoose')
const User = require('./User')
const Category = require('./Category')

const bookPrefSchema = mongoose.Schema({
    AccId: {
        type: mongoose.Schema.ObjectId,
        ref: User
    },
    CategoryId: [{
        type: mongoose.Schema.ObjectId,
        ref: Category
    }]
})

module.exports = mongoose.model('bookpreference', bookPrefSchema)