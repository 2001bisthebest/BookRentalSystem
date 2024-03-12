const express = require('express')
const { showInfo, openStore } = require('../Controllers/customer')
const { auth } = require('../Middleware/auth')
const router = express.Router()

router.get('/personalinfo/:id', auth, showInfo)
router.put('/openstore/:id', auth, openStore)
module.exports = router