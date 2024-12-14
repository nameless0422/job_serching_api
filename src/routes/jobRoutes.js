const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { authenticate } = require('../middleware/authMiddleware'); // 인증 미들웨어

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: API for managing job postings
 */

/**
 * @swagger
 * /jobs/stats:
 *   get:
 *     summary: Get aggregated job statistics
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: groupBy
 *         required: true
 *         schema:
 *           type: string
 *           enum: [company, location, experience, employmentType, sector]
 *         description: The field to group by
 *       - in: query
 *         name: filter
 *         required: false
 *         schema:
 *           type: string
 *           example: '{"location":"서울"}'
 *         description: JSON string for filtering data
 *     responses:
 *       200:
 *         description: Aggregated statistics retrieved successfully
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
 *                         description: Grouped field value
 *                       count:
 *                         type: integer
 *                         description: Count of jobs in this group
 *       400:
 *         description: Missing or invalid query parameters
 *       500:
 *         description: Internal server error
 */

// Aggregate job statistics
router.get('/stats', authenticate, jobController.getJobStats);

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Retrieve a list of jobs with search, filtering, sorting, and pagination
 *     tags: [Jobs]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Keyword to search job titles
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter by job location
 *       - in: query
 *         name: experience
 *         schema:
 *           type: string
 *         description: Filter by required experience level
 *       - in: query
 *         name: education
 *         schema:
 *           type: string
 *         description: Filter by required education level
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Field to sort by (e.g., "title", "-deadline")
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of jobs
 */
router.get('/', jobController.getAllJobs);

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Retrieve job details by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job details retrieved successfully
 */
router.get('/:id', jobController.getJobById);

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a new job posting
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               company:
 *                 type: string
 *               location:
 *                 type: string
 *               experience:
 *                 type: string
 *               education:
 *                 type: string
 *               employmentType:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date
 *               sector:
 *                 type: string
 *               salary:
 *                 type: string
 *     responses:
 *       201:
 *         description: Job created successfully
 */
router.post('/', authenticate, jobController.createJob);

/**
 * @swagger
 * /jobs/{id}:
 *   put:
 *     summary: Update a job posting
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Job ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               company:
 *                 type: string
 *               location:
 *                 type: string
 *               experience:
 *                 type: string
 *               education:
 *                 type: string
 *               employmentType:
 *                 type: string
 *               deadline:
 *                 type: string
 *               sector:
 *                 type: string
 *               salary:
 *                 type: string
 *     responses:
 *       200:
 *         description: Job updated successfully
 */
router.put('/:id', authenticate, jobController.updateJob);

/**
 * @swagger
 * /jobs/{id}:
 *   delete:
 *     summary: Delete a job posting
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job deleted successfully
 */
router.delete('/:id', authenticate, jobController.deleteJob);

module.exports = router;
