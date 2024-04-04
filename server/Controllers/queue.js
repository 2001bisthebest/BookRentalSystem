const BookCopy = require("../Models/BookCopy")
const QueueReserve = require("../Models/QueueReserving")

exports.create = async (req, res) => {
    try {
        const { userId, startDate, endDate } = req.body
        const bookId = req.params.id
        const bookCopy = await BookCopy.findOneAndUpdate({ BookId: bookId, status: false }, { status: true }).exec()
        console.log('bookCopy', bookCopy)
        const queueReserve = await new QueueReserve({
            AccId: userId,
            CopyId: bookCopy._id,
            startDate,
            endDate
        }).save()
        res.send(queueReserve)
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Server error')
    }
}