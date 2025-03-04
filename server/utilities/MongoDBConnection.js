const mongoose = require('mongoose')

const connectToMongoDB = async () => {
    try {
        mongoose
            .connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log('Connected to MongoDB')
            })
            .catch(error => {
                console.error('Error connecting to MongoDB:', error)
            })
    } catch (error) {
        console.log('Error connecting to mongodb')
    }
}

function close() {
    return mongoose.disconnect()
}

module.exports = { connectToMongoDB, close }
