/**
 * @swagger
 * tags:
 *   name: Bookmarks
 *   description: Manage bookmarks for job posts
 */
const express = require('express');
const { toggleBookmark, getBookmarks } = require('../controllers/bookmarkController');
const validate = require('../middleware/validationMiddleware');
const { authenticate } = require('../middleware/authMiddleware'); // 인증 미들웨어
const cacheMiddleware = require('../middleware/cacheMiddleware'); // 캐싱 미들웨어
const { bookmarkSchema } = require('../schemas/bookmarkSchemas'); // 유효성 검사 스키마

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Bookmark toggled successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     jobId:
 *                       type: string
 *                       example: "675cc180a59ec8122a6ef03a"
 *       401:
 *         description: Authentication token required or invalid
 *       500:
 *         description: Internal server error
 */
// 북마크 추가/제거
router.post('/', authenticate, validate(bookmarkSchema), toggleBookmark);

/**
 * @swagger
 * /bookmarks:
 *   get:
 *     summary: Retrieve user bookmarks
 *     tags: [Bookmarks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User bookmarks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Bookmark ID
 *                       userId:
 *                         type: string
 *                         description: ID of the user who created the bookmark
 *                       jobId:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: Job ID
 *                           company:
 *                             type: string
 *                             description: ID of the associated company
 *                           title:
 *                             type: string
 *                             description: Title of the job
 *                           location:
 *                             type: string
 *                             description: Location of the job
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: When the bookmark was created
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: When the bookmark was last updated
 *                       __v:
 *                         type: integer
 *                         description: Version key
 *             examples:
 *               example-1:
 *                 value:
 *                   status: "success"
 *                   data:
 *                     - _id: "675df9be3ed341ca728d22f9"
 *                       userId: "675d8893940cfa8973f2b121"
 *                       jobId:
 *                         _id: "675cc180a59ec8122a6ef03a"
 *                         company: "675cc180a59ec8122a6ef038"
 *                         title: "(주)디지키 Python 데이터 처리 및 분석 프로그램 개발자 모집"
 *                         location: "경기  안양시 만안구"
 *                       createdAt: "2024-12-14T21:33:50.702Z"
 *                       updatedAt: "2024-12-14T21:33:50.702Z"
 *                       __v: 0
 *       401:
 *         description: Authentication token required or invalid
 *       500:
 *         description: Internal server error
 */

// 북마크 목록 조회
router.get('/', cacheMiddleware, authenticate, getBookmarks);

module.exports = router;
