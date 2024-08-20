const { Sequelize } = require('sequelize');  
const dbConfig = require('../config/sequelize');  

// Crear una instancia de Sequelize  
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {  
    host: dbConfig.host,  
    dialect: dbConfig.dialect,  
    pool: dbConfig.pool // Usa las opciones del pool definidas en config-db.js  
});  

// Probar la conexión (opcional)  
(async () => {  
    try {  
        await sequelize.authenticate();  
        console.log('Conexión a la base de datos ha sido establecida correctamente.');  
    } catch (error) {  
        console.error('No se pudo conectar a la base de datos:', error);  
    }  
})();  

module.exports = sequelize;

/*
const mysql=require('mysql2');

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'universidad',
    port: 3306
});

db.connect((err)=>{
    if(err) {
        throw err;
    }
    console.log('Me conecte a la BD');
});

module.exports=db;
*/
/*
const mysql = require('mysql2/promise');
const dbConfig = require('../config/config-db');
const pool = mysql.createPool(dbConfig);
module.exports = pool;
*/