const express = require('express');  
const cors = require('cors');
const estudianteRoutes = require('./routes/estudianteRoutes');
const profesorRoutes = require('./routes/profesorRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const inscripcionRoutes = require('./routes/inscripcionRoutes');
const setupAssociations = require('./config/associations');
const sequelize = require('./config/sequelize');

const app = express();
const PORT = process.env.PORT || 4000;

setupAssociations();

app.use(cors());
app.use(express.json()); 

app.use('/estudiantes', estudianteRoutes);

app.use('/profesores', profesorRoutes);

app.use('/cursos', cursoRoutes);

app.use('/inscripcion', inscripcionRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salio mal!');
});

const startServer = async () => {
    try {
        await sequelize.sync();
        console.log('Base de datos sincronizada');

        app.listen(PORT, () => {  
            console.log(`Servidor corriendo en http://localhost:${PORT}`);  
        });
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
    }
};

startServer();


/*
const express = require('express');
const app = express();
const cors = require('cors');
const estudiantesRoutes = require('./routes/estudiantesRoutes');
const profesoresRoutes = require('./routes/profesoresRoutes');
const cursosRoutes = require('./routes/cursosRoutes');
const inscripcionRoutes = require('./routes/inscripcionRoutes');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Universidad');
});

app.use('/estudiantes', estudiantesRoutes);

app.use('/profesores', profesoresRoutes);

app.use('/cursos', cursosRoutes);

app.use('/inscripcion', inscripcionRoutes);

app.listen(4000, () => {
    console.log('Servidor activo');
});
*/