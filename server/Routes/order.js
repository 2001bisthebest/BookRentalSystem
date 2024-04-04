const { addOrder } = require('../Controllers/order')
const express = require('express')
const router = express.Router()

router.put('/addorder', addOrder)
module.exports = router