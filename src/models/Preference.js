const mongoose = require('mongoose');

const preferencesSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        preferredJobTypes: {
            type: [String],
            required: true,
        },
        preferredLocations: {
            type: [String],
            required: true,
        },
        notificationSettings: {
            email: { type: Boolean, required: true },
            sms: { type: Boolean, required: true },
            push: { type: Boolean, required: true },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Preferences', preferencesSchema);
