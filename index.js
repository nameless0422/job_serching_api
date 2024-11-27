const express = require('express');
const { scrapeSaramin, saveJobs } = require('./scraper');

const app = express();
const PORT = 3000;

// 라우트: 크롤링 및 데이터 저장
app.get('/scrape', async (req, res) => {
    const jobs = await scrapeSaramin();
    saveJobs(jobs);
    res.send(`${jobs.length} job postings scraped and saved!`);
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
