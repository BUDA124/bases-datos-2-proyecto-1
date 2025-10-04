const neo4j = require('neo4j-driver');
const uri = 'neo4j://localhost:7687';
const user = 'neo4j';
const password = 'password123';
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

async function getNeo4jSession() {
    try {
        await driver.verifyConnectivity();
        console.log("Successfully connected to Neo4j");
        return driver.session();
    } catch (error) {
        console.error('Connection error to Neo4j:', error);
        process.exit(1);
    }
}
module.exports = { getNeo4jSession, driver };