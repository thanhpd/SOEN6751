const mongoose = require('mongoose')

// Booking Schema
const bookingSchema = new mongoose.Schema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    activityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity',
        required: true,
    },
})
module.exports = mongoose.model('Booking', bookingSchema, 'booking')
