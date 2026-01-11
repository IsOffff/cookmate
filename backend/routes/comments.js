const express = require("express");
const router = express.Router();
const { getDB } = require("../config/mongo");

router.get("/:id/comments", async(req, res) => {
    const recipeId = parseInt(req.params.id);
    const db = getDB();

    const doc = await db.collection("comments").findOne({ recipeId });
    res.json(doc || { recipeId, comments: [] });
});

module.exports = router