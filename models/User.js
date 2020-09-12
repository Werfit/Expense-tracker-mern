const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    transactions: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Transaction', UserSchema)