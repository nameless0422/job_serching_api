const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true }, // Company와의 참조
    title: { type: String, required: true },
    link: { type: String, required: true },
    location: { type: String },
    experience: { type: String },
    education: { type: String },
    employmentType: { type: String },
    deadline: { type: String },
    sector: { type: String },
    salary: { type: String },
    views: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);