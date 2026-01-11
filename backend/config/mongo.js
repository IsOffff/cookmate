const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://mongo:27017");

let db;
async function connectMongo() {
    await client.connect();
    db = client.db("cookmate");
    console.log("Mongo connected");
}

function getDB() { return db; }
module.exports = { connectMongo, getDB };