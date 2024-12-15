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
    // 인증된 사용자 ID
    const userId = req.user?._id;

    if (!userId) {
        return res.status(401).json({
            status: 'error',
            message: 'Authentication required',
        });
    }

    const { preferredJobTypes, preferredLocations, notificationSettings } = req.body;

    // 환경설정 저장 또는 업데이트
    const preferences = await Preferences.findOneAndUpdate(
        { userId }, // 사용자 ID로 검색
        { preferredJobTypes, preferredLocations, notificationSettings },
        { upsert: true, new: true } // 없으면 새로 생성
    );

    res.status(200).json({
        status: 'success',
        data: preferences,
    });
} catch (err) {
    console.error('Error saving preferences:', err.message);
    res.status(500).json({ status: 'error', message: 'Failed to save preferences' });
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