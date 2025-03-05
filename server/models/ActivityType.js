const mongoose = require('mongoose')

// ActivityType Schema
const activityTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['in-person', 'online', 'nutrition', 'personal training'],
        required: true,
    },
    subtypes: [{ type: String }],
})
module.exports = mongoose.model(
    'ActivityType',
    activityTypeSchema,
    'activityType'
)
