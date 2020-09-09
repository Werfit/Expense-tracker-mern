const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })

        console.log(`MongoDB connected: ${connection.connection.host}`.cyan.underline.bold)
    } catch (e) {
        console.log(e)
        console.log('Error occured'.red.bold)
        process.exit(1)
    }
}

module.exports = connectDB