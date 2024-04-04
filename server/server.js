const express = require('express')
const { readdirSync } = require('fs')
const morgan = require('morgan')
const cors = require('cors')
const bodyParse = require('body-parser')
const connectDB = require('./Config/db')

const app = express();
const PORT = 5000;

connectDB()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParse.json({ limit: '10mb' }))
app.use('/img', express.static('uploads'))

// const productRouter = require('./Routes/product')

// app.use('/api', productRouter)
// route1
// app.get('/product', (req, res) => {
//     res.send('Hello Endpoint')
// })
readdirSync('./Routes')
    .map((r) => app.use('/api', require('./Routes/' + r)))

app.listen(PORT, () => console.log('Server is running on port 5000 ...'))