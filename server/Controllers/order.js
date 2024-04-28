const Book = require("../Models/Book")
const BookCopy = require("../Models/BookCopy")
const Order = require("../Models/Order")
const QueueReserving = require("../Models/QueueReserving")
const Store = require("../Models/Store")
const User = require("../Models/User")

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
        const order = await Order.find({ AccId: accId, statusOrder: false, file: null }).populate('QueueId').exec()
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
            bookId.push(orderWithPriceAndDate)
        }
        for (let item of bookId) {
            let bookFromId, bookInfo
            bookFromId = await Book.findOne({ _id: item.BookId }).populate('storeId', 'name').exec()
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
exports.addUploadPayment = async (req, res) => {
    try {
        const orderId = req.params.id
        var file
        if (req.file) {
            file = req.file.filename
        }
        const order = await Order.findOneAndUpdate({ _id: orderId }, { file: file }, { new: true }).exec()
        res.send(order)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.listItemForCheck = async (req, res) => {
    try {
        const storeId = req.params.id
        const order = await Order.find({ StoreId: storeId, file: { $ne: null }, statusPaid: false }).exec()
        let orderDetail = []
        const store = await Store.findOne({ _id: storeId }).exec()
        for (let item of order) {
            let user = await User.findOne({ _id: item.AccId }).select('username').exec()
            let bookCopy = await BookCopy.findOne({ _id: item.CopyId }).exec()
            let book = await Book.findOne({ _id: bookCopy.BookId }).exec()
            let queue = await QueueReserving.findOne({ _id: item.QueueId }).exec()
            let startDate = new Date(queue.startDate)
            let dateToShip = new Date(startDate.getTime() - (store.numberOfDayForShipping * 24 * 60 * 60 * 1000))
            orderDetail.push({
                orderId: item._id,
                accUsername: user.username,
                title: book.title,
                shippingDate: dateToShip,
                file: item.file,
                price: item.price,
                updatedAt: item.updatedAt
            })
        }
        res.send(orderDetail)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.orderForCheck = async (req, res) => {
    try {
        const orderId = req.params.id
        const order = await Order.findOne({ _id: orderId }).exec()
        const store = await Store.findOne({ _id: order.StoreId }).exec()
        let user = await User.findOne({ _id: order.AccId }).select('username').exec()
        let bookCopy = await BookCopy.findOne({ _id: order.CopyId }).exec()
        let book = await Book.findOne({ _id: bookCopy.BookId }).exec()
        let queue = await QueueReserving.findOne({ _id: order.QueueId }).exec()
        let startDate = new Date(queue.startDate)
        let dateToShip = new Date(startDate.getTime() - (store.numberOfDayForShipping * 24 * 60 * 60 * 1000))
        let orderDetail = {
            orderId: order._id,
            copyNumber: bookCopy.copyNumber,
            accUsername: user.username,
            title: book.title,
            shippingDate: dateToShip,
            file: order.file,
            price: order.price,
            updatedAt: order.updatedAt,
            bookFile: book.file
        }
        res.send(orderDetail)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.orderConfirmCheck = async (req, res) => {
    try {
        const orderId = req.params.id
        const order = await Order.findOneAndUpdate({ _id: orderId }, { statusPaid: true }, { new: true }).exec()
        res.send(order)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.listItemForShipping = async (req, res) => {
    try {
        const storeId = req.params.id
        const order = await Order.find({ StoreId: storeId, file: { $ne: null }, statusPaid: true, shippingFromStoreDate: null, shippingNameFromStore: null }).exec()
        let orderDetail = []
        const store = await Store.findOne({ _id: storeId }).exec()
        for (let item of order) {
            let user = await User.findOne({ _id: item.AccId }).select('username').exec()
            let bookCopy = await BookCopy.findOne({ _id: item.CopyId }).exec()
            let book = await Book.findOne({ _id: bookCopy.BookId }).exec()
            let queue = await QueueReserving.findOne({ _id: item.QueueId }).exec()
            let startDate = new Date(queue.startDate)
            let dateToShip = new Date(startDate.getTime() - (store.numberOfDayForShipping * 24 * 60 * 60 * 1000))
            orderDetail.push({
                orderId: item._id,
                accUsername: user.username,
                title: book.title,
                shippingDate: dateToShip,
                file: item.file,
                statusPaid: item.statusPaid,
                updatedAt: item.updatedAt
            })
        }
        res.send(orderDetail)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.orderForShipping = async (req, res) => {
    try {
        const orderId = req.params.id
        const order = await Order.findOne({ _id: orderId }).exec()
        const store = await Store.findOne({ _id: order.StoreId }).exec()
        let user = await User.findOne({ _id: order.AccId }).select('username').exec()
        let bookCopy = await BookCopy.findOne({ _id: order.CopyId }).exec()
        let book = await Book.findOne({ _id: bookCopy.BookId }).exec()
        let queue = await QueueReserving.findOne({ _id: order.QueueId }).exec()
        let startDate = new Date(queue.startDate)
        let dateToShip = new Date(startDate.getTime() - (store.numberOfDayForShipping * 24 * 60 * 60 * 1000))
        let orderDetail = {
            orderId: order._id,
            copyNumber: bookCopy.copyNumber,
            accUsername: user.username,
            title: book.title,
            shippingDate: dateToShip,
            statusPaid: order.statusPaid,
            createdAt: order.createdAt,
            bookFile: book.file,
            startDate: queue.startDate,
            endDate: queue.endDate
        }
        res.send(orderDetail)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.addShippingDay = async (req, res) => {
    try {
        const orderId = req.params.id
        const { shippingFromStoreDate, shippingNameFromStore, trackNumberFromStore } = req.body
        const order = await Order.findOneAndUpdate({ _id: orderId }, { shippingFromStoreDate: shippingFromStoreDate.startDate, shippingNameFromStore: shippingNameFromStore, trackNumberFromStore: trackNumberFromStore }, { new: true }).exec()
        res.send(order)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.listItemForReturn = async (req, res) => {
    try {
        const storeId = req.params.id
        const order = await Order.find({ StoreId: storeId, file: { $ne: null }, statusPaid: true, shippingFromStoreDate: { $ne: null }, shippingNameFromStore: { $ne: null }, trackNumberFromStore: { $ne: null } }).sort({ updatedAt: -1 }).exec()
        let orderDetail = []
        const store = await Store.findOne({ _id: storeId }).exec()
        for (let item of order) {
            let user = await User.findOne({ _id: item.AccId }).select('username').exec()
            let bookCopy = await BookCopy.findOne({ _id: item.CopyId }).exec()
            let book = await Book.findOne({ _id: bookCopy.BookId }).exec()
            let queue = await QueueReserving.findOne({ _id: item.QueueId }).exec()
            let startDate = new Date(queue.startDate)
            let dateToShip = new Date(startDate.getTime() - (store.numberOfDayForShipping * 24 * 60 * 60 * 1000))
            let statusShippingReturn = false
            if (!item.statusOrder) {
                if (item.shippingFromCustomerDate && item.shippingNameFromCustomer && item.trackNumberFromCustomer) {
                    statusShippingReturn = true
                    orderDetail.push({
                        orderId: item._id,
                        accUsername: user.username,
                        title: book.title,
                        shippingDate: dateToShip,
                        endDate: queue.endDate,
                        file: item.file,
                        statusPaid: item.statusPaid,
                        updatedAt: item.updatedAt,
                        statusShippingReturn: statusShippingReturn,
                        shippingFromCustomerDate: item.shippingFromCustomerDate,
                        trackNumberFromCustomer: item.trackNumberFromCustomer,
                        shippingNameFromCustomer: item.shippingNameFromCustomer
                    })
                } else {
                    orderDetail.push({
                        orderId: item._id,
                        accUsername: user.username,
                        title: book.title,
                        updatedAt: item.updatedAt,
                        endDate: queue.endDate,
                        statusShippingReturn: statusShippingReturn
                    })
                }
            }
        }
        res.send(orderDetail)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.listWaitForShipping = async (req, res) => {
    try {
        const accId = req.params.id
        const order = await Order.find({ AccId: accId, statusPaid: true, shippingFromStoreDate: null, shippingNameFromStore: null, trackNumberFromStore: null }).populate('QueueId').exec()
        var bookId = []
        var book = []
        for (let value of order) {
            let bookFromCopy, orderWithPriceAndDate
            bookFromCopy = await BookCopy.findOne({ _id: value.CopyId }).exec()
            let store = await Store.findOne({ _id: value.StoreId }).exec()
            let startDate = new Date(value.QueueId.startDate)
            let dateToShip = new Date(startDate.getTime() - (store.numberOfDayForShipping * 24 * 60 * 60 * 1000))
            orderWithPriceAndDate = {
                OrderId: value._id,
                BookId: bookFromCopy.BookId,
                priceSummary: value.price,
                startDate: value.QueueId.startDate,
                endDate: value.QueueId.endDate,
                shippingDate: dateToShip
            }
            bookId.push(orderWithPriceAndDate)
        }
        for (let item of bookId) {
            let bookFromId, bookInfo
            bookFromId = await Book.findOne({ _id: item.BookId }).populate('storeId', 'name').exec()
            bookInfo = {
                OrderId: item.OrderId,
                BookId: item.BookId,
                priceSummary: item.priceSummary,
                startDate: item.startDate,
                endDate: item.endDate,
                shippingDate: item.shippingDate,
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
exports.orderForReturn = async (req, res) => {
    try {
        const orderId = req.params.id
        const order = await Order.findOne({ _id: orderId }).exec()
        const store = await Store.findOne({ _id: order.StoreId }).exec()
        let user = await User.findOne({ _id: order.AccId }).select('username').exec()
        let bookCopy = await BookCopy.findOne({ _id: order.CopyId }).exec()
        let book = await Book.findOne({ _id: bookCopy.BookId }).exec()
        let queue = await QueueReserving.findOne({ _id: order.QueueId }).exec()
        let startDate = new Date(queue.startDate)
        let dateToShip = new Date(startDate.getTime() - (store.numberOfDayForShipping * 24 * 60 * 60 * 1000))
        let orderDetail
        if (order.shippingFromCustomerDate != null && order.trackNumberFromCustomer != null && order.shippingNameFromCustomer != null) {
            orderDetail = {
                orderId: order._id,
                copyNumber: bookCopy.copyNumber,
                accUsername: user.username,
                title: book.title,
                shippingDate: dateToShip,
                statusPaid: order.statusPaid,
                createdAt: order.createdAt,
                bookFile: book.file,
                startDate: queue.startDate,
                endDate: queue.endDate,
                shippingFromStoreDate: order.shippingFromStoreDate,
                trackNumberFromStore: order.trackNumberFromStore,
                shippingNameFromStore: order.shippingNameFromStore,
                shippingFromCustomerDate: order.shippingFromCustomerDate,
                trackNumberFromCustomer: order.trackNumberFromCustomer,
                shippingNameFromCustomer: order.shippingNameFromCustomer,
                statusOrder: order.statusOrder
            }
        } else {
            orderDetail = {
                orderId: order._id,
                copyNumber: bookCopy.copyNumber,
                accUsername: user.username,
                title: book.title,
                shippingDate: dateToShip,
                statusPaid: order.statusPaid,
                createdAt: order.createdAt,
                bookFile: book.file,
                startDate: queue.startDate,
                endDate: queue.endDate,
                shippingFromStoreDate: order.shippingFromStoreDate,
                trackNumberFromStore: order.trackNumberFromStore,
                shippingNameFromStore: order.shippingNameFromStore,
                statusOrder: order.statusOrder
            }
        }

        res.send(orderDetail)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.listShipped = async (req, res) => {
    try {
        const accId = req.params.id
        const order = await Order.find({ AccId: accId, statusPaid: true, shippingFromStoreDate: { $ne: null }, shippingNameFromStore: { $ne: null }, trackNumberFromStore: { $ne: null }, statusReceiveBook: false }).populate('QueueId').exec()
        var bookId = []
        var book = []
        for (let value of order) {
            let bookFromCopy, orderWithPriceAndDate
            bookFromCopy = await BookCopy.findOne({ _id: value.CopyId }).exec()
            let store = await Store.findOne({ _id: value.StoreId }).exec()
            let startDate = new Date(value.QueueId.startDate)
            let dateToShip = new Date(startDate.getTime() - (store.numberOfDayForShipping * 24 * 60 * 60 * 1000))
            orderWithPriceAndDate = {
                OrderId: value._id,
                BookId: bookFromCopy.BookId,
                priceSummary: value.price,
                startDate: value.QueueId.startDate,
                endDate: value.QueueId.endDate,
                shippingDate: dateToShip
            }
            bookId.push(orderWithPriceAndDate)
        }
        for (let item of bookId) {
            let bookFromId, bookInfo
            bookFromId = await Book.findOne({ _id: item.BookId }).populate('storeId', 'name').exec()
            bookInfo = {
                OrderId: item.OrderId,
                BookId: item.BookId,
                priceSummary: item.priceSummary,
                startDate: item.startDate,
                endDate: item.endDate,
                shippingDate: item.shippingDate,
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
exports.confirmReceiveBook = async (req, res) => {
    try {
        const orderId = req.params.id
        const order = await Order.findOneAndUpdate({ _id: orderId }, { statusReceiveBook: true }, { new: true }).exec()
        res.send(order)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.listWaitForReturn = async (req, res) => {
    try {
        const accId = req.params.id
        const order = await Order.find({ AccId: accId, statusPaid: true, shippingFromStoreDate: { $ne: null }, shippingNameFromStore: { $ne: null }, trackNumberFromStore: { $ne: null }, statusReceiveBook: true }).populate('QueueId').exec()
        var bookId = []
        var book = []
        for (let value of order) {
            let bookFromCopy, orderWithPriceAndDate
            bookFromCopy = await BookCopy.findOne({ _id: value.CopyId }).exec()
            let endDate = new Date(value.QueueId.endDate)
            let dateToReturn = new Date(endDate.getTime() + (24 * 60 * 60 * 1000))
            if (value.trackNumberFromCustomer != null) {
                orderWithPriceAndDate = {
                    OrderId: value._id,
                    BookId: bookFromCopy.BookId,
                    priceSummary: value.price,
                    startDate: value.QueueId.startDate,
                    endDate: value.QueueId.endDate,
                    returnDate: dateToReturn,
                    trackNumberFromCustomer: value.trackNumberFromCustomer
                }
            } else {
                orderWithPriceAndDate = {
                    OrderId: value._id,
                    BookId: bookFromCopy.BookId,
                    priceSummary: value.price,
                    startDate: value.QueueId.startDate,
                    endDate: value.QueueId.endDate,
                    returnDate: dateToReturn
                }
            }
            bookId.push(orderWithPriceAndDate)
        }
        for (let item of bookId) {
            let bookFromId, bookInfo
            bookFromId = await Book.findOne({ _id: item.BookId }).populate('storeId', 'name').exec()
            if (item.trackNumberFromCustomer != null) {
                bookInfo = {
                    OrderId: item.OrderId,
                    BookId: item.BookId,
                    priceSummary: item.priceSummary,
                    startDate: item.startDate,
                    endDate: item.endDate,
                    returnDate: item.returnDate,
                    file: bookFromId.file,
                    StoreId: bookFromId.storeId._id,
                    storeName: bookFromId.storeId.name,
                    title: bookFromId.title,
                    trackNumberFromCustomer: item.trackNumberFromCustomer
                }
            } else {
                bookInfo = {
                    OrderId: item.OrderId,
                    BookId: item.BookId,
                    priceSummary: item.priceSummary,
                    startDate: item.startDate,
                    endDate: item.endDate,
                    returnDate: item.returnDate,
                    file: bookFromId.file,
                    StoreId: bookFromId.storeId._id,
                    storeName: bookFromId.storeId.name,
                    title: bookFromId.title
                }
            }
            book.push(bookInfo)
        }
        res.send(book)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.addReturnInfo = async (req, res) => {
    try {
        const orderId = req.params.id
        const { shippingFromCustomerDate, trackNumberFromCustomer, shippingNameFromCustomer } = req.body
        const order = await Order.findOneAndUpdate({ _id: orderId }, { shippingFromCustomerDate: shippingFromCustomerDate, trackNumberFromCustomer: trackNumberFromCustomer, shippingNameFromCustomer: shippingNameFromCustomer }, { new: true }).exec()
        res.send(order)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.confirmOrderComplete = async (req, res) => {
    try {
        const orderId = req.params.id
        const order = await Order.findOneAndUpdate({ _id: orderId }, { statusOrder: true }, { new: true }).exec()
        const queue = await QueueReserving.findOneAndUpdate({ _id: order.QueueId }, { reservationStatus: true }, { new: true }).exec()
        res.send(order)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}