const express = require('express');
const router = express.Router();
const { connectToMongoDB } = require('../config/mongo');

let db;
connectToMongoDB().then(database => db = database);

router.post('/users', async (req, res) => {
    try {
        const collection = db.collection('users');
        const result = await collection.insertOne({ name: req.body.name });
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = router;