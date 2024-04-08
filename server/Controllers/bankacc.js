const BankAccOfStore = require("../Models/BankAccOfStore")

exports.addBankAcc = async (req, res) => {
    try {
        const { accNumber, accName, bankName } = req.body
        const storeId = req.params.id
        const bankAcc = await new BankAccOfStore({
            storeId: storeId,
            accNumber: accNumber,
            accName: accName,
            bankName: bankName
        }).save()
        res.send(bankAcc)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.showBankAcc = async (req, res) => {
    try {
        const storeId = req.params.id
        const bankAcc = await BankAccOfStore.find({ storeId: storeId }).exec()
        res.send(bankAcc)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}