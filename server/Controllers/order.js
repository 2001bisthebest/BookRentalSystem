const Book = require("../Models/Book")
const Order = require("../Models/Order")
const QueueReserving = require("../Models/QueueReserving")

exports.addOrder = async (req, res) => {
    try {
        const queueId = req.params.id
        // , shippingFromCustomerDate, trackNumberFromStore, shippingNameFromStore, shippingNameFromCustomer 
        const queue = await QueueReserving.findOneAndUpdate({ _id: queueId }, { createOrderStatus: true }, { new: true }).exec()
        const book = await Book.findOne({ _id: queue.BookId }).exec()
        let startD = new Date(queue.startDate)
        let endD = new Date(queue.endDate)
        const numOfDays = Math.floor((endD.getTime() - startD.getTime()) / (24 * 60 * 60 * 1000));
        const priceResult = book.price * numOfDays
        const order = await new Order({
            AccId: queue.AccId,
            CopyId: queue.CopyId,
            StoreId: queue.StoreId,
            shippingFromStoreDate: queue.startDate,
            price: priceResult
        }).save()
        res.send(order)
    } catch (err) {
        console.log(err)
        res.staus(500).send('Server Error')
    }
}
exports.listOrderForAcc = async (req, res) => {
    try {
        const accId = req.params.id
        const order = await Order.find({ AccId: accId }).exec()
        var book = []

        res.send(order)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.showOrderForAcc = async (req, res) => {
    try {
        const orderId = req.params.id
        const order = await Order.findOne({ _id: orderId }).exec()
        res.send(order)
    } catch (err) {
        console.log(err)
        res.staus(500).send('Server Error')
    }
}