const router = require('express').Router()
const { getTransactions, addTransaction, deleteTransaction } = require('../controllers/transactions')

router
    .route('/')
    .post(getTransactions)

router
    .route('/new-transaction')
    .post(addTransaction)

router
    .route('/:userId/:id')
    .delete(deleteTransaction)

module.exports = router
