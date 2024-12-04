const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./database');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');
const { globalErrorHandler } = require('./middleware/errorMiddleware');
const { xssProtection, secureHeaders, rateLimiter } = require('./middleware/securityMiddleware');


// 환경 변수 로드
dotenv.config();

// 데이터베이스 연결
connectDB();

// Express 앱 생성
const app = express();

// 보안 미들웨어
app.use(helmet());

// 요청 로그 미들웨어
app.use(morgan('dev'));

// CORS 허용
app.use(cors());

// 요청 본문 JSON 파싱
app.use(express.json());

// 보안 미들웨어
app.use(secureHeaders);
app.use(xssProtection);
app.use(rateLimiter);

// 기본 라우트
app.get('/', (req, res) => {
    res.json({ status: 'success', message: 'API runnig' });
});

// API 라우트 설정
app.use('/auth', authRoutes); // 회원 관리 API
app.use('/jobs', jobRoutes); // 채용 공고 API
app.use('/applications', applicationRoutes); // 지원 관리 API
app.use('/bookmarks', bookmarkRoutes); // 북마크 관리 API

// 글로벌 에러 처리 미들웨어
app.use(globalErrorHandler);

module.exports = app;
