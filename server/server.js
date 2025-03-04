const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')

const { connectToMongoDB } = require('./utilities/MongoDBConnection')

const http = require('http')

// API Routes

// Create an instance of Express
const app = express()
app.use(express.json())
app.use(cors())
connectToMongoDB()

// Constants
const port = process.env.PORT || 3000

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

// Parse incoming JSON requests
app.use(express.json())

// Routes
