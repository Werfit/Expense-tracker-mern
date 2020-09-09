const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please, give a name to your transaction']
    },
    amount: {
        type: Number,
        required: [true, 'Please, enter a number']
    },
    createdAt: {
        type: [Number],
        default: [new Date().getMonth(), new Date().getFullYear()]
    }
})

module.exports = mongoose.model('Transaction', TransactionSchema)