const express = require('express')
const { addBook, listBook, listBookFromStore, addBookCopy, addCategory, listCategory } = require('../Controllers/book')
const { auth } = require('../Middleware/auth')
const router = express.Router()

router.post('/addbook/:id', auth, addBook)
router.get('/listbook', listBook)
router.get('/listbook/:id', listBookFromStore)
router.post('/bookcopy/:id', addBookCopy)
router.post('/addcategory', addCategory)
router.get('/listcategory', listCategory)
module.exports = router