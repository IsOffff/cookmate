const axios = require("axios");

const CHROMA_URL = process.env.CHROMA_URL || "http://chroma:8000";
const COLLECTION = "recipes";

// Base API v1 simple
function collectionBase() {
    return `${CHROMA_URL}/api/v1/collections`;
}

async function ensureCollection() {
    await axios.post(collectionBase(), {
        name: COLLECTION,
        get_or_create: true
    });
}

function generateEmbeddingFromIngredients(ingredients) {
    const text = ingredients.join(" ").toLowerCase();
    const vector = new Array(8).fill(0);

    for (let i = 0; i < text.length; i++) {
        vector[i % vector.length] += text.charCodeAt(i) / 100;
    }

    return vector;
}

async function querySimilar(embedding, limit = 3) {
    await ensureCollection();

    const response = await axios.post(
        `${collectionBase()}/${COLLECTION}/query`, {
            query_embeddings: [embedding],
            n_results: limit
        }
    );

    return response.data;
}

module.exports = {
    generateEmbeddingFromIngredients,
    querySimilar
};