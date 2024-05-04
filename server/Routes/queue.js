const { create, queuelist, queueFullList, queueListStore, queueListUser, cancelQueue } = require('../Controllers/queue')
const express = require('express')
const { auth } = require('../Middleware/auth')
const router = express.Router()

router.put('/createqueue/:id', auth, create)
router.get('/listqueue/:id', queuelist)
router.get('/queuefulllist/:id', queueFullList)
router.get('/queueliststore/:id', auth, queueListStore)
router.delete('/cancelqueue/:id', auth, cancelQueue)
router.get('/listqueueforuser/:id', auth, queueListUser)
module.exports = router