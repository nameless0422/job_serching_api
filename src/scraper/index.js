const connectDB = require('../../database');
const Job = require('../../src/models/Jobs');
const crawlSaramin = require('./scraper');

const main = async () => {
    await connectDB();

    try {
        const keyword = 'python';
        const pages = 5;

        console.log(`Starting to crawl ${pages} pages for keyword: ${keyword}`);
        const jobs = await crawlSaramin(keyword, pages);

        console.log('Saving jobs to MongoDB...');
        for (const job of jobs) {
            await Job.updateOne(
                { title: job.title, company: job.company },
                { $set: job },
                { upsert: true } // 중복 데이터 방지
            );
        }

        console.log('Jobs saved successfully.');
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        process.exit();
    }
};

main();
