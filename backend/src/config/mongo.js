const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017,localhost:27018/?replicaSet=myReplicaSet";
const client = new MongoClient(uri);

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Successfully connected to MongoDB");
        return client.db("miBaseDeDatos");
    } catch (e) {
        console.error("Failed connection to MongoDB", e);
        process.exit(1);
    }
}
module.exports = { connectToMongoDB };