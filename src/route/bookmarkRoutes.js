const express = require('express');
const { toggleBookmark, getBookmarks } = require('../controllers/bookmarkController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// 북마크 추가/제거
router.post('/', authenticate, toggleBookmark);

// 북마크 목록 조회
router.get('/', authenticate, getBookmarks);

module.exports = router;
