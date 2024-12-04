const express = require('express');
const { register, login, refreshToken } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// 회원 가입
router.post('/register', register);

// 로그인
router.post('/login', login);

// 토큰 갱신
router.post('/refresh', refreshToken);

// 프로필 수정 (인증 필요)
router.put('/profile', authenticate, async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = req.user;

        if (name) user.name = name;
        if (password) user.password = Buffer.from(password).toString('base64');

        await user.save();

        res.json({ status: 'success', message: 'Profile updated successfully' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

module.exports = router;
