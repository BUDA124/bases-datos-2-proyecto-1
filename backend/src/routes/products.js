const express = require('express');
const router = express.Router();
const redisClient = require('../config/redis');

router.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const cacheKey = `product:${id}`;

    try {
        const cachedProduct = await redisClient.get(cacheKey);
        if (cachedProduct) {
            return res.json({ source: 'cache', data: JSON.parse(cachedProduct) });
        }
        const productFromDB = { id, name: 'Producto Ejemplo', price: 100 };
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(productFromDB));
        res.json({ source: 'database', data: productFromDB });
    } catch (error) {
        res.status(500).send(error.message);
    }
});
module.exports = router;