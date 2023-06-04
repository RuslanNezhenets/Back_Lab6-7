const Router = require('express')
const router = new Router()
const BookRouter = require('../routes/BookRouter')
const ReaderRouter = require('../routes/ReaderRouter')
const IssuanceRouter = require('../routes/IssuanceRouter')

router.use('/books', BookRouter)
router.use('/readers', ReaderRouter)
router.use('/issuance', IssuanceRouter)

module.exports = router