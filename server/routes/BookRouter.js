const Router = require('express')
const controller = require('../controllers/BooksController');

const router = new Router()

router.post('/', controller.create)
router.get('/', controller.getAll)
router.get('/:id', controller.getOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router