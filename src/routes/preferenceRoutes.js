const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const {
  getPreferences,
  setPreferences,
  deletePreferences,
} = require('../controllers/preferenceController');

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
 *         description: Successfully retrieved user preferences
 *       404:
 *         description: Preferences not found
 *       500:
 *         description: Internal server error
 */
router.get('/', authenticate, getPreferences);

/**
 * @swagger
 * /preferences:
 *   post:
 *     summary: Create or update user preferences
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
 *               preferredLocations:
 *                 type: array
 *                 items:
 *                   type: string
 *               preferredJobTypes:
 *                 type: array
 *                 items:
 *                   type: string
 *               notificationSettings:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: boolean
 *                   sms:
 *                     type: boolean
 *                   push:
 *                     type: boolean
 *     responses:
 *       200:
 *         description: Preferences updated successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticate, setPreferences);

/**
 * @swagger
 * /preferences:
 *   delete:
 *     summary: Delete user preferences
 *     tags: [Preferences]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Preferences deleted successfully
 *       404:
 *         description: Preferences not found
 *       500:
 *         description: Internal server error
 */
router.delete('/', authenticate, deletePreferences);

module.exports = router;