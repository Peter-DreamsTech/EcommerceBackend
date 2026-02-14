const redis = require("redis");

const RedisClient = redis.createClient({
    url: "redis://127.0.0.1:6379"
});

RedisClient.connect()
        .then(()=> console.log("Redis is Connected"))
        .catch(err => console.log(`Redis Connection Error: ${err.message}`));

module.exports = RedisClient;