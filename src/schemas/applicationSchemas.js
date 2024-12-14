const Joi = require('joi');

// 지원 등록 스키마
const applicationSchema = Joi.object({
    jobId: Joi.string().required(), // ObjectId를 문자열로 받음
    resume: Joi.string().required(),
});

// 지원 필터링 스키마
const applicationFilterSchema = Joi.object({
    status: Joi.string().valid('applied', 'withdrawn', 'rejected', 'accepted').allow(''),
    sort: Joi.string().valid('createdAt', '-createdAt').allow(''),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
});

module.exports = { applicationSchema, applicationFilterSchema };
