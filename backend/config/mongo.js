const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://127.0.0.1:27017");


let db;

async function connectMongo() {
    try {
        await client.connect();
        db = client.db("cookmate");
        console.log("Mongo connected");
    } catch (err) {
        console.error("Erreur connexion Mongo :", err);
    }
}

function getDB() {
    return db;
}

module.exports = { connectMongo, getDB };
