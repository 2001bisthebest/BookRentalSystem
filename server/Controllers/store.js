const Store = require('../Models/Store')
exports.list = async (req, res) => {
    try {
        const storeList = await Store.find({}).exec()
        res.send(storeList)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.add = async (req, res) => {
    try {
        var user = req.body
        // const addStore = await Store.
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}