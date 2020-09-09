const Transction = require('../models/Transaction')
const Transaction = require('../models/Transaction')

// @desc    Get all transactions
// @route   GET /api/v1/transactions/
// @access  Public
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transction.find()

        return res.status(200).json({
            success: true,
            data: transactions
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
    }
}

// @desc    Add new transaction
// @route   POST /api/v1/transactions/
// @access  Public
exports.addTransaction = async (req, res) => {
    try {
        const transaction = await Transction.create({
            name: req.body.name,
            amount: req.body.amount
        })

        return res.status(200).json({
            success: true,
            data: transaction
        })
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: Object.values(err.errors).map(error => error.message)
            })
        }

        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc    Delete transaction by ID
// @route   DELETE /api/v1/transactions/:id
// @access  Public
exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({ _id: req.params.id })

        if (!transaction)
            return res.status(404).json({
                success: false,
                error: 'Not Found!'
            })

        await transaction.remove()

        return res.status(200).json({
            success: true,
            data: {}
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

