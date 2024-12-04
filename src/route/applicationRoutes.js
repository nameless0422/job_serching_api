const express = require('express');
const { applyJob, getApplications, cancelApplication } = require('../controllers/applicationController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// 지원하기
router.post('/', authenticate, applyJob);

// 지원 내역 조회
router.get('/', authenticate, getApplications);

// 지원 취소
router.delete('/:id', authenticate, cancelApplication);

module.exports = router;
