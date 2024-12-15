const Preferences = require('../models/Preference');
const mongoose = require('mongoose');

/**
 * Save or update user preferences
 */
exports.savePreferences = async (req, res) => {
    const { userId, preferredJobTypes, preferredLocations, notificationSettings } = req.body;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ status: 'error', message: 'Invalid user ID' });
    }

    try {
        // Find and update preferences or create new one
        const preferences = await Preferences.findOneAndUpdate(
            { userId },
            {
                $set: {
                    preferredJobTypes,
                    preferredLocations,
                    notificationSettings,
                },
            },
            { upsert: true, new: true } // Create if not exists, return updated document
        );

        res.status(200).json({ status: 'success', data: preferences });
    } catch (err) {
        console.error('Error saving preferences:', err.message);
        res.status(500).json({ status: 'error', message: 'Failed to save preferences' });
    }
};
