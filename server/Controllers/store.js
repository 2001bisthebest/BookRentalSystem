const Store = require('../Models/Store')
const User = require('../Models/User')
exports.list = async (req, res) => {
    try {
        const storeList = await Store.find({}).exec()
        res.send(storeList)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.addStore = async (req, res) => {
    try {
        var { name, address, telephone, detailStore, numberOfDayForShipping } = req.body
        console.log(name)
        var userId = req.params.id
        console.log(userId)
        var accId = await User.findOne({ _id: userId })
        console.log(accId)
        var store = await new Store({
            accId,
            name,
            address,
            telephone,
            detailStore,
            numberOfDayForShipping
        }).populate({ path: 'accId', select: 'name email' })
        console.log(store)
        await Store(store).save()
        res.send('Add store success')
        // const addStore = await Store.
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.storeInfo = async (req, res) => {
    try {
        console.log(req.body)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.editStoreInfo = async (req, res) => {
    try {
        const id = req.params.id
        const storeInfo = await Store.findOneAndUpdate({ _id: id }, req.body, { new: true }).exec()
        res.send(storeInfo)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}