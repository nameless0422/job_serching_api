const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./database');

// 크롤링 함수
async function scrapeSaramin() {
    const url = 'https://www.saramin.co.kr/zf_user/jobs/list/job-category';

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const jobs = [];

        $('.job_card').each((index, element) => {
            const title = $(element).find('.job_tit').text().trim();
            const company = $(element).find('.corp_name').text().trim();
            const location = $(element).find('.job_loc').text().trim();
            const posted_date = $(element).find('.date').text().trim();

            if (title && company) {
                jobs.push({ title, company, location, posted_date });
            }
        });

        return jobs;
    } catch (error) {
        console.error('Error during scraping:', error);
        return [];
    }
}

// 데이터 저장 함수
function saveJobs(jobs) {
    const insertQuery = `
        INSERT OR IGNORE INTO jobs (title, company, location, posted_date)
        VALUES (?, ?, ?, ?)
    `;

    jobs.forEach(job => {
        db.run(insertQuery, [job.title, job.company, job.location, job.posted_date], err => {
            if (err) {
                console.error('Error saving job:', err);
            }
        });
    });

    console.log(`${jobs.length} jobs processed.`);
}

module.exports = { scrapeSaramin, saveJobs };
