const Book = require("../Models/Book")
const BookCopy = require("../Models/BookCopy")
const Category = require("../Models/Category")
const CategoryOfBook = require("../Models/CategoryOfBook")

exports.addBook = async (req, res) => {
    try {
        const { title, author, translator, publisher, year, price } = req.body
        var file
        if (req.file) {
            file = req.file.filename
        }
        const storeId = req.params.id
        var book = await new Book({
            storeId,
            title,
            author,
            translator,
            publisher,
            year,
            price,
            file
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
exports.showBookInfo = async (req, res) => {
    try {
        const bookId = req.params.id
        const bookInfo = await Book.findOne({ _id: bookId }).exec()
        res.send(bookInfo)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
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
exports.listBookCopy = async (req, res) => {
    try {
        const bookId = req.params.id
        const bookCopyList = await BookCopy.find({ BookId: bookId }).exec()
        res.send(bookCopyList)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
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
exports.categoryName = async (req, res) => {
    try {
        const categoryName = req.params.name
        const category = await Category.findOne({ name: categoryName }).exec()
        res.send(category)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.addCategoryOfBook = async (req, res) => {
    try {
        const { categoryId, bookId } = req.body
        const categoryofbook = await new CategoryOfBook({
            categoryId: categoryId,
            bookId: bookId
        }).save()
        res.send(categoryofbook)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.listCategoryOfBook = async (req, res) => {
    try {
        const { category } = req.query
        console.log(category)
        const categoryInfo = await Category.findOne({ name: category }).exec()
        const listCategoryOfBook = await CategoryOfBook.find({ categoryId: categoryInfo._id }).populate("bookId").exec()
        res.send(listCategoryOfBook)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}