const express = require('express')
const { register, login, currentUser, currentAdmin, refreshToken } = require('../Controllers/auth')
const router = express.Router()
const { upload } = require('../Middleware/upload')
const { auth } = require('../Middleware/auth')

router.post('/register', upload, register)
router.post('/login', login)
router.post('/current-user', auth, currentUser)
router.post('/current-admin', auth, currentAdmin)
// router.post('/refresh', refreshToken)
module.exports = router