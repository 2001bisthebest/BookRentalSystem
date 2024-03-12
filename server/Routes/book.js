const express = require('express')
const { addBook, listBook, listBookFromStore } = require('../Controllers/book')
const { auth } = require('../Middleware/auth')
const router = express.Router()

router.post('/addbook', auth, addBook)
router.get('/listbook', listBook)
router.get('/listbook/:id', listBookFromStore)
module.exports = router