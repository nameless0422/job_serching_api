const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    company: String,
    title: String,
    link: String,
    location: String,
    experience: String,
    education: String,
    employmentType: String,
    deadline: String,
    sector: String,
    salary: String,
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
