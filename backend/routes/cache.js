const express = require("express");
const router = express.Router();
const redis = require("../config/redis");
const sql = require("../config/sql");

router.get("/:id/cache", async(req, res) => {
    const id = req.params.id;
    const cached = await redis.get(`recipe:${id}`);

    if (cached) return res.json({ source: "redis", data: JSON.parse(cached) });

    const [rows] = await sql.query("SELECT * FROM recipes WHERE id = ?", [id]);
    if (!rows.length) return res.status(404).json({ error: "Not found" });

    await redis.set(`recipe:${id}`, JSON.stringify(rows[0]));
    res.json({ source: "sql", data: rows[0] });
});

module.exports = router;