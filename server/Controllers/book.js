const Book = require("../Models/Book")

exports.addBook = async (req, res) => {
    try {
        const { storeId, title, author, translator, publisher, year, price } = req.body
        var book = await new Book({
            storeId,
            title,
            author,
            translator,
            publisher,
            year,
            price
        })
        console.log(book)
        await Book(book).save()
        res.send('Add book success!')
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
exports.listBook = async (req, res) => {
    try {
        const bookList = await Book.find({}).exec()
        res.send(bookList)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
exports.listBookFromStore = async (req, res) => {
    try {
        const id = req.params.id
        const bookList = await Book.find({ storeId: id }).exec()
        res.send(bookList)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}