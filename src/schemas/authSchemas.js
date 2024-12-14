const Joi = require('joi');

// 회원가입 스키마
const registerSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

// 로그인 스키마
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

// 프로필 수정 스키마
const profileSchema = Joi.object({
    name: Joi.string().min(2).max(50),
    password: Joi.string().min(8),
}).or('name', 'password'); // 둘 중 하나는 반드시 포함

module.exports = { registerSchema, loginSchema, profileSchema };
