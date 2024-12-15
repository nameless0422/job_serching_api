const express = require('express');
const { savePreferences , getPreferences} = require('../controllers/preferenceController');
const validate = require('../middleware/validationMiddleware');
const { preferencesSchema } = require('../schemas/preferencesSchema');

const router = express.Router();

/**
 * @swagger
 * /preferences/{userId}:
 *   get:
 *     summary: Retrieve user preferences by userId
 *     tags: [Preferences]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose preferences are being retrieved
 *     responses:
 *       200:
 *         description: User preferences retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PreferencesResponse'
 *             examples:
 *               example-1:
 *                 value:
 *                   status: success
 *                   data:
 *                     userId: "675cc180a59ec8122a6ef03a"
 *                     preferredJobTypes: ["python", "java"]
 *                     preferredLocations: ["서울", "부산"]
 *                     notificationSettings:
 *                       email: true
 *                       sms: false
 *                       push: true
 *       404:
 *         description: Preferences not found for the given user ID
 *       500:
 *         description: Internal server error
 */
router.get('/:userId', getPreferences);

/**
 * @swagger
 * /preferences:
 *   post:
 *     summary: Save or update user preferences
 *     description: API to save or update user preferences, such as job types, locations, and notification settings.
 *     tags: [Preferences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PreferencesRequest'
 *           examples:
 *             example-1:
 *               summary: Example request
 *               value:
 *                 userId: "675cc180a59ec8122a6ef03a"
 *                 preferredJobTypes: ["python", "java"]
 *                 preferredLocations: ["서울", "부산"]
 *                 notificationSettings:
 *                   email: true
 *                   sms: false
 *                   push: true
 *     responses:
 *       200:
 *         description: Preferences saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PreferencesResponse'
 *             examples:
 *               example-1:
 *                 summary: Example response
 *                 value:
 *                   status: "success"
 *                   data:
 *                     _id: "675e3bfca59ec8122a6f3338"
 *                     userId: "675cc180a59ec8122a6ef03a"
 *                     preferredJobTypes: ["python", "java"]
 *                     preferredLocations: ["서울", "부산"]
 *                     notificationSettings:
 *                       email: true
 *                       sms: false
 *                       push: true
 *                     createdAt: "2024-12-15T02:00:00.000Z"
 *                     updatedAt: "2024-12-15T02:00:00.000Z"
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Invalid user ID"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Failed to save preferences"
 */

router.post('/', validate(preferencesSchema), savePreferences);

module.exports = router;
