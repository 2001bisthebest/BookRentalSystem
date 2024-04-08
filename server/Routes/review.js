const express = require('express')
const { auth } = require('../Middleware/auth')
const { listReview, addReview } = require('../Controllers/review')
const router = express.Router()

router.post('/addreview/:id', auth, addReview)
router.get('/listreview/:id', listReview)
module.exports = router