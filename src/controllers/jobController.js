const Job = require('../models/Jobs');
const mongoose = require('mongoose');

/**
 * Get all jobs with search, filtering, sorting, and pagination
 */
exports.getAllJobs = async (req, res) => {
    try {
        const { search, location, experience, education, sort = 'title', page = 1, limit = 20 } = req.query;

        const filter = {};
        if (search) filter.title = { $regex: search, $options: 'i' };
        if (location) filter.location = { $regex: location, $options: 'i' };
        if (experience) filter.experience = { $regex: experience, $options: 'i' };
        if (education) filter.education = { $regex: education, $options: 'i' };

        const jobs = await Job.find(filter)
            .sort(sort)
            .skip((page - 1) * parseInt(limit, 10))
            .limit(parseInt(limit, 10));

        const total = await Job.countDocuments(filter);

        res.status(200).json({
            status: 'success',
            data: jobs,
            pagination: {
                currentPage: parseInt(page, 10),
                totalPages: Math.ceil(total / limit),
                totalItems: total,
            },
        });
    } catch (err) {
        console.error('Error fetching jobs:', err.message);
        res.status(500).json({ status: 'error', message: 'Failed to fetch job listings.' });
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
        console.error('Error creating job:', err.message);
        res.status(500).json({ status: 'error', message: 'Failed to create a job posting.' });
    }
};

/**
 * Update a job posting
 */
exports.updateJob = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: 'error', message: 'Invalid job ID.' });
        }

        const job = await Job.findByIdAndUpdate(id, req.body, { new: true });

        if (!job) {
            return res.status(404).json({ status: 'error', message: 'Job not found.' });
        }

        res.status(200).json({ status: 'success', data: job });
    } catch (err) {
        console.error('Error updating job:', err.message);
        res.status(500).json({ status: 'error', message: 'Failed to update the job posting.' });
    }
};

/**
 * Delete a job posting
 */
exports.deleteJob = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: 'error', message: 'Invalid job ID.' });
        }

        const job = await Job.findByIdAndDelete(id);

        if (!job) {
            return res.status(404).json({ status: 'error', message: 'Job not found.' });
        }

        res.status(200).json({ status: 'success', message: 'Job deleted successfully.' });
    } catch (err) {
        console.error('Error deleting job:', err.message);
        res.status(500).json({ status: 'error', message: 'Failed to delete the job posting.' });
    }
};

/**
 * Get job details by ID
 */
exports.getJobById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: 'error', message: 'Invalid job ID.' });
        }

        const job = await Job.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } }, // Increment view count
            { new: true } // Return updated document
        );

        if (!job) {
            return res.status(404).json({ status: 'error', message: 'Job not found.' });
        }

        res.status(200).json({ status: 'success', data: job });
    } catch (err) {
        console.error('Error fetching job details:', err.message);
        res.status(500).json({ status: 'error', message: 'Failed to fetch job details.' });
    }
};

/**
 * Get aggregated job statistics
 */
exports.getJobStats = async (req, res) => {
    try {
        const { groupBy, filter } = req.query;

        const validGroupByFields = ['company', 'location', 'experience', 'employmentType', 'sector'];
        if (!groupBy || !validGroupByFields.includes(groupBy)) {
            return res.status(400).json({
                status: 'error',
                message: `Invalid groupBy value. Allowed values: ${validGroupByFields.join(', ')}`,
            });
        }

        const matchStage = {};
        if (filter) {
            try {
                const parsedFilter = JSON.parse(filter);
                for (const key in parsedFilter) {
                    matchStage[key] = { $regex: parsedFilter[key], $options: 'i' };
                }
            } catch (err) {
                console.error('Invalid filter format:', err.message);
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid filter format. Use a valid JSON string.',
                });
            }
        }

        const pipeline = [
            { $match: matchStage },
            {
                $group: {
                    _id: `$${groupBy}`,
                    count: { $sum: 1 },
                },
            },
            { $sort: { count: -1 } },
        ];

        const stats = await Job.aggregate(pipeline);

        res.status(200).json({ status: 'success', data: stats });
    } catch (err) {
        console.error('Error aggregating job stats:', err.message);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve job statistics.',
        });
    }
};


/**
 * Get recommended jobs based on a given job ID
 */
exports.getRecommendedJobs = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Find the job by ID
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ status: 'error', message: 'Job not found' });
        }

        // Create a query for similar jobs
        const recommendations = await Job.find({
            $or: [
                { location: job.location },
                { sector: job.sector },
                { company: job.company },
            ],
            _id: { $ne: jobId }, // Exclude the original job
        })
            .limit(5); // Limit to 5 recommendations

        res.status(200).json({
            status: 'success',
            data: recommendations,
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};