const mongoose = require('mongoose')

// Activity Schema
const activitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    activityTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ActivityType',
        required: true,
    },
    subtype: { type: String },
    price: { type: Number, required: true },
    dateTime: { type: [Date], required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true,
    },
})
module.exports = mongoose.model('Activity', activitySchema, 'activity')
