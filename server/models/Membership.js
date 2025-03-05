const mongoose = require('mongoose')

// Membership Schema
const membershipSchema = new mongoose.Schema({
    membershipTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MembershipType',
        required: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    studentId: { type: String, required: true },
    expiryDate: { type: Date, required: true },
})
module.exports = mongoose.model('Membership', membershipSchema, 'membership')
