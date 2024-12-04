const Bookmark = require('../models/Bookmark');

// 북마크 추가/제거
exports.toggleBookmark = async (req, res) => {
    const { jobId } = req.body;

    try {
        const existingBookmark = await Bookmark.findOne({ userId: req.user.id, jobId });
        if (existingBookmark) {
            await existingBookmark.deleteOne();
            return res.json({ status: 'success', message: 'Bookmark removed' });
        }

        const bookmark = new Bookmark({ userId: req.user.id, jobId });
        await bookmark.save();
        res.json({ status: 'success', message: 'Bookmark added' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// 북마크 목록 조회
exports.getBookmarks = async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({ userId: req.user.id }).populate('jobId', 'title company location');
        res.json({ status: 'success', data: bookmarks });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};
