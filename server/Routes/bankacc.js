const express = require('express')
const { auth } = require('../Middleware/auth')
const { addBankAcc, showBankAcc } = require('../Controllers/bankacc')
const router = express.Router()

router.post('/addbankacc/:id', auth, addBankAcc)
router.get('/showbankacc/:id', showBankAcc)
module.exports = router