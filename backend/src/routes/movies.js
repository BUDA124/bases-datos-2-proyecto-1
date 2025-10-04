const express = require('express');
const router = express.Router();
const { getNeo4jSession } = require('../config/neo4j');

router.post('/movies', async (req, res) => {
    const session = await getNeo4jSession();
    try {
        const result = await session.run(
            'CREATE (p:Pelicula {titulo: $titulo, anio: $anio}) RETURN p',
            { titulo: req.body.titulo, anio: req.body.anio }
        );
        const singleRecord = result.records[0];
        const node = singleRecord.get(0);
        res.status(201).send(node.properties);
    } catch (error) {
        res.status(500).send(error.message);
    } finally {
        await session.close();
    }
});
module.exports = router;