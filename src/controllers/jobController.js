const Job = require('../models/Jobs');

// 공고 목록 조회
exports.getJobs = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    try {
        const jobs = await Job.find().skip(skip).limit(limit);
        const total = await Job.countDocuments();

        res.json({
            status: 'success',
            data: jobs,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalItems: total,
            },
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message, code: 'DB_ERROR' });
    }
};

// 공고 상세 조회
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ status: 'error', message: 'Job not found', code: 'NOT_FOUND' });
        }

        // 조회수 증가
        job.views += 1;
        await job.save();

        res.json({ status: 'success', data: job });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message, code: 'DB_ERROR' });
    }
};
