const Book = require("../Models/Book")
const BookCopy = require("../Models/BookCopy")
const QueueReserve = require("../Models/QueueReserving")
const Store = require("../Models/Store")

exports.create = async (req, res) => {
    try {
        const { userId, startDate, endDate } = req.body
        const bookId = req.params.id
        const bookCopyStatus = await BookCopy.findOneAndUpdate({ BookId: bookId, status: false }, { status: true }).exec()
        var newQueueReserve
        const book = await Book.findOne({ _id: bookId }).exec()

        //check bookCopy status avaliable
        if (bookCopyStatus) {
            console.log(bookCopyStatus)
            newQueueReserve = await new QueueReserve({
                AccId: userId,
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
                AccId: userId,
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
        const queue = await QueueReserve.find({ BookId: bookId }).exec()
        console.log(queue)
        res.send(queue)
    } catch (err) {
        console.log(err)
        res.statu(500).send('Server Error')
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
        // cannot use this controller
        const storeId = req.params.id
        const queue = await QueueReserve.find({ StoreId: storeId }).exec()
        const bookId = new Array()
        queue.forEach(item => {
            const haveId = (cur) => cur.equals(item.BookId);
            console.log(bookId.every(haveId))
            if (bookId.every(haveId) == false) {
                bookId.push(item.BookId);
            }
        });
        console.log(bookId)
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.deleteQueue = async (req, res) => {
    try {
        const id = req.params.id
        const queue = await QueueReserve.deleteOne({ _id: id }).exec()
        res.send('Cancel success!')
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}