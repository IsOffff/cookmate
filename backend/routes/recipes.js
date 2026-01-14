const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async(req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM recipes");
        res.json(rows);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", async(req, res) => {
    try {
        const { title, description, ingredients, steps } = req.body;
        if (!title || !description || !ingredients || !steps) {
            return res.status(400).json({ error: "Tous les champs sont requis" });
        }

        const sql = `
      INSERT INTO recipes (title, description, ingredients, steps)
      VALUES (?, ?, ?, ?)
    `;

        await db.query(sql, [
            title,
            description,
            JSON.stringify(ingredients),
            JSON.stringify(steps)
        ]);

        res.json({ message: "Recette ajoutée (MySQL)" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;