const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para que el servidor entienda JSON
app.use(express.json());

// Importar y usar las rutas
const neo4jMovieRoutes = require('./routes/movies');
const redisProductRoutes = require('./routes/products');
const cassandraUserRoutes = require('./routes/cassandraUsers');
const mongoUserRoutes = require('./routes/users');

app.use('/api', mongoUserRoutes);
app.use('/api', neo4jMovieRoutes);
app.use('/api', redisProductRoutes);
app.use('/api', cassandraUserRoutes);

// Ruta de bienvenida para verificar que el servidor funciona
app.get('/', (req, res) => {
    res.send('The backend server is working!');
});

app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});