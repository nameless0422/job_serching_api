const connectDB = require('../../database');
const Job = require('../../src/models/Jobs');
const crawlSaramin = require('./scraper');

const main = async () => {
    await connectDB();

    try {
        const keywords = ['python', 'java', 'javascript', 'c++', 'c#', 'ruby', 'go']; // 여러 언어 키워드
        const pages = 5;

        console.log(`Starting to crawl ${keywords.length} keywords, ${pages} pages each.`);

        for (const keyword of keywords) {
            console.log(`Crawling for keyword: ${keyword}`);

            const jobs = await crawlSaramin(keyword, pages);

            console.log(`Saving ${jobs.length} jobs for keyword: ${keyword} to MongoDB...`);
            for (const job of jobs) {
                try {
                    await Job.updateOne(
                        { title: job.title, company: job.company },
                        { $set: job },
                        { upsert: true } // 중복 데이터 방지
                    );
                } catch (err) {
                    console.error(`Error saving job: ${job.title}. Message: ${err.message}`);
                }
            }

            console.log(`Jobs for keyword: ${keyword} saved successfully.`);
        }

        console.log('All jobs saved successfully.');
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        process.exit();
    }
};

main();
