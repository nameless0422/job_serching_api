const Joi = require('joi');

// 채용 공고 생성 및 수정에 사용
const jobSchema = Joi.object({
    title: Joi.string().required(),
    company: Joi.string().required(),
    location: Joi.string().required(),
    experience: Joi.string().valid('신입', '경력', '신입·경력').required(),
    education: Joi.string().valid('학력무관', '고졸', '초대졸', '대졸').required(),
    employmentType: Joi.string().required(),
    deadline: Joi.string().required(),
    sector: Joi.string().required(),
    salary: Joi.string().allow(''), // 선택 필드
});

// 채용 공고 필터 및 검색에 사용
const jobFilterSchema = Joi.object({
    search: Joi.string().allow(''),
    location: Joi.string().allow(''),
    experience: Joi.string().allow(''),
    education: Joi.string().allow(''),
    sort: Joi.string().valid('title', '-deadline').allow(''),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
});

module.exports = { jobSchema, jobFilterSchema };
