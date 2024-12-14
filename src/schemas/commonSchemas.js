const Joi = require('joi');

// 페이지네이션 공통 스키마
const paginationSchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
});

module.exports = { paginationSchema };
