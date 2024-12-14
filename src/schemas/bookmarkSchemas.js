const Joi = require('joi');

// 북마크 추가 및 삭제 스키마
const bookmarkSchema = Joi.object({
    jobId: Joi.string().required(), // ObjectId를 문자열로 받음
});

// 북마크 필터링 스키마
const bookmarkFilterSchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
});

module.exports = { bookmarkSchema, bookmarkFilterSchema };
