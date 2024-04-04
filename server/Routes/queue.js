const { create } = require('../Controllers/queue')
const express = require('express')
const router = express.Router()

router.put('/createqueue/:id', create)
module.exports = router