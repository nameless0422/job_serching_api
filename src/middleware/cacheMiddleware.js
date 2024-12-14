const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => console.error('Redis error:', err));

const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl;

    client.get(key, (err, data) => {
        if (err) return next(err);

        if (data) {
            console.log(`Cache hit for key: ${key}`);
            return res.json(JSON.parse(data)); // 캐싱된 데이터를 반환
        }

        console.log(`Cache miss for key: ${key}`);
        res.sendResponse = res.json;
        res.json = (body) => {
            client.setex(key, 600, JSON.stringify(body)); // 600초 TTL로 저장
            res.sendResponse(body);
        };

        next();
    });
};

module.exports = cacheMiddleware;
