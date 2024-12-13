const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // 회사 이름
    industry: { type: String }, // 업종
    location: { type: String }, // 위치
    description: { type: String }, // 회사 설명
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
