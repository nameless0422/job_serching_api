/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Manage job postings
 */

const express = require('express');
const { getJobs, getJobById } = require('../controllers/jobController');
const router = express.Router();

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Get a list of job postings
 *     tags: [Jobs]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: Job postings retrieved successfully
 */
router.get('/', getJobs);

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Get job details
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
 *       404:
 *         description: Job not found
 */
router.get('/:id', getJobById);

module.exports = router;
