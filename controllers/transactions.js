const Users = require('../models/User')
const mongoose = require('mongoose')

// @desc    Get all transactions
// @route   GET /api/v1/transactions/
// @access  Public
exports.getTransactions = async (req, res) => {
    try {
        const user = await Users.findOne({ userId: req.body.userId })

        return res.status(200).json({
            success: true,
            data: user
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
        const transaction = {
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            amount: req.body.amount,
            createdAt: req.body.createdAt
        }

        let user = await Users.findOne({ userId: req.body.userId })

        if (user) {
            user.transactions = JSON.stringify([transaction, ...JSON.parse(user.transactions)])
    
            await user.save()
        } else {
            user = await Users.create({
                userId: req.body.userId,
                transactions: JSON.stringify([transaction])
            })
        }

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
        const user = await Users.findOne({ userId: req.params.userId })

        if (!user)
            return res.status(404).json({
                success: false,
                error: 'Not Found!'
            })

        user.transactions = JSON.stringify(JSON.parse(user.transactions).filter((el) => el._id !== req.params.id))

        await user.save()

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

