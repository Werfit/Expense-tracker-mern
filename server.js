const express = require('express')
const dotenv = require('dotenv')
const path = require('path')

require('colors')

// Routes
const transactions = require('./router/transactions')

const connectDB = require('./config/db')

dotenv.config({
    path: './config/config.env'
})

connectDB()

const app = express()

app.use(express.json())
app.use(express.static(path.resolve(__dirname, "client", "build")));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.use('/api/v1/transactions', transactions)

app.listen(process.env.PORT || 8000, console.log(`Server running on port ${process.env.PORT}`.yellow.bold))