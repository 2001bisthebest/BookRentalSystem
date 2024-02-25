const express = require('express')
const { register, login } = require('../Controllers/auth')
const router = express.Router()
const { upload } = require('../Middleware/upload')

router.post('/register', upload, register)
router.post('/login', login)
module.exports = router