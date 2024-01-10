const express = require('express')
const router = express.Router()
const { read, list } = require('../Controllers/product')


router.get('/product', list)
router.get('/product/:id', read)

router.post('/product', (req, res) => {
    res.send('Test Post')
})
router.put('/product/:id', (req, res) =>{
    res.send('Test Put')
})
router.delete('/product/:id', (req, res) => {
    res.json({ name: 'bai', id: 535 })
})
module.exports = router