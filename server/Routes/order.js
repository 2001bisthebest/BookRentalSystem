const { addOrder, listOrderForAcc, showOrderForAcc } = require('../Controllers/order')
const express = require('express')
const { auth } = require('../Middleware/auth')
const router = express.Router()

router.post('/addorder/:id', auth, addOrder)
router.get('/showorder/:id', auth, showOrderForAcc)
router.get('/listorderuser/:id', auth, listOrderForAcc)
module.exports = router