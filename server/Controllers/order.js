const Book = require("../Models/Book")
const BookCopy = require("../Models/BookCopy")
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
            QueueId: queue._id,
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
        const order = await Order.find({ AccId: accId, statusOrder: false }).populate('QueueId').exec()
        var bookId = []
        var book = []
        for (let value of order) {
            let bookFromCopy, orderWithPriceAndDate
            bookFromCopy = await BookCopy.findOne({ _id: value.CopyId }).exec()
            orderWithPriceAndDate = {
                OrderId: value._id,
                BookId: bookFromCopy.BookId,
                priceSummary: value.price,
                startDate: value.QueueId.startDate,
                endDate: value.QueueId.endDate
            }
            console.log(orderWithPriceAndDate)
            bookId.push(orderWithPriceAndDate)
        }
        for (let item of bookId) {
            let bookFromId, bookInfo
            bookFromId = await Book.findOne({ _id: item.BookId }).populate('storeId', 'name').exec()
            console.log(bookFromId)
            bookInfo = {
                OrderId: item.OrderId,
                BookId: item.BookId,
                priceSummary: item.priceSummary,
                startDate: item.startDate,
                endDate: item.endDate,
                file: bookFromId.file,
                StoreId: bookFromId.storeId._id,
                storeName: bookFromId.storeId.name,
                title: bookFromId.title
            }
            book.push(bookInfo)
        }
        res.send(book)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.showOrderForAcc = async (req, res) => {
    try {
        const orderId = req.params.id
        const order = await Order.findOne({ _id: orderId }).populate('QueueId').exec()
        const bookFromCopy = await BookCopy.findOne({ _id: order.CopyId }).exec()
        const bookInfo = await Book.findOne({ _id: bookFromCopy.BookId }).populate('storeId', 'name').exec()
        var book = {
            OrderId: order._id,
            BookId: bookFromCopy.BookId,
            priceSummary: order.price,
            startDate: order.QueueId.startDate,
            endDate: order.QueueId.endDate,
            file: bookInfo.file,
            StoreId: bookInfo.storeId._id,
            storeName: bookInfo.storeId.name,
            title: bookInfo.title
        }
        res.send(book)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        const order = await Order.findOne({ _id: orderId }).exec()
        res.send(order)
    } catch (err) {
        console.log(err)
        res.staus(500).send('Server Error')
    }
}