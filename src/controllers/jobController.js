const Job = require('../models/Jobs');

/**
 * Get all jobs with search, filtering, sorting, and pagination
 */
exports.getAllJobs = async (req, res) => {
    try {
        const { search, location, experience, education, sort = 'title', page = 1, limit = 10 } = req.query;

        const filter = {};
        if (search) filter.title = { $regex: search, $options: 'i' };
        if (location) filter.location = location;
        if (experience) filter.experience = experience;
        if (education) filter.education = education;

        const jobs = await Job.find(filter)
            .sort(sort)
            .skip((page - 1) * parseInt(limit))
            .limit(parseInt(limit));

        const total = await Job.countDocuments(filter);
        res.status(200).json({
            status: 'success',
            data: jobs,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalItems: total,
            },
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

/**
 * Create a new job posting
 */
exports.createJob = async (req, res) => {
    try {
        const job = await Job.create(req.body);
        res.status(201).json({ status: 'success', data: job });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

/**
 * Update a job posting
 */
exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!job) {
            return res.status(404).json({ status: 'error', message: 'Job not found' });
        }
        res.status(200).json({ status: 'success', data: job });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

/**
 * Delete a job posting
 */
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({ status: 'error', message: 'Job not found' });
        }
        res.status(200).json({ status: 'success', message: 'Job deleted successfully' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

/**
 * Get job details by ID
 */
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ status: 'error', message: 'Job not found' });
        }
        res.status(200).json({ status: 'success', data: job });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

/**
 * Get aggregated job statistics
 */
exports.getJobStats = async (req, res) => {
    try {
        const { groupBy, filter } = req.query;

        if (!groupBy) {
            return res.status(400).json({
                status: 'error',
                message: 'Missing required query parameter: groupBy',
            });
        }

        // Build the match stage for filtering
        const matchStage = {};
        if (filter) {
            const filters = JSON.parse(filter); // Example: filter={"location":"서울"}
            for (const key in filters) {
                matchStage[key] = filters[key];
            }
        }

        // Group stage for aggregation
        const groupStage = {
            _id: `$${groupBy}`,
            count: { $sum: 1 }, // Count number of documents per group
        };

        // Aggregate pipeline
        const pipeline = [
            { $match: matchStage }, // Apply filtering
            { $group: groupStage }, // Apply grouping
            { $sort: { count: -1 } }, // Sort by count in descending order
        ];

        const stats = await Job.aggregate(pipeline);

        res.status(200).json({
            status: 'success',
            data: stats,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve job statistics',
        });
    }
};