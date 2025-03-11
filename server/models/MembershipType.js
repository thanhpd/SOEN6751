const mongoose = require('mongoose')

// MembershipType Schema
const membershipTypeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    durationDays: { type: Number, required: true },
    price: { type: Number, required: true },
})
module.exports = mongoose.model(
    'MembershipType',
    membershipTypeSchema,
    'membershipType'
)
