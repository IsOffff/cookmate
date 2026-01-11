const express = require("express");
const router = express.Router();
const chroma = require("../config/chroma");

router.get("/:id/similar", async(req, res) => {
    const id = req.params.id;
    const results = chroma.similaritySearch(id, 3);
    res.json(results);
});

module.exports = router;