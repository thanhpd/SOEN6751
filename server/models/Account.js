const mongoose = require('mongoose')

// Account Schema
const accountSchema = new mongoose.Schema({
    membershipId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Membership',
        required: true,
    },
    password: { type: String, required: true },
    avatarUrl: { type: String, default: null },
    qrCodeUrl: { type: String, required: true },
    notificationsEnabled: { type: Boolean, required: true, default: true },
    gamificationEnabled: { type: Boolean, required: true, default: false },
    gamificationProgress: { type: Number, required: true, default: 0 },
})
module.exports = mongoose.model('Account', accountSchema, 'account')
