const { create, queuelist, queueFullList, queueListStore, deleteQueue } = require('../Controllers/queue')
const express = require('express')
const { auth } = require('../Middleware/auth')
const router = express.Router()

router.put('/createqueue/:id', auth, create)
router.get('/listqueue/:id', queuelist)
router.get('/queuefulllist/:id', queueFullList)
router.get('/queueliststore/:id', auth, queueListStore)
router.delete('/cancelqueue/:id', auth, deleteQueue)
module.exports = router