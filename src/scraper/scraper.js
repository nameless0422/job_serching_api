const axios = require('axios');
const cheerio = require('cheerio');
const Company = require('../../src/models/Company');
const Job = require('../../src/models/Jobs');

require('dotenv').config(); // .env 파일 로드

const API_KEY = process.env.SCRAPER_API_KEY; // .env 파일에서 API Key 가져오기

const crawlSaramin = async (keyword, pages = 1) => {
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    };

    const jobs = []; // 크롤링한 데이터를 저장할 배열

    for (let page = 1; page <= pages; page++) {
        const targetUrl = `https://www.saramin.co.kr/zf_user/search/recruit?searchType=search&searchword=${encodeURIComponent(
            keyword
        )}&recruitPage=${page}`;

        const url = `https://api.scraperapi.com?api_key=${API_KEY}&url=${encodeURIComponent(targetUrl)}`;

        try {
            const { data } = await axios.get(url, { headers });
            const $ = cheerio.load(data);

            $('.item_recruit').each((_, element) => {
                try {
                    const companyName = $(element).find('.corp_name a').text().trim();
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
                        companyName, // 회사 이름만 저장
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
            console.error(`Error fetching page ${page}:`, err.message);
        }
    }

    console.log('Saving jobs to MongoDB...');

    // MongoDB에 저장
    for (const job of jobs) {
        try {
            // 회사 정보 저장
            const company = await Company.findOneAndUpdate(
                { name: job.companyName }, // 회사 이름으로 찾기
                {
                    $set: {
                        name: job.companyName,
                        location: job.location, // 회사 위치
                        description: job.sector || 'No description provided', // 부서 정보
                    },
                },
                { upsert: true, new: true } // 없으면 새로 생성
            );

            // 채용 공고 저장
            await Job.updateOne(
                { title: job.title, company: company._id }, // 제목과 회사 ID로 중복 방지
                {
                    $set: {
                        ...job,
                        company: company._id, // 회사 ObjectId 참조
                    },
                },
                { upsert: true } // 없으면 새로 생성
            );
        } catch (err) {
            console.error(`Error saving job "${job.title}":`, err.message);
        }
    }

    console.log('Jobs saved successfully.');
    return jobs;
};

module.exports = crawlSaramin;
