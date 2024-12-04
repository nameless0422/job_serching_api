const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 회원 가입
exports.register = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        // 이메일 중복 확인
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 'error', message: 'Email already exists' });
        }

        // 비밀번호 암호화 (Base64)
        const hashedPassword = await bcrypt.hash(Buffer.from(password).toString('base64'), 10);

        // 사용자 저장
        const user = new User({ email, password: hashedPassword, name });
        await user.save();

        res.status(201).json({ status: 'success', message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// 로그인
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ status: 'error', message: 'Invalid email or password' });
        }

        // 비밀번호 검증
        const isMatch = await bcrypt.compare(Buffer.from(password).toString('base64'), user.password);
        if (!isMatch) {
            return res.status(401).json({ status: 'error', message: 'Invalid email or password' });
        }

        // JWT 토큰 발급
        const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        res.json({ status: 'success', data: { accessToken, refreshToken } });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// 토큰 갱신
exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const newAccessToken = jwt.sign({ id: decoded.id, role: decoded.role }, process.env.JWT_SECRET, { expiresIn: '15m' });

        res.json({ status: 'success', data: { accessToken: newAccessToken } });
    } catch (err) {
        res.status(403).json({ status: 'error', message: 'Invalid or expired refresh token' });
    }
};
