/**
 * @swagger
 * tags:
 *   name: Bookmarks
 *   description: Manage bookmarks for job posts
 */
const express = require('express');
const { toggleBookmark, getBookmarks } = require('../controllers/bookmarkController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /bookmarks:
 *   post:
 *     summary: Add or remove a bookmark
 *     tags: [Bookmarks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Bookmark toggled successfully
 */
// 북마크 추가/제거
router.post('/', authenticate, toggleBookmark);

/**
 * @swagger
 * /bookmarks:
 *   get:
 *     summary: Get user bookmarks
 *     tags: [Bookmarks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User bookmarks retrieved successfully
 */
// 북마크 목록 조회
router.get('/', authenticate, getBookmarks);

module.exports = router;
