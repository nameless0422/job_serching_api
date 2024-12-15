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
 *     summary: Retrieve user preferences
 *     description: Get the saved preferences for the authenticated user.
 *     tags: [Preferences]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user preferences.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       description: The ID of the authenticated user
 *                       example: "675e2bdca59ec8122a6f2227"
 *                     preferredJobTypes:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: List of preferred job types
 *                       example: ["python", "java"]
 *                     preferredLocations:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: List of preferred job locations
 *                       example: ["서울", "부산"]
 *                     notificationSettings:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: boolean
 *                           description: Email notifications enabled
 *                           example: true
 *                         sms:
 *                           type: boolean
 *                           description: SMS notifications enabled
 *                           example: false
 *                         push:
 *                           type: boolean
 *                           description: Push notifications enabled
 *                           example: true
 *       404:
 *         description: Preferences not found.
 *       401:
 *         description: Unauthorized access. Authentication required.
 *       500:
 *         description: Internal server error.
 */
/**
 * 사용자 환경설정 조회
 */
router.get('/', authenticate, getPreferences);

/**
 * @swagger
 * /preferences:
 *   post:
 *     summary: Save or update user preferences
 *     description: Save or update the preferences for the authenticated user.
 *     tags: [Preferences]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               preferredJobTypes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of preferred job types
 *                 example: ["javascript", "c++"]
 *               preferredLocations:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of preferred job locations
 *                 example: ["대전", "광주"]
 *               notificationSettings:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: boolean
 *                     description: Enable email notifications
 *                     example: true
 *                   sms:
 *                     type: boolean
 *                     description: Enable SMS notifications
 *                     example: false
 *                   push:
 *                     type: boolean
 *                     description: Enable push notifications
 *                     example: true
 *     responses:
 *       200:
 *         description: Preferences saved or updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       description: The ID of the authenticated user
 *                       example: "675e2bdca59ec8122a6f2227"
 *                     preferredJobTypes:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: List of preferred job types
 *                       example: ["javascript", "c++"]
 *                     preferredLocations:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: List of preferred job locations
 *                       example: ["대전", "광주"]
 *                     notificationSettings:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: boolean
 *                           description: Email notifications enabled
 *                           example: true
 *                         sms:
 *                           type: boolean
 *                           description: SMS notifications enabled
 *                           example: false
 *                         push:
 *                           type: boolean
 *                           description: Push notifications enabled
 *                           example: true
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized access. Authentication required.
 *       500:
 *         description: Internal server error.
 */
/**
 * 사용자 환경설정 저장/수정
 */
router.post('/', authenticate, validate(preferencesSchema), updatePreferences);

module.exports = router;
