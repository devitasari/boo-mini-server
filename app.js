if (process.env.APP_MODE !== 'test') {
    require('./config/mongoose')
}

const express = require('express')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', routes)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log('listening port ', PORT);
})

module.exports = app

