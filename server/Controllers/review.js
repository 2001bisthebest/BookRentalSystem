const Review = require("../Models/Review")

exports.addReview = async (req, res) => {
    try {
        const bookId = req.params.id
        const { AccId, comment } = req.body
        const review = await new Review({
            AccId: AccId,
            BookId: bookId,
            comment: comment
        }).save()
        res.send(review)
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.listReview = async (req, res) => {
    try {
        const bookId = req.params.id
        const review = await Review.find({ BookId: bookId }).populate("AccId", "username").exec()
        console.log(review)
        res.send(review)
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}