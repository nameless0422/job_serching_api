const Preferences = require('../models/Preference');

/**
 * Get user preferences
 */
exports.getPreferences = async (req, res) => {
    try {
        const userId = req.user.id;
        const preferences = await Preferences.findOne({ userId });

        if (!preferences) {
            return res.status(404).json({ status: 'error', message: 'Preferences not found' });
        }

        res.status(200).json({ status: 'success', data: preferences });
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'Failed to retrieve preferences' });
    }
};

/**
 * Update user preferences
 */
exports.updatePreferences = async (req, res) => {
    try {
        const userId = req.user.id;
        const updatedPreferences = await Preferences.findOneAndUpdate(
            { userId },
            { ...req.body, userId },
            { upsert: true, new: true }
        );

        res.status(200).json({ status: 'success', data: updatedPreferences });
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'Failed to update preferences' });
    }
};
