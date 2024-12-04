const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    resume: String, // 선택적 이력서 첨부
    status: { type: String, default: 'applied' },
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);
