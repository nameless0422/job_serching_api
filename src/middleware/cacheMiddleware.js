const redis = require('redis');
const client = redis.createClient();

// Redis 클라이언트 이벤트 핸들러
client.on('error', (err) => console.error('Redis error:', err));
client.on('connect', () => console.log('Redis connected'));
client.on('ready', () => console.log('Redis client is ready'));

// Redis 클라이언트 연결 초기화
(async () => {
    try {
        if (!client.isOpen) {
            await client.connect(); // 명시적으로 연결
        }
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
    }
})();

const cacheMiddleware = async (req, res, next) => {
    const key = req.originalUrl;

    try {
        const data = await client.get(key); // 비동기 방식으로 캐시 데이터 가져오기
        if (data) {
            console.log(`Cache hit for key: ${key}`);
            return res.json(JSON.parse(data)); // 캐싱된 데이터를 반환
        }

        console.log(`Cache miss for key: ${key}`);
        res.sendResponse = res.json;
        res.json = (body) => {
            client.setEx(key, 600, JSON.stringify(body)); // TTL 600초
            res.sendResponse(body);
        };

        next();
    } catch (err) {
        console.error('Cache middleware error:', err);
        next(err); // 에러를 다음 미들웨어로 전달
    }
};

module.exports = cacheMiddleware;

