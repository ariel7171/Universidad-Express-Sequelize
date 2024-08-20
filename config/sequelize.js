const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  host: 'localhost',
  port: 3306, // Especifica el puerto aquí si es necesario
  username: 'root',
  password: '',
  database: 'universidad',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
    waitForConnections: true, // Añadir esta línea para manejar la espera de conexiones
  },
});

module.exports = sequelize;


/*
module.exports = {  
    host: 'localhost',  
    username: 'root', // Sequelize usa 'username' en vez de 'user'  
    password: '',  
    database: 'universidad',  
    dialect: 'mysql', // Agrega el dialecto de la base de datos  
    pool: {  
        max: 10,  
        min: 0,  
        acquire: 30000,  
        idle: 10000  
    }  
};
*/
/*
module.exports ={
    host:'localhost',
    user:'root',
    password:'',
    database:'universidad',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};
*/