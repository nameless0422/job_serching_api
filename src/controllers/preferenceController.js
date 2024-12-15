const Preference = require('../models/Preference');

// Get user preferences
exports.getPreferences = async (req, res) => {
  try {
    const preferences = await Preference.findOne({ userId: req.user._id });
    if (!preferences) {
      return res.status(404).json({ status: 'error', message: 'Preferences not found' });
    }
    res.status(200).json({ status: 'success', data: preferences });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Create or update user preferences
exports.setPreferences = async (req, res) => {
  try {
    const { preferredLocations, preferredJobTypes, notificationSettings } = req.body;

    const preferences = await Preference.findOneAndUpdate(
      { userId: req.user._id },
      { preferredLocations, preferredJobTypes, notificationSettings },
      { upsert: true, new: true }
    );

    res.status(200).json({ status: 'success', data: preferences });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Delete user preferences
exports.deletePreferences = async (req, res) => {
  try {
    const preferences = await Preference.findOneAndDelete({ userId: req.user._id });
    if (!preferences) {
      return res.status(404).json({ status: 'error', message: 'Preferences not found' });
    }
    res.status(200).json({ status: 'success', message: 'Preferences deleted successfully' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};