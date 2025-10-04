const cassandra = require('cassandra-driver');
const client = new cassandra.Client({
    contactPoints: ['localhost'],
    localDataCenter: 'datacenter1',
});

async function connectToCassandra() {
    try {
        await client.connect();
        console.log('Successfully connected to Cassandra');
        await client.execute("CREATE KEYSPACE IF NOT EXISTS mi_keyspace WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'}");
        await client.execute("USE mi_keyspace");
        await client.execute("CREATE TABLE IF NOT EXISTS usuarios (id uuid PRIMARY KEY, nombre text, email text)");
    } catch (err) {
        console.error('Failed connection to Cassandra', err);
    }
}
connectToCassandra();
module.exports = client;