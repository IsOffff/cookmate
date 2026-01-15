const { createClient } = require("redis");

const host = process.env.REDIS_HOST || "redis";
const port = process.env.REDIS_PORT || "6379";

const client = createClient({
    url: `redis://${host}:${port}`,
});

client.on("error", (err) => console.error("Redis error:", err));

(async() => {
    await client.connect();
    console.log("Redis connected");
})();

module.exports = client;