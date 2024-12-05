const axios = require('axios');
const cheerio = require('cheerio');
const Job = require('../../src/models/Jobs');

const crawlSaramin = async (keyword, pages = 1) => {
    const jobs = [];
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    };

    for (let page = 1; page <= pages; page++) {
        const url = `https://www.saramin.co.kr/zf_user/search/recruit?searchType=search&searchword=${encodeURIComponent(
            keyword
        )}&recruitPage=${page}`;

        try {
            const { data } = await axios.get(url, { headers });
            const $ = cheerio.load(data);

            $('.item_recruit').each((_, element) => {
                try {
                    const company = $(element).find('.corp_name a').text().trim();
                    const title = $(element).find('.job_tit a').text().trim();
                    const link = `https://www.saramin.co.kr${$(element).find('.job_tit a').attr('href')}`;
                    const conditions = $(element).find('.job_condition span');
                    const location = $(conditions[0]).text().trim() || '';
                    const experience = $(conditions[1]).text().trim() || '';
                    const education = $(conditions[2]).text().trim() || '';
                    const employmentType = $(conditions[3]).text().trim() || '';
                    const deadline = $(element).find('.job_date .date').text().trim() || '';
                    const sector = $(element).find('.job_sector').text().trim() || '';
                    const salary = $(element).find('.area_badge .badge').text().trim() || '';

                    jobs.push({
                        company,
                        title,
                        link,
                        location,
                        experience,
                        education,
                        employmentType,
                        deadline,
                        sector,
                        salary,
                    });
                } catch (err) {
                    console.error('Error parsing job element:', err.message);
                }
            });

            console.log(`Page ${page} crawled successfully.`);
        } catch (err) {
            console.error('Error fetching page:', err.message);
        }
    }

    return jobs;
};

module.exports = crawlSaramin;
