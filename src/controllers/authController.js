const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const TokenBlacklist = require('../models/TokenBlacklist');

const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

// Generate Refresh Token
const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

// 회원 가입
exports.register = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 'error', message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(Buffer.from(password).toString('base64'), 10);

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

        const isMatch = await bcrypt.compare(Buffer.from(password).toString('base64'), user.password);
        if (!isMatch) {
            return res.status(401).json({ status: 'error', message: 'Invalid email or password' });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.json({ status: 'success', data: { accessToken, refreshToken } });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// 토큰 갱신
exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(403).json({ status: 'error', message: 'Refresh token required' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ status: 'error', message: 'Invalid refresh token' });
        }

        const newAccessToken = generateAccessToken(user);

        res.json({ status: 'success', data: { accessToken: newAccessToken } });
    } catch (err) {
        res.status(403).json({ status: 'error', message: 'Invalid or expired refresh token' });
    }
};
// 로그아웃
exports.logout = async (req, res) => {
    const { token } = req.body;

    try {
        await TokenBlacklist.create({ token });
        res.json({ status: 'success', message: 'Logged out successfully' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};
// 회원 정보 조회
exports.getProfile = async (req, res) => {
    try {
        const user = req.user; // 인증 미들웨어에서 가져온 사용자 정보

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }

        res.json({
            status: 'success',
            data: {
                id: user._id,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
};
// 회원 탈퇴
exports.deleteProfile = async (req, res) => {
    try {
        const user = req.user; // 인증 미들웨어에서 가져온 사용자 정보

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }

        // 사용자 계정 삭제
        await user.deleteOne();

        res.json({
            status: 'success',
            message: 'User account deleted successfully',
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
};
