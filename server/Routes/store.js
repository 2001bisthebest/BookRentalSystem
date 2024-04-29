const express = require('express')
const router = express.Router()
const { list, addStore, editStoreInfo, storeInfo, storeInfoFromBook } = require('../Controllers/store')
const { auth } = require('../Middleware/auth')
const { upload } = require('../Middleware/upload')

router.get('/storelist', list)
router.post('/addstore/:id', auth, addStore)
router.put('/editstoreinfo/:id', auth, upload, editStoreInfo)
router.get('/storeinfo/:id', storeInfo)
router.get('/storeinfofrombook/:id', storeInfoFromBook)
module.exports = router