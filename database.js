const sqlite3 = require('sqlite3').verbose();

// 데이터베이스 초기화
const db = new sqlite3.Database('./jobs.db');

// 테이블 생성
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            company TEXT,
            location TEXT,
            posted_date TEXT,
            UNIQUE(title, company)
        )
    `);
});

module.exports = db;