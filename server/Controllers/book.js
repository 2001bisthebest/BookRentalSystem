const Book = require("../Models/Book")
const BookCopy = require("../Models/BookCopy")
const Category = require("../Models/Category")

exports.addBook = async (req, res) => {
    try {
        const { title, author, translator, publisher, year, price } = req.body
        const storeId = req.params.id
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
exports.addBookCopy = async (req, res) => {
    try {
        const { title } = req.body
        const storeId = req.params.id
        const bookList = await Book.findOne({ title: title, storeId: storeId }).exec()
        const bookId = bookList._id
        const lastCopy = await BookCopy.findOne({ BookId: bookId, StoreId: storeId }).sort({ copyNumber: -1 }).exec();
        let nextCopyNumber = 1;
        if (lastCopy) {
            nextCopyNumber = lastCopy.copyNumber + 1;
        }
        console.log('bookId ', bookId)
        const bookCopy = await new BookCopy({
            BookId: bookId,
            StoreId: storeId,
            copyNumber: nextCopyNumber
        })
        await bookCopy.save()
        res.send(bookCopy)
        console.log('book copy ', bookCopy)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
exports.addCategory = async (req, res) => {
    try {
        const { name } = req.body
        const category = await new Category({
            name: name
        })
        await category.save()
        res.send('Add category success!')
        console.log(category)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.listCategory = async (req, res) => {
    try {
        const category = await Category.find({}).exec()
        res.send(category)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}