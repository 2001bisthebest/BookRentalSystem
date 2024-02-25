const User = require("../Models/User")


exports.showInfo = async (req, res) => {
    try {
        const id = req.params.id
        const customer = await User.findOne({ _id: id }).exec()
        res.send(customer)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.edit = async (req, res) => {
    try {
        const id = req.params.id
        const customer = await User.findOne({ _id: id }, req.body, { new: true }).exec()
        res.send(customer)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}