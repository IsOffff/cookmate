const axios = require("axios");
const CHROMA_URL = "http://chroma:8000";

module.exports = {
    async addEmbedding(id, doc, embedding) {
        return axios.post(CHROMA_URL + "/api/v1/collections/recipes/add", {
            ids: [id],
            documents: [doc],
            embeddings: [embedding]
        });
    },

    async similar(id) {
        return axios.post(CHROMA_URL + "/api/v1/collections/recipes/query", {
            n_results: 3,
            query_ids: [id]
        }).then(res => res.data);
    }
};