const express = require('express')
const router = express.Router()
const { read, list, create, update, remove } = require('../Controllers/product')
const { auth } = require('../Middleware/auth')
const { upload } = require('../Middleware/upload')

router.get('/product', auth, list)
router.get('/product/:id', read)
router.post('/product', auth, upload, create)
router.put('/product/:id', update)
router.delete('/product/:id', remove)

module.exports = router