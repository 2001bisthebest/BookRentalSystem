const express = require('express')
const router = express.Router()
const { list } = require('../Controllers/store')

router.get('/store', list)
module.exports = router