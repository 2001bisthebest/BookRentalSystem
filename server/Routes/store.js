const express = require('express')
const router = express.Router()
const { list, addStore } = require('../Controllers/store')
const { auth } = require('../Middleware/auth')

router.get('/storelist', list)
router.post('/addstore/:id', auth, addStore)
module.exports = router