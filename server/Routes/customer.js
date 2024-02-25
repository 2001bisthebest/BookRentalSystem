const express = require('express')
const { showInfo } = require('../Controllers/customer')
const { auth } = require('../Middleware/auth')
const router = express.Router()

router.get('/personalinfo/:id', auth, showInfo)
module.exports = router