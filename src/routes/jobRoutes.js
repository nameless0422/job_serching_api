
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { authenticate } = require('../middleware/authMiddleware');
const validate = require('../middleware/validationMiddleware');
const { jobSchema, jobFilterSchema } = require('../schemas/jobSchemas');
const cacheMiddleware = require('../middleware/cacheMiddleware');

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: API for managing job postings
 */

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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 *             examples:
 *               example-1:
 *                 summary: Example response
 *                 value:
 *                   - _id: "675cc180a59ec8122a6ef03a"
 *                     company: "675cc180a59ec8122a6ef038"
 *                     title: "(주)디지키 Python 데이터 처리 및 분석 프로그램 개발자 모집"
 *                     location: "경기 안양시 만안구"
 *                     experience: "신입·경력"
 *                     education: "학력무관"
 *                     employmentType: "계약직"
 *                     salary: "급성장중"
 *                     sector: "Python, 알고리즘, Pandas, 솔루션업체, 소프트웨어개발"
 */
router.get('/', validate(jobFilterSchema), cacheMiddleware, jobController.getAllJobs);

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
 *             examples:
 *               example-1:
 *                 summary: Example response
 *                 value:
 *                   - _id: "서울"
 *                     count: 25
 *                   - _id: "경기"
 *                     count: 15
 */
router.get('/stats', cacheMiddleware, jobController.getJobStats);

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
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *             examples:
 *               example-1:
 *                 summary: Example response
 *                 value:
 *                   _id: "675cc180a59ec8122a6ef03b"
 *                   company: "675cc180a59ec8122a6ef038"
 *                   title: "새로운 채용 공고"
 *                   location: "서울 강남구"
 *                   experience: "3년 이상"
 *                   education: "대졸 이상"
 *                   employmentType: "정규직"
 *                   salary: "협의 가능"
 *                   sector: "IT, 개발"
 */
router.post('/', authenticate, validate(jobSchema), jobController.createJob);

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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *             examples:
 *               example-1:
 *                 summary: Example response
 *                 value:
 *                   _id: "675cc180a59ec8122a6ef03a"
 *                   company: "675cc180a59ec8122a6ef038"
 *                   title: "(주)디지키 Python 데이터 처리 및 분석 프로그램 개발자 모집"
 *                   location: "경기 안양시 만안구"
 *                   experience: "신입·경력"
 *                   education: "학력무관"
 *                   employmentType: "계약직"
 *                   salary: "급성장중"
 *                   sector: "Python, 알고리즘, Pandas, 솔루션업체, 소프트웨어개발"
 */
router.get('/:id', jobController.getJobById);

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
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: Job updated successfully
 */
router.put('/:id', authenticate, validate(jobSchema), jobController.updateJob);

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
