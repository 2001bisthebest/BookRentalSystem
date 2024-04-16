const Book = require("../Models/Book")
const BookCopy = require("../Models/BookCopy")
const Order = require("../Models/Order")
const QueueReserve = require("../Models/QueueReserving")
const Store = require("../Models/Store")

exports.create = async (req, res) => {
    try {
        const { AccId, startDate, endDate } = req.body
        const bookId = req.params.id
        const bookCopyStatus = await BookCopy.findOneAndUpdate({ BookId: bookId, status: false }, { status: true }).exec()
        var newQueueReserve
        const book = await Book.findOne({ _id: bookId }).exec()

        //check bookCopy status avaliable
        if (bookCopyStatus) {
            console.log(bookCopyStatus)
            newQueueReserve = await new QueueReserve({
                AccId: AccId,
                CopyId: bookCopyStatus._id,
                BookId: bookId,
                StoreId: book.storeId,
                startDate,
                endDate
            })
        } else {
            const queueReserved = await QueueReserve.find({ BookId: bookId, reservationStatus: false }).exec()
            const store = await Store.findOne({ _id: book.storeId }).exec()
            var idItemCantUse = new Array()
            let startDateFromReq = new Date(startDate)
            startDateFromReq.setDate(startDateFromReq.getDate() - store.numberOfDayForShipping)
            let endDateFromReq = new Date(endDate)
            endDateFromReq.setDate(endDateFromReq.getDate() + store.numberOfDayForShipping)

            queueReserved.map((item) => {
                let rangeDate = new Array()
                let currentDate = new Date(item.startDate);
                currentDate.setDate(currentDate.getDate() - store.numberOfDayForShipping - 1)
                let newEndDate = new Date(item.endDate)
                newEndDate.setDate(newEndDate.getDate() + store.numberOfDayForShipping - 1)
                while (currentDate <= newEndDate) {
                    rangeDate.push(currentDate.setDate(currentDate.getDate() + 1))
                }
                rangeDate.forEach((day) => {
                    if (startDateFromReq.getTime() === day || endDateFromReq.getTime() === day) {
                        idItemCantUse.push(item.CopyId)
                    }
                })
            })
            const bookCopy = await BookCopy.findOne({ BookId: bookId, _id: { $nin: idItemCantUse } }).exec()
            newQueueReserve = await new QueueReserve({
                AccId: AccId,
                CopyId: bookCopy._id,
                BookId: bookId,
                StoreId: book.storeId,
                startDate,
                endDate
            })
        }
        await QueueReserve(newQueueReserve).save()
        res.send(newQueueReserve)
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Server error')
    }
}
exports.queuelist = async (req, res) => {
    try {
        const bookId = req.params.id
        const queue = await QueueReserve.find({ BookId: bookId, createOrderStatus: false }).populate("AccId", "username").populate("CopyId", "copyNumber").exec()
        console.log(queue)
        res.send(queue)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.queueFullList = async (req, res) => {
    try {
        const bookId = req.params.id
        const bookCopyStatus = await BookCopy.find({ BookId: bookId, status: false }).exec()
        const bookCopyFirst = await BookCopy.findOne({ copyNumber: 1 }).exec()
        var queueFullList = new Array({
            startDate: '',
            endDate: ''
        })
        const book = await Book.findOne({ _id: bookId }).exec()
        //check bookCopy status avaliable

        if (bookCopyStatus.length < 1) {
            const queueFirst = await QueueReserve.find({ CopyId: bookCopyFirst._id }).exec()
            const queueReserved = await QueueReserve.find({ BookId: bookId, reservationStatus: false, CopyId: { $nin: bookCopyFirst._id } }).exec()
            const store = await Store.findOne({ _id: book.storeId }).exec()
            var rangeDateFisrt = new Array()
            queueFirst.map((item) => {
                let currentDate = new Date(item.startDate);
                currentDate.setDate(currentDate.getDate() - store.numberOfDayForShipping - 1)
                let newEndDate = new Date(item.endDate)
                newEndDate.setDate(newEndDate.getDate() + store.numberOfDayForShipping - 1)
                while (currentDate <= newEndDate) {
                    rangeDateFisrt.push(currentDate.setDate(currentDate.getDate() + 1))
                }
            })

            queueReserved.map((item) => {
                let rangeDate = new Array()
                let currentDate = new Date(item.startDate);
                currentDate.setDate(currentDate.getDate() - store.numberOfDayForShipping - 1)
                let newEndDate = new Date(item.endDate)
                newEndDate.setDate(newEndDate.getDate() + store.numberOfDayForShipping - 1)
                while (currentDate <= newEndDate) {
                    rangeDate.push(currentDate.setDate(currentDate.getDate() + 1))
                }
                let minDate = new Date(1924880400000)
                let maxDate = new Date(1)
                rangeDate.forEach((day) => {
                    rangeDateFisrt.forEach((dayFirst) => {
                        console.log(new Date(dayFirst))
                        if (dayFirst === day) {
                            let setDay = new Date(dayFirst)
                            if (minDate.getTime() >= setDay.getTime()) {
                                minDate.setTime(setDay)
                            }
                            if (maxDate.getTime() <= setDay.getTime()) {
                                maxDate.setTime(setDay)
                            }
                        }

                    })
                })
                queueFullList.push({
                    startDate: minDate,
                    endDate: maxDate
                })
            })

        }
        res.send(queueFullList)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.queueListStore = async (req, res) => {
    try {
        const storeId = req.params.id
        const queue = await QueueReserve.find({ StoreId: storeId, createOrderStatus: false }).exec()
        function filterDuplicates(array) {
            var uniqueArray = array.filter((item, index) => {
                // Check if the index of the current item is equal to the first occurrence of the item
                return (index === array.findIndex((obj) => {
                    return obj.BookId.equals(item.BookId);
                }));
            });
            return uniqueArray;
        }
        var uniqueArray = filterDuplicates(queue);

        console.log(uniqueArray);
        const bookList = new Array()
        for (let value of uniqueArray) {
            const book = await Book.findOne({ _id: value.BookId }).exec()
            bookList.push(book)
        }
        res.send(bookList)
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.deleteQueue = async (req, res) => {
    try {
        const id = req.params.id
        const queue = await QueueReserve.findOne({ _id: id }).exec()
        const queueBook = await QueueReserve.find({ BookId: queue.BookId, CopyId: { _id: queue.CopyId._id } }).exec()
        if (queueBook.length === 1) {
            const book = await BookCopy.findOneAndUpdate({ _id: queue.CopyId._id }, { status: false }, { new: true }).exec()
        }
        const queueDelete = await QueueReserve.deleteOne({ _id: id }).exec()
        res.send('Cancel success!')
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.queueListUser = async (req, res) => {
    try {
        const id = req.params.id
        const queue = await QueueReserve.find({ AccId: id, createOrderStatus: false }).populate('BookId').populate('StoreId').exec()
        res.send(queue)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}