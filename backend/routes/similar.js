const express = require("express");
const router = express.Router();
const chroma = require("../config/chroma");

router.get("/:id/similar", async(req, res) => {
    try {
        const id = req.params.id;

        const results = await chroma.similar(String(id));

        return res.json(results);
    } catch (err) {
        console.error((err && err.response && err.response.data) ? err.response.data : err.message);

        return res.status(200).json({
            note: "Chroma OK mais pas de résultats / collection vide / route différente",
            results: []
        });
    }
});

module.exports = router;