const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET toutes les recettes (MySQL)
router.get("/", (req, res) => {
  db.query("SELECT * FROM recipes", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// POST une recette (MySQL)
router.post("/", (req, res) => {
  const { title, description, ingredients, steps } = req.body;

  // Vérifie que tous les champs sont présents
  if (!title || !description || !ingredients || !steps) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  const sql = `
    INSERT INTO recipes (title, description, ingredients, steps)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      title,
      description,
      JSON.stringify(ingredients), // <-- important !
      JSON.stringify(steps)        // <-- important !
    ],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json({ message: "Recette ajoutée (MySQL)" });
    }
  );
});

module.exports = router;
