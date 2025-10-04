const express = require('express');
const router = express.Router();
const cassandraClient = require('../config/cassandra');
const { v4: uuidv4 } = require('uuid');

router.post('/cassandra/users', async (req, res) => {
    const id = uuidv4();
    const query = 'INSERT INTO usuarios (id, nombre, email) VALUES (?, ?, ?)';
    const params = [id, req.body.nombre, req.body.email];

    try {
        await cassandraClient.execute(query, params, { prepare: true });
        res.status(201).send({ id });
    } catch (error) {
        res.status(500).send(error.message);
    }
});
module.exports = router;