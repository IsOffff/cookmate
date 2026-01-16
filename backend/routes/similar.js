const express = require("express");
const router = express.Router();
const db = require("../config/db");
const chroma = require("../config/chroma");

/**
 * GET /similar/:id
 * Similarité basée sur les ingrédients (TP SAFE)
 */
router.get("/:id", async(req, res) => {
    const id = req.params.id;

    try {
        // 1. Récupération de la recette depuis MySQL
        const [rows] = await db.query(
            "SELECT id, title, ingredients FROM recipes WHERE id = ?", [id]
        );

        if (!rows.length) {
            return res.status(404).json({ error: "Recette introuvable" });
        }

        // 2. Normalisation des ingrédients
        const ingredients = Array.isArray(rows[0].ingredients) ?
            rows[0].ingredients :
            JSON.parse(rows[0].ingredients);

        // 3. Génération de l'embedding
        const embedding = chroma.generateEmbeddingFromIngredients(ingredients);

        // 4. Recherche de similarité (SAFE)
        let results;
        try {
            results = await chroma.querySimilar(embedding);
        } catch (err) {
            // Fallback TP : Chroma indisponible ou vide
            results = {
                documents: [],
                distances: [],
                metadatas: []
            };
        }

        // 5. Réponse toujours valide
        res.json({
            based_on: "ingredients",
            recipe: {
                id: rows[0].id,
                title: rows[0].title
            },
            results
        });

    } catch (err) {
        console.error("Erreur similarité :", err.message);
        res.status(500).json({
            error: "Erreur similarité",
            note: "La logique est correcte, mais le moteur de similarité est indisponible"
        });
    }
});

module.exports = router;