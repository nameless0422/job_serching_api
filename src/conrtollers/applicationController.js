const Application = require('../models/Application');

// 지원하기
exports.applyJob = async (req, res) => {
    const { jobId, resume } = req.body;

    try {
        // 중복 지원 체크
        const existingApplication = await Application.findOne({ userId: req.user.id, jobId });
        if (existingApplication) {
            return res.status(400).json({ status: 'error', message: 'Already applied to this job' });
        }

        // 지원 저장
        const application = new Application({ userId: req.user.id, jobId, resume });
        await application.save();

        res.status(201).json({ status: 'success', message: 'Application submitted successfully' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// 지원 내역 조회
exports.getApplications = async (req, res) => {
    try {
        const applications = await Application.find({ userId: req.user.id }).populate('jobId', 'title company location');
        res.json({ status: 'success', data: applications });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// 지원 취소
exports.cancelApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application || application.userId.toString() !== req.user.id) {
            return res.status(403).json({ status: 'error', message: 'Unauthorized action' });
        }

        await application.deleteOne();
        res.json({ status: 'success', message: 'Application cancelled successfully' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};
