const mongoose = require('mongoose')

// Instructor Schema
const instructorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    photoUrl: { type: String, required: true },
    bio: { type: String, required: true },
})
module.exports = mongoose.model('Instructor', instructorSchema, 'instructor')
