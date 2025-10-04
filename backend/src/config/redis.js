const redis = require('redis');
const client = redis.createClient({
    url: 'redis://localhost:6379'
});
client.on('error', (err) => console.log('Redis Client Error', err));

async function connectToRedis() {
    try {
        await client.connect();
        console.log("Successfully connected to Redis");
    } catch (e) {
        console.error("Redis Client Error", e);
    }
}
connectToRedis();
module.exports = client;