// model/profesor.js
const { DataTypes } = require('sequelize');  
const sequelize = require('../config/sequelize');  

const Profesor = sequelize.define('Profesor', {  
    id: {  
        type: DataTypes.INTEGER,  
        autoIncrement: true,  
        primaryKey: true,  
        allowNull: false  
    },  
    dni: {  
        type: DataTypes.STRING(15), 
        allowNull: true 
    },  
    nombre: {  
        type: DataTypes.STRING(30), 
        allowNull: true 
    },  
    apellido: {  
        type: DataTypes.STRING(30), 
        allowNull: true   
    },  
    email: {  
        type: DataTypes.STRING(50), 
        allowNull: true, 
        validate: {  
            isEmail: true 
        }  
    },
    profesion: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING(15),
        allowNull: true
    }
}, {  
    tableName: 'profesores', 
    timestamps: false
});  

module.exports = Profesor;