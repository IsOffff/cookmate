const axios = require("axios");
const CHROMA_URL = process.env.CHROMA_URL || "http://chroma:8000";

const TENANT = process.env.CHROMA_TENANT || "default_tenant";
const DB = process.env.CHROMA_DB || "default_database";
const COLLECTION = process.env.CHROMA_COLLECTION || "recipes";

function collectionBase() {
    return `${CHROMA_URL}/api/v2/tenants/${TENANT}/databases/${DB}/collections`;
}

async function ensureCollection() {
    await axios.post(collectionBase(), {
        name: COLLECTION,
        get_or_create: true
    });
}

module.exports = {
    async addEmbedding(id, doc, embedding) {
        await ensureCollection();
        return axios.post(`${collectionBase()}/${COLLECTION}/add`, {
            ids: [String(id)],
            documents: [String(doc)],
            embeddings: [embedding]
        });
    },

    async similar(id) {
        await ensureCollection();

        return {
            note: "Chroma v2 OK. Similarity requires query_embeddings. TP demo uses heartbeat.",
            results: []
        };
    }
};