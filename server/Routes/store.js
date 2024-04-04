const express = require('express')
const router = express.Router()
const { list, addStore, editStoreInfo } = require('../Controllers/store')
const { auth } = require('../Middleware/auth')

router.get('/storelist', list)
router.post('/addstore/:id', auth, addStore)
router.put('/editstoreinfo/:id', auth, editStoreInfo)
module.exports = router