/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Job application management
 */
const express = require('express');
const { applyJob, getApplications, cancelApplication } = require('../controllers/applicationController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();


/**
 * @swagger
 * /applications:
 *   post:
 *     summary: Apply for a job
 *     tags: [Applications]
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
 *               resume:
 *                 type: string
 *     responses:
 *       201:
 *         description: Application submitted successfully
 *       400:
 *         description: Already applied for the job
 */
// 지원하기
router.post('/', authenticate, applyJob);


/**
 * @swagger
 * /applications:
 *   get:
 *     summary: Get application history
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Application history retrieved successfully
 */
// 지원 내역 조회
router.get('/', authenticate, getApplications);


/**
 * @swagger
 * /applications/{id}:
 *   delete:
 *     summary: Cancel a job application
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Application ID
 *     responses:
 *       200:
 *         description: Application cancelled successfully
 *       404:
 *         description: Application not found
 */
// 지원 취소
router.delete('/:id', authenticate, cancelApplication);

module.exports = router;
