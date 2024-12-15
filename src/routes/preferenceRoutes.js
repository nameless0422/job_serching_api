const express = require('express');
const { getPreferences, updatePreferences } = require('../controllers/preferenceController');
const validate = require('../middleware/validationMiddleware');
const { preferencesSchema } = require('../schemas/preferencesSchema');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /preferences:
 *   get:
 *     summary: Get user preferences
 *     tags: [Preferences]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User preferences retrieved successfully
 *       404:
 *         description: Preferences not found
 */
/**
 * 사용자 환경설정 조회
 */
router.get('/', authenticate, getPreferences);

/**
 * @swagger
 * /preferences:
 *   post:
 *     summary: Update user preferences
 *     tags: [Preferences]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Preferences'
 *     responses:
 *       200:
 *         description: User preferences updated successfully
 *       400:
 *         description: Validation failed
 *       500:
 *         description: Internal server error
 */
/**
 * 사용자 환경설정 저장/수정
 */
router.post('/', authenticate, validate(preferencesSchema), updatePreferences);

module.exports = router;
