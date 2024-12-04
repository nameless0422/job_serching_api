/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and authorization
 */
const express = require('express');
const { register, login, refreshToken, getProfile, deleteProfile } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already exists
 */
// 회원 가입
router.post('/register', register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid email or password
 */
// 로그인
router.post('/login', login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       403:
 *         description: Invalid or expired refresh token
 */
// 토큰 갱신
router.post('/refresh', refreshToken);

/**
 * @swagger
 * /auth/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name of the user
 *               password:
 *                 type: string
 *                 description: New password for the user
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Authentication required
 *       500:
 *         description: Internal server error
 */
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


/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       404:
 *         description: User not found
 */
// 프로필 불러오기 (인증 필요)
router.get('/profile', authenticate, getProfile);

/**
 * @swagger
 * /auth/profile:
 *   delete:
 *     summary: Delete user account
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User account deleted successfully
 *       404:
 *         description: User not found
 */
// 회원 탈퇴 (인증 필요)
router.delete('/profile', authenticate, deleteProfile);


module.exports = router;
