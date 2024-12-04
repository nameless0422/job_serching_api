const express = require('express');
const connectDB = require('./database');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// 라우트 설정
app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
