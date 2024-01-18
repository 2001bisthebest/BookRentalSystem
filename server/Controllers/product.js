const Product = require('../Models/Product')
exports.read = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findOne({ _id: id }).exec()
        res.send(product)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.list = async (req, res) => {
    try {
        const productList = await Product.find({}).exec()
        res.send(productList)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.create = async (req, res) => {
    try {
        console.log(req.body)
        const producted = await Product(req.body).save()
        res.send(producted)
    } catch {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.update = async (req, res) => {
    try {
        const id = req.params.id
        const updated = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true }).exec()
        res.send(updated)
    } catch {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.remove = async (req, res) => {
    try {
        const id = req.params.id
        const removed = await Product.findOneAndDelete({ _id: id }).exec()
        res.send(removed)
    } catch {
        console.log(err)
        res.status(500).send('Server Error')
    }
}