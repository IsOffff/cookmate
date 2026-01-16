const express = require("express");
const router = express.Router();
const redis = require("../config/redis");
const db = require("../config/db");

/**
 * GET /recipes/:id
 * Lecture d'une recette avec cache Redis
 */
router.get("/:id", async(req, res) => {
    const id = req.params.id;

    try {
        // 1. Vérification Redis
        const cached = await redis.get(`recipe:${id}`);
        if (cached) {
            return res.json({
                source: "redis",
                data: JSON.parse(cached)
            });
        }

        // 2. Sinon MySQL
        const [rows] = await db.query(
            "SELECT * FROM recipes WHERE id = ?", [id]
        );

        if (!rows.length) {
            return res.status(404).json({ error: "Recette introuvable" });
        }

        // 3. Mise en cache Redis
        await redis.set(
            `recipe:${id}`,
            JSON.stringify(rows[0])
        );

        res.json({
            source: "mysql",
            data: rows[0]
        });

    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

/**
 * GET /recipes
 * Liste des recettes (MySQL)
 */
router.get("/", async(req, res) => {
    const [rows] = await db.query("SELECT * FROM recipes");
    res.json(rows);
});

/**
 * POST /recipes
 * Création d'une recette (MySQL)
 */
router.post("/", async(req, res) => {
    const { title, description, ingredients, steps } = req.body;

    if (!title || !description || !ingredients || !steps) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    await db.query(
        `INSERT INTO recipes (title, description, ingredients, steps)
         VALUES (?, ?, ?, ?)`, [
            title,
            description,
            JSON.stringify(ingredients),
            JSON.stringify(steps)
        ]
    );

    res.status(201).json({ message: "Recette créée" });
});

router.delete("/:id", async(req, res) => {
    const id = req.params.id;

    try {
        // 1. Suppression dans MySQL (source de vérité)
        const [result] = await db.query(
            "DELETE FROM recipes WHERE id = ?", [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Recette introuvable" });
        }

        // 2. Invalidation du cache Redis
        await redis.del(`recipe:${id}`);

        res.json({ message: "Recette supprimée" });

    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

module.exports = router;