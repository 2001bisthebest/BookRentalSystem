const Book = require("../Models/Book")
const BookCopy = require("../Models/BookCopy")
const BookPreference = require("../Models/BookPreference")
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
exports.showBookInfoPoppulateStore = async (req, res) => {
    try {
        const bookId = req.params.id
        const bookInfo = await Book.findOne({ _id: bookId }).populate("storeId").exec()
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
        const { storeId } = req.body
        const bookId = req.params.id
        // const bookList = await Book.findOne({ _id: bookId, storeId: storeId }).exec()
        const lastCopy = await BookCopy.findOne({ BookId: bookId, StoreId: storeId }).sort({ copyNumber: -1 }).exec();
        let nextCopyNumber = 1;
        if (lastCopy) {
            nextCopyNumber = lastCopy.copyNumber + 1;
        }
        const bookCopy = await new BookCopy({
            BookId: bookId,
            StoreId: storeId,
            copyNumber: nextCopyNumber
        })
        await bookCopy.save()
        res.send(bookCopy)
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
        const categoryInfo = await Category.findOne({ name: category }).exec()
        const listCategoryOfBook = await CategoryOfBook.find({ categoryId: categoryInfo._id }).populate("bookId").exec()
        var listBookWithStatus = []
        for (let value of listCategoryOfBook) {
            const bookCopy = await BookCopy.find({ BookId: value.bookId._id }).exec()
            let status = []
            bookCopy.map((bookItem) => {
                status.push(bookItem.status)
            })
            const isAvaliable = (cur) => cur === true
            const result = status.every(isAvaliable)
            let bookWithStatus = {
                _id: value.bookId._id,
                title: value.bookId.title,
                price: value.bookId.price,
                file: value.bookId.file,
                status: result
            }
            listBookWithStatus.push(bookWithStatus)
        }
        res.send(listBookWithStatus)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.addBookPref = async (req, res) => {
    try {
        const { CategoryId, AccId } = req.body
        const bookPref = await new BookPreference({
            AccId: AccId,
            CategoryId: CategoryId
        }).save()
        res.send(bookPref)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.bookStatus = async (req, res) => {
    try {
        const statusBook = new Array()
        const book = await Book.find().exec()
        for (let value of book) {
            const bookCopy = await BookCopy.find({ BookId: value._id }).exec()
            let status = []
            bookCopy.map((bookItem) => {
                status.push(bookItem.status)
            })
            const isAvaliable = (cur) => cur === true
            const result = status.every(isAvaliable)
            let bookWithStatus = {
                _id: value._id,
                title: value.title,
                price: value.price,
                file: value.file,
                status: result
            }
            statusBook.push(bookWithStatus)
        }
        res.send(statusBook)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.listNewBook = async (req, res) => {
    try {
        const bookList = await Book.find({}).sort({ createdAt: -1 }).limit(5).exec()
        res.send(bookList)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.listReccomandBook = async (req, res) => {
    try {
        const id = req.params.id
        const bookPref = await BookPreference.findOne({ AccId: id }).exec()
        const listId = []
        for (let value of bookPref.CategoryId) {
            let bookList
            bookList = await CategoryOfBook.find({ categoryId: value }).exec()
            for (let book of bookList) {
                listId.push(book)
            }
        }
        function filterDuplicates(array) {
            var uniqueArray = array.filter((item, index) => {
                return (index === array.findIndex((obj) => {
                    return obj.bookId.equals(item.bookId);
                }));
            });
            return uniqueArray;
        }
        var uniqueArray = filterDuplicates(listId);
        var listBook = []
        for (let value of uniqueArray) {
            let book
            book = await Book.findOne({ _id: value.bookId }).exec()
            listBook.push(book)
        }
        function generateRandomArray(length, max) {
            let result = new Set();
            for (let i = 0; i < length; i++) {
                let random = listBook[Math.floor(Math.random() * max)]
                result.add(random);
            }
            return Array.from(result);
        }

        const listBookRand = generateRandomArray(5, listBook.length);
        console.log(listBookRand);
        res.send(listBookRand)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}