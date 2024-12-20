/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Job application management
 */
const express = require('express');
const { applyJob, getApplications, cancelApplication } = require('../controllers/applicationController');
const { authenticate } = require('../middleware/authMiddleware');
const cacheMiddleware = require('../middleware/cacheMiddleware');
const validate = require('../middleware/validationMiddleware');
const { applicationSchema } = require('../schemas/applicationSchemas'); // Validation schema

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
router.post('/', authenticate, validate(applicationSchema), applyJob);

/**
 * @swagger
 * /applications:
 *   get:
 *     summary: Retrieve user application history
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Application history retrieved successfully
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
 *                         description: Application ID
 *                       userId:
 *                         type: string
 *                         description: ID of the user who submitted the application
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
 *                       resume:
 *                         type: string
 *                         description: User's resume (if submitted)
 *                       status:
 *                         type: string
 *                         description: Current application status (e.g., applied, pending, rejected)
 *                         example: applied
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: When the application was created
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: When the application was last updated
 *                       __v:
 *                         type: integer
 *                         description: Version key
 *         examples:
 *           example-1:
 *             value:
 *               status: "success"
 *               data:
 *                 - _id: "675dfaa23ed341ca728d2302"
 *                   userId: "675d8893940cfa8973f2b121"
 *                   jobId:
 *                     _id: "675cc180a59ec8122a6ef03a"
 *                     company: "675cc180a59ec8122a6ef038"
 *                     title: "(\uc8fc)\ub514\uc9c0\ud0a4 Python \ub370\uc774\ud130 \ucc98\ub9ac \ubc0f \ubc18\uc751 \ud504\ub9ac\uadf8\ub7a8 \uac1c\ubc1c\uc790 \ubaa9\uc9d1"
 *                     location: "\uacbd\uae30  \uc548\uc591\uc2dc \ub9e4\uc548\uad70"
 *                   resume: "test"
 *                   status: "applied"
 *                   createdAt: "2024-12-14T21:37:38.285Z"
 *                   updatedAt: "2024-12-14T21:37:38.285Z"
 *                   __v: 0
 *       401:
 *         description: Authentication token required or invalid
 *       500:
 *         description: Internal server error
 */
// 지원 내역 조회
router.get('/', cacheMiddleware, authenticate, getApplications);

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
