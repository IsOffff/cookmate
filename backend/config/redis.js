const { createClient } = require("redis");

const client = createClient({ url: "redis://127.0.0.1:6379" });

client.on("error", (err) => console.error("Redis error:", err));

client.connect();

module.exports = client;